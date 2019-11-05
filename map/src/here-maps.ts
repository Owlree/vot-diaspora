import * as Leaflet from 'leaflet';

const APP_ID = 'Q5uIy4IiCbHhfRyP3OX3';
const APP_CODE = '-axcbN41fdFRDa5l21E44g';

export interface Result {
  latLng: Leaflet.LatLng,
  bounds: Leaflet.LatLngBounds,
  label: string
}

export async function Geocode(query: string): Promise<Array<Result>> {
  const params: Map<string, string> = new Map<string, string>([
    ['app_id', APP_ID],
    ['app_code', APP_CODE],
    ['searchText', query]
  ]);

  const paramsList: Array<string> = [];
  params.forEach((v, k) => {
    paramsList.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
  });
  const urlParams: string = paramsList.join('&');

  const url: string =
    `https://geocoder.api.here.com/6.2/geocode.json?${urlParams}`;

  const http = new XMLHttpRequest();
  http.open('GET', url);
  http.send();

  return new Promise<Array<Result>>((resolve, reject) => {
    http.addEventListener('load', function() {
      const response = JSON.parse(this.responseText);
      let results: Array<Result> = [];
      if ('Response' in response) {
        if ('View' in response.Response) {
          for (const view of response.Response.View) {
            if ('Result' in view) {
              for (const result of view.Result) {
                results.push({
                  latLng: new Leaflet.LatLng(
                    result.Location.NavigationPosition[0].Latitude,
                    result.Location.NavigationPosition[0].Longitude),
                  bounds: new Leaflet.LatLngBounds([[
                    result.Location.MapView.BottomRight.Latitude,
                    result.Location.MapView.BottomRight.Longitude
                  ], [
                    result.Location.MapView.TopLeft.Latitude,
                    result.Location.MapView.TopLeft.Longitude
                  ]]),
                  label: result.Location.Address.Label
                });
              }
            }
          }
        }
      }
      resolve(results);
    });

    http.addEventListener('error', function() {
      // TODO(owlree) Pass error here
      reject();
    });
  })
}
