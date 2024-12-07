document.addEventListener("DOMContentLoaded", () => {
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    const carousel = document.querySelector('.carousel');
    const list = document.querySelector('.list');
    const runningTime = document.querySelector('.carousel .timeRunning');
    const timeRunning = 3000;
    const timeAutoNext = 7000;

    let runTimeOut;
    let runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);

    // Navigation for slider
    nextBtn.onclick = function () {
        showSlider('next');
    };

    prevBtn.onclick = function () {
        showSlider('prev');
    };

    function resetTimeAnimation() {
        runningTime.style.animation = 'none';
        runningTime.offsetHeight; // Trigger reflow
        runningTime.style.animation = null;
        runningTime.style.animation = 'runningTime 7s linear 1 forwards';
    }

    function showSlider(type) {
        let sliderItemsDom = list.querySelectorAll('.carousel .list .item');
        if (type === 'next') {
            list.appendChild(sliderItemsDom[0]);
            carousel.classList.add('next');
        } else {
            list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
            carousel.classList.add('prev');
        }

        clearTimeout(runTimeOut);

        runTimeOut = setTimeout(() => {
            carousel.classList.remove('next');
            carousel.classList.remove('prev');
        }, timeRunning);

        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            nextBtn.click();
        }, timeAutoNext);

        resetTimeAnimation(); // Reset the running time animation
    }

    // Start the initial animation
    resetTimeAnimation();
});


class LeafletMap {

    constructor(containerId, center, zoom) {
        this.map = L.map(containerId).setView(center, zoom);
        this.initTileLayer();
    }

    initTileLayer() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    addMarker(lat, lng, popupContent) {
        const marker = L.marker([lat, lng]).addTo(this.map);
        marker.bindPopup(popupContent);
    }

    loadMarkersFromJson(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(marker => {
                    const popupContent = this.createPopupContent(marker);
                    this.addMarker(marker.latitude, marker.longitude, popupContent);
                });
            })
            .catch(error => console.error('Error loading markers:', error));
    }

    createPopupContent(marker) {
        return `
            <div>
                <img src="${marker.imageUrl}" alt="Marker Image" style="width:200px;height:160;margin-bottom:5px;">
                <p>${marker.text}</p>
            </div>
        `;
    }
}

const myMap = new LeafletMap('map', [8.360004, 124.868419], 18);

myMap.loadMarkersFromJson('map.json');

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "block";
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function (event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};

//FUNCTION SEARCH BAR
function searchBuilding() {
    const searchQuery = document.getElementById('searchBar').value.trim().toLowerCase();
    const searchResultContainer = document.getElementById('searchResult');
    const allCards = document.querySelectorAll('.card');

    // Clear previous results
    searchResultContainer.innerHTML = "";
    allCards.forEach(card => card.classList.remove('highlight-card'));

    fetch('map.json')
        .then(response => response.json())
        .then(data => {
            const building = data.find(item => item.text.toLowerCase().includes(searchQuery));

            if (building) {
                // Remove previous markers
                myMap.map.eachLayer(layer => {
                    if (layer instanceof L.Marker) {
                        myMap.map.removeLayer(layer);
                    }
                });

                // Add marker and center map
                const popupContent = myMap.createPopupContent(building);
                myMap.addMarker(building.latitude, building.longitude, popupContent);
                myMap.map.setView([building.latitude, building.longitude], 18);

                // Highlight matching card
                const matchingCard = Array.from(allCards).find(card =>
                    card.querySelector('h3').innerText.toLowerCase() === building.text.toLowerCase()
                );

                if (matchingCard) {
                    matchingCard.scrollIntoView({ behavior: "smooth", block: "center" });
                    matchingCard.classList.add('highlight-card');

                    // Display search result
                    searchResultContainer.innerHTML = `
                        <div class="result-card">
                            <img src="${building.imageUrl}" alt="${building.text}" style="width:100%; max-height:200px; object-fit:cover;">
                            <h4>${building.text}</h4>
                            <p>Latitude: ${building.latitude}, Longitude: ${building.longitude}</p>
                        </div>
                    `;
                }
            } else {
                alert("Building not found!");
            }
        })
        .catch(error => console.error('Error loading buildings:', error));
}
