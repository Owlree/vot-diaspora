import * as Leaflet from 'leaflet';
import * as Data from './data';
import * as Elements from './elements';


window.addEventListener('load', async () => {
  const map = Leaflet.map('the-map');

  // Add the tile layer
  Leaflet.tileLayer(Data.TILE_SERVER_URL, {
    updateWhenZooming: false,
    minZoom: 3
  }).addTo(map);

  map.setView(Data.CENTER_OF_THE_WORLD, 6);

  // Prevent the user from dragging outside the bounds
  map.on('drag', function() {
    map.panInsideBounds(Data.GetEarthBounds(), { animate: false });
  });

  // Remove the zoom control (we don't want it)
  map.removeControl(map.zoomControl);

  const markers = await Data.GetMarkers();

  // Bind a popup to each marker
  markers.forEach((marker: Data.Marker) => {
    const html = `<h2>${marker.title}</h2><p>${marker.address}</p>`
    marker.bindPopup(html, { offset: [0, -34] });
  });

  // Removes all markers that are not within bounds, adds those that are
  const updateMarkers = () => {
    markers.forEach((marker: Data.Marker) => {
      if (map.getBounds().contains(marker.getLatLng()) && map.getZoom() >= 6) {
        marker.addTo(map);
      } else {
        marker.removeFrom(map);
      }
    });
  }

  map.on('move', updateMarkers);
  updateMarkers();

  Elements.locateMeButton.addEventListener('click', (() => {

    // We create a marker to indicate the user's position, we use this static
    // reference to make sure there is at most one instance of this marker at
    // any given time
    let marker: Leaflet.Marker | undefined = undefined;
    let geolocation: Leaflet.LatLng | undefined = undefined;

    const GetMarker = () => {
      if (marker === undefined) {
        marker = Leaflet.marker(geolocation, {
          'icon': Leaflet.icon({
            iconUrl: 'geo.png',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          })
        });
        marker.addTo(map);
      }
      return marker;
    }

    return function(ev: MouseEvent) {
      ev.preventDefault();
      if ('geolocation' in window.navigator) {
        window.navigator.geolocation.getCurrentPosition((position) => {
          geolocation = new Leaflet.LatLng(
            position.coords.latitude, position.coords.longitude);
          map.setView(geolocation, Math.max(16, map.getZoom()));
          GetMarker().setLatLng(geolocation);
        });
      } else {
        // TODO(owlree) Treat geolocation unavailable here
      }
    }
  })());

  Elements.searchFormElement.addEventListener('submit', async (ev: Event) => {
    ev.preventDefault();
    const query: string = Elements.searchInputElement.value.trim();

    // Ignore short queries
    if (query.length < 3) return;

    // Geocode the query
    const results = await Data.Geocode(query);
    for (const result of results) {
      map.fitBounds(result.bounds);
      Elements.searchInputElement.value = result.label;
      break;
    }
  });
});
