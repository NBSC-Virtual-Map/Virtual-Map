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
    "images/insideCourt.jpg"
  ],
  gallery2: [
    "images/TEP OFFICE.jpg",
  ],
  gallery3: [
    "images/CSS FACULTY.jpg",
    "images/Lab1.jpg",
    "images/LAB2.jpg",
  ],
  gallery4: [
    "images/GEC FACULTY.jpg",
    "images/GEC Admin.jpg",

  ],
  gallery5: [
    "images/BSBAOFFICES.jfif",
  ],
  gallery6: [
    "images/PHOTO NOT AVAILABLE.jfif",
  ],
  gallery7: [
    "images/lib01.jpg",
    "images/lib2.jpg",
    "images/lib3.jpg",
  ],
  gallery8: [
    "images/SCOFFICES.jfif",
    "images/SCOFFICES1.jfif",
    "images/SCOFFICE3.jfif",
    "images/SCOFFICE2.jfif",
    "images/SCOFFICES4.jfif",
    "images/SCOFFICES5.jfif",
  ], 
  gallery9: [
    "images/BILLING1.jfif",
    "images/BILLING2.jfif",
    "images/BILLING3.jfif",
  ],
   gallery10: [
    "images/PHOTO NOT AVAILABLE.jfif",
  ],
   gallery11: [
    "images/PHOTO NOT AVAILABLE.jfif",
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

// Previous button functionalitys
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
