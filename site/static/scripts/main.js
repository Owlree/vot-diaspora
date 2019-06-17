/**
 * Converts a value from degrees to radians.
 *
 * @param {number} value in degrees
 * @return {number} same value converted to radians
 */
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

/**
 * Computes the distance between two locations on Earth using the
 * harvesine formula.
 *
 * https://en.wikipedia.org/wiki/Haversine_formula
 *
 * @param {number} latitude of the first location
 * @param {number} longitude of the first location
 * @param {number} latitude of the second location
 * @param {number} longitude of the second location
 * @return {number} distance between the locations
 */
function getEarthDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters

    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);

    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    // Harvesine
    const h = Math.pow(Math.sin(Δφ / 2), 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.pow(Math.sin(Δλ/2), 2);

    // Solve for distance
    const d = 2 * R * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));

    return d
}

// Create a marker icon to be used when zoomed in
var markerIcon = L.icon({
    iconUrl: 'marker.png',
    iconSize: [20, 39],
    iconAnchor: [10, 39]
});

function goToLocation(index) {
    map.setView(locations[index].Coordinates, 10);
    locations[index].Marker.openPopup();
}

function getNativeURL(id, locations) {
    let location = null;
    for (l of locations) {
        if (l.Number == id) {
            location = l;
            break;
        }
    }
    if (!location) return;
    if ((navigator.platform.indexOf("iPhone") != -1) ||
        (navigator.platform.indexOf("iPad")   != -1) ||
        (navigator.platform.indexOf("iPod")   != -1) ||
        (navigator.platform.indexOf("Mac")    != -1)) {
        if (location.AppleURL) {
            return location.AppleURL;
        }
    }
    return location.GoogleURL;
}

function GetIconForZoomLevel(zoomLevel) {
    console.log(zoomLevel);
    if (zoomLevel > 7) {
        return markerIcon;
    } else {
        return L.divIcon({
            className: 'code4-map-circle-icon',
            iconSize: L.point(2 * zoomLevel, 2 * zoomLevel)
        });
    }
}

function UpdateMarkers(map) {
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            return layer.setIcon(GetIconForZoomLevel(map.getZoom()));
        }
    });
}

function main() {
    
    // Remove all paragraphs that only contain spaces (there is a bug in
    // Hugo that adds some of these).
    for (const p of document.getElementsByTagName('p')) {
        if (p.innerHTML.replace(/\s/g, '').length === 0){
            p.style.display = 'none';
        }
    }
    
    const initialZoomLevel = 3;
    
    const theMap = document.getElementById('theMap');
    var map = L.map('theMap').setView(
        [48.355045, 16.230324], initialZoomLevel);
    
    // L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.svg?lang=ro', {
    // TODO(owlree) Move these to a JSON
    const mapAttribution =
        '<a href="https://www.openstreetmap.org/copyright">' +
            'OpenStreetMap'                                  +
        '</a>'                                               +
        ' | '                                                +
        '<a href="https://www.mae.ro/sites/default/files/file/anul_2019/2019_pdf/2019.04.25_lista_sectiilor_de_votare_din_strainatate_la_alegerile_pentru_parlamentul_european_din_2019.pdf">' +
            'Sursa datelor MAE'                              +
        '</a>';
    
    // Initialize the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: mapAttribution,
        fullScreenControl: true,
        zoomControl: false
    }).addTo(map);
    
    let locations = [];

    // Get the JSON with locations
    fetch('data2.json')
        .then(res => res.json())
        .then((out) => {
            locations = out.places;
            for (const location of locations) {
                let coordinates = location.Coordinates;
                coordinates[0] = parseFloat(coordinates[0]);
                coordinates[1] = parseFloat(coordinates[1]);
                let street = location['Street'];
                if (location['StNo'] && location['StNo'].length > 0) {
                    street = location['StNo'] + ' ' + street;
                }
                let messageHtml =
                    '<h1 style="margin:0">Secția de votare nr. ' + location.Number + '</h1><hr>' +
                    '<h2 style="margin:0">' + location.Name + '</h2>' +
                    '<p style="margin:0"><a href="' + getNativeURL(location.Number, locations) + '">' + street + '</a></p>';
    
                if (location.Phone) {
                    messageHtml += '<p style="margin:0">Telefon <a href="tel:' + location.Phone + '">' + location.Phone + '</a></p>';
                }
                if (location.Website) {
                    messageHtml += '<p style="margin:0"><a href="' + location.Website + '">' + location.Website + '</a></p>'
                }
                const marker = L.marker(coordinates, {
                    'title': location.Name,
                    'icon': GetIconForZoomLevel(initialZoomLevel)
                }).bindPopup(messageHtml, {
                    offset: [0, -34]
                });
                location.Marker = marker;
                marker.addTo(map);
            }
        }).catch(err => console.error(err));
        
    
    let theLocateButton = document.getElementById('the-locate-button');
    theLocateButton.addEventListener('mouseup', function(e) {
    
        // Get user's current geolocation
        navigator.geolocation.getCurrentPosition(function(position) {
    
            // let myLat = position.coords.latitude;
            // let myLon = position.coords.longitude;
    
            let myLat = 51.505;
            let myLon = -0.09;
    
            // Sort locations by distance to user
            locations = locations.sort(function(l1, l2) {
                let lat1 = l1.Coordinates[0];
                let lon1 = l1.Coordinates[1];
                let lat2 = l2.Coordinates[0];
                let lon2 = l2.Coordinates[1];
                let d1 = getEarthDistance(myLat, myLon, lat1, lon1);
                let d2 = getEarthDistance(myLat, myLon, lat2, lon2);
                return d1 - d2;
            });
    
            const theLocations = document.getElementById('theLocations');
            let ht = '<ol>';
            let closestMarkers = [];
            for (let i = 0; i < 6; ++i) {
                closestMarkers.push(locations[i].Marker);
                ht += '<li onclick="goToLocation(' + i + ')"><h1>' + locations[i].Name + '</h1>';
            }
            ht += '</ol>';
            theLocations.innerHTML = ht;
    
            var group = new L.featureGroup(closestMarkers);
            map.fitBounds(group.getBounds(), {
                'duration': 0
            });
        });
    });
    
    map.on('zoomend', () => {UpdateMarkers(map)});
    UpdateMarkers(map); // Update markers once
}

main();
