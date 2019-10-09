import * as L from 'leaflet';
import { locations } from './locations';

/**
 * Converts a value from degrees to radians.
 *
 * @param {number} value in degrees
 * @return {number} same value converted to radians
 */
function ToRadians(degrees: number) {
    return degrees * Math.PI / 180;
}

/**
 * Computes the distance between two locations on a sphere using the
 * harvesine formula.
 *
 * https://en.wikipedia.org/wiki/Haversine_formula
 *
 * @param {[number, number]} [lat1, lng1] [latitude of the first location,
 *                           longitude of the first location]
 * @param {[number, number]} [lat2, lng2] [latitude of the second location,
 *                           longitude of the second location]
 * @return {number} Great circle distance between the two locations
 */
function GetGreatCircleDistance(
  [lat1, lng1]: [number, number], [lat2, lng2]: [number, number]) {
  const φ1: number = ToRadians(lat1);
  const φ2: number = ToRadians(lat2);

  const Δφ: number = ToRadians(lat2 - lat1);
  const Δλ: number = ToRadians(lng2 - lng1);

  // Harvesine formula
  const h:number = Math.pow(Math.sin(Δφ / 2), 2) +
                   Math.cos(φ1) * Math.cos(φ2) *
                   Math.pow(Math.sin(Δλ/2), 2);

  // Solve for distance
  const d: number = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));

  return d;
}

/**
 * Moves the map to the given coordinates.
 *
 * Instantly teleports if the distance is too great, flies otherwise.
 *
 * @param {[]} latlng Coordinates of the new location
 * @param {number} zoom  The zoom to use for the new location
 */
function FlyOrTeleportToCoordinates(
  [lat, lng]: [number, number], zoom: number, threshold: number = 0.02) {
  const center_coords: [number, number] =
    [map.getCenter().lat, map.getCenter().lng];
  const d = GetGreatCircleDistance(center_coords, [lat, lng]);
  if (d < threshold) {
    map.flyTo([lat, lng], zoom);
  } else {
    map.setView([lat, lng], zoom);
  }
}

function GetIconForZoomLevel(zoomLevel: number) {

    if (zoomLevel > 8) {
        return L.icon({
            iconUrl: 'marker.png',
            iconSize: [20, 39],
            iconAnchor: [10, 39],
            className: 'code4-map-marker'
        });
    } else {
        return L.divIcon({
            className: `code4-map-circle-icon code4-map-circle-icon-border-${Math.floor(zoomLevel)}`,
            iconSize: L.point(1.5 * zoomLevel, 1.5 * zoomLevel)
        });;
    }
}

/**
 * Refreshes all the markers in the map based on the zoom level.
 *
 * @param {L.Map} The map to update.
 *
 */
function RefreshAllMarkersInMap(map: L.Map) {
  map.eachLayer(function (layer: L.Layer) {
    if (layer instanceof L.Marker) {
      if (!layer.getPopup().isOpen()) {
        return layer.setIcon(GetIconForZoomLevel(map.getZoom()));
      }
    }
    return layer;
  });
}

let markers: {[id: number]: L.Marker} = {};

const tileServerUrl =
    'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}@2x.png?lang=ro';

// Setup the Leaflet.js map
const map = L.map('map', {
  zoomSnap: 0
});

// Set initial center and zoom
map.setView([48, 12], 5);

// Remove the zoom control, as we don't want one
map.removeControl(map.zoomControl);

// Add a tile layers
L.tileLayer(tileServerUrl, {
  updateWhenZooming: false
}).addTo(map);

// Add all markers to the map
for (const location of locations.markers) {
  markers[location.id] = L.marker([location.lat, location.lng], {
    'title': location.title,
    'icon': GetIconForZoomLevel(14)
  }).bindPopup(
    `
      <h2>${location.title}</h2>
      <p>${location.adr}, ${location.country}</p>
    `, {
    offset: [0, -34]
  }).addTo(map).on('click', (e: L.LeafletEvent) => {
    // Zoom in on the marker if the the zoom is small enough
    if (map.getZoom() <= 8) {
      e.target.closePopup();
      map.flyTo([location.lat, location.lng], 8.0000001);
      const f = () => {
        e.target.openPopup();
        map.off('zoomend', f);
      };
      // Open popup when we're done zooming
      map.on('zoomend', f);
    }
  }).on('popupclose', (e: L.LeafletEvent) => {
    e.target.setIcon(GetIconForZoomLevel(map.getZoom()));
  });
}

map.on('zoomend', () => {RefreshAllMarkersInMap(map)});
RefreshAllMarkersInMap(map); // Update markers once

// Get references to the relevant HTML elements on page
const searchInputElement: HTMLInputElement =
  document.getElementById('search-input') as HTMLInputElement;
const searchClearBtnElement: HTMLButtonElement =
  document.getElementById('search-clear-btn') as HTMLButtonElement;
const suggestionsElement: HTMLElement = document.getElementById('suggestions');

const { update } = new class {
  value: string = searchInputElement.value;
  update = () => {
    const value = searchInputElement.value.toLowerCase();

    // Do not update suggestions if value did not change
    if (value === this.value) { return; }
    this.value = value.toLowerCase();

    // Reset the suggestions
    suggestionsElement.innerHTML = '';
    suggestionsElement.hidden = true;

    // Display the clear button if field is not empty
    searchClearBtnElement.hidden = (value.length === 0);

    // Do not provide suggstions for strings that are too short
    if (value.length <= 1) { return; }

    for (const location of locations.markers) {
      const fullString = `${location.title}, ${location.adr}, ${location.country}`;
      if (fullString.toLowerCase().indexOf(value) >= 0) {

        const element = document.createElement('li');
        element.innerText = fullString;
        suggestionsElement.appendChild(element);
        suggestionsElement.hidden = false;

        element.addEventListener('click', () => {

          // Insert the name in the search input
          searchInputElement.value = element.innerText;

          // Move to selected suggestion
          FlyOrTeleportToCoordinates([location.lat, location.lng], 14);

          // Open the popup of the selected marker
          markers[location.id].openPopup();

          // Reveal the map
          suggestionsElement.hidden = true;
        });
      }
    }
  }
};

// Bind the update method to relevant events
searchInputElement.addEventListener('keyup', update);
searchInputElement.addEventListener('change', update);
searchInputElement.addEventListener('focus', update);

// Add functionality to the 'clear' button
searchClearBtnElement.addEventListener('click', () => {
  searchInputElement.value = '';
  searchInputElement.dispatchEvent(new Event('change'));
});
