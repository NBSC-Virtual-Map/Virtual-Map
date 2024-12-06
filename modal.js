//MODAL GALLERY
// Modal and controls
const modal = document.getElementById("modal");
const close = document.getElementById("close");
const galleryImage = document.getElementById("gallery-image");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

// Gallery data for each card
const galleries = {
  gallery1: [
    "https://via.placeholder.com/500x300?text=Gallery+1+Image+1",
    "https://via.placeholder.com/500x300?text=Gallery+1+Image+2",
    "https://via.placeholder.com/500x300?text=Gallery+1+Image+3",
  ],
  gallery2: [
    "https://via.placeholder.com/500x300?text=Gallery+2+Image+1",
    "https://via.placeholder.com/500x300?text=Gallery+2+Image+2",
    "https://via.placeholder.com/500x300?text=Gallery+2+Image+3",
  ],
  gallery3: [
    "https://via.placeholder.com/500x300?text=Gallery+3+Image+1",
    "https://via.placeholder.com/500x300?text=Gallery+3+Image+2",
    "https://via.placeholder.com/500x300?text=Gallery+3+Image+3",
  ],
};

let currentGallery = [];
let currentIndex = 0;

// Open modal and set the gallery
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    const galleryKey = card.getAttribute("data-gallery");
    currentGallery = galleries[galleryKey];
    currentIndex = 0;

    modal.style.display = "flex";
    galleryImage.src = currentGallery[currentIndex];
  });
});

// Close modal
close.addEventListener("click", () => {
  modal.style.display = "none";
});

// Next button functionality
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  galleryImage.src = currentGallery[currentIndex];
});

// Previous button functionality
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  galleryImage.src = currentGallery[currentIndex];
});

// Close modal when clicking outside of it
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
