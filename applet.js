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
                <img src="${marker.imageUrl}" alt="Marker Image" style="width:100px;height:auto;margin-bottom:5px;">
                <p>${marker.text}</p>
                <button onclick="alert('Button clicked for marker: ${marker.text}')">Click Me</button>
            </div>
        `;
    }
}

const myMap = new LeafletMap('map', [8.360004, 124.868419], 18);

myMap.loadMarkersFromJson('map.json');


/*// Panorama setup for campus virtual tour
function initializePanorama() {
    pannellum.viewer('panorama-view', {
        type: 'equirectangular',
        panorama: 'https://your-image-url-here.com/campus-tour.jpg', // Replace with the actual panorama image URL
        autoLoad: true,
        compass: true,
        showZoomCtrl: true,
        autoRotate: -2,
        pitch: 10,
        yaw: 180,
        hfov: 110,
        title: 'Northern Bukidnon State College Virtual Tour',
        author: 'Virtual Tour',
        hotSpots: [
            {
                pitch: 5,
                yaw: 90,
                type: 'info',
                text: 'CSS Building',
                URL: 'https://example.com/css-building'
            },
            {
                pitch: -10,
                yaw: 210,
                type: 'info',
                text: 'GEC Building',
                URL: 'https://example.com/gec-building'
            },
            {
                pitch: 0,
                yaw: 45,
                type: 'info',
                text: 'TEP Building',
                URL: 'https://example.com/tep-building'
            },
            {
                pitch: -5,
                yaw: 270,
                type: 'info',
                text: 'BSBA Building',
                URL: 'https://example.com/bsba-building'
            },
            {
                pitch: -2,
                yaw: 150,
                type: 'info',
                text: 'Admin Building',
                URL: 'https://example.com/admin-building'
            },
            {
                pitch: 2,
                yaw: 0,
                type: 'info',
                text: 'Covered Court',
                URL: 'https://example.com/covered-court'
            }
        ]
    });
}

window.onload = initializePanorama;
 */