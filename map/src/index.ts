import * as L from 'leaflet';
import { locations, Location, MakeHtml, MakeTitle, Search, GetClosest } from './locations';
import * as Lflth from './lflth';
import * as Webh from './webh';
import * as Elements from './elements';


const prefix: string = '/';
const earthBounds: L.LatLngBounds = L.latLngBounds([-90, -180], [90, 180]);
const tileServerUrl: string =
  'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}@2x.png?lang=ro';

/**
 * Refreshes all the markers in the map based on the zoom level.
 *
 * @param {L.Map} The map to update.
 */
const RefreshAllMarkers = (() => {

  let previousZoomFloor: number = -1;

  const RefreshAllMarkers = (map: L.Map) => {

    const zoom: number = map.getZoom();

    // The floor of the zoom in the only meaningful change for us
    if (previousZoomFloor === Math.floor(zoom)) { return; }

    previousZoomFloor = Math.floor(zoom);

    for (const key in markers) {
      const marker: L.Marker = markers[key];
      if (marker.getPopup().isOpen()) {
        marker.setIcon(Lflth.GetCloseIcon());
      } else {
        marker.setIcon(Lflth.GetIconForZoomLevel(map.getZoom()));
      }
    }
  }

  return RefreshAllMarkers;
})();

// Setup the Leaflet.js map
const map = L.map('map', {
  zoomSnap: 0,
  attributionControl: false, // We add our own attribution
  maxBounds: earthBounds
});

// Add a tile layers
L.tileLayer(tileServerUrl, {
  updateWhenZooming: false,
  minZoom: 3
}).addTo(map);

// Do not allow the user to scroll ourside the bounds
map.on('drag', function() {
    map.panInsideBounds(earthBounds, { animate: false });
});

// Set initial center and zoom
map.setView([48, 12], 5);

// Remove the zoom control (we don't want it)
map.removeControl(map.zoomControl);

// Add a custom attribution control
{
  const attributionControl = new L.Control.Attribution({
    position: 'topright'
  });

  attributionControl.addAttribution(
    '<a href=\'https://code4.ro/\'>Code for Romania</a>');

  map.addControl(attributionControl);
}

let geolocation: L.LatLngExpression | undefined = undefined;

// Add all markers to the map
let markers: {[id: number]: L.Marker} = {};
for (const location of locations) {
  const id = location.id;
  markers[id] = L.marker(location.latLng, {
    'title': MakeTitle(location),
    'icon': Lflth.GetIconForZoomLevel(14)
  }).bindPopup(MakeHtml(location), {
      offset: [0, -34]
  }).addTo(map).on('click', (e: L.LeafletEvent) => {

    // Push a state linking to the selected marker
    window.history.pushState(
      {id: id}, '', `${prefix}?id=${id}`);

    // Change the title of the doc to reflect the marker selection
    document.title = `Harta Vot Diaspora—${MakeTitle(location)}`;

    // Zoom in on the marker if the the zoom is small enough
    if (map.getZoom() <= 8) {

      // Prevent the popup from opening (will open it after zooming in)
      e.target.closePopup();

      // Zoom it to the location
      map.flyTo(location.latLng, 8.0000001);

      // Delay popup opening for when the zoom ends
      const f = () => { e.target.openPopup(); map.off('zoomend', f); };
      map.on('zoomend', f);
    } else {
      e.target.openPopup();
    }
  }).on('popupclose', (e: L.LeafletEvent) => {

    // On a marker which has its popup opened, we prevent it from using the
    // circle view even when zoomed out. When the popup closes, we refresh the
    // icon, so that it switches to the circle view if needed.
    e.target.setIcon(Lflth.GetIconForZoomLevel(map.getZoom()));
  });
}

// Move to a marker specified in the url parameters (if any)
{
  const urlVariables = Webh.GetUrlVars();
  if ('id' in urlVariables) {
    const id: number = parseInt(urlVariables.id);
    if (id in markers) {
      map.setView(markers[id].getLatLng(), 8.0000001, {
        animate: false
      });
      markers[id].openPopup();
    }
  } else {
    map.closePopup();
  }
}

// Update markers appearance based on zoom level
{
  map.on('zoomend', () => {RefreshAllMarkers(map)});
  RefreshAllMarkers(map);
}


Elements.locateMeButton.addEventListener('click', (() => {

  // We create a marker to indicate the user's position, we use this static
  // reference to make sure there is at most one instance of this marker at any
  // given time
  let marker: L.Marker | undefined = undefined;

  const GetMarker = () => {
    if (marker === undefined) {
      marker = L.marker(geolocation, {
        'icon': L.icon({
          iconUrl: 'geo.png',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })
      });
      marker.addTo(map);
    }
    return marker;
  }

  return function() {
    if ('geolocation' in window.navigator) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        geolocation = {
          lat: position.coords.latitude, 
          lng: position.coords.longitude
        };
        map.setView(geolocation, Math.max(16, map.getZoom()));
        GetMarker().setLatLng(geolocation);
        refreshAutocomplete();
        if (Elements.searchInputElement.value.length === 0) {
          Elements.suggestionsElement.hidden = false;
        }
      });
    } else {
      // TODO(owlree) Treat geolocation unavailable here
    }
  }
})());

const refreshAutocomplete = (() => {
  let currentValue: string = Elements.searchInputElement.value.toLowerCase();
  return () => {
    const value = Elements.searchInputElement.value.toLowerCase();

    // Display the clear button if field is not empty
    Elements.searchClearBtnElement.hidden = (value.trim().length === 0);

    let results: Array<Location> = [];
    let bounds: Array<L.LatLngExpression> = [];

    if (value.length === 0) {
      results = GetClosest(geolocation, map, 5);
    } else if (value.length === 1) {
      results = [];
    } else {
      if (value === currentValue) return;
      currentValue = value;
      results = Search(currentValue);
    }

    if (value.length === 0) {
      bounds.push(geolocation);
    }

    Elements.suggestionsElement.innerHTML = '';
    for (const location of results) {
      const element: HTMLElement = document.createElement('li');
      element.innerHTML = MakeHtml(location);
      element.className = 'with-hover';
      Elements.suggestionsElement.appendChild(element);

      element.addEventListener('click', () => {

        Elements.suggestionsElement.hidden = true;

        // Clicking a search result is the same as clicking the marker itself
        markers[location.id].fire('click');

        const toBounds = bounds.concat([
          [location.latLng.lat, location.latLng.lng]
        ]) as L.LatLngBoundsLiteral;

        // Center the marker on map
        map.flyToBounds(toBounds, { animate: false });
        map.setZoom(map.getZoom() - 1, { animate: true });
      });

      // A bit hackish (since Leaflet does not expose its HTML elements),
      // but nice effect
      element.addEventListener('mouseenter', () => {
        // @ts-ignore
        markers[location.id]._icon.style.filter = 'brightness(1.5)';
      });
      element.addEventListener('mouseleave', () => {
        // @ts-ignore
        markers[location.id]._icon.style.filter = ''; 
      })
    }
  }
})();

Elements.searchInputElement.addEventListener('focus', () => {
  Elements.suggestionsElement.hidden = false;
});

Elements.mapElement.addEventListener('click', () => {
  Elements.suggestionsElement.hidden = true;
});

// Bind the update method to relevant events
Elements.searchInputElement.addEventListener('keyup', refreshAutocomplete);
Elements.searchInputElement.addEventListener('change', refreshAutocomplete);
Elements.searchInputElement.addEventListener('focus', refreshAutocomplete);

// Add functionality to the 'clear' button
Elements.searchClearBtnElement.addEventListener('click', () => {
  Elements.searchInputElement.value = '';
  Elements.searchInputElement.dispatchEvent(new Event('change'));
});

map.on('click', () => {
  // Push a state linking to root
  if (document.title !== 'Harta Vot Diaspora') {
    window.history.pushState({}, '', `${prefix}`);
    document.title = `Harta Vot Diaspora`;
  }
});

window.addEventListener('popstate', (event: PopStateEvent) => {
  if ('id' in event.state) {
    markers[event.state.id].openPopup();
  } else {
    map.closePopup();
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'Slash') {
    Elements.searchInputElement.focus();
  }
});