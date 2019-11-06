import * as Leaflet from 'leaflet';
import * as HereMaps from './here-maps';


/**
 * Schema of data coming from the server
 */
interface StationPrimitive {
  numbers: number[],
  address: string,
  country: string,
  description?: string,
  latLng: [number, number],
  id: number
}

interface Data {
  locations: Array<StationPrimitive>
}

export class Marker extends Leaflet.Marker {
  public readonly numbers: number[] = Array<number>();
  public readonly address: string;
  public readonly country: string;
  public readonly description?: string;

  constructor(location: StationPrimitive, options?: Leaflet.MarkerOptions) {
    super(location.latLng, options);
    this.numbers = location.numbers.sort();
    this.address = location.address;
    this.country = location.country;
    this.description = location.description;
    this.options.title = this.title;
  }

  get title(): string {
    if (this.numbers.length === 1) {
      return `Secția de votare ${this.numbers[0]}`
    } else if (this.numbers.length > 1) {
      const s = this.numbers.slice(0, this.numbers.length - 1).join(', ');
      return `Secțiile de votare ${s} și ${this.numbers[this.numbers.length - 1]}`;
    } else {
      return '';
    }
  }
}

/**
 * Returns a promise that resolves to an array of markers representing all
 * polling stations in diaspora.
 *
 * @returns A promise that resolves to all stations in diaspora
 */
export async function GetMarkers() {
  return new Promise<Array<Marker>>((resolve, reject) => {

    // Get the data
    const http = new XMLHttpRequest();
    const url='/data.json';
    http.open('GET', url);
    http.send();

    http.addEventListener('load', function() {
      const { locations } = JSON.parse(this.responseText) as Data;
      const markers: Array<Marker> = Array<Marker>();

      const icon: Leaflet.Icon = Leaflet.icon({
        iconUrl: 'marker.png',
        iconSize: [20, 39],
        iconAnchor: [10, 39],
        className: 'code4-map-marker'
      });

      locations.forEach((location: StationPrimitive) => {
        markers.push(new Marker(location, { icon: icon }));
      })
      resolve(markers);
    });

    http.addEventListener('error', function() {
      // TODO(owlree) Pass error here
      reject();
    });
  });
}


/**
 * Returns a LatLngBoundsExpression representing the bounds of an
 * equirectangular projection of an Earth globe.
 *
 * @returns {Leaflet.LatLngBoundsExpression} The bounds
 */
export function GetEarthBounds(): Leaflet.LatLngBoundsExpression {
  return Leaflet.latLngBounds([-90, -180], [90, 180]);
}

export const CENTER_OF_THE_WORLD: Leaflet.LatLng = new Leaflet.LatLng(48, 12);
export const TILE_SERVER_URL: string =
  'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}@2x.png?lang=ro';

/**
 * Calls our Here Maps SDK to obtain coordinates of address
 */
export async function Geocode(query: string): Promise<Array<HereMaps.Result>> {
  return new Promise<Array<HereMaps.Result>>((resolve, reject) => {
    HereMaps.Geocode(query).then((results: Array<HereMaps.Result>) => {
      resolve(results);
    }).catch((error) => {
      reject(error);
    });
  });
}
