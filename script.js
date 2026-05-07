const revealItems = document.querySelectorAll(".scrap-page");

revealItems.forEach((item) => {
  item.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.01,
    }
  );

  revealItems.forEach((item) => {
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("visible");
  });
}

const photos = document.querySelectorAll(".photo");
const lightbox = document.createElement("div");
const lightboxImage = document.createElement("img");
const lightboxClose = document.createElement("button");

lightbox.className = "image-lightbox";
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
lightbox.setAttribute("aria-hidden", "true");

lightboxClose.className = "lightbox-close";
lightboxClose.type = "button";
lightboxClose.setAttribute("aria-label", "Close image preview");
lightboxClose.textContent = "x";

lightbox.append(lightboxImage, lightboxClose);
document.body.append(lightbox);

const closeLightbox = () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.removeAttribute("src");
  lightboxImage.removeAttribute("alt");
};

photos.forEach((photo) => {
  photo.addEventListener("click", () => {
    lightboxImage.src = photo.currentSrc || photo.src;
    lightboxImage.alt = photo.alt || "Selected scrapbook photo";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox || event.target === lightboxClose) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) {
    closeLightbox();
  }
});

const floatingMusic = document.querySelector(".floating-music");

if (floatingMusic) {
  const audio = floatingMusic.querySelector(".music-audio");
  const discButton = floatingMusic.querySelector(".music-disc-button");

  const updatePlayState = () => {
    const isPlaying = !audio.paused;
    floatingMusic.classList.toggle("playing", isPlaying);
    discButton.setAttribute("aria-label", isPlaying ? "Stop birthday song" : "Play birthday song");
    discButton.title = isPlaying ? "Stop birthday song" : "Play birthday song";
  };

  discButton.addEventListener("click", async () => {
    if (!audio.src) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        updatePlayState();
      }
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  });

  audio.addEventListener("play", updatePlayState);
  audio.addEventListener("pause", updatePlayState);

  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    updatePlayState();
  });

  audio.volume = 0.85;
  updatePlayState();
}

const envelopeLink = document.querySelector(".envelope-link");

if (envelopeLink) {
  envelopeLink.addEventListener("click", (event) => {
    event.preventDefault();
    document.body.classList.add("opening-active");

    window.setTimeout(() => {
      window.location.href = envelopeLink.href;
    }, 1250);
  });
}
