import * as MathHelpers from './math-helpers.js';
import * as HTMLComponents from './html-components.js';

function goToLocation(index) {
    map.setView(locations[index].Coordinates, 10);
    locations[index].Marker.openPopup();
}

/**
 * Returns the appropiate maps URL based on the platform.
 * 
 * We use direct URLs instead of coordinates to have the user pointed directly 
 * to, say, the 'Romanian Embassy in Washington', instead of just some 
 * apparently random numbers.
 */
function GetNativeURLFromLocation(location) {
    /* global navigator */
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

/**
 * Returns a Leaflet icon based on a zoom level value.
 * 
 * We use this to make the marker a small dot when the user zoomed our far 
 * enough.
 * 
 * @param {number} The zoom leve value to use
 * @return {L.Icon} The icon to be used for our markers
 */
function GetIconForZoomLevel(zoomLevel) {
    
    /* global L */
    if (zoomLevel > 8) {
        return L.icon({
            iconUrl: 'marker.png',
            iconSize: [20, 39],
            iconAnchor: [10, 39]
        });
    } else {
        return L.divIcon({
            className: 'code4-map-circle-icon',
            iconSize: L.point(2 * zoomLevel, 2 * zoomLevel)
        });
    }
}

/**
 * Refreshes all the markers in the map based on the zoom level.
 * 
 * @param {L.Map} The map to update.
 * 
 */
function RefreshAllMarkersInMap(map) {
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
    /* global fetch */
    fetch('data2.json')
        .then(res => res.json())
        .then((out) => {
            locations = out.places;
            let markers = [];
            for (const location of locations) {
                let coordinates = location.Coordinates;
                coordinates[0] = parseFloat(coordinates[0]);
                coordinates[1] = parseFloat(coordinates[1]);
                let address = location['Street'];
                if (location['StNo'] && location['StNo'].length > 0) {
                    address = location['StNo'] + ' ' + address;
                }
                let messageHtml = HTMLComponents.GetPopupMessageHTML({
                    id: location.Number,
                    name: location.Name,
                    url: GetNativeURLFromLocation(location),
                    address: address,
                    website: location.Website,
                    phone: location.Phone
                });
                
                const marker = L.marker(coordinates, {
                    'title': location.Name,
                    'icon': GetIconForZoomLevel(initialZoomLevel)
                }).bindPopup(messageHtml, {
                    offset: [0, -34]
                });
                location.Marker = marker;
                markers.push(marker);
            }
            L.layerGroup(markers).addTo(map);
            console.log(locations);
        }).catch(err => console.error(err));


    let theLocateButton = document.getElementById('the-locate-button');
    theLocateButton.addEventListener('mouseup', function(e) {

        // Retrieve user's current geolocation
        navigator.geolocation.getCurrentPosition(function(position) {

            let myLat = position.coords.latitude;
            let myLon = position.coords.longitude;

            // Sort locations by distance to user's location
            locations = locations.sort(function(l1, l2) {
                const lat1 = l1.Coordinates[0];
                const lon1 = l1.Coordinates[1];
                const lat2 = l2.Coordinates[0];
                const lon2 = l2.Coordinates[1];
                const d1 = MathHelpers.GetGreatCircleDistance(
                    myLat, myLon, lat1, lon1);
                let d2 = MathHelpers.GetGreatCircleDistance(
                    myLat, myLon, lat2, lon2);
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

    map.on('zoomend', () => {RefreshAllMarkersInMap(map)});
    RefreshAllMarkersInMap(map); // Update markers once
}

main();
