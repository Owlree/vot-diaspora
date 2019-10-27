import * as L from 'leaflet';


export function GetCloseIcon() {
  return L.icon({
    iconUrl: 'marker.png',
    iconSize: [20, 39],
    iconAnchor: [10, 39],
    className: 'code4-map-marker'
  });
}

export function GetFarIcon(zoomLevel: number) {
  return L.divIcon({
    className: `
      code4-map-circle-icon
      code4-map-circle-icon-border-${Math.floor(zoomLevel)}`,
    iconSize: L.point(1.5 * zoomLevel, 1.5 * zoomLevel)
  });;
}

export function GetIconForZoomLevel(zoomLevel: number) {
  if (zoomLevel > 8) {
    return GetCloseIcon();
  } else {
    return GetFarIcon(zoomLevel);
  }
}
