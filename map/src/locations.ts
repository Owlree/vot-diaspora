import * as L from 'leaflet';

export interface Location {
  numbers: number[],
  address: string,
  country: string,
  description?: string,
  latLng: L.LatLngLiteral,
  id: number
}

export function MakeTitle(location: Location): string {
  if (location.numbers.length === 1) {
    return `Secția de votare nr. ${location.numbers[0]}`;
  } else {
    return `Secțiile de votare nr. ${location.numbers.join(' și ')}`;
  }
}

export function MakeHtml(location: Location): string {
  let html = '';
  html += `<h2>${MakeTitle(location)}</h2>`
  html += `<p>${location.address}, ${location.country}</p>`
  return html;
}

export function Search(s: string): Array<Location> {
  const results: Array<Location> = [];
  for (const location of locations) {
    const fullString = `${
      MakeTitle(location)
    }, ${
      location.address
    }, ${
      location.country
    }`;
    if (fullString.toLowerCase().indexOf(s) >= 0) {
      results.push(location);
    }
  }
  return results;
}

export function GetClosest(
  reference: L.LatLngExpression,
  map: L.Map,
  limit: number = Infinity): Array<Location> {

  const byDistance = [];
  for (const location of locations) {
    const distance: number = map.distance(reference, [
        location.latLng.lat, location.latLng.lng]);
    byDistance.push({
      distance: distance,
      location: location
    });
  }
  byDistance.sort((a, b) => {
    return a.distance - b.distance;
  });

  const results: Array<Location> = [];

  for (let i = 0; i < Math.min(limit, byDistance.length); ++i) {
    const location = byDistance[i].location;
    results.push(location);
  }

  return results;
}

export const locations: Location[] = [
   {
      "numbers":[
         245,
         246
      ],
      "address":"Str. Grigore Ureche nr. 2, Chişinău",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":47.022021,
         "lng":28.853491
      },
      "id":0
   },
   {
      "numbers":[
         333
      ],
      "address":"Str. Venezia, nr. 50, cod poștal 74121,Taranto",
      "country":"Italia",
      "latLng":{
         "lat":40.464742,
         "lng":17.27157
      },
      "id":1
   },
   {
      "numbers":[
         655
      ],
      "address":"Plaza Mayor, s/n, Salon de Plenos, 28690 Brunete",
      "country":"Spania",
      "latLng":{
         "lat":40.405571,
         "lng":-3.997774
      },
      "id":2
   },
   {
      "numbers":[
         595
      ],
      "address":"Foleshill Community Centre, 757 Foleshill Road, Coventry CV6 5HS",
      "country":"Marea Britanie",
      "latLng":{
         "lat":52.26366,
         "lng":-1.294369
      },
      "id":3
   },
   {
      "numbers":[
         605
      ],
      "address":"18 Holyrood Park Road, Edinburgh EH16 5AY",
      "country":"Marea Britanie",
      "latLng":{
         "lat":55.9401,
         "lng":-3.1711
      },
      "id":4
   },
   {
      "numbers":[
         211
      ],
      "address":"Frauenhäusleweg 1a, 76187 Karlsruhe",
      "country":"Germania",
      "latLng":{
         "lat":49.037603,
         "lng":8.329525
      },
      "id":5
   },
   {
      "numbers":[
         336
      ],
      "address":"Str. Roberto Caruso, nr. 1, cod poștal 87100, Cosenza",
      "country":"Italia",
      "latLng":{
         "lat":39.291358,
         "lng":16.25457
      },
      "id":6
   },
   {
      "numbers":[
         779
      ],
      "address":"110 W Liberty Street, Plymouth, MI 48170",
      "country":"Sua",
      "latLng":{
         "lat":42.22472,
         "lng":-83.27398
      },
      "id":7
   },
   {
      "numbers":[
         782
      ],
      "address":"6420 Marmaduke Ave, St. Louis, MO 63130",
      "country":"Sua",
      "latLng":{
         "lat":38.3638,
         "lng":-90.17462
      },
      "id":8
   },
   {
      "numbers":[
         328
      ],
      "address":"Localita San Graziano, Valeggio sul Mincio",
      "country":"Italia",
      "latLng":{
         "lat":45.359062,
         "lng":10.738835
      },
      "id":9
   },
   {
      "numbers":[
         316
      ],
      "address":"Via Terraglio, 140, Treviso",
      "country":"Italia",
      "latLng":{
         "lat":45.648073,
         "lng":12.241035
      },
      "id":10
   },
   {
      "numbers":[
         300
      ],
      "address":"Centro Sociale Polivalente \"Sacrario\" - Piazza Dei Caduti N. 19, 01100 Viterbo, Lazio",
      "country":"Italia",
      "latLng":{
         "lat":42.4188,
         "lng":12.10438
      },
      "id":11
   },
   {
      "numbers":[
         313
      ],
      "address":"Piazza Della Motta, 4C, Pordenone",
      "country":"Italia",
      "latLng":{
         "lat":45.956259,
         "lng":12.661753
      },
      "id":12
   },
   {
      "numbers":[
         299
      ],
      "address":"Piazza San Giovanni Paolo II, N. 1 05100, Terni",
      "country":"Italia",
      "latLng":{
         "lat":42.571747,
         "lng":12.670526
      },
      "id":13
   },
   {
      "numbers":[
         298
      ],
      "address":"Centro Polivalente Mons. Gustavo Britti - Via Rio Sparto, 80, 65129 Pescara",
      "country":"Italia",
      "latLng":{
         "lat":42.448136,
         "lng":14.213856
      },
      "id":14
   },
   {
      "numbers":[
         297
      ],
      "address":"Via A. Diaz, N. 150, 06128 Perugia",
      "country":"Italia",
      "latLng":{
         "lat":43.10034,
         "lng":12.37187
      },
      "id":15
   },
   {
      "numbers":[
         786
      ],
      "address":"14871 Bancroft Avenue, San Leandro, CA 94578",
      "country":"Sua",
      "latLng":{
         "lat":37.708474,
         "lng":-122.1307
      },
      "id":16
   },
   {
      "numbers":[
         296
      ],
      "address":"Via Macerata, N.9, 07026 Olbia",
      "country":"Italia",
      "latLng":{
         "lat":40.912256,
         "lng":9.510808
      },
      "id":17
   },
   {
      "numbers":[
         332
      ],
      "address":"Str. Matera, nr. 2, cod poștal 73100, Lecce (Centro Sociale Stadio)",
      "country":"Italia",
      "latLng":{
         "lat":40.3569,
         "lng":18.201098
      },
      "id":18
   },
   {
      "numbers":[
         752
      ],
      "address":"Hogar del Jubilado, Avenida Akra Leuke s/n, Peñiscola CP 12598",
      "country":"Spania",
      "latLng":{
         "lat":40.358932,
         "lng":0.402213
      },
      "id":19
   },
   {
      "numbers":[
         294
      ],
      "address":"Via Yvon De Begnac, 00055,  Ladispoli",
      "country":"Italia",
      "latLng":{
         "lat":41.955963,
         "lng":12.071557
      },
      "id":20
   },
   {
      "numbers":[
         795
      ],
      "address":"2026 Scott Street, Hollywood, FL 33020",
      "country":"Sua",
      "latLng":{
         "lat":26.029635,
         "lng":-80.14836
      },
      "id":21
   },
   {
      "numbers":[
         331
      ],
      "address":"Str. Candelaro, n. 102/B, cod poștal 71121, Foggia",
      "country":"Italia",
      "latLng":{
         "lat":41.467799,
         "lng":15.536277
      },
      "id":22
   },
   {
      "numbers":[
         600
      ],
      "address":"Function Room, Balby Recreation Club, 81-89 Balby Road, Balby Doncaster DN4 0RE",
      "country":"Marea Britanie",
      "latLng":{
         "lat":53.303728,
         "lng":-1.839872
      },
      "id":23
   },
   {
      "numbers":[
         374
      ],
      "address":"Via Giovanni Verga nr. 4, Vittoria",
      "country":"Italia",
      "latLng":{
         "lat":36.957815,
         "lng":14.540169
      },
      "id":24
   },
   {
      "numbers":[
         295
      ],
      "address":"Via Vincenzo De Giaxa N. 5, 80144 Napoli",
      "country":"Italia",
      "latLng":{
         "lat":40.870659,
         "lng":14.279972
      },
      "id":25
   },
   {
      "numbers":[
         288,
         289
      ],
      "address":"Viale Libano n. 40, 00144 Roma",
      "country":"Italia",
      "latLng":{
         "lat":41.822419,
         "lng":12.463977
      },
      "id":26
   },
   {
      "numbers":[
         281
      ],
      "address":"Waterford Crystal Leisure Centre, Cork Road, Waterford, Co. Waterford",
      "country":"Irlanda",
      "latLng":{
         "lat":52.14362,
         "lng":-7.09016
      },
      "id":27
   },
   {
      "numbers":[
         278
      ],
      "address":"Ardilaun Hotel, Taylors Hill Road, Galway",
      "country":"Irlanda",
      "latLng":{
         "lat":53.16035,
         "lng":-9.04512
      },
      "id":28
   },
   {
      "numbers":[
         284
      ],
      "address":"Str. Shivtei Israel nr.46, Ierusalim",
      "country":"Israel",
      "latLng":{
         "lat":31.784162,
         "lng":35.224844
      },
      "id":29
   },
   {
      "numbers":[
         169
      ],
      "address":"75, Cours Napoléon, 20000 Ajaccio",
      "country":"Franţa",
      "latLng":{
         "lat":41.927385,
         "lng":8.738362
      },
      "id":30
   },
   {
      "numbers":[
         746,
         747
      ],
      "address":"Avenida Primero de Mayo, S/N, planta 1, Centro de Formacion e Iniciativas de Empleo, Recinto ferial FICA, 30006, Murcia, provincia Murcia",
      "country":"Spania",
      "latLng":{
         "lat":37.984511,
         "lng":-1.112419
      },
      "id":31
   },
   {
      "numbers":[
         208,
         209
      ],
      "address":"Plieninger Straße 100, 70567 Stuttgart",
      "country":"Germania",
      "latLng":{
         "lat":48.72243,
         "lng":9.160382
      },
      "id":32
   },
   {
      "numbers":[
         210
      ],
      "address":"Albert-Schweitzer-Str. 1, 76139 Karlsruhe",
      "country":"Germania",
      "latLng":{
         "lat":49.046297,
         "lng":8.446106
      },
      "id":33
   },
   {
      "numbers":[
         235
      ],
      "address":"Neustadt 474, 84028 Landshut",
      "country":"Germania",
      "latLng":{
         "lat":48.32039,
         "lng":12.19125
      },
      "id":34
   },
   {
      "numbers":[
         70
      ],
      "address":"1010, Sherbrooke Ouest, Sala de conferințe etaj 15, Montreal, QC H3A 2R7, Canada",
      "country":"Canada",
      "latLng":{
         "lat":45.502254,
         "lng":-73.575677
      },
      "id":35
   },
   {
      "numbers":[
         232,
         233
      ],
      "address":"Hanauer Str. 103, 80993 München",
      "country":"Germania",
      "latLng":{
         "lat":48.11115,
         "lng":11.3158
      },
      "id":36
   },
   {
      "numbers":[
         216
      ],
      "address":"Schützenallee 72, 79117 Freiburg im Breisgau",
      "country":"Germania",
      "latLng":{
         "lat":47.986784,
         "lng":7.872502
      },
      "id":37
   },
   {
      "numbers":[
         212,
         213
      ],
      "address":"Böfinger Straße 50, 89073 Ulm",
      "country":"Germania",
      "latLng":{
         "lat":48.415885,
         "lng":10.015052
      },
      "id":38
   },
   {
      "numbers":[
         178
      ],
      "address":"Martin-Luther-Ring 4, 04109 Leipzig",
      "country":"Germania",
      "latLng":{
         "lat":51.336143,
         "lng":12.373394
      },
      "id":39
   },
   {
      "numbers":[
         691
      ],
      "address":"Casa de la Cultura Paseo Grande, calle Miguel Rodriguez s/n Edificio, 21440 Lepe",
      "country":"Spania",
      "latLng":{
         "lat":37.253363,
         "lng":-7.203933
      },
      "id":40
   },
   {
      "numbers":[
         683,
         684
      ],
      "address":"Hotel Palma Bellver, Avinguda de Gabriel Roca, 11, 07014 Palma, Baleare, Palma de Mallorca",
      "country":"Spania",
      "latLng":{
         "lat":39.568615,
         "lng":2.630907
      },
      "id":41
   },
   {
      "numbers":[
         170
      ],
      "address":"30, Rue du Dr. André Morucci, 20200 Bastia",
      "country":"Franţa",
      "latLng":{
         "lat":42.694638,
         "lng":9.446823
      },
      "id":42
   },
   {
      "numbers":[
         671
      ],
      "address":"Hotel Melia Girona, Carrer Barcelona, nr. 112, 17003 Girona",
      "country":"Spania",
      "latLng":{
         "lat":41.97045,
         "lng":2.813851
      },
      "id":43
   },
   {
      "numbers":[
         708,
         709
      ],
      "address":"Calle Comunidad de Navarra, 2, 31010, Barañain, Navarra",
      "country":"Spania",
      "latLng":{
         "lat":42.804812,
         "lng":-1.688894
      },
      "id":44
   },
   {
      "numbers":[
         517,
         518
      ],
      "address":"Aalsterweg 322, 5644 RL Eindhoven",
      "country":"Netherlands",
      "latLng":{
         "lat":51.406703,
         "lng":5.47927
      },
      "id":45
   },
   {
      "numbers":[
         744
      ],
      "address":"Calle Rio Duero, no.13,bajo, 18600, Motril, provincia Granada",
      "country":"Spania",
      "latLng":{
         "lat":36.741763,
         "lng":-3.525
      },
      "id":46
   },
   {
      "numbers":[
         629,
         630
      ],
      "address":"Av. de las Glorietas, 19, 21, 28053 Madrid",
      "country":"Spania",
      "latLng":{
         "lat":40.373661,
         "lng":-3.660227
      },
      "id":47
   },
   {
      "numbers":[
         636,
         637
      ],
      "address":"Calle de Entrepeñas, 2, 28803 Alcalá de Henares",
      "country":"Spania",
      "latLng":{
         "lat":40.4697,
         "lng":-3.364948
      },
      "id":48
   },
   {
      "numbers":[
         639,
         640
      ],
      "address":"Avenida de la Constitución, 167, 28850, Torrejón de Ardoz",
      "country":"Spania",
      "latLng":{
         "lat":40.459611,
         "lng":-3.465214
      },
      "id":49
   },
   {
      "numbers":[
         633,
         634
      ],
      "address":"Av. Constitución, 75 - 28821, Coslada",
      "country":"Spania",
      "latLng":{
         "lat":40.428068,
         "lng":-3.560749
      },
      "id":50
   },
   {
      "numbers":[
         643
      ],
      "address":"Calle Pintor Velázquez, 68, 28935 Móstoles",
      "country":"Spania",
      "latLng":{
         "lat":40.319722,
         "lng":-3.879798
      },
      "id":51
   },
   {
      "numbers":[
         646
      ],
      "address":"Calle de la Constitución, 67, 28944 Fuenlabrada, Madrid",
      "country":"Spania",
      "latLng":{
         "lat":40.280932,
         "lng":-3.783764
      },
      "id":52
   },
   {
      "numbers":[
         641,
         642
      ],
      "address":"Avenida de Madrid 47, 28500 Arganda del Rey, Madrid",
      "country":"Spania",
      "latLng":{
         "lat":40.306637,
         "lng":-3.468007
      },
      "id":53
   },
   {
      "numbers":[
         725
      ],
      "address":"Asociația hispano-română din provincia Cuenca, Plaza de la  Constitución, 1, 16400 Tarancón, provincia Cuenca",
      "country":"Spania",
      "latLng":{
         "lat":40.011643,
         "lng":-3.004282
      },
      "id":54
   },
   {
      "numbers":[
         110
      ],
      "address":"Fondation Madeleine Moret/Maison de la femme, 6 Av. Eglantine, 1006 Lausanne",
      "country":"Elveţia",
      "latLng":{
         "lat":46.516308,
         "lng":6.64117
      },
      "id":55
   },
   {
      "numbers":[
         728
      ],
      "address":"Centro Sociocultural de El Pilar, Calle Teruel, 12, 02005, Albacete",
      "country":"Spania",
      "latLng":{
         "lat":38.99948,
         "lng":-1.864347
      },
      "id":56
   },
   {
      "numbers":[
         724
      ],
      "address":"Centro Social del Pozo de las Nieves Calle Joaquín Rojas, 5, 16001 Cuenca, provincia Cuenca",
      "country":"Spania",
      "latLng":{
         "lat":40.072103,
         "lng":-2.131447
      },
      "id":57
   },
   {
      "numbers":[
         663
      ],
      "address":"Calle Nuestra Señora del Camino 4, 38010 Santa Cruz de Tenerife",
      "country":"Spania",
      "latLng":{
         "lat":28.457726,
         "lng":-16.286466
      },
      "id":58
   },
   {
      "numbers":[
         648
      ],
      "address":"Calle Virgen de la Hoz (Calle San Isidro) s/n, 19005 Guadalajara",
      "country":"Spania",
      "latLng":{
         "lat":40.635275,
         "lng":-3.148481
      },
      "id":59
   },
   {
      "numbers":[
         669,
         670
      ],
      "address":"Lonja Mercolleida, Avinguda de Tortosa, 2, 25005 Lleida",
      "country":"Spania",
      "latLng":{
         "lat":41.61904,
         "lng":0.636671
      },
      "id":60
   },
   {
      "numbers":[
         678,
         679
      ],
      "address":"Hotel Tarraco Park, Carretera de Valencia, 206, N: 41.1151 - E: 1.21836, 43006, Tarragona",
      "country":"Spania",
      "latLng":{
         "lat":41.115126,
         "lng":1.218501
      },
      "id":61
   },
   {
      "numbers":[
         665
      ],
      "address":"Centro de negocios SBC Diagonal, Gran Via Carlos III, nr. 94, Torre Oeste, Entresuelo, 08028, Barcelona",
      "country":"Spania",
      "latLng":{
         "lat":41.386196,
         "lng":2.127714
      },
      "id":62
   },
   {
      "numbers":[
         756
      ],
      "address":"Asociația Română din Valencia - AROVA, Carrer de Francesc Tàrrega, 7, València CP 46009",
      "country":"Spania",
      "latLng":{
         "lat":39.489152,
         "lng":-0.385009
      },
      "id":63
   },
   {
      "numbers":[
         763
      ],
      "address":"Sercotel Hotel SPA Porta Maris & Suites Plaza Puerta del Mar, 3,  Alicante CP 03002",
      "country":"Spania",
      "latLng":{
         "lat":38.342279,
         "lng":-0.478216
      },
      "id":64
   },
   {
      "numbers":[
         761
      ],
      "address":"Plaza Rei en Jaume 6, Bajo, Gandia, CP 467081",
      "country":"Spania",
      "latLng":{
         "lat":38.96599,
         "lng":-0.181794
      },
      "id":65
   },
   {
      "numbers":[
         626,
         627
      ],
      "address":"Avenida de la Albufera, nr. 319, 28031, Madrid",
      "country":"Spania",
      "latLng":{
         "lat":40.384377,
         "lng":-3.631845
      },
      "id":66
   },
   {
      "numbers":[
         778
      ],
      "address":"2075 E Long Lake Road, Troy, MI 48085",
      "country":"Sua",
      "latLng":{
         "lat":42.35427,
         "lng":-83.06301
      },
      "id":67
   },
   {
      "numbers":[
         694,
         695
      ],
      "address":"Centro Ciudadano la Virreina, calle Camino de la Virreina 7, Malaga",
      "country":"Spania",
      "latLng":{
         "lat":36.740962,
         "lng":-4.426699
      },
      "id":68
   },
   {
      "numbers":[
         727
      ],
      "address":"Centro Cívico de Palomarejos Plaza de Aquisgrán, s/n, 45005 Toledo, provincia Toledo",
      "country":"Spania",
      "latLng":{
         "lat":39.872671,
         "lng":-4.033216
      },
      "id":69
   },
   {
      "numbers":[
         689,
         690
      ],
      "address":"Salon del Edificio Municipal Espacio Integra Parque Ramon y Cajal s/n 06200, Almendralejo",
      "country":"Spania",
      "latLng":{
         "lat":38.679839,
         "lng":-6.413911
      },
      "id":70
   },
   {
      "numbers":[
         715,
         716
      ],
      "address":"Plaza Velarde, 5, 39001 Santander, Cantabria",
      "country":"Spania",
      "latLng":{
         "lat":43.462459,
         "lng":-3.805883
      },
      "id":71
   },
   {
      "numbers":[
         693
      ],
      "address":"Plaza de Torros, CP 21810, Palos de la Frontera, Huelva",
      "country":"Spania",
      "latLng":{
         "lat":37.224512,
         "lng":-6.896869
      },
      "id":72
   },
   {
      "numbers":[
         109
      ],
      "address":"Stellwerk Basel / Vogesenplatz 1, 4056 Basel",
      "country":"Elveţia",
      "latLng":{
         "lat":47.570251,
         "lng":7.572656
      },
      "id":73
   },
   {
      "numbers":[
         710
      ],
      "address":"Carretera De Somio 652, 33203, Gijón, Asturias",
      "country":"Spania",
      "latLng":{
         "lat":43.541724,
         "lng":-5.636032
      },
      "id":74
   },
   {
      "numbers":[
         799
      ],
      "address":"664 Dickens Road, Lilburn, Georgia 30047",
      "country":"Sua",
      "latLng":{
         "lat":33.893116,
         "lng":-84.164379
      },
      "id":75
   },
   {
      "numbers":[
         712
      ],
      "address":"Pazo de Raxoi, s/n, 15701 Santiago de Compostela",
      "country":"Spania",
      "latLng":{
         "lat":42.880263,
         "lng":-8.54614
      },
      "id":76
   },
   {
      "numbers":[
         770
      ],
      "address":"1367 W 65th Street, Cleveland, OH 44102",
      "country":"Sua",
      "latLng":{
         "lat":41.484781,
         "lng":-81.72995
      },
      "id":77
   },
   {
      "numbers":[
         769
      ],
      "address":"9520 Faires Farm Road, Charlotte, NC 28213",
      "country":"Sua",
      "latLng":{
         "lat":35.29564,
         "lng":-80.7212
      },
      "id":78
   },
   {
      "numbers":[
         802
      ],
      "address":"1907 Spruce Street, Philadelphia, PA, 19103",
      "country":"Sua",
      "latLng":{
         "lat":39.948289,
         "lng":-75.173096
      },
      "id":79
   },
   {
      "numbers":[
         513,
         514
      ],
      "address":"Leonard Springerlaan 2, 9727 KB, Groningen",
      "country":"Netherlands",
      "latLng":{
         "lat":53.202993,
         "lng":6.555231
      },
      "id":80
   },
   {
      "numbers":[
         797
      ],
      "address":"2312 Dorrington Dr., Dallas, Texas, 75228",
      "country":"Sua",
      "latLng":{
         "lat":32.805887,
         "lng":-96.70829
      },
      "id":81
   },
   {
      "numbers":[
         798
      ],
      "address":"318 Canino Road, Houston, TX 77076",
      "country":"Sua",
      "latLng":{
         "lat":29.874762,
         "lng":-95.3796
      },
      "id":82
   },
   {
      "numbers":[
         785
      ],
      "address":"5306 Walnut Avenue, Building A, Sacramento, CA 95841",
      "country":"Sua",
      "latLng":{
         "lat":38.6632,
         "lng":-121.345
      },
      "id":83
   },
   {
      "numbers":[
         483
      ],
      "address":"Str. Ștefan cel Mare nr. 52, Carabetovca",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":46.414819,
         "lng":28.910588
      },
      "id":84
   },
   {
      "numbers":[
         788
      ],
      "address":"1250 S Jones Blvd, Las Vegas, NV 89146",
      "country":"Sua",
      "latLng":{
         "lat":36.157659,
         "lng":-115.224158
      },
      "id":85
   },
   {
      "numbers":[
         789
      ],
      "address":"Arizona State University - Downtown Phoenix Campus Mercado, 502 E Monroe Street Bldg. C, Room 145, Phoenix, AZ 85004",
      "country":"Sua",
      "latLng":{
         "lat":33.45077,
         "lng":-112.067124
      },
      "id":86
   },
   {
      "numbers":[
         792
      ],
      "address":"4180 Emigration Canyon Road, Salt Lake City, UT 84108",
      "country":"Sua",
      "latLng":{
         "lat":40.76381,
         "lng":-111.779
      },
      "id":87
   },
   {
      "numbers":[
         25,
         26
      ],
      "address":"Eduard-Macheiner-Straße 4, 5020 Salzburg",
      "country":"Austria",
      "latLng":{
         "lat":47.771929,
         "lng":13.03971
      },
      "id":88
   },
   {
      "numbers":[
         720,
         721
      ],
      "address":"Paseo Isabel la Católica 2, 50009, Zaragoza",
      "country":"Spania",
      "latLng":{
         "lat":41.637383,
         "lng":-0.898823
      },
      "id":89
   },
   {
      "numbers":[
         23
      ],
      "address":"Theresianumgasse 25, 1040 Viena",
      "country":"Austria",
      "latLng":{
         "lat":48.191555,
         "lng":16.373803
      },
      "id":90
   },
   {
      "numbers":[
         67
      ],
      "address":"505 Melanson Rd., St. Anselme Park, Rotary Club, Dieppe, NB E1A 0K2",
      "country":"Canada",
      "latLng":{
         "lat":46.067847,
         "lng":-64.712709
      },
      "id":91
   },
   {
      "numbers":[
         2
      ],
      "address":"Baza militară NATO, Kandahar Airfield (BM KAF), în vecinătatea orașului Kandahar, provincia Kandahar",
      "country":"Afghanistan",
      "latLng":{
         "lat":31.501504,
         "lng":65.850767
      },
      "id":92
   },
   {
      "numbers":[
         1
      ],
      "address":"Baza militară NATO Hamid Karzai International Airport (HKIA), Kabul",
      "country":"Afghanistan",
      "latLng":{
         "lat":34.560948,
         "lng":69.2101
      },
      "id":93
   },
   {
      "numbers":[
         658
      ],
      "address":"Calle Ventura Rodriguez 7, 28891 Velilla de San Antonio",
      "country":"Spania",
      "latLng":{
         "lat":40.365655,
         "lng":-3.488901
      },
      "id":94
   },
   {
      "numbers":[
         776
      ],
      "address":"7280 N Caldwell Ave, Niles, IL 60714",
      "country":"Sua",
      "latLng":{
         "lat":42.00509,
         "lng":-87.47277
      },
      "id":95
   },
   {
      "numbers":[
         538
      ],
      "address":"Edifício dos Paços do Concelho, R/C, Praça da República, 8800-316 Tavira",
      "country":"Portugalia",
      "latLng":{
         "lat":37.12608,
         "lng":-7.649852
      },
      "id":96
   },
   {
      "numbers":[
         176
      ],
      "address":"Beckstrasse 35, 30457 Hannover",
      "country":"Germania",
      "latLng":{
         "lat":52.346313,
         "lng":9.680501
      },
      "id":97
   },
   {
      "numbers":[
         791
      ],
      "address":"8315 NE 155th Street, Kenmore, WA 98028",
      "country":"Sua",
      "latLng":{
         "lat":47.740316,
         "lng":-122.229874
      },
      "id":98
   },
   {
      "numbers":[
         790
      ],
      "address":"5544 SE 128th Avenue, Portland, OR 97236",
      "country":"Sua",
      "latLng":{
         "lat":45.482656,
         "lng":-122.5313
      },
      "id":99
   },
   {
      "numbers":[
         206,
         207
      ],
      "address":"Hauptstätterstrasse 70, 70178, Stuttgart",
      "country":"Germania",
      "latLng":{
         "lat":48.770029,
         "lng":9.174567
      },
      "id":100
   },
   {
      "numbers":[
         168
      ],
      "address":"15, rue Missak Manouchian, 31100 Toulouse",
      "country":"Franţa",
      "latLng":{
         "lat":43.550406,
         "lng":1.386615
      },
      "id":101
   },
   {
      "numbers":[
         774
      ],
      "address":"5825 N Mozart Chicago, IL 60659",
      "country":"Sua",
      "latLng":{
         "lat":41.59149,
         "lng":-87.42008
      },
      "id":102
   },
   {
      "numbers":[
         85
      ],
      "address":"Attikon Theatre, Evagora Pallikaridi Street, 8100 Pafos",
      "country":"Cipru",
      "latLng":{
         "lat":34.77663,
         "lng":32.42249
      },
      "id":103
   },
   {
      "numbers":[
         155
      ],
      "address":"7, Rue de Savoie 69002, Lyon, Salle Lamartine",
      "country":"Franţa",
      "latLng":{
         "lat":45.760239,
         "lng":4.832066
      },
      "id":104
   },
   {
      "numbers":[
         775
      ],
      "address":"3938 W. Irwing Park Road, Chicago IL 60618",
      "country":"Sua",
      "latLng":{
         "lat":41.57147,
         "lng":0.0
      },
      "id":105
   },
   {
      "numbers":[
         277
      ],
      "address":"Scholars Townhouse Hotel, King Street, Drogheda, Co. Louth",
      "country":"Irlanda",
      "latLng":{
         "lat":53.4305,
         "lng":-6.20555
      },
      "id":106
   },
   {
      "numbers":[
         468
      ],
      "address":"Str. Alexandru cel Bun nr. 5, Durlești",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":47.01862,
         "lng":28.764586
      },
      "id":107
   },
   {
      "numbers":[
         811
      ],
      "address":"Elite Plaza Hotel, Gustav Adolfs torg 49 , sala Gripen, Malmö",
      "country":"Suedia",
      "latLng":{
         "lat":55.60315,
         "lng":12.99936
      },
      "id":108
   },
   {
      "numbers":[
         755
      ],
      "address":"Hotel Marina d'Or 3 Estrellas, Calle L'Antina s/n, Oropesa del Mar, CP 12594",
      "country":"Spania",
      "latLng":{
         "lat":40.107085,
         "lng":0.152013
      },
      "id":109
   },
   {
      "numbers":[
         765
      ],
      "address":"Auditorio\"Julio Iglesias\", Parc de l'Aigüera , cu acces din Calle Primavera 22 sau din  Avenida. Aigüera s/n, Benidorm, CP 03502",
      "country":"Spania",
      "latLng":{
         "lat":38.542366,
         "lng":-0.130415
      },
      "id":110
   },
   {
      "numbers":[
         158
      ],
      "address":"Place centrale de fontaine d'ouche, 21000 Dijon, salle Lucie et Raymond Aubrac",
      "country":"Franţa",
      "latLng":{
         "lat":47.318933,
         "lng":5.002101
      },
      "id":111
   },
   {
      "numbers":[
         780
      ],
      "address":"4761 Industrial  Parkway, Indianapolis, IN 46226",
      "country":"Sua",
      "latLng":{
         "lat":39.50355,
         "lng":-86.010605
      },
      "id":112
   },
   {
      "numbers":[
         91,
         92
      ],
      "address":"Bella Center Copenhagen | Center Boulevard 5, 2300, Copenhaga",
      "country":"Danemarca",
      "latLng":{
         "lat":55.638262,
         "lng":12.577574
      },
      "id":113
   },
   {
      "numbers":[
         781
      ],
      "address":"3030 West River Parkway, Minneapolis MN 55406",
      "country":"Sua",
      "latLng":{
         "lat":44.56499,
         "lng":-93.1217
      },
      "id":114
   },
   {
      "numbers":[
         27,
         28
      ],
      "address":"Hotel Paradies, Straßganger Str. 380b, 8054 Graz",
      "country":"Austria",
      "latLng":{
         "lat":47.038702,
         "lng":15.391903
      },
      "id":115
   },
   {
      "numbers":[
         31
      ],
      "address":"Kirchsteig 8, 6020 Innsbruck",
      "country":"Austria",
      "latLng":{
         "lat":47.258642,
         "lng":11.429134
      },
      "id":116
   },
   {
      "numbers":[
         32
      ],
      "address":"Haus 17a, Seminarraum 1, Landhausplatz 1, 3100, Sankt Pölten",
      "country":"Austria",
      "latLng":{
         "lat":48.200228,
         "lng":15.631929
      },
      "id":117
   },
   {
      "numbers":[
         810
      ],
      "address":"Norra Hamngatan 14, Göteborg",
      "country":"Suedia",
      "latLng":{
         "lat":57.706457,
         "lng":11.964311
      },
      "id":118
   },
   {
      "numbers":[
         156
      ],
      "address":"10, Place Paul Eluard, 38400 Saint Martin d'Heres",
      "country":"Franţa",
      "latLng":{
         "lat":45.165873,
         "lng":5.74651
      },
      "id":119
   },
   {
      "numbers":[
         102
      ],
      "address":"Vestervangsvej 6, 8800 Viborg",
      "country":"Danemarca",
      "latLng":{
         "lat":56.45858,
         "lng":9.39357
      },
      "id":120
   },
   {
      "numbers":[
         66
      ],
      "address":"90, boul. des Étudiants, Quebec, QC G2A QN6",
      "country":"Canada",
      "latLng":{
         "lat":46.855719,
         "lng":-71.361309
      },
      "id":121
   },
   {
      "numbers":[
         157
      ],
      "address":"Hotel de Ville, 10 Rue Philippe Marcombes, Salle Michel de l'hospital, 63000 Clermont-Ferrand",
      "country":"Franţa",
      "latLng":{
         "lat":45.779741,
         "lng":3.086657
      },
      "id":122
   },
   {
      "numbers":[
         104
      ],
      "address":"Chemin de la Perriere nr. 6, 1223 Cologny, Geneva",
      "country":"Elveţia",
      "latLng":{
         "lat":46.227186,
         "lng":6.186535
      },
      "id":123
   },
   {
      "numbers":[
         93
      ],
      "address":"Hadsundvej 184, 9000 Aalborg",
      "country":"Danemarca",
      "latLng":{
         "lat":57.025274,
         "lng":9.960152
      },
      "id":124
   },
   {
      "numbers":[
         119
      ],
      "address":"Yliopistonkatu 19, 20100, Turku",
      "country":"Finlanda",
      "latLng":{
         "lat":60.452445,
         "lng":22.266033
      },
      "id":125
   },
   {
      "numbers":[
         88
      ],
      "address":"Cultural Centre Famagusta, Famagusta Avenue 26, 5380 Deryneia",
      "country":"Cipru",
      "latLng":{
         "lat":35.070675,
         "lng":33.958678
      },
      "id":126
   },
   {
      "numbers":[
         94
      ],
      "address":"Hermodsvej 5A, 8230 Åbyhøj, Aarhus",
      "country":"Danemarca",
      "latLng":{
         "lat":56.152672,
         "lng":10.174621
      },
      "id":127
   },
   {
      "numbers":[
         57,
         58
      ],
      "address":"Centrul Kinepolis, Koning Albert I-Laan 200 – 8200 Brugge",
      "country":"Belgia",
      "latLng":{
         "lat":51.179713,
         "lng":3.201931
      },
      "id":128
   },
   {
      "numbers":[
         53,
         54
      ],
      "address":"Lotto Mons Expo, Avenue Thomas Edison, 2, 7000 Mons",
      "country":"Belgia",
      "latLng":{
         "lat":50.457937,
         "lng":3.937605
      },
      "id":129
   },
   {
      "numbers":[
         86
      ],
      "address":"Pankyprios Syndesmos Dimokratikon Antistasiakon, Agyos Nicolaos, 10 Griva Digeni, 3106 Limassol",
      "country":"Cipru",
      "latLng":{
         "lat":34.687564,
         "lng":33.054845
      },
      "id":130
   },
   {
      "numbers":[
         276
      ],
      "address":"Cork City Hall, Anglesea St, Centre, Cork",
      "country":"Irlanda",
      "latLng":{
         "lat":51.53498,
         "lng":-8.27557
      },
      "id":131
   },
   {
      "numbers":[
         457,
         458
      ],
      "address":"Str. Maria Cebotari nr. 53-54, Chișinău",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":47.028758,
         "lng":28.829475
      },
      "id":132
   },
   {
      "numbers":[
         274,
         275
      ],
      "address":"Royal Dublin Society Anglesea Rd, Ballsbridge, Dublin 4",
      "country":"Irlanda",
      "latLng":{
         "lat":53.194,
         "lng":-6.13442
      },
      "id":133
   },
   {
      "numbers":[
         51,
         52
      ],
      "address":"Blue Point Antwerpen, Filip Williostraat 9, 2600 Berchem",
      "country":"Belgia",
      "latLng":{
         "lat":51.187025,
         "lng":4.4356
      },
      "id":134
   },
   {
      "numbers":[
         49,
         50
      ],
      "address":"Palais des Congrès de Liège, Esplanade de l'Europe 2/B-4020, Liege",
      "country":"Belgia",
      "latLng":{
         "lat":50.630359,
         "lng":5.574699
      },
      "id":135
   },
   {
      "numbers":[
         33
      ],
      "address":"Hotel Burgenland, Franz Schubert-Platz 1, 7000 Eisenstadt",
      "country":"Austria",
      "latLng":{
         "lat":47.84758,
         "lng":16.526681
      },
      "id":136
   },
   {
      "numbers":[
         661
      ],
      "address":"Calle Néstor de la Torre, 21, 35006 Las Palmas de Gran Canaria",
      "country":"Spania",
      "latLng":{
         "lat":28.134098,
         "lng":-15.433578
      },
      "id":137
   },
   {
      "numbers":[
         428
      ],
      "address":"Salone della Biblioteca, Viale Europa nr. 5, Aosta",
      "country":"Italia",
      "latLng":{
         "lat":45.734556,
         "lng":7.296472
      },
      "id":138
   },
   {
      "numbers":[
         419
      ],
      "address":"Ex-Circoscrizione Europista, Via Wagner nr. 38/D, Alessandria",
      "country":"Italia",
      "latLng":{
         "lat":44.90544,
         "lng":8.61653
      },
      "id":139
   },
   {
      "numbers":[
         422
      ],
      "address":"Palazzo Provinciale, Salone Consiliare, Piazza Alfieri nr.33, Asti",
      "country":"Italia",
      "latLng":{
         "lat":44.75475,
         "lng":8.14833
      },
      "id":140
   },
   {
      "numbers":[
         421
      ],
      "address":"Via Monte San Gabriele nr.50/C, Novara",
      "country":"Italia",
      "latLng":{
         "lat":45.42798,
         "lng":8.61824
      },
      "id":141
   },
   {
      "numbers":[
         417
      ],
      "address":"Centro Sociale di Renco, Via Renco nr. 36,  Verbania",
      "country":"Italia",
      "latLng":{
         "lat":45.94785,
         "lng":8.55253
      },
      "id":142
   },
   {
      "numbers":[
         413
      ],
      "address":"Sala Polivalente CDT, Largo Barale nr.1, Cuneo",
      "country":"Italia",
      "latLng":{
         "lat":44.38813,
         "lng":7.54437
      },
      "id":143
   },
   {
      "numbers":[
         341
      ],
      "address":"Str. Bramante snc, cod poștal 85100, Potenza (scuola Don Lorenza Milani)",
      "country":"Italia",
      "latLng":{
         "lat":40.64197,
         "lng":15.805053
      },
      "id":144
   },
   {
      "numbers":[
         406
      ],
      "address":"Salone dei Cavalieri, Via Giolitti nr.7, Pinerolo",
      "country":"Italia",
      "latLng":{
         "lat":44.88614,
         "lng":7.33598
      },
      "id":145
   },
   {
      "numbers":[
         424
      ],
      "address":"Centro Civico Nord, Largo Vivaldi, 19122 La Spezia, Fossi Termi",
      "country":"Italia",
      "latLng":{
         "lat":44.10804,
         "lng":9.82887
      },
      "id":146
   },
   {
      "numbers":[
         418
      ],
      "address":"Via Cagna nr. 8, Vercelli",
      "country":"Italia",
      "latLng":{
         "lat":45.32393,
         "lng":8.42456
      },
      "id":147
   },
   {
      "numbers":[
         324
      ],
      "address":"Viale Della Pace, 89, 36100 Vicenza",
      "country":"Italia",
      "latLng":{
         "lat":45.543588,
         "lng":11.570855
      },
      "id":148
   },
   {
      "numbers":[
         350
      ],
      "address":"Via Argonne nr. 4, Parma",
      "country":"Italia",
      "latLng":{
         "lat":44.79256,
         "lng":10.307615
      },
      "id":149
   },
   {
      "numbers":[
         369
      ],
      "address":"Via Oriani nr. 44, Ravenna",
      "country":"Italia",
      "latLng":{
         "lat":44.414515,
         "lng":12.202021
      },
      "id":150
   },
   {
      "numbers":[
         353
      ],
      "address":"Via XXIII Settembre n.124, Rimini",
      "country":"Italia",
      "latLng":{
         "lat":44.068762,
         "lng":12.550081
      },
      "id":151
   },
   {
      "numbers":[
         312
      ],
      "address":"Via Pradamano, 21, Udine",
      "country":"Italia",
      "latLng":{
         "lat":46.05488,
         "lng":13.249149
      },
      "id":152
   },
   {
      "numbers":[
         359
      ],
      "address":"Via Roma nr. 101, Prato",
      "country":"Italia",
      "latLng":{
         "lat":43.873522,
         "lng":11.089139
      },
      "id":153
   },
   {
      "numbers":[
         320
      ],
      "address":"Via Boccaccio, 80, Padova",
      "country":"Italia",
      "latLng":{
         "lat":45.402789,
         "lng":11.912404
      },
      "id":154
   },
   {
      "numbers":[
         326
      ],
      "address":"Via Tevere, 38, Verona",
      "country":"Italia",
      "latLng":{
         "lat":45.417499,
         "lng":10.96079
      },
      "id":155
   },
   {
      "numbers":[
         343
      ],
      "address":"Str. Eugenio Cirese snc, cod poștal 86100, Campobasso (Terzo Spazio, ex Scuola CEP Nord)",
      "country":"Italia",
      "latLng":{
         "lat":41.565976,
         "lng":14.674153
      },
      "id":156
   },
   {
      "numbers":[
         388
      ],
      "address":"Via Cimabue 16, 25134 BS, Brescia",
      "country":"Italia",
      "latLng":{
         "lat":45.516255,
         "lng":10.257999
      },
      "id":157
   },
   {
      "numbers":[
         386
      ],
      "address":"Via Capera 17, 24127 BG, Bergamo",
      "country":"Italia",
      "latLng":{
         "lat":45.682022,
         "lng":9.65862
      },
      "id":158
   },
   {
      "numbers":[
         380
      ],
      "address":"Via Achille Grandi 21, 22100, Como",
      "country":"Italia",
      "latLng":{
         "lat":45.80006,
         "lng":9.086086
      },
      "id":159
   },
   {
      "numbers":[
         384
      ],
      "address":"Via del Vecchio Passeggio 1, Cremona",
      "country":"Italia",
      "latLng":{
         "lat":45.140526,
         "lng":10.024309
      },
      "id":160
   },
   {
      "numbers":[
         352
      ],
      "address":"Via Viterbo nr.  80, Modena",
      "country":"Italia",
      "latLng":{
         "lat":44.622974,
         "lng":10.936998
      },
      "id":161
   },
   {
      "numbers":[
         381
      ],
      "address":"Via Pergine 6, 21100 Varese",
      "country":"Italia",
      "latLng":{
         "lat":45.829602,
         "lng":8.851254
      },
      "id":162
   },
   {
      "numbers":[
         395
      ],
      "address":"Via Gabriele D'Annunzio, 35, 20900, Monza MB",
      "country":"Italia",
      "latLng":{
         "lat":45.563464,
         "lng":9.264883
      },
      "id":163
   },
   {
      "numbers":[
         385
      ],
      "address":"Palazzo Mezzabarba, Piazza del Municipio 2, 27100 PV",
      "country":"Italia",
      "latLng":{
         "lat":45.181298,
         "lng":9.163929
      },
      "id":164
   },
   {
      "numbers":[
         393
      ],
      "address":"Piazzale Linello Groff 2, 38121 TN, Trento",
      "country":"Italia",
      "latLng":{
         "lat":46.107926,
         "lng":11.11213
      },
      "id":165
   },
   {
      "numbers":[
         357
      ],
      "address":"Ancona, Via Scrima, Nr. 19",
      "country":"Italia",
      "latLng":{
         "lat":43.603773,
         "lng":13.504176
      },
      "id":166
   },
   {
      "numbers":[
         362
      ],
      "address":"Via Fiorentina n .329, Arezzo",
      "country":"Italia",
      "latLng":{
         "lat":43.472844,
         "lng":11.850191
      },
      "id":167
   },
   {
      "numbers":[
         373
      ],
      "address":"Piazza Giulio Cesare nr. 52, Palermo",
      "country":"Italia",
      "latLng":{
         "lat":38.11832,
         "lng":13.366057
      },
      "id":168
   },
   {
      "numbers":[
         399
      ],
      "address":"Via San Gaetano Da Thiene nr.6, Torino",
      "country":"Italia",
      "latLng":{
         "lat":45.08977,
         "lng":7.71412
      },
      "id":169
   },
   {
      "numbers":[
         339
      ],
      "address":"Str. Teano snc, cod poștal 88100, Catanzaro",
      "country":"Italia",
      "latLng":{
         "lat":38.842424,
         "lng":16.61406
      },
      "id":170
   },
   {
      "numbers":[
         349
      ],
      "address":"Str. Taverna nr. 39, Piacenza",
      "country":"Italia",
      "latLng":{
         "lat":45.054073,
         "lng":9.685379
      },
      "id":171
   },
   {
      "numbers":[
         338
      ],
      "address":"Str. Santa Margherita snc, cod poștal 88900, Crotone",
      "country":"Italia",
      "latLng":{
         "lat":39.081161,
         "lng":17.129359
      },
      "id":172
   },
   {
      "numbers":[
         414
      ],
      "address":"Scuola Media Macrino, Corso Europa nr.1, Alba",
      "country":"Malta",
      "latLng":{
         "lat":44.69242,
         "lng":8.01975
      },
      "id":173
   },
   {
      "numbers":[
         480
      ],
      "address":"Str. Ștefan Vodă nr. 1, Cantemir",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":46.279138,
         "lng":28.196521
      },
      "id":174
   },
   {
      "numbers":[
         482
      ],
      "address":"Str. Ion Popușoi nr. 2, Cimişlia",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":46.521199,
         "lng":28.78948
      },
      "id":175
   },
   {
      "numbers":[
         587
      ],
      "address":"Cunard Building, Arrivals Hall, Goree, Liverpool, L3 1DS",
      "country":"Marea Britanie",
      "latLng":{
         "lat":53.24191,
         "lng":-2.59422
      },
      "id":176
   },
   {
      "numbers":[
         481
      ],
      "address":"Str. Ștefan cel Mare nr. 67, Leova",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":46.481437,
         "lng":28.251205
      },
      "id":177
   },
   {
      "numbers":[
         490
      ],
      "address":"Gislemyrveien 2-4, 4621 Kristiansand",
      "country":"Norvegia",
      "latLng":{
         "lat":58.07472,
         "lng":7.57334
      },
      "id":178
   },
   {
      "numbers":[
         619
      ],
      "address":"Str. Azem Jashanica nr.44-46, cartier Arberia, Pristina,  Kosovo, R. Serbia",
      "country":"Serbia",
      "latLng":{
         "lat":42.669567,
         "lng":21.154026
      },
      "id":179
   },
   {
      "numbers":[
         527
      ],
      "address":"Str Rajska, nr. 1, 31-124, Cracovia",
      "country":"Polonia",
      "latLng":{
         "lat":50.064822,
         "lng":19.929619
      },
      "id":180
   },
   {
      "numbers":[
         256
      ],
      "address":"Turul I: Str.Filopoimenos nr 24, etaj 3, 26221, Patra; Turul II: Str.Filopoimenos nr 24, etaj 2, 26221, Patra",
      "country":"Grecia",
      "latLng":{
         "lat":38.245264,
         "lng":21.732233
      },
      "id":181
   },
   {
      "numbers":[
         492
      ],
      "address":"Steinestøvegen 306, 5111 Breistein/Bergen, Hordaland",
      "country":"Norvegia",
      "latLng":{
         "lat":60.29274,
         "lng":5.22349
      },
      "id":182
   },
   {
      "numbers":[
         493
      ],
      "address":"Vatnevegen 39, 6265 Vatne, Møre og Romsdal",
      "country":"Norvegia",
      "latLng":{
         "lat":62.325,
         "lng":6.35524
      },
      "id":183
   },
   {
      "numbers":[
         528
      ],
      "address":"Piaţa Powstancow Warszawy nr. 1, 50-153, Wroclaw",
      "country":"Polonia",
      "latLng":{
         "lat":51.109901,
         "lng":17.049499
      },
      "id":184
   },
   {
      "numbers":[
         533
      ],
      "address":"Praça General Humberto Delgado, 4049-001 Porto",
      "country":"Portugalia",
      "latLng":{
         "lat":41.149288,
         "lng":-8.610707
      },
      "id":185
   },
   {
      "numbers":[
         598
      ],
      "address":"The Cricketers, 1 Grace Road, Aylestone, Leicester, LE2 8AD",
      "country":"Marea Britanie",
      "latLng":{
         "lat":52.363139,
         "lng":-1.8285
      },
      "id":186
   },
   {
      "numbers":[
         535
      ],
      "address":"Centro Multicultural de Setúbal, Rua das Amendoeiras, 2910 Setúbal",
      "country":"Portugalia",
      "latLng":{
         "lat":38.521796,
         "lng":-8.862499
      },
      "id":187
   },
   {
      "numbers":[
         607
      ],
      "address":"Renfield Centre, 260 Bath St, Glasgow, G2 4JP",
      "country":"Marea Britanie",
      "latLng":{
         "lat":55.865364,
         "lng":-4.26746
      },
      "id":188
   },
   {
      "numbers":[
         559
      ],
      "address":"Fratton Community Centre,Trafalgar Place, Portsmouth PO1 5JJ",
      "country":"Marea Britanie",
      "latLng":{
         "lat":50.801974,
         "lng":-1.076568
      },
      "id":189
   },
   {
      "numbers":[
         463
      ],
      "address":"Str. Chișinăului nr. 9, Orhei",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":47.370283,
         "lng":28.819099
      },
      "id":190
   },
   {
      "numbers":[
         473
      ],
      "address":"Str. Independentei nr 74, Soroca",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":48.15543,
         "lng":28.287006
      },
      "id":191
   },
   {
      "numbers":[
         466
      ],
      "address":"Str. Aurel David 70, Bardar",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":46.903849,
         "lng":28.672454
      },
      "id":192
   },
   {
      "numbers":[
         478
      ],
      "address":"Str. Ciprian Porumbescu nr. 3, Teleneşti",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":47.501519,
         "lng":28.358822
      },
      "id":193
   },
   {
      "numbers":[
         465
      ],
      "address":"Str. Suvorov 7,Anenii Noi",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":46.881608,
         "lng":29.23475
      },
      "id":194
   },
   {
      "numbers":[
         464
      ],
      "address":"Str. Păcii nr. 18, Căuşeni",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":46.639877,
         "lng":29.405408
      },
      "id":195
   },
   {
      "numbers":[
         591
      ],
      "address":"Northampton Bangladeshi Association, Gateway Centre, Mill road, Semilong, Northampton, NN2 6AX",
      "country":"Marea Britanie",
      "latLng":{
         "lat":52.144187,
         "lng":-0.544586
      },
      "id":196
   },
   {
      "numbers":[
         462
      ],
      "address":"str. Alexandru cel Bun, nr. 55, Nisporeni",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":47.081516,
         "lng":28.188009
      },
      "id":197
   },
   {
      "numbers":[
         461
      ],
      "address":"Str. Alexandru cel Bun nr. 86, Ialoveni",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":46.946169,
         "lng":28.775062
      },
      "id":198
   },
   {
      "numbers":[
         460
      ],
      "address":"Str. Mihalcea Hîncu nr. 132, Hînceşti",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":46.826758,
         "lng":28.592544
      },
      "id":199
   },
   {
      "numbers":[
         476
      ],
      "address":"Str. St. cel Mare si Sfânt nr. 52, Fălești",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":47.572023,
         "lng":27.706664
      },
      "id":200
   },
   {
      "numbers":[
         477
      ],
      "address":"Str. Sperantei nr. 1, Floreşti",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":47.890076,
         "lng":28.303214
      },
      "id":201
   },
   {
      "numbers":[
         474
      ],
      "address":"Bd Independenței nr. 15, Drochia",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":48.031986,
         "lng":27.815359
      },
      "id":202
   },
   {
      "numbers":[
         484
      ],
      "address":"Str. Independenței nr. 24, Giurgiuleşti",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":45.482337,
         "lng":28.194394
      },
      "id":203
   },
   {
      "numbers":[
         467
      ],
      "address":"Str. Mihai Eminescu nr. 19, Călăraşi",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":47.250144,
         "lng":28.314257
      },
      "id":204
   },
   {
      "numbers":[
         455,
         456
      ],
      "address":"Str. Mihail Kogălniceanu nr. 67/3",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":47.018911,
         "lng":28.82426
      },
      "id":205
   },
   {
      "numbers":[
         660
      ],
      "address":"Hotel Palacio Valderrábanos, Plaza de la Catedral, 9, 05001  Ávila",
      "country":"Spania",
      "latLng":{
         "lat":40.655731,
         "lng":-4.698075
      },
      "id":206
   },
   {
      "numbers":[
         491
      ],
      "address":"Thiisabakken 3, 4010 Stavanger",
      "country":"Norvegia",
      "latLng":{
         "lat":58.5735,
         "lng":5.44129
      },
      "id":207
   },
   {
      "numbers":[
         542,
         543
      ],
      "address":"344, M.E.I.C House, Kensington High Street, Londra, W14 8 NS",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.49727,
         "lng":-0.20491
      },
      "id":208
   },
   {
      "numbers":[
         713,
         714
      ],
      "address":"Real Monasterio de San Augustín, Calle Madrid 24, 09002 Burgos",
      "country":"Spania",
      "latLng":{
         "lat":42.334442,
         "lng":-3.699836
      },
      "id":209
   },
   {
      "numbers":[
         602
      ],
      "address":"Fearon Community Association, Fearon Hall, Rectory Road, Loughborough LE11 1PL",
      "country":"Marea Britanie",
      "latLng":{
         "lat":52.463067,
         "lng":-1.121466
      },
      "id":210
   },
   {
      "numbers":[
         114
      ],
      "address":"Dubai World Trade Center, sala Al Ain, Sheikh Zayed Road",
      "country":"United Arab Emirates",
      "latLng":{
         "lat":25.227439,
         "lng":55.288549
      },
      "id":211
   },
   {
      "numbers":[
         111
      ],
      "address":"Associazione Spazio Aperto, Via Gerretta 9a, 6500 Bellinzona",
      "country":"Elveţia",
      "latLng":{
         "lat":46.201167,
         "lng":9.030224
      },
      "id":212
   },
   {
      "numbers":[
         551,
         552
      ],
      "address":"Harrow Leisure Centre, ChristChurch Avenue, Harrow, Londra, HA3 5BD",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.592346,
         "lng":-0.327549
      },
      "id":213
   },
   {
      "numbers":[
         565,
         566
      ],
      "address":"1 Hastings Street, Luton, LU1 5XL",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.877256,
         "lng":-0.418499
      },
      "id":214
   },
   {
      "numbers":[
         609
      ],
      "address":"Town House, Committee Room 5, Broad Street Aberdeen, AB10",
      "country":"Marea Britanie",
      "latLng":{
         "lat":57.1482,
         "lng":-2.0966
      },
      "id":215
   },
   {
      "numbers":[
         582
      ],
      "address":"Birchwood Lane, Penylan, Cardiff, Wales, CF23 5YB",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.505127,
         "lng":-3.166389
      },
      "id":216
   },
   {
      "numbers":[
         166
      ],
      "address":"31, Rue Docteur Figheira, Nisa, Franta",
      "country":"Franţa",
      "latLng":{
         "lat":43.710586,
         "lng":7.258947
      },
      "id":217
   },
   {
      "numbers":[
         611
      ],
      "address":"1-7 Ballymoney Road, Ballymena, BT43 5BS, Adair Arms Hotel-Slemish Room",
      "country":"Marea Britanie",
      "latLng":{
         "lat":54.8671,
         "lng":-6.2795
      },
      "id":218
   },
   {
      "numbers":[
         589
      ],
      "address":"St. Aidan's Church, Elford Place West, Leeds, LS8 5QD",
      "country":"Marea Britanie",
      "latLng":{
         "lat":53.484488,
         "lng":-1.311327
      },
      "id":219
   },
   {
      "numbers":[
         564
      ],
      "address":"5 York Street, St Helier, Jersey, JE2 3QP",
      "country":"Marea Britanie",
      "latLng":{
         "lat":49.18569,
         "lng":-2.109643
      },
      "id":220
   },
   {
      "numbers":[
         593
      ],
      "address":"The Custard Factory, Gibb Street, Birmingham, B9 4AA",
      "country":"Marea Britanie",
      "latLng":{
         "lat":52.283096,
         "lng":-1.532371
      },
      "id":221
   },
   {
      "numbers":[
         610
      ],
      "address":"Chinese Wealfare Association,1 Stranmillis Embankment, Belfast, BT7 1GB, Northern Ireland",
      "country":"Marea Britanie",
      "latLng":{
         "lat":54.5821,
         "lng":-5.9268
      },
      "id":222
   },
   {
      "numbers":[
         29,
         30
      ],
      "address":"Harrachstraße 7, 4020 Linz",
      "country":"Austria",
      "latLng":{
         "lat":48.302993,
         "lng":14.292672
      },
      "id":223
   },
   {
      "numbers":[
         27
      ],
      "address":"Strovolos Municipality, 100, Strovolos Avenue, PO box 28403, 2094 Nicosia, Cyprus",
      "country":"Cipru",
      "latLng":{
         "lat":35.144236,
         "lng":33.343579
      },
      "id":224
   },
   {
      "numbers":[
         37,
         38
      ],
      "address":"Rue Montoyer 12, 1000 Bruxelles",
      "country":"Belgia",
      "latLng":{
         "lat":50.841789,
         "lng":4.368899
      },
      "id":225
   },
   {
      "numbers":[
         41
      ],
      "address":"Boulevard du Regent 47-48, 1000 Bruxelles",
      "country":"Belgia",
      "latLng":{
         "lat":50.847655,
         "lng":4.368868
      },
      "id":226
   },
   {
      "numbers":[
         47,
         48
      ],
      "address":"Palais 2, Place de Belgique 1, BE – 1020 Brussels",
      "country":"Belgia",
      "latLng":{
         "lat":50.899533,
         "lng":4.339114
      },
      "id":227
   },
   {
      "numbers":[
         65
      ],
      "address":"2231 Longridge Dr SW, North Glenmore Community Association, Calgary, AB T3E 5N5",
      "country":"Canada",
      "latLng":{
         "lat":50.997995,
         "lng":-114.112
      },
      "id":228
   },
   {
      "numbers":[
         97
      ],
      "address":"Skibhusvej 52B, et 2, 5000 Odense",
      "country":"Danemarca",
      "latLng":{
         "lat":55.404509,
         "lng":10.392701
      },
      "id":229
   },
   {
      "numbers":[
         98
      ],
      "address":"Byskellet 33, 6950 Ringkøbing",
      "country":"Danemarca",
      "latLng":{
         "lat":56.089554,
         "lng":8.258798
      },
      "id":230
   },
   {
      "numbers":[
         101
      ],
      "address":"DGI Huset Vejle Willy Sørensens Plads 5,  7100 Vejle",
      "country":"Danemarca",
      "latLng":{
         "lat":55.706446,
         "lng":9.516938
      },
      "id":231
   },
   {
      "numbers":[
         99
      ],
      "address":"Lysvang 29A, 6400 Sønderborg",
      "country":"Danemarca",
      "latLng":{
         "lat":54.918807,
         "lng":9.788742
      },
      "id":232
   },
   {
      "numbers":[
         107,
         108
      ],
      "address":"Businesscenter Swiss Star, Grubenstrasse 9, 8620 Wetzikon",
      "country":"Elveţia",
      "latLng":{
         "lat":47.314419,
         "lng":8.796869
      },
      "id":233
   },
   {
      "numbers":[
         95
      ],
      "address":"Nyhavnsgade 25, 6700 Esbjerg",
      "country":"Danemarca",
      "latLng":{
         "lat":55.472968,
         "lng":8.432971
      },
      "id":234
   },
   {
      "numbers":[
         96
      ],
      "address":"Grønnegade 10, et. 1, 4700 Næstved",
      "country":"Danemarca",
      "latLng":{
         "lat":55.232432,
         "lng":11.761479
      },
      "id":235
   },
   {
      "numbers":[
         120
      ],
      "address":"Hotel Pommern, Norragatan 10A, Mariehamn",
      "country":"Finlanda",
      "latLng":{
         "lat":60.098916,
         "lng":19.938843
      },
      "id":236
   },
   {
      "numbers":[
         87
      ],
      "address":"Aradippou Municipality, 8 Stadiou Street, PO Box 45024, 7110 Aradippou",
      "country":"Cipru",
      "latLng":{
         "lat":34.948747,
         "lng":33.586707
      },
      "id":237
   },
   {
      "numbers":[
         163
      ],
      "address":"Hotel Novotel 103, Av. du Prado, 13008 Marsilia",
      "country":"Franţa",
      "latLng":{
         "lat":43.280854,
         "lng":5.387158
      },
      "id":238
   },
   {
      "numbers":[
         245
      ],
      "address":"Cafe Pierre Loti, Ruschenweg 22, 85055 Ingolstadt",
      "country":"Germania",
      "latLng":{
         "lat":48.46365,
         "lng":11.26494
      },
      "id":239
   },
   {
      "numbers":[
         227
      ],
      "address":"Lindauer Strasse 2, 88239 Wangen im Allgau",
      "country":"Germania",
      "latLng":{
         "lat":47.685832,
         "lng":9.832159
      },
      "id":240
   },
   {
      "numbers":[
         240,
         241
      ],
      "address":"Fürther Str. 205/215, 90429 Nürnberg",
      "country":"Germania",
      "latLng":{
         "lat":49.27288,
         "lng":11.01596
      },
      "id":241
   },
   {
      "numbers":[
         79
      ],
      "address":"Colipi 794, Copiapo",
      "country":"Chile",
      "latLng":{
         "lat":-27.363311,
         "lng":-70.327675
      },
      "id":242
   },
   {
      "numbers":[
         190
      ],
      "address":"Backstrasse 12A, 63069 Offenbach am Main",
      "country":"Germania",
      "latLng":{
         "lat":50.089139,
         "lng":8.746653
      },
      "id":243
   },
   {
      "numbers":[
         662
      ],
      "address":"Calle Teowaldo Power, S204 - S222, 35100 Maspalomas",
      "country":"Germania",
      "latLng":{
         "lat":27.763184,
         "lng":-15.599593
      },
      "id":244
   },
   {
      "numbers":[
         175
      ],
      "address":"Amsinckstrasse 45, 20097 Hamburg",
      "country":"Germania",
      "latLng":{
         "lat":53.546101,
         "lng":10.015955
      },
      "id":245
   },
   {
      "numbers":[
         234
      ],
      "address":"Wikingerstr. 18a, 86343 Königsbrunn",
      "country":"Germania",
      "latLng":{
         "lat":48.17292,
         "lng":10.53306
      },
      "id":246
   },
   {
      "numbers":[
         255
      ],
      "address":"Str. Aristomenous nr. 41, etaj 1, 10440, Atena",
      "country":"Grecia",
      "latLng":{
         "lat":37.995533,
         "lng":23.723597
      },
      "id":247
   },
   {
      "numbers":[
         286
      ],
      "address":"Þórunnartún 1, 105 Reykjavík, Iceland, Fosshotel Reykjavik, Sala Gullfoss B",
      "country":"Islanda",
      "latLng":{
         "lat":64.144538,
         "lng":-21.909942
      },
      "id":248
   },
   {
      "numbers":[
         475
      ],
      "address":"Str Octavian Cirimpei nr 30, Edinet",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":48.174039,
         "lng":27.29196
      },
      "id":249
   },
   {
      "numbers":[
         453,
         454
      ],
      "address":"Str. București nr. 64, Chișinău",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":47.020136,
         "lng":28.83076
      },
      "id":250
   },
   {
      "numbers":[
         364
      ],
      "address":"Via Tolomei nr. 7, 53100, Siena",
      "country":"Italia",
      "latLng":{
         "lat":43.307182,
         "lng":11.33646
      },
      "id":251
   },
   {
      "numbers":[
         321
      ],
      "address":"Via G. Dal Piaz, 3, Padova",
      "country":"Italia",
      "latLng":{
         "lat":45.408669,
         "lng":11.84402
      },
      "id":252
   },
   {
      "numbers":[
         337
      ],
      "address":"Str. Sant`Anna II Tronco, cod poștal 89128, Reggio Calabria (Sala Polifunzionale, Palazzo CEDIR)",
      "country":"Italia",
      "latLng":{
         "lat":38.102076,
         "lng":15.655503
      },
      "id":253
   },
   {
      "numbers":[
         390
      ],
      "address":"Via Facciotto 7, 46100 MN, Mantova",
      "country":"Italia",
      "latLng":{
         "lat":45.14565,
         "lng":10.787069
      },
      "id":254
   },
   {
      "numbers":[
         382
      ],
      "address":"Via Paolo Gorini 21, 26900 Lodi",
      "country":"Italia",
      "latLng":{
         "lat":45.311491,
         "lng":9.507421
      },
      "id":255
   },
   {
      "numbers":[
         402
      ],
      "address":"Centro Polifunzionale \"Don Pier Giorgio Ferrero\",Via Santa Maria 27 bis, Moncalieri",
      "country":"Italia",
      "latLng":{
         "lat":44.99395,
         "lng":7.66555
      },
      "id":256
   },
   {
      "numbers":[
         403
      ],
      "address":"Centro Giovanile ArKa, Piazza Vincenzo Caselli nr.19, Chieri",
      "country":"Italia",
      "latLng":{
         "lat":45.01065,
         "lng":7.81891
      },
      "id":257
   },
   {
      "numbers":[
         687
      ],
      "address":"Centro Social Polivalente Hogar Virgen de las Reyes/calle Fray Isidoro de Sevilla s/n 41009 Sevilla",
      "country":"Spania",
      "latLng":{
         "lat":37.404598,
         "lng":-5.985548
      },
      "id":258
   },
   {
      "numbers":[
         445
      ],
      "address":"42 Triq IL-Hgejjeg, Bugibba Saint Paul's Bay 2826, Malta",
      "country":"Malta",
      "latLng":{
         "lat":35.948531,
         "lng":14.413002
      },
      "id":259
   },
   {
      "numbers":[
         410
      ],
      "address":"Via Cardinale Fietta nr. 7, etaj 1, Ivrea",
      "country":"Italia",
      "latLng":{
         "lat":45.4697,
         "lng":7.8819
      },
      "id":260
   },
   {
      "numbers":[
         793
      ],
      "address":"1555 Jay Street,  Lakewood, CO 8021",
      "country":"Sua",
      "latLng":{
         "lat":39.741685,
         "lng":-105.065377
      },
      "id":261
   },
   {
      "numbers":[
         558
      ],
      "address":"Area Cippenham, Earls Lane Street,  Slough, SL1 5TD",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.512628,
         "lng":-0.638055
      },
      "id":262
   },
   {
      "numbers":[
         594
      ],
      "address":"The Midlands Greek Cypriot Association, Magnet Centre, Park Approach, Birmingham B237SJ",
      "country":"Marea Britanie",
      "latLng":{
         "lat":52.305249,
         "lng":-1.520026
      },
      "id":263
   },
   {
      "numbers":[
         631,
         632
      ],
      "address":"Calle Pedro Salinas 11, 28043 Madrid",
      "country":"Spania",
      "latLng":{
         "lat":40.457582,
         "lng":-3.662671
      },
      "id":264
   },
   {
      "numbers":[
         722
      ],
      "address":"Plaza Joaquin Costa nr. 14 Calatayud 20300",
      "country":"Spania",
      "latLng":{
         "lat":41.353185,
         "lng":-1.641883
      },
      "id":265
   },
   {
      "numbers":[
         576,
         577
      ],
      "address":"Swindon Party Warehouse (East) Cheney Manor SN2 2PJ",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.571794,
         "lng":-1.805342
      },
      "id":266
   },
   {
      "numbers":[
         574,
         575
      ],
      "address":"Biserica Penticostala Romana, Stockwood Road, Bristol BS14 8HS",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.41296,
         "lng":-2.54745
      },
      "id":267
   },
   {
      "numbers":[
         214
      ],
      "address":"Blumenstr. 33, 69214 Eppelheim",
      "country":"Germania",
      "latLng":{
         "lat":49.399754,
         "lng":8.631267
      },
      "id":268
   },
   {
      "numbers":[
         215
      ],
      "address":"Georg-Christian-von-Kessler-Platz 2, 73728 Esslingen am Neckar",
      "country":"Germania",
      "latLng":{
         "lat":48.743082,
         "lng":9.306588
      },
      "id":269
   },
   {
      "numbers":[
         217
      ],
      "address":"Untere Laube 24, 78462 Konstanz",
      "country":"Germania",
      "latLng":{
         "lat":47.663072,
         "lng":9.172491
      },
      "id":270
   },
   {
      "numbers":[
         100
      ],
      "address":"Pile Alle 18, 2630 Taastrup",
      "country":"Danemarca",
      "latLng":{
         "lat":55.647349,
         "lng":12.295802
      },
      "id":271
   },
   {
      "numbers":[
         185
      ],
      "address":"Fleethörn 9, 24103 Kiel",
      "country":"Germania",
      "latLng":{
         "lat":54.32408,
         "lng":10.13008
      },
      "id":272
   },
   {
      "numbers":[
         738,
         739
      ],
      "address":"Calle Victor Palomo, S/N, Universidad de Mayores, 04740, Roquetas de Mar, provincia Almeria",
      "country":"Spania",
      "latLng":{
         "lat":36.766782,
         "lng":-2.608766
      },
      "id":273
   },
   {
      "numbers":[
         742,
         743
      ],
      "address":"Calle Cervantes, no.64, 04700, El Ejido, provincia Almeria",
      "country":"Spania",
      "latLng":{
         "lat":36.774001,
         "lng":-2.816607
      },
      "id":274
   },
   {
      "numbers":[
         740
      ],
      "address":"Calle Seneca, no.13, 04740, Roquetas de Mar, provincia Almeria",
      "country":"Spania",
      "latLng":{
         "lat":36.766531,
         "lng":-2.61359
      },
      "id":275
   },
   {
      "numbers":[
         13
      ],
      "address":"32-34 Rosa Street, Goodwood South Australia, 5034",
      "country":"Australia",
      "latLng":{
         "lat":-34.950822,
         "lng":138.590521
      },
      "id":276
   },
   {
      "numbers":[
         14
      ],
      "address":"1 ST.Georges Terrace, Perth, Western Australia 6000, Duxton Hotel",
      "country":"Australia",
      "latLng":{
         "lat":-31.957903,
         "lng":115.864682
      },
      "id":277
   },
   {
      "numbers":[
         745
      ],
      "address":"Calle Andrés Segovia, 60, 18007, Centro Cívico Zaidín - Intrarea Calle Torres de las Damas, Granada, provincia Granada",
      "country":"Spania",
      "latLng":{
         "lat":37.158015,
         "lng":-3.595793
      },
      "id":278
   },
   {
      "numbers":[
         692
      ],
      "address":"Alcaldia de Barrio San Roque, calle Sevilla 8, 21440, Lepe",
      "country":"Spania",
      "latLng":{
         "lat":37.251944,
         "lng":-7.20723
      },
      "id":279
   },
   {
      "numbers":[
         688
      ],
      "address":"Centro Civico Poniente SUR (Distrito Poniente Sur) calle Camino Viejo Almodovar s/n (Junta Plaza de Toros), Cordoba 14005",
      "country":"Spania",
      "latLng":{
         "lat":37.881144,
         "lng":-4.79544
      },
      "id":280
   },
   {
      "numbers":[
         754
      ],
      "address":"4112 Union Street Old Hickory, TN 37138",
      "country":"Sua",
      "latLng":{
         "lat":36.224547,
         "lng":-86.62664
      },
      "id":281
   },
   {
      "numbers":[
         771
      ],
      "address":"3126 Racine Ave., Norfolk, VA 23509",
      "country":"Sua",
      "latLng":{
         "lat":36.877367,
         "lng":-76.26468
      },
      "id":282
   },
   {
      "numbers":[
         796
      ],
      "address":"798, 109th Avenue North, Naples, FL 34108",
      "country":"Sua",
      "latLng":{
         "lat":26.270475,
         "lng":-81.8058
      },
      "id":283
   },
   {
      "numbers":[
         787
      ],
      "address":"4856 El Camino Real, Los Altos, CA 94022",
      "country":"Sua",
      "latLng":{
         "lat":37.398549,
         "lng":-122.1093
      },
      "id":284
   },
   {
      "numbers":[
         784
      ],
      "address":"1770 W Cerritos Avenue, Anaheim, CA 92804",
      "country":"Sua",
      "latLng":{
         "lat":33.810271,
         "lng":-117.945
      },
      "id":285
   },
   {
      "numbers":[
         16
      ],
      "address":"4 Ponderosa Street, Hillcrest 4118, Queensland",
      "country":"Australia",
      "latLng":{
         "lat":-27.665442,
         "lng":153.029816
      },
      "id":286
   },
   {
      "numbers":[
         17
      ],
      "address":"Europe House, Etajul 16 AUT Building, 56 Wakefield Street, Auckland",
      "country":"Noua Zeelandă",
      "latLng":{
         "lat":-36.854041,
         "lng":174.765594
      },
      "id":287
   },
   {
      "numbers":[
         777
      ],
      "address":"945 N Edgewood Avenue, Wood Dale, IL 60191",
      "country":"Sua",
      "latLng":{
         "lat":41.58536,
         "lng":-87.57479
      },
      "id":288
   },
   {
      "numbers":[
         766
      ],
      "address":"Oficina del Turismo, Paseo Vistalegre s/n, Torrevieja CP 03181",
      "country":"Spania",
      "latLng":{
         "lat":37.975242,
         "lng":-0.683406
      },
      "id":289
   },
   {
      "numbers":[
         764
      ],
      "address":"Centro Juvel Carrús, Calle Antonio Brotons Pastor 72, Elche, CP 03205",
      "country":"Spania",
      "latLng":{
         "lat":38.270392,
         "lng":-0.713532
      },
      "id":290
   },
   {
      "numbers":[
         34
      ],
      "address":"Hotel Messmer, Kornmarkstraße 16, 6900 Bregenz",
      "country":"Austria",
      "latLng":{
         "lat":47.504689,
         "lng":9.748438
      },
      "id":291
   },
   {
      "numbers":[
         762
      ],
      "address":"Casa de les Dones de Xátiva, Plaza Españoleto 15, Játiva (Xátiva) CP 46800",
      "country":"Spania",
      "latLng":{
         "lat":38.987532,
         "lng":-0.52418
      },
      "id":292
   },
   {
      "numbers":[
         760
      ],
      "address":"Hotel Valencia Congress,  Calle Botigueres 49, Paterna CP 46980",
      "country":"Spania",
      "latLng":{
         "lat":39.512149,
         "lng":-0.443914
      },
      "id":293
   },
   {
      "numbers":[
         759
      ],
      "address":"Casa de Cultura, Antic Carrer de Mossen Sicra, 17 Torrent, CP 46900",
      "country":"Spania",
      "latLng":{
         "lat":39.436781,
         "lng":-0.464144
      },
      "id":294
   },
   {
      "numbers":[
         757
      ],
      "address":"Hotel Medium Valencia, Avinguda d'Amado Granell Mesado, 48, 46013 València, Valencia",
      "country":"Spania",
      "latLng":{
         "lat":39.455894,
         "lng":-0.363295
      },
      "id":295
   },
   {
      "numbers":[
         754
      ],
      "address":"Calle Farola 24, Grao de Burriana, Burriana CP 12530",
      "country":"Spania",
      "latLng":{
         "lat":39.87748,
         "lng":-0.053449
      },
      "id":296
   },
   {
      "numbers":[
         753
      ],
      "address":"Mercado Municipal, Plaza del Mercado Municipal, Primera Planta, Almazora, CP 12550",
      "country":"Spania",
      "latLng":{
         "lat":39.944784,
         "lng":-0.063577
      },
      "id":297
   },
   {
      "numbers":[
         55,
         56
      ],
      "address":"Dôme, 2 Rue des Olympiades, 6000 Charleroi, Belgia",
      "country":"Belgia",
      "latLng":{
         "lat":50.423956,
         "lng":4.446244
      },
      "id":298
   },
   {
      "numbers":[
         711
      ],
      "address":"Palacio de Exposiciones y Congresos, Calle Arturo Álvarez Buylla, s/n, 33005 Oviedo, Asturias",
      "country":"Spania",
      "latLng":{
         "lat":43.358499,
         "lng":-5.860439
      },
      "id":299
   },
   {
      "numbers":[
         638
      ],
      "address":"Calle de Gonzalo de Córdoba, 11, 28830 San Fernando de Henares",
      "country":"Spania",
      "latLng":{
         "lat":40.424047,
         "lng":-3.534065
      },
      "id":300
   },
   {
      "numbers":[
         668
      ],
      "address":"Espai Empresarial ”Gran Firal”, Carrer d'Alemanya, nr. 16, 17600 Figueres",
      "country":"Spania",
      "latLng":{
         "lat":42.262597,
         "lng":2.979055
      },
      "id":301
   },
   {
      "numbers":[
         584
      ],
      "address":"The Point, 4 Venns Lane, Hereford, HR1 1DT",
      "country":"Marea Britanie",
      "latLng":{
         "lat":52.068286,
         "lng":-2.705092
      },
      "id":302
   },
   {
      "numbers":[
         583
      ],
      "address":"Comcen House, Swansea, SA5 4HS",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.644846,
         "lng":-3.996057
      },
      "id":303
   },
   {
      "numbers":[
         603
      ],
      "address":"HANA, 44 Portland Street,  Kingston upon Hull (Hull), HU2 8JX",
      "country":"Marea Britanie",
      "latLng":{
         "lat":53.44493,
         "lng":-0.205451
      },
      "id":304
   },
   {
      "numbers":[
         601
      ],
      "address":"Carnegie Building, Atkinson Road, Benwell, Newcastle upon Tyne, NE4 8XS , Newcastle upon Tyne",
      "country":"Marea Britanie",
      "latLng":{
         "lat":54.581265,
         "lng":-1.394141
      },
      "id":305
   },
   {
      "numbers":[
         599
      ],
      "address":"Castle Cavendish Works, Dorking Road, Nottingham, NG7 5PN",
      "country":"Marea Britanie",
      "latLng":{
         "lat":52.573996,
         "lng":-1.103009
      },
      "id":306
   },
   {
      "numbers":[
         597
      ],
      "address":"University of Wolverhampton, Science Park Site, Technology Centre, Glaisher Drive, WV10 9RU",
      "country":"Marea Britanie",
      "latLng":{
         "lat":52.35429,
         "lng":-2.414592
      },
      "id":307
   },
   {
      "numbers":[
         596
      ],
      "address":"Centre AT7, Bell Green Road, Coventry, CV6 7GP",
      "country":"Marea Britanie",
      "latLng":{
         "lat":52.255984,
         "lng":-1.284908
      },
      "id":308
   },
   {
      "numbers":[
         588
      ],
      "address":"Cotton Court Business Centre, Church Street, Preston, PR1 3BY",
      "country":"Marea Britanie",
      "latLng":{
         "lat":53.453491,
         "lng":-2.413107
      },
      "id":309
   },
   {
      "numbers":[
         608
      ],
      "address":"Belle Sports, Hay Street PH1 5HS Perth",
      "country":"Marea Britanie",
      "latLng":{
         "lat":56.402,
         "lng":-3.4366
      },
      "id":310
   },
   {
      "numbers":[
         606
      ],
      "address":"111 Killin Street,  Glasgow G32 9AH",
      "country":"Marea Britanie",
      "latLng":{
         "lat":55.8502,
         "lng":-4.1598
      },
      "id":311
   },
   {
      "numbers":[
         134
      ],
      "address":"Salle Convention 1, 6-8, rue de la Convention",
      "country":"Franţa",
      "latLng":{
         "lat":48.845436,
         "lng":2.278221
      },
      "id":312
   },
   {
      "numbers":[
         534
      ],
      "address":"Largo da República, 2414-006 Leiria",
      "country":"Portugalia",
      "latLng":{
         "lat":39.740979,
         "lng":-8.810108
      },
      "id":313
   },
   {
      "numbers":[
         536
      ],
      "address":"Paços do Concelho Séc. XXI, Praça do Município, 8600-293 Lagos",
      "country":"Portugalia",
      "latLng":{
         "lat":37.10831,
         "lng":-8.678093
      },
      "id":314
   },
   {
      "numbers":[
         529
      ],
      "address":"Str. Piekarnicza nr. 16, 80-126, Gdansk",
      "country":"Polonia",
      "latLng":{
         "lat":54.352083,
         "lng":18.586236
      },
      "id":315
   },
   {
      "numbers":[
         520,
         521
      ],
      "address":"Marathonloop 1, 5235 AA 's-Hertogenbosch",
      "country":"Netherlands",
      "latLng":{
         "lat":51.722914,
         "lng":5.315365
      },
      "id":316
   },
   {
      "numbers":[
         509,
         510
      ],
      "address":"Melanchtonweg 70, 3052 KV Rotterdam",
      "country":"Netherlands",
      "latLng":{
         "lat":51.948728,
         "lng":4.471924
      },
      "id":317
   },
   {
      "numbers":[
         506,
         507
      ],
      "address":"Afrikaanderplein 7, 3072 EA Rotterdam",
      "country":"Netherlands",
      "latLng":{
         "lat":51.901106,
         "lng":4.502677
      },
      "id":318
   },
   {
      "numbers":[
         500,
         501
      ],
      "address":"Burgerweeshuispad 54, 1076 EP Amsterdam",
      "country":"Netherlands",
      "latLng":{
         "lat":52.339675,
         "lng":4.853754
      },
      "id":319
   },
   {
      "numbers":[
         504,
         505
      ],
      "address":"De Werf 11, 2544 EH, Haga",
      "country":"Netherlands",
      "latLng":{
         "lat":52.044201,
         "lng":4.246991
      },
      "id":320
   },
   {
      "numbers":[
         495
      ],
      "address":"Kaigata 6, 9008 Tromsø",
      "country":"Norvegia",
      "latLng":{
         "lat":69.38511,
         "lng":18.57243
      },
      "id":321
   },
   {
      "numbers":[
         494
      ],
      "address":"Olav Tryggvasons Gate 40, 7011 Trondheim, Trøndelag",
      "country":"Norvegia",
      "latLng":{
         "lat":63.26003,
         "lng":10.23391
      },
      "id":322
   },
   {
      "numbers":[
         488
      ],
      "address":"Maria Bebudelses Gresk Orthodoks Kirke, Thor Olsens gate 9, 0177 Oslo",
      "country":"Norvegia",
      "latLng":{
         "lat":59.55056,
         "lng":10.44482
      },
      "id":323
   },
   {
      "numbers":[
         803
      ],
      "address":"1 Audobon Street, Wakefield Boston, NY",
      "country":"Sua",
      "latLng":{
         "lat":42.513992,
         "lng":-71.039603
      },
      "id":324
   },
   {
      "numbers":[
         489
      ],
      "address":"Skolealleen 2, 2166 Oppakermoen/ Akershus",
      "country":"Norvegia",
      "latLng":{
         "lat":60.10462,
         "lng":11.30467
      },
      "id":325
   },
   {
      "numbers":[
         469
      ],
      "address":"Str. Mihai Eminescu nr. 37, Strășeni",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":47.144981,
         "lng":28.613925
      },
      "id":326
   },
   {
      "numbers":[
         423
      ],
      "address":"Via Mascherpa nr.34R, Genova",
      "country":"Italia",
      "latLng":{
         "lat":44.39705,
         "lng":8.94478
      },
      "id":327
   },
   {
      "numbers":[
         420
      ],
      "address":"Sala Polifunzionale Mons. F. Remotti, Via Milazzo angolo Via Legnano, Tortona",
      "country":"Italia",
      "latLng":{
         "lat":44.8931,
         "lng":8.85903
      },
      "id":328
   },
   {
      "numbers":[
         219
      ],
      "address":"Mathildenstraße 13/1, 71638 Ludwigsburg",
      "country":"Germania",
      "latLng":{
         "lat":48.894058,
         "lng":9.189781
      },
      "id":329
   },
   {
      "numbers":[
         220
      ],
      "address":"Traitteur Str. 63, 68165 Mannheim",
      "country":"Germania",
      "latLng":{
         "lat":49.478763,
         "lng":8.481909
      },
      "id":330
   },
   {
      "numbers":[
         221
      ],
      "address":"Heimburgstr. 2, 77656 Offenburg",
      "country":"Germania",
      "latLng":{
         "lat":48.464234,
         "lng":7.925178
      },
      "id":331
   },
   {
      "numbers":[
         222
      ],
      "address":"Osterfeldstr. 12, 75172 Pforzheim",
      "country":"Germania",
      "latLng":{
         "lat":48.8931,
         "lng":8.688669
      },
      "id":332
   },
   {
      "numbers":[
         223
      ],
      "address":"Badener Str. 70, 76437 Rastatt",
      "country":"Germania",
      "latLng":{
         "lat":48.834567,
         "lng":8.196655
      },
      "id":333
   },
   {
      "numbers":[
         189
      ],
      "address":"Anne-Frank-Schule Eberhard-van- Rochow-Strasse 63069 Offenbach am Mai~",
      "country":"Germania",
      "latLng":{
         "lat":50.084342,
         "lng":8.767384
      },
      "id":334
   },
   {
      "numbers":[
         224
      ],
      "address":"Ringelbachstr. 195/41, 72762 Reutlingen",
      "country":"Germania",
      "latLng":{
         "lat":48.477157,
         "lng":9.19842
      },
      "id":335
   },
   {
      "numbers":[
         225
      ],
      "address":"Am Markt 6, 74523 Schwäbisch Hall",
      "country":"Germania",
      "latLng":{
         "lat":49.112548,
         "lng":9.736911
      },
      "id":336
   },
   {
      "numbers":[
         191
      ],
      "address":"Turnhalle der Abendhaupt- und Realschule (Uhlandschule), Hanauer Lanclstralsse 26, 60314 Frankfurt am Main",
      "country":"Germania",
      "latLng":{
         "lat":50.112479,
         "lng":8.698215
      },
      "id":337
   },
   {
      "numbers":[
         226
      ],
      "address":"Goethestr. 7, 78647 Trossingen",
      "country":"Germania",
      "latLng":{
         "lat":48.07274,
         "lng":8.639425
      },
      "id":338
   },
   {
      "numbers":[
         242
      ],
      "address":"Sportverein Pulling e.V.,  Sünzhauser Str. 2, 85354 Pulling-Freising",
      "country":"Germania",
      "latLng":{
         "lat":48.22082,
         "lng":11.42036
      },
      "id":339
   },
   {
      "numbers":[
         243
      ],
      "address":"1. Radler Club Heidingsfeld, Radlersaal, Seegartenweg 3, 97084 Würzburg-Heidingsfeld",
      "country":"Germania",
      "latLng":{
         "lat":49.4523,
         "lng":9.57012
      },
      "id":340
   },
   {
      "numbers":[
         244
      ],
      "address":"Adriana Fit Club, Liebigstr. 16, 85757 Karlsfeld-Dachau",
      "country":"Germania",
      "latLng":{
         "lat":48.13453,
         "lng":11.29143
      },
      "id":341
   },
   {
      "numbers":[
         761
      ],
      "address":"Plaza Rei en Jaume 6, Bajo, Gandia, CP 467081",
      "country":"Spania",
      "latLng":{
         "lat":38.966007,
         "lng":-0.181783
      },
      "id":342
   },
   {
      "numbers":[
         182
      ],
      "address":"Markt 1, 49610, Quakenbrück",
      "country":"Germania",
      "latLng":{
         "lat":52.676263,
         "lng":7.95702
      },
      "id":343
   },
   {
      "numbers":[
         769
      ],
      "address":"9520 Faires Farm Road, Charlotte, NC 28213",
      "country":"Sua",
      "latLng":{
         "lat":35.29571,
         "lng":-80.721208
      },
      "id":344
   },
   {
      "numbers":[
         246
      ],
      "address":"Schweiklberg 1, 94474 Vilshofen bei Passau",
      "country":"Germania",
      "latLng":{
         "lat":48.37463,
         "lng":13.10344
      },
      "id":345
   },
   {
      "numbers":[
         247
      ],
      "address":"Pfarrei zu Unserer Lieben Frau, Münsterplatz 4, 86609 Donauwörth",
      "country":"Germania",
      "latLng":{
         "lat":48.43086,
         "lng":10.46377
      },
      "id":346
   },
   {
      "numbers":[
         248
      ],
      "address":"Joseph-von-Fraunhofer-Halle, Am Hagen 75, 94315 Straubing",
      "country":"Germania",
      "latLng":{
         "lat":48.53152,
         "lng":12.33423
      },
      "id":347
   },
   {
      "numbers":[
         249
      ],
      "address":"Musikübungsraum -Turnhalle, Schule am Lodererplatz, Lodererplatz 14, 85435 Erding",
      "country":"Germania",
      "latLng":{
         "lat":48.18322,
         "lng":11.54392
      },
      "id":348
   },
   {
      "numbers":[
         250
      ],
      "address":"Bukowina-Institut Augsburg e.V. Alter Postweg 97A, 86159 Augsburg",
      "country":"Germania",
      "latLng":{
         "lat":48.20223,
         "lng":10.54004
      },
      "id":349
   },
   {
      "numbers":[
         251
      ],
      "address":"Von Gravenreuth Str. 2a, Affing",
      "country":"Germania",
      "latLng":{
         "lat":48.27297,
         "lng":10.58511
      },
      "id":350
   },
   {
      "numbers":[
         195
      ],
      "address":"Haupstrasse 52, 59269 Beckum",
      "country":"Germania",
      "latLng":{
         "lat":51.798556,
         "lng":8.024605
      },
      "id":351
   },
   {
      "numbers":[
         741
      ],
      "address":"Calle Manuel Machado, no.5-7, 04740, Roquetas de Mar, provincia Almeria",
      "country":"Spania",
      "latLng":{
         "lat":36.765219,
         "lng":-2.614109
      },
      "id":352
   },
   {
      "numbers":[
         177
      ],
      "address":"Rathausplatz 1, 01067, Dresden",
      "country":"Germania",
      "latLng":{
         "lat":51.047809,
         "lng":13.741458
      },
      "id":353
   },
   {
      "numbers":[
         179
      ],
      "address":"Madamenweg 77, 38120, Braunschweig",
      "country":"Germania",
      "latLng":{
         "lat":52.258734,
         "lng":10.482844
      },
      "id":354
   },
   {
      "numbers":[
         180
      ],
      "address":"Werner-Seelenbinder-Straße 14, 99096 Erfurt",
      "country":"Germania",
      "latLng":{
         "lat":50.958265,
         "lng":11.042177
      },
      "id":355
   },
   {
      "numbers":[
         181
      ],
      "address":"Ludmillenhof 49751, Sögel",
      "country":"Germania",
      "latLng":{
         "lat":52.837016,
         "lng":7.515846
      },
      "id":356
   },
   {
      "numbers":[
         183
      ],
      "address":"An der Weide 50, 28195 Bremen",
      "country":"Germania",
      "latLng":{
         "lat":53.081357,
         "lng":8.816007
      },
      "id":357
   },
   {
      "numbers":[
         184
      ],
      "address":"Bei der Lohmühle 13, 23554 Lübeck",
      "country":"Germania",
      "latLng":{
         "lat":53.881242,
         "lng":10.669305
      },
      "id":358
   },
   {
      "numbers":[
         758
      ],
      "address":"Asociația \"Pro Datina\" Valencia, Calle Noguera 9, Valencia, CP 46023",
      "country":"Spania",
      "latLng":{
         "lat":39.461924,
         "lng":-0.341853
      },
      "id":359
   },
   {
      "numbers":[
         188
      ],
      "address":"Elisabeth-Breuer-Str. 48, 51065 Köln",
      "country":"Germania",
      "latLng":{
         "lat":50.961973,
         "lng":7.01263
      },
      "id":360
   },
   {
      "numbers":[
         192
      ],
      "address":"Brinkmannstrasse 5, 40200 Düsseldorf",
      "country":"Germania",
      "latLng":{
         "lat":51.203145,
         "lng":6.787022
      },
      "id":361
   },
   {
      "numbers":[
         672
      ],
      "address":"Hotel Ultonia, Gran Via de Jaume I, 22, 17001 Girona",
      "country":"Spania",
      "latLng":{
         "lat":41.985275,
         "lng":2.82126
      },
      "id":362
   },
   {
      "numbers":[
         193
      ],
      "address":"Am Trappen 1, 44879 Bochum",
      "country":"Germania",
      "latLng":{
         "lat":51.425436,
         "lng":7.146254
      },
      "id":363
   },
   {
      "numbers":[
         667
      ],
      "address":"Centro de Negocios SBC Vilamari, Carrer Vilamari 86, 08015 Barcelona",
      "country":"Spania",
      "latLng":{
         "lat":41.37943,
         "lng":2.149095
      },
      "id":364
   },
   {
      "numbers":[
         194
      ],
      "address":"Haupstrasse 208, 44649 Herne",
      "country":"Germania",
      "latLng":{
         "lat":51.529215,
         "lng":7.160392
      },
      "id":365
   },
   {
      "numbers":[
         59
      ],
      "address":"Centrul Kinepolis, Ter Platen 12, 9000 Gent",
      "country":"Belgia",
      "latLng":{
         "lat":51.040578,
         "lng":3.729953
      },
      "id":366
   },
   {
      "numbers":[
         196
      ],
      "address":"Hohenzollernstr. 15, 33330 Gütersloch",
      "country":"Germania",
      "latLng":{
         "lat":51.908198,
         "lng":8.375101
      },
      "id":367
   },
   {
      "numbers":[
         197
      ],
      "address":"Römerbrünnen 2-4, 41238 Mönchengladbach",
      "country":"Germania",
      "latLng":{
         "lat":51.149928,
         "lng":6.464894
      },
      "id":368
   },
   {
      "numbers":[
         198
      ],
      "address":"Oesterstr. 18, 33428 Harsewinkel",
      "country":"Germania",
      "latLng":{
         "lat":51.524923,
         "lng":7.551472
      },
      "id":369
   },
   {
      "numbers":[
         666
      ],
      "address":"Hotel SB Diagonal Zero, Plaza Levant, s/n, 08019, Barcelona",
      "country":"Spania",
      "latLng":{
         "lat":41.412064,
         "lng":2.219465
      },
      "id":370
   },
   {
      "numbers":[
         199
      ],
      "address":"Hattsteiner Allee 14A, 61250 Hochtaunus-Usingen",
      "country":"Germania",
      "latLng":{
         "lat":50.33861,
         "lng":8.530355
      },
      "id":371
   },
   {
      "numbers":[
         200
      ],
      "address":"Philosophenstraße 26, 35396 Gießen",
      "country":"Germania",
      "latLng":{
         "lat":50.602247,
         "lng":8.707169
      },
      "id":372
   },
   {
      "numbers":[
         201
      ],
      "address":"Waltraudenstr. 34, 67059 Ludwigshafen am Rhein",
      "country":"Germania",
      "latLng":{
         "lat":49.481869,
         "lng":8.426089
      },
      "id":373
   },
   {
      "numbers":[
         202
      ],
      "address":"In den Moselauen 1, 54294 Trier",
      "country":"Germania",
      "latLng":{
         "lat":49.740535,
         "lng":6.622149
      },
      "id":374
   },
   {
      "numbers":[
         203
      ],
      "address":"Wormser Straße 201, 55130 Mainz",
      "country":"Germania",
      "latLng":{
         "lat":49.9759,
         "lng":8.312484
      },
      "id":375
   },
   {
      "numbers":[
         204
      ],
      "address":"Burbacher-Markt 20, 66115 Saarbrücken",
      "country":"Germania",
      "latLng":{
         "lat":49.242196,
         "lng":6.946656
      },
      "id":376
   },
   {
      "numbers":[
         261,
         262
      ],
      "address":"Bdl. Stratou, Poarta nr. 2, Centrul Expozițional HelExpo",
      "country":"Grecia",
      "latLng":{
         "lat":40.640696,
         "lng":22.944331
      },
      "id":377
   },
   {
      "numbers":[
         257
      ],
      "address":"Str. Agiou Nikonos nr. 124, 23100, Sparta",
      "country":"Grecia",
      "latLng":{
         "lat":37.076198,
         "lng":22.431077
      },
      "id":378
   },
   {
      "numbers":[
         258
      ],
      "address":"Leof. Ikarou nr. 9, 71306, Iraklion, insula Creta",
      "country":"Grecia",
      "latLng":{
         "lat":35.338889,
         "lng":25.145233
      },
      "id":379
   },
   {
      "numbers":[
         259
      ],
      "address":"Platia Eleftherias 1, 73134, Chania, insula Creta",
      "country":"Grecia",
      "latLng":{
         "lat":35.517835,
         "lng":24.01826
      },
      "id":380
   },
   {
      "numbers":[
         260
      ],
      "address":"Str. Louka Mpelou nr. 1, etaj 2, 32200, Thiva",
      "country":"Grecia",
      "latLng":{
         "lat":38.321513,
         "lng":23.317106
      },
      "id":381
   },
   {
      "numbers":[
         279
      ],
      "address":"Pembroke Hotel, 11 Patrick Street, Gardens, Kilkenny",
      "country":"Irlanda",
      "latLng":{
         "lat":52.38584,
         "lng":-7.1505
      },
      "id":382
   },
   {
      "numbers":[
         280
      ],
      "address":"Greenhils Hotel, Ennis Road, Limerick, Co. Limerick",
      "country":"Irlanda",
      "latLng":{
         "lat":52.40257,
         "lng":-8.40139
      },
      "id":383
   },
   {
      "numbers":[
         292
      ],
      "address":"Piazza della Stazione Vecchia, N. 26, 00122 Lido di Ostia, RM",
      "country":"Italia",
      "latLng":{
         "lat":41.730893,
         "lng":12.27993
      },
      "id":384
   },
   {
      "numbers":[
         293
      ],
      "address":"Via Maurizio Moris, N. 7, 00012, Guidonia Montecelio",
      "country":"Italia",
      "latLng":{
         "lat":41.991707,
         "lng":12.72214
      },
      "id":385
   },
   {
      "numbers":[
         301
      ],
      "address":"Centro Sociale Comunale per Anziani di Monterotondo - Via John Fitzgerald Kennedy, 47, 00015 Monterotondo",
      "country":"Italia",
      "latLng":{
         "lat":42.054202,
         "lng":12.618159
      },
      "id":386
   },
   {
      "numbers":[
         302
      ],
      "address":"Pala Verde - Via della Stella, SNC, 00036, Palestrina",
      "country":"Italia",
      "latLng":{
         "lat":41.842581,
         "lng":12.865653
      },
      "id":387
   },
   {
      "numbers":[
         303
      ],
      "address":"Ex-Chiesa delle Grazie - Via Anfiteatro Romano, N. 18, 00041 Albano Laziale, Lazio",
      "country":"Italia",
      "latLng":{
         "lat":41.73183,
         "lng":12.658922
      },
      "id":388
   },
   {
      "numbers":[
         304
      ],
      "address":"Auditorium Paolo Colapietro - Via Giovan Battista Grappelli, n. 3, 03100 Frosinone",
      "country":"Italia",
      "latLng":{
         "lat":41.635204,
         "lng":13.337616
      },
      "id":389
   },
   {
      "numbers":[
         305
      ],
      "address":"Palazzo Civico - Via Roma, N. 145, 09124 Cagliari, Sardinia",
      "country":"Italia",
      "latLng":{
         "lat":39.215271,
         "lng":9.110435
      },
      "id":390
   },
   {
      "numbers":[
         306
      ],
      "address":"Viale XVIII Dicembre, N. 124, 04100 Latina",
      "country":"Italia",
      "latLng":{
         "lat":41.471367,
         "lng":12.904659
      },
      "id":391
   },
   {
      "numbers":[
         307
      ],
      "address":"Ex Chiesa di San Michele - Piazza Palatina, Nr. 1, 00019 Tivoli",
      "country":"Italia",
      "latLng":{
         "lat":41.964276,
         "lng":12.799163
      },
      "id":392
   },
   {
      "numbers":[
         311
      ],
      "address":"Via Della Turisella, 3, Cervignano del Friuli",
      "country":"Italia",
      "latLng":{
         "lat":45.815829,
         "lng":13.348742
      },
      "id":393
   },
   {
      "numbers":[
         314
      ],
      "address":"Via Daniele Manin, 5, Prata di Pordenone",
      "country":"Italia",
      "latLng":{
         "lat":45.891,
         "lng":12.593024
      },
      "id":394
   },
   {
      "numbers":[
         749
      ],
      "address":"Eurohotel Castelló, Calle Pintor Olient 9, Castelló de la Plana CP 12006",
      "country":"Spania",
      "latLng":{
         "lat":39.988757,
         "lng":-0.051225
      },
      "id":395
   },
   {
      "numbers":[
         750
      ],
      "address":"Antigua Estación de Ferrocaril del Norte, Plaza España nr. 1, Castelló de la Plana, CP 12006",
      "country":"Spania",
      "latLng":{
         "lat":39.987232,
         "lng":-0.047582
      },
      "id":396
   },
   {
      "numbers":[
         751
      ],
      "address":"Casa dels Mundina - Departamento de Educacion,  Carrer Major Sant Jaume 39, Vila-real CP 12540",
      "country":"Spania",
      "latLng":{
         "lat":39.93832,
         "lng":-0.099695
      },
      "id":397
   },
   {
      "numbers":[
         706,
         707
      ],
      "address":"Calle Presidente Calvo Sotelo 3, 26001, Logroño, La Rioja",
      "country":"Italia",
      "latLng":{
         "lat":42.464263,
         "lng":-2.443289
      },
      "id":398
   },
   {
      "numbers":[
         804
      ],
      "address":"4757 41 Street, Sunnyside, New York",
      "country":"Sua",
      "latLng":{
         "lat":40.740396,
         "lng":-73.923845
      },
      "id":399
   },
   {
      "numbers":[
         701
      ],
      "address":"Sala del Palacio de Congresos Adolfo Suarez/Calle José Meliá 2, 29601 Marbella",
      "country":"Spania",
      "latLng":{
         "lat":36.509739,
         "lng":-4.901956
      },
      "id":400
   },
   {
      "numbers":[
         700
      ],
      "address":"Calle Alvarez Leiva 8, Salon de Plenos Aiuntamiento de Manilva, CP 29691, Manilva",
      "country":"Spania",
      "latLng":{
         "lat":36.375996,
         "lng":-5.247281
      },
      "id":401
   },
   {
      "numbers":[
         699
      ],
      "address":"Plaza de la Hacienda S/N, 21720, Centro Cultural Odon Betanzos Palacios, Rociana del Condado/Huelva",
      "country":"Spania",
      "latLng":{
         "lat":37.307944,
         "lng":-6.597957
      },
      "id":402
   },
   {
      "numbers":[
         698
      ],
      "address":"Sala de Comisiones del Centro de Diversidad Cultural de Doñana, calle Carretera del Rocio s/n, Almonte",
      "country":"Spania",
      "latLng":{
         "lat":37.042763,
         "lng":-6.434457
      },
      "id":403
   },
   {
      "numbers":[
         697
      ],
      "address":"Centro Social los Desniveles, calle San Bartolome de la Torre 1, CP 21005, Huelva",
      "country":"Spania",
      "latLng":{
         "lat":37.278616,
         "lng":-6.943171
      },
      "id":404
   },
   {
      "numbers":[
         696
      ],
      "address":"Aula de Formación calle Bodega Escuela Taller de la Calle Santo Domingo, 14, Cp 21800, Moguer",
      "country":"Spania",
      "latLng":{
         "lat":37.273662,
         "lng":-6.841088
      },
      "id":405
   },
   {
      "numbers":[
         805
      ],
      "address":"56 Andrews Street, Victor, NY 14564-1262",
      "country":"Sua",
      "latLng":{
         "lat":42.982327,
         "lng":-77.404683
      },
      "id":406
   },
   {
      "numbers":[
         735
      ],
      "address":"Calle Mártires de Ocaña,  13, local: 3, 45300  Ocaña, provincia Toledo",
      "country":"Spania",
      "latLng":{
         "lat":39.956331,
         "lng":-3.498824
      },
      "id":407
   },
   {
      "numbers":[
         734
      ],
      "address":"Pabellón Polideportivo Municipal Santa Ana, Calle Santa Ana, 126, 45710 Madridejos, provincia Toledo",
      "country":"Spania",
      "latLng":{
         "lat":39.466615,
         "lng":-3.52438
      },
      "id":408
   },
   {
      "numbers":[
         733
      ],
      "address":"Antiguo Hogar del Jubilado - Calle Grande, 16, 45800 Quintanar de la Orden, provincia Toledo",
      "country":"Spania",
      "latLng":{
         "lat":39.591764,
         "lng":-3.043268
      },
      "id":409
   },
   {
      "numbers":[
         732
      ],
      "address":"Talavera Ferial - Paseo de Fernando de los Ríos, s/n, 45600 Talavera de la Reina, provincia Toledo",
      "country":"Spania",
      "latLng":{
         "lat":39.957111,
         "lng":-4.820424
      },
      "id":410
   },
   {
      "numbers":[
         731
      ],
      "address":"Colegio Público Valdemembra (entrada Polideportivo) Calle San Isidro s/n, 16220 Quintanar del Rey, provincia Cuenca",
      "country":"Spania",
      "latLng":{
         "lat":39.339361,
         "lng":-1.926679
      },
      "id":411
   },
   {
      "numbers":[
         730
      ],
      "address":"Museo-Biblioteca Municipal Calle de la Carrasca, 29 BAJO, 02600, Villarrobledo, provincia Albacete",
      "country":"Spania",
      "latLng":{
         "lat":39.262394,
         "lng":-2.604875
      },
      "id":412
   },
   {
      "numbers":[
         729
      ],
      "address":"Centro Cívico - Salón de Actos Plaza de España s/n 13600 Alcázar de San Juan, provincia Ciudad Real",
      "country":"Spania",
      "latLng":{
         "lat":39.389639,
         "lng":-3.210588
      },
      "id":413
   },
   {
      "numbers":[
         726
      ],
      "address":"Antiguo Hangar de la Estación de Ferrocarril de Tomelloso Calle Airén, 8, 13700 Tomelloso, provincia Ciudad Real",
      "country":"Spania",
      "latLng":{
         "lat":39.148145,
         "lng":-3.028911
      },
      "id":414
   },
   {
      "numbers":[
         664
      ],
      "address":"Calle Barranco del Inglés s/n (intrarea prin Calle Atbitocazbe), 38670 Adeje, Tenerife",
      "country":"Spania",
      "latLng":{
         "lat":28.125217,
         "lng":-16.73541
      },
      "id":415
   },
   {
      "numbers":[
         771
      ],
      "address":"3126 Racine Ave., Norfolk, VA 23509",
      "country":"Sua",
      "latLng":{
         "lat":36.877388,
         "lng":-76.264658
      },
      "id":416
   },
   {
      "numbers":[
         647
      ],
      "address":"Avenida Don Juan de Borbon, 28901, Getafe",
      "country":"Spania",
      "latLng":{
         "lat":40.317846,
         "lng":-3.715231
      },
      "id":417
   },
   {
      "numbers":[
         644
      ],
      "address":"Calle Los Robles, s/n, 28921 Alcorcón",
      "country":"Spania",
      "latLng":{
         "lat":40.337632,
         "lng":-3.839649
      },
      "id":418
   },
   {
      "numbers":[
         645
      ],
      "address":"Avenida Rey Juan Carlos I, 30, 28915, Leganés",
      "country":"Spania",
      "latLng":{
         "lat":40.334605,
         "lng":-3.752557
      },
      "id":419
   },
   {
      "numbers":[
         813
      ],
      "address":"Eva Lagerwalls Väg 1C, Flygel 13,  Uppsala",
      "country":"Suedia",
      "latLng":{
         "lat":59.828537,
         "lng":17.651625
      },
      "id":420
   },
   {
      "numbers":[
         317
      ],
      "address":"Via Borgo Padova, 28, Castelfranco Veneto",
      "country":"Italia",
      "latLng":{
         "lat":45.66322,
         "lng":11.934351
      },
      "id":421
   },
   {
      "numbers":[
         318
      ],
      "address":"Via G. Donizetti, 4, Oderzo",
      "country":"Italia",
      "latLng":{
         "lat":45.783671,
         "lng":12.500371
      },
      "id":422
   },
   {
      "numbers":[
         319
      ],
      "address":"Via Svezia, 2, San Donà di Piave",
      "country":"Italia",
      "latLng":{
         "lat":45.637564,
         "lng":12.571783
      },
      "id":423
   },
   {
      "numbers":[
         322
      ],
      "address":"Via Pio X, 1A, Cadoneghe",
      "country":"Italia",
      "latLng":{
         "lat":45.447778,
         "lng":11.909064
      },
      "id":424
   },
   {
      "numbers":[
         323
      ],
      "address":"Via Milano, 7, Albignasego",
      "country":"Italia",
      "latLng":{
         "lat":45.345716,
         "lng":11.874181
      },
      "id":425
   },
   {
      "numbers":[
         136,
         137
      ],
      "address":"Salle Etoile+Salle Auberge, L'Auberge du Cheval Noir, 2, route de Noisy, 93500, Pantin",
      "country":"Franţa",
      "latLng":{
         "lat":48.895422,
         "lng":2.426224
      },
      "id":426
   },
   {
      "numbers":[
         325
      ],
      "address":"Via Pasini, 44/46, Schio",
      "country":"Italia",
      "latLng":{
         "lat":45.713316,
         "lng":11.356215
      },
      "id":427
   },
   {
      "numbers":[
         135
      ],
      "address":"68, rue Emile Beaufils, 93100 Montreuil",
      "country":"Franţa",
      "latLng":{
         "lat":48.873135,
         "lng":2.45729
      },
      "id":428
   },
   {
      "numbers":[
         334
      ],
      "address":"Str. San Martino, nr. 16, cod poștal 76125, Trani",
      "country":"Italia",
      "latLng":{
         "lat":41.279058,
         "lng":16.41783
      },
      "id":429
   },
   {
      "numbers":[
         340
      ],
      "address":"Str. Jan Palach snc, cod poștal 89900, Vibo Valentia (Biblioteca Comunale), Vibo Valentia",
      "country":"Italia",
      "latLng":{
         "lat":38.675138,
         "lng":16.093016
      },
      "id":430
   },
   {
      "numbers":[
         342
      ],
      "address":"str. G. Sallustio Crispo snc, cod poștal 75100, Matera (Complesso Commerciale Il Circo)",
      "country":"Italia",
      "latLng":{
         "lat":40.67911,
         "lng":16.575488
      },
      "id":431
   },
   {
      "numbers":[
         344
      ],
      "address":"str. Giovanni Pascoli snc, cod poștal 86170, Isernia (ex scuola Andrea d'Isernia)",
      "country":"Italia",
      "latLng":{
         "lat":41.594845,
         "lng":14.231123
      },
      "id":432
   },
   {
      "numbers":[
         132,
         133
      ],
      "address":"Centre Technique Municipal, 2, avenue Albert Einstein, 93150, Le Blanc-Mesnil",
      "country":"Franţa",
      "latLng":{
         "lat":48.947455,
         "lng":2.46735
      },
      "id":433
   },
   {
      "numbers":[
         347
      ],
      "address":"Fraz. Altedo Via Nazionale 100/C, Malalbergo",
      "country":"Italia",
      "latLng":{
         "lat":44.665446,
         "lng":11.484954
      },
      "id":434
   },
   {
      "numbers":[
         348
      ],
      "address":"Via Montericco nr. 5/A, Imola",
      "country":"Italia",
      "latLng":{
         "lat":44.356349,
         "lng":11.684307
      },
      "id":435
   },
   {
      "numbers":[
         351
      ],
      "address":"Via Augusto Tamburini nr. 1, Reggio Emilia",
      "country":"Italia",
      "latLng":{
         "lat":44.685861,
         "lng":10.66548
      },
      "id":436
   },
   {
      "numbers":[
         370
      ],
      "address":"Via Arturo Torboli nr. 17, Ferrara",
      "country":"Italia",
      "latLng":{
         "lat":44.818863,
         "lng":11.60616
      },
      "id":437
   },
   {
      "numbers":[
         354
      ],
      "address":"Piazza Anna Magnani, 193, Cesena",
      "country":"Italia",
      "latLng":{
         "lat":44.136414,
         "lng":12.227625
      },
      "id":438
   },
   {
      "numbers":[
         355
      ],
      "address":"Piazzetta Corbizzi, 9/30, Forli",
      "country":"Italia",
      "latLng":{
         "lat":44.222255,
         "lng":12.0317
      },
      "id":439
   },
   {
      "numbers":[
         358
      ],
      "address":"Via Panfilo Francesco N. 15 Macerata",
      "country":"Italia",
      "latLng":{
         "lat":43.305074,
         "lng":13.435701
      },
      "id":440
   },
   {
      "numbers":[
         131
      ],
      "address":"Salle Philippe Roux, 58, rue de la Convention, 93120, La Courneuve",
      "country":"Franţa",
      "latLng":{
         "lat":48.9276,
         "lng":2.391247
      },
      "id":441
   },
   {
      "numbers":[
         360
      ],
      "address":"Piazza Torquato Tasso Nr. 7, Florența",
      "country":"Italia",
      "latLng":{
         "lat":43.767476,
         "lng":11.237983
      },
      "id":442
   },
   {
      "numbers":[
         363
      ],
      "address":"Via Gaspare Gozzi nr. 24, 58100, Grosseto",
      "country":"Italia",
      "latLng":{
         "lat":42.774916,
         "lng":11.10115
      },
      "id":443
   },
   {
      "numbers":[
         367
      ],
      "address":"Via Scali Finocchietti nr. 4 (Sala Simonini), Livorno",
      "country":"Italia",
      "latLng":{
         "lat":43.552689,
         "lng":10.305471
      },
      "id":444
   },
   {
      "numbers":[
         361
      ],
      "address":"Piazza San Francesco D’Assisi Nr. 3 /via Mazzini, Pistoia",
      "country":"Italia",
      "latLng":{
         "lat":43.935519,
         "lng":10.909674
      },
      "id":445
   },
   {
      "numbers":[
         365
      ],
      "address":"Via Porta Fabbrica, nr. 1, Massa",
      "country":"Italia",
      "latLng":{
         "lat":44.036568,
         "lng":10.138782
      },
      "id":446
   },
   {
      "numbers":[
         366
      ],
      "address":"Via S. Chiara nr. 8 (Auditorium Della Pia Casa), Lucca",
      "country":"Italia",
      "latLng":{
         "lat":43.8436,
         "lng":10.508644
      },
      "id":447
   },
   {
      "numbers":[
         375
      ],
      "address":"Cittadella Dei Giovani în Via Ugo Foscolo nr. 1, Alcamo",
      "country":"Italia",
      "latLng":{
         "lat":37.984224,
         "lng":12.961261
      },
      "id":448
   },
   {
      "numbers":[
         376
      ],
      "address":"Istituto Comprensivo \"G.Verga\" ingresso Largo Aosta, Canicatti",
      "country":"Italia",
      "latLng":{
         "lat":37.357689,
         "lng":13.85071
      },
      "id":449
   },
   {
      "numbers":[
         378,
         379
      ],
      "address":"Via Oglio 20, 20139 Milano",
      "country":"Italia",
      "latLng":{
         "lat":45.440027,
         "lng":9.217006
      },
      "id":450
   },
   {
      "numbers":[
         130
      ],
      "address":"Salon Elysée de l'Hôtel de Ville,  62, rue du Général Leclerc, 92130, Issy-les-Moulineaux",
      "country":"Franţa",
      "latLng":{
         "lat":48.824548,
         "lng":2.27371
      },
      "id":451
   },
   {
      "numbers":[
         383
      ],
      "address":"Via Zurla 1, 26013 CR, Crema",
      "country":"Italia",
      "latLng":{
         "lat":45.365347,
         "lng":9.685639
      },
      "id":452
   },
   {
      "numbers":[
         389
      ],
      "address":"Via Giacomo Matteotti, 2, 25018 BS, Montichiari",
      "country":"Italia",
      "latLng":{
         "lat":45.412165,
         "lng":10.392154
      },
      "id":453
   },
   {
      "numbers":[
         387
      ],
      "address":"Sala Rocca, Piazza della Rocca 1, 24058 BG, Romano di Lombardia",
      "country":"Italia",
      "latLng":{
         "lat":45.521341,
         "lng":9.753416
      },
      "id":454
   },
   {
      "numbers":[
         391
      ],
      "address":"Via Leonardo da Vinci, 5 - 36068 TN, Rovereto",
      "country":"Italia",
      "latLng":{
         "lat":45.88433,
         "lng":11.02909
      },
      "id":455
   },
   {
      "numbers":[
         394
      ],
      "address":"Piazzetta Anna Frank, 23, 39100 BZ, Bolzano",
      "country":"Italia",
      "latLng":{
         "lat":46.481782,
         "lng":11.317924
      },
      "id":456
   },
   {
      "numbers":[
         404
      ],
      "address":"Nichelino, Piazza Di Vittorio 1, Palazzo Comunale, etajul 2 - Sala \"Mattei\", 10042",
      "country":"Italia",
      "latLng":{
         "lat":44.99513,
         "lng":7.64625
      },
      "id":457
   },
   {
      "numbers":[
         405
      ],
      "address":"Scuola Gobetti, Via Milano nr.4, Settimo Torinese",
      "country":"Italia",
      "latLng":{
         "lat":45.14066,
         "lng":7.77601
      },
      "id":458
   },
   {
      "numbers":[
         407
      ],
      "address":"Via Giolitti nr.7, Carmagnola",
      "country":"Italia",
      "latLng":{
         "lat":44.85016,
         "lng":7.72017
      },
      "id":459
   },
   {
      "numbers":[
         129
      ],
      "address":"Maison de la Médiation, 240 bis, rue Grande, 77300, Fontainebleau",
      "country":"Franţa",
      "latLng":{
         "lat":48.876622,
         "lng":2.410476
      },
      "id":460
   },
   {
      "numbers":[
         128
      ],
      "address":"56, avenue Marceau, 93700, Drancy",
      "country":"Franţa",
      "latLng":{
         "lat":48.929096,
         "lng":2.434863
      },
      "id":461
   },
   {
      "numbers":[
         409
      ],
      "address":"Piazza Gen.le C.A. dalla Chiesa 8, Sala de Consiliu, Chivasso",
      "country":"Italia",
      "latLng":{
         "lat":45.19055,
         "lng":7.88727
      },
      "id":462
   },
   {
      "numbers":[
         411
      ],
      "address":"Cirie, Corso Nazioni Unite, 34, 10073",
      "country":"Italia",
      "latLng":{
         "lat":45.2359,
         "lng":7.60555
      },
      "id":463
   },
   {
      "numbers":[
         412
      ],
      "address":"Castello della Contessa Adelaide, Via Imperio Romano nr.2, Susa",
      "country":"Italia",
      "latLng":{
         "lat":45.13667,
         "lng":7.04356
      },
      "id":464
   },
   {
      "numbers":[
         415
      ],
      "address":"Centro Anziani di Carassone, Via del Campo nr. 5, Mondovi",
      "country":"Italia",
      "latLng":{
         "lat":44.39753,
         "lng":7.83033
      },
      "id":465
   },
   {
      "numbers":[
         416
      ],
      "address":"Via Santuario Di Oropa nr.149, Biella",
      "country":"Italia",
      "latLng":{
         "lat":45.58175,
         "lng":8.03785
      },
      "id":466
   },
   {
      "numbers":[
         425
      ],
      "address":"Centro Elsa e Renato, Via Martiri della Libertà nr.145, Sanremo",
      "country":"Italia",
      "latLng":{
         "lat":43.821151,
         "lng":7.770137
      },
      "id":467
   },
   {
      "numbers":[
         426
      ],
      "address":"Viale Europa nr.7, Castelvecchio, Imperia",
      "country":"Italia",
      "latLng":{
         "lat":43.88647,
         "lng":8.02965
      },
      "id":468
   },
   {
      "numbers":[
         427
      ],
      "address":"Savona, Corso Mazzini, 25, 17100",
      "country":"Italia",
      "latLng":{
         "lat":44.303858,
         "lng":8.476567
      },
      "id":469
   },
   {
      "numbers":[
         545
      ],
      "address":"Sudbury School, Watford Road Wembley HA0 3EY, Brent",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.559356,
         "lng":-0.3202
      },
      "id":470
   },
   {
      "numbers":[
         544
      ],
      "address":"Romanian Cultural Centre-Fundația Rațiu, 18 Fitzhardinge St, Manchester Square, Londra, W1H 6EQ",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.516527,
         "lng":-0.153401
      },
      "id":471
   },
   {
      "numbers":[
         554
      ],
      "address":"65-67 Claredon Road, Watford Junction, Watford, WD17 1DS",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.662298,
         "lng":-0.397403
      },
      "id":472
   },
   {
      "numbers":[
         548
      ],
      "address":"229 Romford Road, Forest Gate, London, E7 9HL",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.545489,
         "lng":0.018991
      },
      "id":473
   },
   {
      "numbers":[
         127
      ],
      "address":"31-33, rue des Clotais, 94360, Bry-sur-Marne",
      "country":"Franţa",
      "latLng":{
         "lat":48.828701,
         "lng":2.522908
      },
      "id":474
   },
   {
      "numbers":[
         550
      ],
      "address":"105 Sumatra Rd, West Hampstead, Londra, NW6 1 PL",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.549341,
         "lng":-0.196634
      },
      "id":475
   },
   {
      "numbers":[
         553
      ],
      "address":"The Hive London, Edgware, London, HA8 6AG",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.60263,
         "lng":-0.29088
      },
      "id":476
   },
   {
      "numbers":[
         555
      ],
      "address":"Wandsworth Council, Civic Suite, Wandsworth High Street, SW18 2PU",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.456862,
         "lng":-0.191654
      },
      "id":477
   },
   {
      "numbers":[
         557
      ],
      "address":"Clapham Studios, Unit 7-8, Battersea Business Centre, 99-109 Lavander Hill, SW11 5QL",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.465034,
         "lng":-0.155304
      },
      "id":478
   },
   {
      "numbers":[
         556
      ],
      "address":"53 Hampton Road, Forest Gate,  E7 9DP",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.549985,
         "lng":0.029998
      },
      "id":479
   },
   {
      "numbers":[
         659
      ],
      "address":"Plaza Juan de Austria, 11, 47006 Valladolid",
      "country":"Spania",
      "latLng":{
         "lat":41.638038,
         "lng":-4.739834
      },
      "id":480
   },
   {
      "numbers":[
         126
      ],
      "address":"Gymnase Georges Hébert, rue de la Grosse Roche, 91200, Athis-Mons",
      "country":"Franţa",
      "latLng":{
         "lat":48.7025,
         "lng":2.364399
      },
      "id":481
   },
   {
      "numbers":[
         123
      ],
      "address":"Secția Consulară, 3, rue de l'Exposition, 75007, Paris",
      "country":"Franţa",
      "latLng":{
         "lat":48.85815,
         "lng":2.30275
      },
      "id":482
   },
   {
      "numbers":[
         657
      ],
      "address":"Plaza Cuatro Caños,Sala El Capricho, 28400, Collado Villalba",
      "country":"Spania",
      "latLng":{
         "lat":40.644104,
         "lng":-3.99141
      },
      "id":483
   },
   {
      "numbers":[
         656
      ],
      "address":"Avenida Armando Rodríguez Vallina, s/n, 28523 Rivas-Vaciamadrid",
      "country":"Spania",
      "latLng":{
         "lat":40.367088,
         "lng":-3.550567
      },
      "id":484
   },
   {
      "numbers":[
         121,
         122
      ],
      "address":"Palatul Béhague, 123, rue Saint-Dominique, 75007, Paris",
      "country":"Franţa",
      "latLng":{
         "lat":48.85843,
         "lng":2.303105
      },
      "id":485
   },
   {
      "numbers":[
         654
      ],
      "address":"Avenida Abogados de Atocha 17, 28330 San Martin de la Vega",
      "country":"Spania",
      "latLng":{
         "lat":40.215049,
         "lng":-3.567243
      },
      "id":486
   },
   {
      "numbers":[
         653
      ],
      "address":"Calle Gaspar Bravo de Sobremonte, s/n, 28341 Valdemoro, Madrid",
      "country":"Spania",
      "latLng":{
         "lat":40.17455,
         "lng":-3.668572
      },
      "id":487
   },
   {
      "numbers":[
         652
      ],
      "address":"Calle de las Moreras nr. 32 colț cu Calle del Primero de Mayo, 2-4, 28300 Aranjuez",
      "country":"Spania",
      "latLng":{
         "lat":40.033541,
         "lng":-3.592264
      },
      "id":488
   },
   {
      "numbers":[
         651
      ],
      "address":"Avenida Ramón y Cajal 5, 28703 San Sebastián de los Reyes",
      "country":"Spania",
      "latLng":{
         "lat":40.544395,
         "lng":-3.620623
      },
      "id":489
   },
   {
      "numbers":[
         650
      ],
      "address":"Carretera de Villanueva colț cu Bulevar del Deporte, 19200 Azuqueca de Henares",
      "country":"Spania",
      "latLng":{
         "lat":40.56884,
         "lng":-3.269454
      },
      "id":490
   },
   {
      "numbers":[
         649
      ],
      "address":"Calle San Antón, 46, 28982 Parla, Madrid",
      "country":"Spania",
      "latLng":{
         "lat":40.238399,
         "lng":-3.76835
      },
      "id":491
   },
   {
      "numbers":[
         680
      ],
      "address":"Oficina Jove de L´Urgell, Carrer de la Solana, 6, 25300 Tarrega",
      "country":"Spania",
      "latLng":{
         "lat":41.62636,
         "lng":0.891716
      },
      "id":492
   },
   {
      "numbers":[
         681
      ],
      "address":"Hotel SB Corona, Plaça de la Corona d'Aragó, 5, 43500 Tortosa",
      "country":"Spania",
      "latLng":{
         "lat":40.816547,
         "lng":0.512987
      },
      "id":493
   },
   {
      "numbers":[
         682
      ],
      "address":"Espai de la Tecnologia ”Neapolis”, Rambla de l'Exposició, 59, 08800 Vilanova i la Geltrú",
      "country":"Spania",
      "latLng":{
         "lat":41.223189,
         "lng":1.733326
      },
      "id":494
   },
   {
      "numbers":[
         685
      ],
      "address":"Palau de Congressos, Avenida Salvador Camacho, 9-11, 07840 Santa Eulària des Riu, Ibiza",
      "country":"Spania",
      "latLng":{
         "lat":38.985623,
         "lng":1.544513
      },
      "id":495
   },
   {
      "numbers":[
         673
      ],
      "address":"Aventura Park, Avinguda Generalitat, 60, local 2, 25210 Guissona",
      "country":"Spania",
      "latLng":{
         "lat":41.088105,
         "lng":1.156987
      },
      "id":496
   },
   {
      "numbers":[
         674
      ],
      "address":"Centro Civico del Rieral, Carrer de Joan Fuster i Ortells, 12-14, 17310, Lloret de Mar",
      "country":"Spania",
      "latLng":{
         "lat":41.706736,
         "lng":2.839411
      },
      "id":497
   },
   {
      "numbers":[
         675
      ],
      "address":"Centro Civico Casa Flors Sirera, Carrer de les Saleses, nr. 10,  08241, Manresa (Barcelona)",
      "country":"Spania",
      "latLng":{
         "lat":41.723694,
         "lng":1.831229
      },
      "id":498
   },
   {
      "numbers":[
         676
      ],
      "address":"Centro Civico Mas Abelló, Carrer Mas del Carpa, 32, 43204 Reus, Tarragona",
      "country":"Spania",
      "latLng":{
         "lat":41.150486,
         "lng":1.118602
      },
      "id":499
   },
   {
      "numbers":[
         677
      ],
      "address":"Hotel Catalonia Sabadell, Plaça Catlunya, 10-12, 08206, Sabadell",
      "country":"Spania",
      "latLng":{
         "lat":41.55007,
         "lng":2.097549
      },
      "id":500
   },
   {
      "numbers":[
         105
      ],
      "address":"Rue de Vermont 37-39, 1202 Geneva, Elvetia",
      "country":"Elveţia",
      "latLng":{
         "lat":46.218891,
         "lng":6.137203
      },
      "id":501
   },
   {
      "numbers":[
         569
      ],
      "address":"Town Hall Council Chamber,Sala: Council Chamber, The Parade Royal Leamington Spa, Warwickshire, CV32 4AT",
      "country":"Marea Britanie",
      "latLng":{
         "lat":52.289209,
         "lng":-1.535033
      },
      "id":502
   },
   {
      "numbers":[
         572
      ],
      "address":"Norman Centre, Bignold Road, Norwich, NR3 2QZ",
      "country":"Marea Britanie",
      "latLng":{
         "lat":52.650892,
         "lng":1.273602
      },
      "id":503
   },
   {
      "numbers":[
         571
      ],
      "address":"14 Chapel Street North, Colchester, Essex, CO2 7AT",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.88712,
         "lng":0.896884
      },
      "id":504
   },
   {
      "numbers":[
         570
      ],
      "address":"Peterborough Asylum and Refugee Community Association (PARCA) : Unity Hall, Northfield Road, Peterborough, PE1 3QH, United Kingdom",
      "country":"Marea Britanie",
      "latLng":{
         "lat":52.589499,
         "lng":-0.249671
      },
      "id":505
   },
   {
      "numbers":[
         568
      ],
      "address":"Milton Keynes Library, 555 Silbury Boulevard, Buchimshire, Milton Keynes, MK9 3HL",
      "country":"Marea Britanie",
      "latLng":{
         "lat":52.043633,
         "lng":-0.759403
      },
      "id":506
   },
   {
      "numbers":[
         567
      ],
      "address":"East Oxford Community Centre, 44 Princes Street, Oxford, OX4 1DD",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.748143,
         "lng":-1.237593
      },
      "id":507
   },
   {
      "numbers":[
         581
      ],
      "address":"BMECP Centre 10A Fleet Street Brighton BN1 4ZE",
      "country":"Marea Britanie",
      "latLng":{
         "lat":50.831583,
         "lng":-0.138756
      },
      "id":508
   },
   {
      "numbers":[
         563
      ],
      "address":"Faversham Cricket ClubHouse, Faversham Cricket Ground, Macknade, Selling Road, Faversham, Kent, ME13 8XF",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.30632,
         "lng":0.898494
      },
      "id":509
   },
   {
      "numbers":[
         562
      ],
      "address":"Chandlers Ford, Methodist Centre, Winchester Road, SO53 2GJ",
      "country":"Marea Britanie",
      "latLng":{
         "lat":50.987044,
         "lng":-1.3756
      },
      "id":510
   },
   {
      "numbers":[
         573
      ],
      "address":"Sala de Conferențe Windsor Suite, Crowne Plaza London Gatwick Hotel, Langley Drive, West Sussex, Crawley, RH11 7SX",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.125424,
         "lng":-0.189671
      },
      "id":511
   },
   {
      "numbers":[
         561
      ],
      "address":"Alpha Road Community Centre, Alpha Road, Maybury, Woking, Surrey, GU22 8HF",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.323774,
         "lng":-0.551692
      },
      "id":512
   },
   {
      "numbers":[
         560
      ],
      "address":"Holiday Inn Reading South, 500 Basingstoke Road, Reading, Berkshire, RG2 0SL",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.421282,
         "lng":-0.970583
      },
      "id":513
   },
   {
      "numbers":[
         400
      ],
      "address":"Corso Belgio nr. 91, Torino",
      "country":"Italia",
      "latLng":{
         "lat":45.07363,
         "lng":7.71635
      },
      "id":514
   },
   {
      "numbers":[
         401
      ],
      "address":"Viale Monti nr. 21, Torino",
      "country":"Italia",
      "latLng":{
         "lat":45.02447,
         "lng":7.64871
      },
      "id":515
   },
   {
      "numbers":[
         592
      ],
      "address":"Duston Community Centre, Pendle Road, Duston, Northampton, Northamptonshire, NN2 6AX",
      "country":"Marea Britanie",
      "latLng":{
         "lat":52.152477,
         "lng":-0.563155
      },
      "id":516
   },
   {
      "numbers":[
         590
      ],
      "address":"Woodhouse Community Centre, 197 Woodhouse Street, Leeds LS6 2NY",
      "country":"Marea Britanie",
      "latLng":{
         "lat":53.48508,
         "lng":-1.33198
      },
      "id":517
   },
   {
      "numbers":[
         580
      ],
      "address":"Exeter Community Centre, 17 St David Hill, Exeter, EX4 3RG",
      "country":"Marea Britanie",
      "latLng":{
         "lat":50.72505,
         "lng":-3.53718
      },
      "id":518
   },
   {
      "numbers":[
         578,
         579
      ],
      "address":"Pilgrim Church, St. Levan Road Plymouth, PL2 3AE",
      "country":"Marea Britanie",
      "latLng":{
         "lat":50.385706,
         "lng":-4.163497
      },
      "id":519
   },
   {
      "numbers":[
         549
      ],
      "address":"229 Romford Road, Forest Gate, London, E7 9HL",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.545509,
         "lng":0.01898
      },
      "id":520
   },
   {
      "numbers":[
         547
      ],
      "address":"Brent Indian Association, Community Resource Centre, 116 Ealing Road, Wembley, Middlesex  HA0 4TH",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.547547,
         "lng":-0.297882
      },
      "id":521
   },
   {
      "numbers":[
         546
      ],
      "address":"Restaurant Dracula, 129 High Street, Harlesden, Londra, NW10 4TR",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.535437,
         "lng":-0.243555
      },
      "id":522
   },
   {
      "numbers":[
         537
      ],
      "address":"Convento Esprito Santo, Cerca do Convento, Sala 14, Praça da Republica, 8100 Loulé",
      "country":"Portugalia",
      "latLng":{
         "lat":37.139265,
         "lng":-8.023127
      },
      "id":523
   },
   {
      "numbers":[
         459
      ],
      "address":"Str.Mihai Eminescu, nr.55, Chișinău",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":47.023115,
         "lng":28.837954
      },
      "id":524
   },
   {
      "numbers":[
         444
      ],
      "address":"Gago Airport, 10.000, Camp Castor, Gao Mali",
      "country":"Mali",
      "latLng":{
         "lat":16.251746,
         "lng":-0.006427
      },
      "id":525
   },
   {
      "numbers":[
         441
      ],
      "address":"20 Rue Nicolas Hein, L-1721 Luxemburg",
      "country":"Luxembourg",
      "latLng":{
         "lat":49.637225,
         "lng":6.137076
      },
      "id":526
   },
   {
      "numbers":[
         440
      ],
      "address":"21 Boulevard de la Foire, L-1528 Luxemburg",
      "country":"Luxembourg",
      "latLng":{
         "lat":49.61495,
         "lng":6.120995
      },
      "id":527
   },
   {
      "numbers":[
         438
      ],
      "address":"Brivibas nr. 97, Riga",
      "country":"Latvia",
      "latLng":{
         "lat":56.96116,
         "lng":24.132333
      },
      "id":528
   },
   {
      "numbers":[
         408
      ],
      "address":"Piazza Municipio 1, Palazzo Civico, Collegno",
      "country":"Italia",
      "latLng":{
         "lat":45.07745,
         "lng":7.56931
      },
      "id":529
   },
   {
      "numbers":[
         403
      ],
      "address":"Centro Giovanile ArKa, Piazza Vincenzo Caselli nr.19, Chieri",
      "country":"Italia",
      "latLng":{
         "lat":45.010634,
         "lng":7.819645
      },
      "id":530
   },
   {
      "numbers":[
         396
      ],
      "address":"Turul I: Via Dante Alighieri 16, 20099, MI Turul II: Via Maestri del Lavoro 1, 20099, MI",
      "country":"Italia",
      "latLng":{
         "lat":45.534701,
         "lng":9.238368
      },
      "id":531
   },
   {
      "numbers":[
         392
      ],
      "address":"Piazza Navarrino, 19 - 38023 TN",
      "country":"Italia",
      "latLng":{
         "lat":46.366889,
         "lng":11.005834
      },
      "id":532
   },
   {
      "numbers":[
         368
      ],
      "address":"Via Scardassieri nr. 47 (Villa San Lorenzo)",
      "country":"Italia",
      "latLng":{
         "lat":43.827995,
         "lng":11.192139
      },
      "id":533
   },
   {
      "numbers":[
         116
      ],
      "address":"Kirkos Sub City, Woreda 04, House   no.1142",
      "country":"Ethiopia",
      "latLng":{
         "lat":8.9863,
         "lng":38.771
      },
      "id":534
   },
   {
      "numbers":[
         356
      ],
      "address":"Via Carlo Gavardini Nr.10",
      "country":"Italia",
      "latLng":{
         "lat":43.910495,
         "lng":12.911772
      },
      "id":535
   },
   {
      "numbers":[
         346
      ],
      "address":"Galeazza nr.2, Borgo Panigale",
      "country":"Italia",
      "latLng":{
         "lat":44.503148,
         "lng":11.277652
      },
      "id":536
   },
   {
      "numbers":[
         335
      ],
      "address":"Str. Quarto, nr. 8, cod poștal 74013, Ginosa",
      "country":"Italia",
      "latLng":{
         "lat":40.577793,
         "lng":16.75581
      },
      "id":537
   },
   {
      "numbers":[
         327
      ],
      "address":"Via Zagata, 2, Verona",
      "country":"Italia",
      "latLng":{
         "lat":45.449192,
         "lng":11.028558
      },
      "id":538
   },
   {
      "numbers":[
         315
      ],
      "address":"Via Luigi Fantoni, 44, Villafranca di Verona",
      "country":"Italia",
      "latLng":{
         "lat":45.346221,
         "lng":10.828288
      },
      "id":539
   },
   {
      "numbers":[
         308
      ],
      "address":"Via Flaminia km 45.200, 01033 loc. Piano Paradiso, Civita Castellana VT, Rignano Flaminio",
      "country":"Italia",
      "latLng":{
         "lat":42.262697,
         "lng":12.457657
      },
      "id":540
   },
   {
      "numbers":[
         218
      ],
      "address":"Bahnhofstr. 27, 74348 Lauffen am Neckar",
      "country":"Germania",
      "latLng":{
         "lat":49.075953,
         "lng":9.149022
      },
      "id":541
   },
   {
      "numbers":[
         205
      ],
      "address":"Le Quartier Hornbach 13, 67433 Neustadt an der Weinstrasse",
      "country":"Germania",
      "latLng":{
         "lat":49.341625,
         "lng":8.16692
      },
      "id":542
   },
   {
      "numbers":[
         205
      ],
      "address":"Le Quartier Hornbach 13, 67433 Neustadt an der Weinstrasse",
      "country":"Germania",
      "latLng":{
         "lat":49.341625,
         "lng":8.16692
      },
      "id":543
   },
   {
      "numbers":[
         167
      ],
      "address":"6, Rue Oscars II, 06000 Nisa",
      "country":"Franţa",
      "latLng":{
         "lat":43.704073,
         "lng":7.255215
      },
      "id":544
   },
   {
      "numbers":[
         165
      ],
      "address":"Hotel Kyriad 162, Bd. Rabatau Daniel Matalon, Marsilia",
      "country":"Franţa",
      "latLng":{
         "lat":43.28064,
         "lng":5.399676
      },
      "id":545
   },
   {
      "numbers":[
         164
      ],
      "address":"Hotel Mercure 11, Av. de Mazargues 13008 Marsilia",
      "country":"Franţa",
      "latLng":{
         "lat":43.269593,
         "lng":5.388341
      },
      "id":546
   },
   {
      "numbers":[
         162
      ],
      "address":"7 Boulevard du Recteur Senn 54000 Nancy",
      "country":"Franţa",
      "latLng":{
         "lat":48.683275,
         "lng":6.187541
      },
      "id":547
   },
   {
      "numbers":[
         159
      ],
      "address":"Rue du Dr. Baud, salle Complexe Martin Luther King, Haute Savoie, 74100",
      "country":"Franţa",
      "latLng":{
         "lat":46.198559,
         "lng":6.237903
      },
      "id":548
   },
   {
      "numbers":[
         138
      ],
      "address":"Salle Michel Ricard, 8, rue Guy de Maupassant, 92500, Rueil-Malmaison",
      "country":"Franţa",
      "latLng":{
         "lat":48.892391,
         "lng":2.171748
      },
      "id":549
   },
   {
      "numbers":[
         139
      ],
      "address":"Maison de la Boissière, 28, rue du Centre, 78190, Trappes-en-Yvelines",
      "country":"Franţa",
      "latLng":{
         "lat":48.77126,
         "lng":1.980474
      },
      "id":550
   },
   {
      "numbers":[
         140
      ],
      "address":"Salle \"Camélia\", Maison des Familles, 21, rue Jean Zay, 78190, Trappes-en-Yvelines",
      "country":"Franţa",
      "latLng":{
         "lat":48.772599,
         "lng":2.001005
      },
      "id":551
   },
   {
      "numbers":[
         141
      ],
      "address":"Rue Claude Debussy, 72700 Allonnes",
      "country":"Franţa",
      "latLng":{
         "lat":47.971187,
         "lng":0.160222
      },
      "id":552
   },
   {
      "numbers":[
         142
      ],
      "address":"Espace Malbec, 250, rue Malbec, 33800, Bordeaux",
      "country":"Franţa",
      "latLng":{
         "lat":44.820475,
         "lng":-0.571331
      },
      "id":553
   },
   {
      "numbers":[
         143
      ],
      "address":"La Maison de l'International, 50, Esplanade de la Fraternité, 29200 Brest",
      "country":"Franţa",
      "latLng":{
         "lat":48.389486,
         "lng":-4.499453
      },
      "id":554
   },
   {
      "numbers":[
         144
      ],
      "address":"Maison de Quartier Centre, 9, rue Neuve Bourg l’Abbé, 14000, Caen",
      "country":"Franţa",
      "latLng":{
         "lat":49.181964,
         "lng":-0.380294
      },
      "id":555
   },
   {
      "numbers":[
         145
      ],
      "address":"240, rue Auguste Rodin, 62100, Calais",
      "country":"Franţa",
      "latLng":{
         "lat":50.950896,
         "lng":1.888047
      },
      "id":556
   },
   {
      "numbers":[
         146,
         147
      ],
      "address":"Chambre de Commerce et d'Industrie, 299, boulevard de Leeds, 59031, Lille cedex",
      "country":"Franţa",
      "latLng":{
         "lat":50.640287,
         "lng":3.075348
      },
      "id":557
   },
   {
      "numbers":[
         148
      ],
      "address":"Bâtiment la Providence salle 3, 36, rue de Moncontour, 22600, Loudéac",
      "country":"Franţa",
      "latLng":{
         "lat":48.178887,
         "lng":-2.756032
      },
      "id":558
   },
   {
      "numbers":[
         149
      ],
      "address":"Petit Foyer, 9, rue des Poilus, 33600, Pessac",
      "country":"Franţa",
      "latLng":{
         "lat":44.805378,
         "lng":-0.631779
      },
      "id":559
   },
   {
      "numbers":[
         150
      ],
      "address":"Le Triangle, Boulevard de Yougoslavie, 35201 Rennes Cedex 2",
      "country":"Franţa",
      "latLng":{
         "lat":48.088613,
         "lng":-1.659504
      },
      "id":560
   },
   {
      "numbers":[
         151
      ],
      "address":"Salle de Praud, 5, rue Louise Weiss, 44400, Rezé",
      "country":"Franţa",
      "latLng":{
         "lat":47.168552,
         "lng":-1.545624
      },
      "id":561
   },
   {
      "numbers":[
         152
      ],
      "address":"Carré des Services, 15, rue d’Arras, 44800, Saint-Herblain",
      "country":"Franţa",
      "latLng":{
         "lat":47.213365,
         "lng":-1.608879
      },
      "id":562
   },
   {
      "numbers":[
         153
      ],
      "address":"Turul I: Avenue Princesse Grace, MC 98000, Monaco Turul II: 16, bd. Princesse Charlotte, MC 98000, Monaco",
      "country":"Franţa",
      "latLng":{
         "lat":43.747648,
         "lng":7.434412
      },
      "id":563
   },
   {
      "numbers":[
         3
      ],
      "description":"Ambasada României în Republica Africa de Sud",
      "address":"877, Justice Mohamed Street, Brooklyn 0181, P.O. Box 11295, Hatfield 0028",
      "country":"Africa De Sud",
      "latLng":{
         "lat":-25.767059,
         "lng":28.234627
      },
      "id":564
   },
   {
      "numbers":[
         5
      ],
      "description":"Ambasada României în Republica Albania",
      "address":"Strada Pandeli Evangjeli 15, Tirana",
      "country":"Albania",
      "latLng":{
         "lat":41.314661,
         "lng":19.835841
      },
      "id":565
   },
   {
      "numbers":[
         6
      ],
      "description":"Ambasada României în Republica Algeriană Democratică şi Populară",
      "address":"24, Rue Abri Arezki, Hydra, 16035",
      "country":"Algeria",
      "latLng":{
         "lat":36.44451,
         "lng":3.02176
      },
      "id":566
   },
   {
      "numbers":[
         768
      ],
      "description":"Ambasada României în Statele Unite ale Americii",
      "address":"1607 23rd Street, NW Washington, D.C. 20008",
      "country":"Sua",
      "latLng":{
         "lat":38.911582,
         "lng":-77.050406
      },
      "id":567
   },
   {
      "numbers":[
         7
      ],
      "description":"Ambasada României în Republica Angola",
      "address":"Rua Ramalho Ortigão, Nº30, Alvalade, Luanda",
      "country":"Angola",
      "latLng":{
         "lat":-8.828362,
         "lng":13.236122
      },
      "id":568
   },
   {
      "numbers":[
         8
      ],
      "description":"Ambasada României în Regatul Arabiei Saudite",
      "address":"King Fahad Quarter, Amin Al Rehany Street, Villa no.8, Riad - 11693",
      "country":"Arabia Saudită",
      "latLng":{
         "lat":24.742384,
         "lng":46.665792
      },
      "id":569
   },
   {
      "numbers":[
         9
      ],
      "description":"Ambasada României în Republica Argentina",
      "address":"Calle Arroyo 962-970, Buenos Aires - C 1007AAD, CABA",
      "country":"Argentina",
      "latLng":{
         "lat":-34.591638,
         "lng":-58.380843
      },
      "id":570
   },
   {
      "numbers":[
         10
      ],
      "description":"Ambasada României în Republica Armenia",
      "address":"Str. Barbusse nr.15, cartierul Arabkir, Erevan",
      "country":"Armenia",
      "latLng":{
         "lat":40.197414,
         "lng":44.486533
      },
      "id":571
   },
   {
      "numbers":[
         11
      ],
      "description":"Ambasada României în Australia",
      "address":"4 Dalman Crescent, O'Malley, A.C.T. 2606, Canberra",
      "country":"Australia",
      "latLng":{
         "lat":-35.350296,
         "lng":149.10872
      },
      "id":572
   },
   {
      "numbers":[
         18,
         19
      ],
      "description":"Ambasada României în Austria",
      "address":"Prinz Eugen Strasse 60, 1040 Viena",
      "country":"Austria",
      "latLng":{
         "lat":48.19077,
         "lng":16.37961
      },
      "id":573
   },
   {
      "numbers":[
         35
      ],
      "description":"Ambasada României în Republica Azerbaidjan",
      "address":"Blv. Hasan Aliev, nr. 125 A (Narimanov) Baku",
      "country":"Azerbaidjan",
      "latLng":{
         "lat":40.403999,
         "lng":49.855064
      },
      "id":574
   },
   {
      "numbers":[
         36
      ],
      "description":"Ambasada României în Republica Belarus",
      "address":"Kaliningradskii pereulok, 12, 220012, Minsk",
      "country":"Belarus",
      "latLng":{
         "lat":53.927148,
         "lng":27.599053
      },
      "id":575
   },
   {
      "numbers":[
         39
      ],
      "description":"Ambasada României în Regatul Belgiei",
      "address":"105, Rue Gabrielle, 1180 Bruxelles, Belgia",
      "country":"Belgia",
      "latLng":{
         "lat":50.812687,
         "lng":4.359895
      },
      "id":576
   },
   {
      "numbers":[
         60
      ],
      "description":"Ambasada României în Bosnia şi Herţegovina",
      "address":"Str. Cobanija, nr. 28, Sarajevo 71.000",
      "country":"Bosnia şi Herţegovina",
      "latLng":{
         "lat":43.853622,
         "lng":18.421411
      },
      "id":577
   },
   {
      "numbers":[
         61
      ],
      "description":"Ambasada României în Republica Federativă a Braziliei",
      "address":"SEN 6 - Asa Norte, Avenida das Nacoes, Quadra 801, Lote 06, Brasilia DF, CEP: 70.800-9177",
      "country":"Brazilia",
      "latLng":{
         "lat":-15.78739,
         "lng":-47.866058
      },
      "id":578
   },
   {
      "numbers":[
         64
      ],
      "description":"Ambasada României în Canada",
      "address":"655 Rideau Street, Ottawa, Ontario, K1N 6A3",
      "country":"Canada",
      "latLng":{
         "lat":45.433965,
         "lng":-75.673826
      },
      "id":579
   },
   {
      "numbers":[
         73,
         74
      ],
      "description":"Ambasada României în Republica Cehă",
      "address":"Nerudova 5, Mala Strana, 118 00, Praga 1",
      "country":"Rep. Cehă",
      "latLng":{
         "lat":50.088423,
         "lng":14.400922
      },
      "id":580
   },
   {
      "numbers":[
         78
      ],
      "description":"Ambasada României în Republica Chile",
      "address":"Calle Benjamin, no. 2955, Las Condes, Santiago de Chile",
      "country":"Chile",
      "latLng":{
         "lat":-33.412718,
         "lng":-70.600575
      },
      "id":581
   },
   {
      "numbers":[
         80
      ],
      "description":"Ambasada României în Republica Populară Chineză",
      "address":"Ritan Est, nr. 2, districtul Chaoyang, Beijing, 100600 - Intrarea de sud",
      "country":"China",
      "latLng":{
         "lat":39.9152778,
         "lng":116.4413888
      },
      "id":582
   },
   {
      "numbers":[
         83
      ],
      "description":"Ambasada României în Republica Cipru",
      "address":"Strada Pireos nr. 27, Strovolos, cod 2023, Nicosia, P.O. Box: 22210",
      "country":"Cipru",
      "latLng":{
         "lat":35.145596,
         "lng":33.352311
      },
      "id":583
   },
   {
      "numbers":[
         75
      ],
      "description":"Ambasada României în Republica Columbia",
      "address":"Carrera 7a, Nr 92A-58, Chico, Bogota",
      "country":"Columbia",
      "latLng":{
         "lat":4.67182,
         "lng":-74.043203
      },
      "id":584
   },
   {
      "numbers":[
         76
      ],
      "description":"Ambasada României în Republica Populară Democrată Coreeană",
      "address":"Pyongyang City, Taedong District, Munhungdong",
      "country":"Coreea De Nord",
      "latLng":{
         "lat":39.02899,
         "lng":125.788457
      },
      "id":585
   },
   {
      "numbers":[
         77
      ],
      "description":"Ambasada României în Republica Coreea",
      "address":"50 Jangmun-ro, Yongsan-gu, Seoul, 140-809, Republica Coreea",
      "country":"Coreea De Sud",
      "latLng":{
         "lat":37.527049,
         "lng":126.995232
      },
      "id":586
   },
   {
      "numbers":[
         89
      ],
      "description":"Ambasada României în Republica Croaţia",
      "address":"Mlinarska nr.43, 10000 Zagreb",
      "country":"Croaţia",
      "latLng":{
         "lat":45.8278,
         "lng":15.977442
      },
      "id":587
   },
   {
      "numbers":[
         90
      ],
      "description":"Ambasada României în Republica Cuba",
      "address":"Avenida 5ta A, nr. 4407, Miramar, La Habana",
      "country":"Cuba",
      "latLng":{
         "lat":23.113777,
         "lng":-82.420797
      },
      "id":588
   },
   {
      "numbers":[
         103
      ],
      "description":"Ambasada României în Republica Arabă Egipt",
      "address":"6, El-Kamel Mohamed Street, Zamalek, Cairo",
      "country":"Egipt",
      "latLng":{
         "lat":30.058856,
         "lng":31.218687
      },
      "id":589
   },
   {
      "numbers":[
         253,
         254
      ],
      "description":"Ambasada României în Republica Elenă",
      "address":"7, Strada Emmanouil Benaki 7, Paleo Psyhiko, 15452 Atena",
      "country":"Grecia",
      "latLng":{
         "lat":38.015282,
         "lng":23.779372
      },
      "id":590
   },
   {
      "numbers":[
         106
      ],
      "description":"Ambasada României în Confederaţia Elveţiană",
      "address":"Kirchenfeldstrasse 78, 3005 Berna",
      "country":"Elveţia",
      "latLng":{
         "lat":46.940169,
         "lng":7.456495
      },
      "id":591
   },
   {
      "numbers":[
         112
      ],
      "description":"Ambasada României în Emiratele Arabe Unite",
      "address":"2nd Str, No.9, W(14/1) plot No.13 at Al Rodha Area, P.O.Box 70416, Abu Dhabi",
      "country":"Emiratele Arabe Unite",
      "latLng":{
         "lat":24.458777,
         "lng":54.370635
      },
      "id":592
   },
   {
      "numbers":[
         117
      ],
      "description":"Ambasada României în Republica Filipine",
      "address":"Strada Legazpi nr.150, G.C. Corporate Plaza, etaj 6, Legazpi Village, Makati City, CP 1229",
      "country":"Filipine",
      "latLng":{
         "lat":14.55651,
         "lng":121.01647
      },
      "id":593
   },
   {
      "numbers":[
         118
      ],
      "description":"Ambasada României în Republica Finlanda",
      "address":"Stenbäckinkatu 24, 00250 Helsinki",
      "country":"Finlanda",
      "latLng":{
         "lat":60.186509,
         "lng":24.910155
      },
      "id":594
   },
   {
      "numbers":[
         171
      ],
      "description":"Ambasada României în Georgia",
      "address":"Strada Lvovi nr. 7, cartier Saburtalo, Tbilisi",
      "country":"Georgia",
      "latLng":{
         "lat":41.732398,
         "lng":44.766376
      },
      "id":595
   },
   {
      "numbers":[
         173,
         174
      ],
      "description":"Ambasada României în Republica Federală Germania",
      "address":"Dorotheenstr. 62-66, 10117 Berlin",
      "country":"Germania",
      "latLng":{
         "lat":52.51865,
         "lng":13.386476
      },
      "id":596
   },
   {
      "numbers":[
         264
      ],
      "description":"Ambasada României în India",
      "address":"D – 6/6, Vasant Vihar, New Delhi – 110057",
      "country":"India",
      "latLng":{
         "lat":28.3348,
         "lng":77.09101
      },
      "id":597
   },
   {
      "numbers":[
         265
      ],
      "description":"Ambasada României în Republica Indonezia",
      "address":"42A, Jl. Teuku Cik Ditiro, Menteng, Jakarta Pusat 10310",
      "country":"Indonezia",
      "latLng":{
         "lat":-6.1980948,
         "lng":106.83679971
      },
      "id":598
   },
   {
      "numbers":[
         263
      ],
      "description":"Ambasada României în Regatul Haşemit al Iordaniei",
      "address":"Str. Al-Madeenah Al-Munawwarah 35, PO BOX 2869, Amman, 11181",
      "country":"Iordania",
      "latLng":{
         "lat":31.96487,
         "lng":35.864255
      },
      "id":599
   },
   {
      "numbers":[
         429
      ],
      "description":"Ambasada României în Republica Irak",
      "address":"Arassat Al-Hindia Street, Hay Babel Mahalla 929, Zuqaq 31, Nr. 452/A, Baghdad, P.O.Box 2571",
      "country":"Irak",
      "latLng":{
         "lat":33.1736,
         "lng":44.2519
      },
      "id":600
   },
   {
      "numbers":[
         431
      ],
      "description":"Ambasada României în Republica Islamică Iran",
      "address":"89 Shahid Meshki (Fakhrabad), Ave. Baharestan, Teheran",
      "country":"Iran",
      "latLng":{
         "lat":35.697608,
         "lng":51.437425
      },
      "id":601
   },
   {
      "numbers":[
         134
      ],
      "description":"Ambasada României în Irlanda",
      "address":"26 Waterloo Road, Ballsbridge, Dublin 4",
      "country":"Irlanda",
      "latLng":{
         "lat":53.331078,
         "lng":-6.244
      },
      "id":602
   },
   {
      "numbers":[
         282
      ],
      "description":"Ambasada României în Israel",
      "address":"Str. Adam Hacohen, Nr. 24, Tel Aviv 64585",
      "country":"Israel",
      "latLng":{
         "lat":32.58,
         "lng":34.464
      },
      "id":603
   },
   {
      "numbers":[
         287
      ],
      "description":"Ambasada României în Republica Italiană",
      "address":"Via Nicolo Tartaglia, 36, 00197 Roma",
      "country":"Italia",
      "latLng":{
         "lat":41.924269,
         "lng":12.488191
      },
      "id":604
   },
   {
      "numbers":[
         432
      ],
      "description":"Ambasada României în Japonia",
      "address":"106-0031 Tokyo-to, Minato-ku, Nishi-Azabu, 3-16-19",
      "country":"Japonia",
      "latLng":{
         "lat":35.657933,
         "lng":139.724443
      },
      "id":605
   },
   {
      "numbers":[
         433
      ],
      "description":"Ambasada României în Republica Kazakhstan",
      "address":"Str. Saraişâk (ул. Сарайшык) nr. 28, Nur-Sultan",
      "country":"Kazakhstan",
      "latLng":{
         "lat":51.133998,
         "lng":71.426366
      },
      "id":606
   },
   {
      "numbers":[
         434
      ],
      "description":"Ambasada României în Republica Kenya",
      "address":"Eliud Mathu Street 1119, Runda, Nairobi P.O. Box 63240-00619, Nairobi, Kenya",
      "country":"Kenya",
      "latLng":{
         "lat":-1.21126,
         "lng":36.815954
      },
      "id":607
   },
   {
      "numbers":[
         435
      ],
      "description":"Ambasada României în Kuwait",
      "address":"Kaifan, Block 4, Mina Street, House no. 34, P.O. BOX Kaifan 13574 cod 35152, State of Kuwait",
      "country":"Kuwait",
      "latLng":{
         "lat":29.334897,
         "lng":47.964109
      },
      "id":608
   },
   {
      "numbers":[
         436
      ],
      "description":"Ambasada României în Republica Libaneză",
      "address":"Route du Palais Présidentiel, Baabda, Rue 68, no. 30, sect. 3, B.P. 40227",
      "country":"Liban",
      "latLng":{
         "lat":33.844048,
         "lng":35.538518
      },
      "id":609
   },
   {
      "numbers":[
         439
      ],
      "description":"Ambasada României în Marele Ducat al Luxemburgului",
      "address":"2 rue de Pulvermühl, L-2356, Luxembourg",
      "country":"Luxemburg",
      "latLng":{
         "lat":49.608792,
         "lng":6.150244
      },
      "id":610
   },
   {
      "numbers":[
         442
      ],
      "description":"Ambasada României în Republica Macedonia de Nord",
      "address":"Rajko Zinzifov nr. 42, Skopje",
      "country":"Macedonia De Nord",
      "latLng":{
         "lat":41.997651,
         "lng":21.418494
      },
      "id":611
   },
   {
      "numbers":[
         443
      ],
      "description":"Ambasada României în Malaysia",
      "address":"114 Jalan Damai off Jalan Ampang, Kuala Lumpur 55000, Malaysia",
      "country":"Malaysia",
      "latLng":{
         "lat":3.163334,
         "lng":101.730549
      },
      "id":612
   },
   {
      "numbers":[
         446
      ],
      "description":"Ambasada României în Regatul Maroc",
      "address":"10, Rue d'Ouezzane, Quartier Hassan, Rabat",
      "country":"Maroc",
      "latLng":{
         "lat":34.021064,
         "lng":-6.821764
      },
      "id":613
   },
   {
      "numbers":[
         447
      ],
      "description":"Ambasada României în Statele Unite Mexicane",
      "address":"Calle Sofocles no. 311, Colonia Polanco, Delegacion Miguel Hidalgo 11560",
      "country":"Mexic",
      "latLng":{
         "lat":19.434701,
         "lng":-99.204956
      },
      "id":614
   },
   {
      "numbers":[
         448
      ],
      "description":"Ambasada României în Republica Moldova",
      "address":"Str. Bucureşti 66/1, Chişinău, cod 277012",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":47.0208286,
         "lng":28.8295197
      },
      "id":615
   },
   {
      "numbers":[
         485
      ],
      "description":"Ambasada României în Muntenegru",
      "address":"Strada Prve Proleterske, nr. 5, 81000",
      "country":"Muntenegru",
      "latLng":{
         "lat":42.447971,
         "lng":19.280695
      },
      "id":616
   },
   {
      "numbers":[
         496
      ],
      "description":"Ambasada României în Republica Federală Nigeria",
      "address":"No.76, Plot 498, Nelson Mandela Street, Asokoro, Abuja, FCT",
      "country":"Nigeria",
      "latLng":{
         "lat":9.02163,
         "lng":7.31344
      },
      "id":617
   },
   {
      "numbers":[
         486,
         487
      ],
      "description":"Ambasada României în Regatul Norvegiei",
      "address":"Oscars Gate 51, 0258 Oslo, Norway",
      "country":"Norvegia",
      "latLng":{
         "lat":59.55117,
         "lng":10.432
      },
      "id":618
   },
   {
      "numbers":[
         523
      ],
      "description":"Ambasada României în Republica Islamică Pakistan",
      "address":"Casa nr. 5, Strada Nr. 30, Sector F-7/1, Islamabad 44000",
      "country":"Pakistan",
      "latLng":{
         "lat":33.714245,
         "lng":73.051849
      },
      "id":619
   },
   {
      "numbers":[
         525
      ],
      "description":"Ambasada României în Republica Peru",
      "address":"Avenida Jorge Basadre no.690, San Isidro, Lima 27",
      "country":"Peru",
      "latLng":{
         "lat":-12.094759,
         "lng":-77.039126
      },
      "id":620
   },
   {
      "numbers":[
         526
      ],
      "description":"Ambasada României în Republica Polonă",
      "address":"Ul. Fr.Chopina 10, 00-559 Warszawa",
      "country":"Polonia",
      "latLng":{
         "lat":52.222884,
         "lng":21.021856
      },
      "id":621
   },
   {
      "numbers":[
         530,
         531
      ],
      "description":"Ambasada României în Republica Portugheză",
      "address":"Rua de São Caetano 5 (Lapa), 1200-828 Lisabona",
      "country":"Portugalia",
      "latLng":{
         "lat":38.709227,
         "lng":-9.16359
      },
      "id":622
   },
   {
      "numbers":[
         539
      ],
      "description":"Ambasada României în Statul Qatar",
      "address":"Str. 953, nr.102, zona 65, Dafna Area, Doha, P.O.Box 22511",
      "country":"Qatar",
      "latLng":{
         "lat":25.1951,
         "lng":51.3022
      },
      "id":623
   },
   {
      "numbers":[
         612
      ],
      "description":"Ambasada României în Federaţia Rusă",
      "address":"Mosfilmovskaia Uliţa, Dom 64, Moskva",
      "country":"Federaţia Rusă",
      "latLng":{
         "lat":55.715017,
         "lng":37.512709
      },
      "id":624
   },
   {
      "numbers":[
         615
      ],
      "description":"Ambasada României în Republica Senegal",
      "address":"Point E, Rue A x 9A (Rue A Prolongée), Dakar, Sénégal, B.P. 3212",
      "country":"Senegal",
      "latLng":{
         "lat":14.702657,
         "lng":-17.46295
      },
      "id":625
   },
   {
      "numbers":[
         616
      ],
      "description":"Ambasada României în Republica Serbia",
      "address":"Mihaila Avramovica nr. 12, Beograd",
      "country":"Serbia",
      "latLng":{
         "lat":44.46057,
         "lng":20.2729
      },
      "id":626
   },
   {
      "numbers":[
         620
      ],
      "description":"Ambasada României în Singapore",
      "address":"King’s Centre #03 – 04/05, 390 Havelock Road, Singapore 229594",
      "country":"Singapore",
      "latLng":{
         "lat":1.307367,
         "lng":103.829368
      },
      "id":627
   },
   {
      "numbers":[
         621
      ],
      "description":"Ambasada României în Republica Arabă Siriană",
      "address":"8, Rue Ibrahim Hanano, P.O. Box 4454, Damascus",
      "country":"Siria",
      "latLng":{
         "lat":33.520961,
         "lng":36.2732
      },
      "id":628
   },
   {
      "numbers":[
         623
      ],
      "description":"Ambasada României în Republica Slovacă",
      "address":"Fraňa Kráľa nr. 11, 811 05  Bratislava, Republica Slovacă",
      "country":"Slovacia",
      "latLng":{
         "lat":48.152739,
         "lng":17.104893
      },
      "id":629
   },
   {
      "numbers":[
         622
      ],
      "description":"Ambasada României în Republica Slovenia",
      "address":"Smrekarjeva 33a, 1107 Ljubljana",
      "country":"Slovenia",
      "latLng":{
         "lat":46.0653437,
         "lng":14.491483
      },
      "id":630
   },
   {
      "numbers":[
         624,
         625
      ],
      "description":"Ambasada României în Spania",
      "address":"Avenida de Alfonso XIII nr.157, Madrid 28016",
      "country":"Spania",
      "latLng":{
         "lat":40.46019,
         "lng":-3.678382
      },
      "id":631
   },
   {
      "numbers":[
         767
      ],
      "description":"Ambasada României în Sri Lanka",
      "address":"25/1, Horton Place, Colombo 7",
      "country":"Sri Lanka",
      "latLng":{
         "lat":6.9115,
         "lng":79.870978
      },
      "id":632
   },
   {
      "numbers":[
         806
      ],
      "description":"Ambasada României în Republica Sudan",
      "address":"Kafouri Area - Kassala Road, Plot 172/173 Khartoum North, P.O. Box 1494",
      "country":"Sudan",
      "latLng":{
         "lat":15.657007,
         "lng":32.548585
      },
      "id":633
   },
   {
      "numbers":[
         807,
         808
      ],
      "description":"Ambasada României în Suedia",
      "address":"Östermalmsgatan 36, 114 26, Stockholm",
      "country":"Suedia",
      "latLng":{
         "lat":59.342778,
         "lng":18.072222
      },
      "id":634
   },
   {
      "numbers":[
         814
      ],
      "description":"Ambasada României în Regatul Thailandei",
      "address":"3388/41 Sirinrat Office Building, 12th Floor, Rama IV Road, Khlong Toei, Bangkok 10110",
      "country":"Thailanda",
      "latLng":{
         "lat":13.717087,
         "lng":100.570578
      },
      "id":635
   },
   {
      "numbers":[
         815
      ],
      "description":"Ambasada României în Republica Tunisiană",
      "address":"108, Avenue Taieb Mehiri, Gammarth, La Marsa, B.P.57-1004",
      "country":"Tunisia",
      "latLng":{
         "lat":36.825825,
         "lng":10.180745
      },
      "id":636
   },
   {
      "numbers":[
         816
      ],
      "description":"Ambasada României în Republica Turcia",
      "address":"Bükres Sokak No.4, Çankaya, 06680, Ankara",
      "country":"Turcia",
      "latLng":{
         "lat":39.9619,
         "lng":32.7916
      },
      "id":637
   },
   {
      "numbers":[
         820
      ],
      "description":"Ambasada României în Turkmenistan",
      "address":"Str. Myati Kosayew, nr. 122, Ashgabat",
      "country":"Turkmenistan",
      "latLng":{
         "lat":37.952048,
         "lng":58.349124
      },
      "id":638
   },
   {
      "numbers":[
         277,
         278
      ],
      "description":"Ambasada României în Regatul Ţărilor de Jos",
      "address":"Catsheuvel 55,  2517 KA, Haga",
      "country":"Olanda",
      "latLng":{
         "lat":52.091186,
         "lng":4.281173
      },
      "id":639
   },
   {
      "numbers":[
         821
      ],
      "description":"Ambasada României în Ucraina",
      "address":"Mihaila Kotsiubinskogo 8, 01030 - Kiev, raion Shevcenko",
      "country":"Ucraina",
      "latLng":{
         "lat":50.446609,
         "lng":30.50311
      },
      "id":640
   },
   {
      "numbers":[
         825,
         826
      ],
      "description":"Ambasada României în Ungaria",
      "address":"1146 Budapest, Thököly út 72",
      "country":"Ungaria",
      "latLng":{
         "lat":47.507251,
         "lng":19.093251
      },
      "id":641
   },
   {
      "numbers":[
         831
      ],
      "description":"Ambasada României în Republica Orientală a Uruguayului",
      "address":"Echevarriarza 3452, Montevideo",
      "country":"Uruguay",
      "latLng":{
         "lat":-34.9087,
         "lng":-56.140274
      },
      "id":642
   },
   {
      "numbers":[
         832
      ],
      "description":"Ambasada României în Republica Uzbekistan",
      "address":"Str. Zanjirbog (fostă Rejametova) nr. 44 A, Taşkent",
      "country":"Uzbekistan",
      "latLng":{
         "lat":41.17492,
         "lng":69.15522
      },
      "id":643
   },
   {
      "numbers":[
         833
      ],
      "description":"Ambasada României în Republica Venezuela",
      "address":"4-a Avenida de Altamira, entre 8-a y 9-a Transversales, Quinta Guardatinajas, No. 49-19, Chacao",
      "country":"Venezuela",
      "latLng":{
         "lat":10.508045,
         "lng":-66.842929
      },
      "id":644
   },
   {
      "numbers":[
         834
      ],
      "description":"Ambasada României în Republica Socialistă Vietnam",
      "address":"5 Le Hong Phong Street, Ba Dinh District, Hanoi",
      "country":"Vietnam",
      "latLng":{
         "lat":21.033753,
         "lng":105.83747
      },
      "id":645
   },
   {
      "numbers":[
         835
      ],
      "description":"Ambasada României în Republica Zimbabwe",
      "address":"105, Simon Muzenda Street, Harare",
      "country":"Zimbabwe",
      "latLng":{
         "lat":-17.8169,
         "lng":31.05159
      },
      "id":646
   },
   {
      "numbers":[
         524
      ],
      "description":"Oficiul de Reprezentare al României la Ramallah – Palestina",
      "address":"PRICO House Building, 2nd floor, Al-Masyoun, Ramallah",
      "country":"Palestina",
      "latLng":{
         "lat":31.53391,
         "lng":35.11575
      },
      "id":647
   },
   {
      "numbers":[
         115
      ],
      "description":"Ambasada României în Republica Estonia",
      "address":"Rävala puiestee 5, 10143 Tallinn, Estonia ​",
      "country":"Estonia",
      "latLng":{
         "lat":59.43363,
         "lng":24.75712
      },
      "id":648
   },
   {
      "numbers":[
         522
      ],
      "description":"Ambasada României în Sultanatul Oman",
      "address":"Villa 2990, way 2840, Shatti Al-Qurum, Muscat",
      "country":"Oman",
      "latLng":{
         "lat":23.612573,
         "lng":58.45821
      },
      "id":649
   },
   {
      "numbers":[
         85
      ],
      "description":"Misiunea Permanentă a României pe lângă Oficiul Naţiunilor Unite de la Geneva şi organizaţiile internaţionale cu sediul în Elveţia",
      "address":"Rue de Vermont 37 - 39, 1202 Geneva, Elveţia",
      "country":"Elveţia",
      "latLng":{
         "lat":46.227197,
         "lng":6.186542
      },
      "id":650
   },
   {
      "numbers":[
         22
      ],
      "description":"Misiunea Permanentă a României pe lângă organizaţiile internaţionale de la Viena",
      "address":"Seilerstätte 17, St. 2/8-9, 1010 Viena",
      "country":"Austria",
      "latLng":{
         "lat":48.204112,
         "lng":16.37392
      },
      "id":651
   },
   {
      "numbers":[
         4
      ],
      "description":"Consulatul General al României la Cape Town",
      "address":"Helderberg House, 24 Highwick Drive, Kenilworth, 7700, Cape Town",
      "country":"Africa De Sud",
      "latLng":{
         "lat":-33.99173,
         "lng":18.46149
      },
      "id":652
   },
   {
      "numbers":[
         15
      ],
      "description":"Consulatul General al României la Sydney",
      "address":"Ground Floor/83 York Street, Sydney, NSW, 2000",
      "country":"Australia",
      "latLng":{
         "lat":-33.869323,
         "lng":151.205909
      },
      "id":653
   },
   {
      "numbers":[
         62
      ],
      "description":"Consulatul General al României la Rio de Janeiro",
      "address":"Rua Cosme Velho nr.526 - Bairro Cosme Velho, CEP 22241- 090, Rio de Janeiro",
      "country":"Brazilia",
      "latLng":{
         "lat":-22.94019,
         "lng":-43.198655
      },
      "id":654
   },
   {
      "numbers":[
         69
      ],
      "description":"Consulatul General al României la Montreal",
      "address":"1010, rue Sherbrooke Ouest, bureau 610, etaj 6, H3A 2R7, Montreal, Québec",
      "country":"Canada",
      "latLng":{
         "lat":45.502198,
         "lng":-73.575743
      },
      "id":655
   },
   {
      "numbers":[
         71,
         72
      ],
      "description":"Consulatul General al României la Toronto",
      "address":"789 Don Mills Rd, unit 501, Toronto, ON, M3C 1T9, Canada",
      "country":"Canada",
      "latLng":{
         "lat":43.7185609,
         "lng":-79.337502
      },
      "id":656
   },
   {
      "numbers":[
         82
      ],
      "description":"Consulatul General al  României în R.A.S. Hong Kong",
      "address":"Office No. 3A, 21/F, 148 Electric Road, North Point",
      "country":"China",
      "latLng":{
         "lat":22.2866614,
         "lng":114.1917384
      },
      "id":657
   },
   {
      "numbers":[
         81
      ],
      "description":"Consulatul General al României la Shanghai",
      "address":"R502 Room, Honi International Plaza 199 Chengdu North Rd., Jing'An Shanghai 200040",
      "country":"China",
      "latLng":{
         "lat":31.20558,
         "lng":121.403861
      },
      "id":658
   },
   {
      "numbers":[
         113
      ],
      "description":"Consulatul General al României la Dubai",
      "address":"Street 12b, Villa no. 44, Community 332, Jumeirah 1, P.O. Box 333765, Dubai, UAE",
      "country":"Emiratele Arabe Unite",
      "latLng":{
         "lat":25.230382,
         "lng":55.263999
      },
      "id":659
   },
   {
      "numbers":[
         154
      ],
      "description":"Consulatul General al României la Lyon",
      "address":"29, rue de Bonnel, 69003 Lyon, Franţa",
      "country":"Franţa",
      "latLng":{
         "lat":45.761977,
         "lng":4.845964
      },
      "id":660
   },
   {
      "numbers":[
         86
      ],
      "description":"Consulatul General al României la Marsilia",
      "address":"157, bd. Michelet, 13009 Marseille – France",
      "country":"Franţa",
      "latLng":{
         "lat":43.264619,
         "lng":5.396646
      },
      "id":661
   },
   {
      "numbers":[
         160,
         161
      ],
      "description":"Consulatul General al României la Strasbourg",
      "address":"41, rue Schweighaeuser, 67000 Strasbourg",
      "country":"Franţa",
      "latLng":{
         "lat":48.58927,
         "lng":7.773727
      },
      "id":662
   },
   {
      "numbers":[
         186,
         187
      ],
      "description":"Consulatul General al României la Bonn",
      "address":"Legionsweg 14, 53117 Bonn",
      "country":"Germania",
      "latLng":{
         "lat":50.750794,
         "lng":7.101234
      },
      "id":663
   },
   {
      "numbers":[
         211
      ],
      "description":"Consulatul General al României la Salonic",
      "address":"Str. Theagenous Charisi 78, Salonic, cod postal 546 39",
      "country":"Grecia",
      "latLng":{
         "lat":40.61515,
         "lng":22.96335
      },
      "id":664
   },
   {
      "numbers":[
         345
      ],
      "description":"Consulatul General al României la Bologna",
      "address":"Via Guelfa, 9, Scala A, Int. 3, 40138 Bologna",
      "country":"Italia",
      "latLng":{
         "lat":44.491614,
         "lng":11.387802
      },
      "id":665
   },
   {
      "numbers":[
         191,
         192
      ],
      "description":"Consulatul General al României la Milano",
      "address":"Via Gignese, 2, 20148 Milano",
      "country":"Italia",
      "latLng":{
         "lat":45.478151,
         "lng":9.140341
      },
      "id":666
   },
   {
      "numbers":[
         397,
         398
      ],
      "description":"Consulatul General al României la Torino",
      "address":"Via Ancona no. 7 Torino – 10152",
      "country":"Italia",
      "latLng":{
         "lat":45.07907,
         "lng":7.69065
      },
      "id":667
   },
   {
      "numbers":[
         309
      ],
      "description":"Consulatul General al României la Trieste",
      "address":"Via Udine nr. 11, Trieste",
      "country":"Italia",
      "latLng":{
         "lat":45.657758,
         "lng":13.773971
      },
      "id":668
   },
   {
      "numbers":[
         614
      ],
      "description":"Consulatul General al României la Rostov pe Don",
      "address":"Ulita Sedmaia Linia, nr. 18/39, Rostov Na Donu",
      "country":"Federaţia Rusă",
      "latLng":{
         "lat":47.227388,
         "lng":39.755058
      },
      "id":669
   },
   {
      "numbers":[
         613
      ],
      "description":"Consulatul General al României la Sankt Petersburg",
      "address":"Str. Garohovaia nr. 4, Sankt Petersburg, cod. 191186",
      "country":"Federaţia Rusă",
      "latLng":{
         "lat":59.93608,
         "lng":30.3111
      },
      "id":670
   },
   {
      "numbers":[
         479
      ],
      "description":"Consulatul General al României la Cahul",
      "address":"Strada B.P. Haşdeu nr. 11, Cahul",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":45.903304,
         "lng":28.196039
      },
      "id":671
   },
   {
      "numbers":[
         617
      ],
      "description":"Consulatul General al României la Vârşeţ",
      "address":"Trg Zelene Pijace 3/A Vârşeţ 26300",
      "country":"Serbia",
      "latLng":{
         "lat":45.123853,
         "lng":21.297469
      },
      "id":672
   },
   {
      "numbers":[
         703,
         704
      ],
      "description":"Consulatul General al României la Bilbao",
      "address":"Plaza Circular, nr. 4, planta 1, 48001",
      "country":"Spania",
      "latLng":{
         "lat":43.26158,
         "lng":-2.92697
      },
      "id":673
   },
   {
      "numbers":[
         686
      ],
      "description":"Consulatul General al României la Sevilla",
      "address":"Avenida Manuel Siurot Nr. 30, 41013 Sevilla",
      "country":"Spania",
      "latLng":{
         "lat":37.3630451,
         "lng":-5.9828783
      },
      "id":674
   },
   {
      "numbers":[
         773
      ],
      "description":"Consulatul General al României la Chicago – Illinois",
      "address":"737 N. Michigan Avenue, Suite 2300, Chicago, IL 60611 (intrarea se face la adresa 161 E. Chicago Ave)",
      "country":"Sua",
      "latLng":{
         "lat":41.53465,
         "lng":-87.37258
      },
      "id":675
   },
   {
      "numbers":[
         783
      ],
      "description":"Consulatul General al României la Los Angeles – California",
      "address":"11766 Wilshire Blvd. Suite 200, Los Angeles, CA 90025",
      "country":"Sua",
      "latLng":{
         "lat":34.0479376,
         "lng":-118.462009
      },
      "id":676
   },
   {
      "numbers":[
         800
      ],
      "description":"Consulatul General al României la New York",
      "address":"200 East 38th Street, New York, NY 10016",
      "country":"Sua",
      "latLng":{
         "lat":40.748021,
         "lng":-73.975947
      },
      "id":677
   },
   {
      "numbers":[
         818
      ],
      "description":"Consulatul General al României la Istanbul",
      "address":"Yanarsu Sokak No.42, Narin Sitesi, Etiler/Beşiktaş",
      "country":"Turcia",
      "latLng":{
         "lat":41.08663,
         "lng":29.03487
      },
      "id":678
   },
   {
      "numbers":[
         817
      ],
      "description":"Consulatul General al României la Izmir",
      "address":"Strada 1479, nr. 9, Alsancak",
      "country":"Turcia",
      "latLng":{
         "lat":38.43995,
         "lng":27.14352
      },
      "id":679
   },
   {
      "numbers":[
         823
      ],
      "description":"Consulatul General al României la Cernăuţi",
      "address":"Str. Skilna, nr. 16, 58000 Cernăuţi, Ucraina",
      "country":"Ucraina",
      "latLng":{
         "lat":48.17347,
         "lng":25.56265
      },
      "id":680
   },
   {
      "numbers":[
         822
      ],
      "description":"Consulatul General al României la Odessa",
      "address":"Str. Bazarnaia, nr. 31, Odessa, Ucraina, 65011",
      "country":"Ucraina",
      "latLng":{
         "lat":46.473645,
         "lng":30.747452
      },
      "id":681
   },
   {
      "numbers":[
         829
      ],
      "description":"Consulatul General al României la Gyula",
      "address":"5700 Gyula, Strada Munkácsy, nr.12",
      "country":"Ungaria",
      "latLng":{
         "lat":46.646243,
         "lng":21.278522
      },
      "id":682
   },
   {
      "numbers":[
         830
      ],
      "description":"Consulatul General al României la Szeged",
      "address":"Kelemen Lászlo utca 5, 6720, Szeged",
      "country":"Ungaria",
      "latLng":{
         "lat":46.251274,
         "lng":20.148182
      },
      "id":683
   },
   {
      "numbers":[
         604
      ],
      "description":"Consulatul General al României la Edinburgh",
      "address":"7-9 North St. David Street, Edinburgh, EH2 1AW",
      "country":"Marea Britanie",
      "latLng":{
         "lat":55.955351,
         "lng":-3.1944
      },
      "id":684
   },
   {
      "numbers":[
         68
      ],
      "description":"Consulatul General al României la Vancouver",
      "address":"Suite 855, 555 Burrard Street, Vancouver, British Columbia V7X 1M8",
      "country":"Canada",
      "latLng":{
         "lat":49.286003,
         "lng":-123.119187
      },
      "id":685
   },
   {
      "numbers":[
         470,
         471
      ],
      "description":"Consulatul General al României la Bălţi",
      "address":"Strada Sfântul Nicolae, nr. 51, 3100 Bălţi",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":47.759266,
         "lng":27.917995
      },
      "id":686
   },
   {
      "numbers":[
         472
      ],
      "description":"Biroul Consular al României la Ungheni (parte a C.G. Bălţi)",
      "address":"Strada Mihai Eminescu, nr.35, Ungheni",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":47.208435,
         "lng":27.800004
      },
      "id":687
   },
   {
      "numbers":[
         82
      ],
      "description":"Consulatul general al României în R.A.S. Hong Kong şi R.A.S. Macao",
      "address":"Office No. 3A, 21/F, 148 Electric Road, North Point",
      "country":"Hong Kong",
      "latLng":{
         "lat":22.286583,
         "lng":114.191667
      },
      "id":688
   },
   {
      "numbers":[
         618
      ],
      "description":"Consulatul General al României la Zaječar",
      "address":"Strada Kumanovska nr. 45, 19000 Zaječar, Serbia",
      "country":"Serbia",
      "latLng":{
         "lat":43.897271,
         "lng":22.27472
      },
      "id":689
   },
   {
      "numbers":[
         329,
         330
      ],
      "description":"Consulatul General al României la Bari",
      "address":"via Bruno Zaccaro no.17-19 , CP. 70126",
      "country":"Italia",
      "latLng":{
         "lat":41.09066,
         "lng":16.889059
      },
      "id":690
   },
   {
      "numbers":[
         794
      ],
      "description":"Consulatul General al României la Miami - Florida",
      "address":"1101 Brickell Ave, suite N 600, Miami, FL 33131",
      "country":"Sua",
      "latLng":{
         "lat":25.764085,
         "lng":-80.191105
      },
      "id":691
   },
   {
      "numbers":[
         585,
         586
      ],
      "description":"Consulatul General al României la Manchester",
      "address":"9 Cooper Street, Manchester, M2 2FW ​",
      "country":"Marea Britanie",
      "latLng":{
         "lat":53.28452892,
         "lng":-2.14330072
      },
      "id":692
   },
   {
      "numbers":[
         285
      ],
      "description":"Consulatul General al României la Haifa",
      "address":"Str. Habankim nr. 3, Haifa",
      "country":"Israel",
      "latLng":{
         "lat":32.4913,
         "lng":34.5951
      },
      "id":693
   },
   {
      "numbers":[
         748
      ],
      "description":"Consulatul României la Castellon de la Plana",
      "address":"Avenida de Valencia nr. 144 (esq. con Rambla de la Viuda) 12006 Castellon, Spania",
      "country":"Spania",
      "latLng":{
         "lat":39.9697412,
         "lng":-0.057085
      },
      "id":694
   },
   {
      "numbers":[
         736,
         737
      ],
      "description":"Consulatul României la Almeria",
      "address":"Carretera Huércal de Almería, nr. 46, Almería, 04009",
      "country":"Spania",
      "latLng":{
         "lat":36.861515,
         "lng":-2.444688
      },
      "id":695
   },
   {
      "numbers":[
         371,
         372
      ],
      "description":"Consulatul României la Catania",
      "address":"Via Misterbianco, nr. 1, Catania, CP 95.131",
      "country":"Italia",
      "latLng":{
         "lat":37.506433,
         "lng":15.096122
      },
      "id":696
   },
   {
      "numbers":[
         723
      ],
      "description":"Consulatul României la Ciudad Real",
      "address":"Calle Mata nr.37, 13004",
      "country":"Spania",
      "latLng":{
         "lat":38.9859722,
         "lng":-3.9210524
      },
      "id":697
   },
   {
      "numbers":[
         430
      ],
      "description":"Biroul Consular al României la Erbil (parte a Secţiei consulare a Ambasadei)",
      "address":"Gulan Street, Ster Tower, Floor 7, unit 702, Erbil, Regiunea Kurdistan",
      "country":"Irak",
      "latLng":{
         "lat":33.1259,
         "lng":44.0017
      },
      "id":698
   },
   {
      "numbers":[
         824
      ],
      "description":"Consulatul României la Solotvino",
      "address":"Sportivna nr. 112, 90575, Solotvino, Ucraina",
      "country":"Ucraina",
      "latLng":{
         "lat":47.952998,
         "lng":23.888637
      },
      "id":699
   },
   {
      "numbers":[
         12
      ],
      "description":"Biroul consular  al României la Melbourne – Australia",
      "address":"448 St. Kilda Road, Etaj 5, Birou 5.06, VIC 3004, Melbourne",
      "country":"Australia",
      "latLng":{
         "lat":-37.838249,
         "lng":144.975597
      },
      "id":700
   },
   {
      "numbers":[
         23
      ],
      "description":"Consulatul Onorific al României la Graz",
      "address":"Mariatroster Strasse 211, 8044, Graz",
      "country":"Austria",
      "latLng":{
         "lat":47.099873,
         "lng":15.475594
      },
      "id":701
   },
   {
      "numbers":[
         216
      ],
      "description":"Consulatul General Onorific al României la Genova",
      "address":"Via Casaregis, 50, etaj 4, 16129 Genova",
      "country":"Italia",
      "latLng":{
         "lat":44.404126,
         "lng":8.952943
      },
      "id":702
   },
   {
      "numbers":[
         391
      ],
      "description":"Consulatul Onorific al României la Riga",
      "address":"Riga LV 1001, Brivibas iela - 97",
      "country":"Letonia",
      "latLng":{
         "lat":56.971229,
         "lng":24.158586
      },
      "id":703
   },
   {
      "numbers":[
         728
      ],
      "description":"Consulatul General Onorific al României la Detroit – Michigan",
      "address":"777 Woodward Ave, Suite 300, Detroit, MI 48226",
      "country":"Sua",
      "latLng":{
         "lat":42.330504,
         "lng":-83.055592
      },
      "id":704
   },
   {
      "numbers":[
         730
      ],
      "description":"Consulatul Onorific al României la Indianapolis – Indiana",
      "address":"4761 Industrial Pkwy, Indianapolis, IN 46226",
      "country":"Sua",
      "latLng":{
         "lat":39.884895,
         "lng":-86.262785
      },
      "id":705
   },
   {
      "numbers":[
         157
      ],
      "description":"Consulatul Onorific al României la Neustadt an der Weinstraße",
      "address":"Le Quartier Hornbach 19, 67433 Neustadt an der Weinstraße",
      "country":"Germania",
      "latLng":{
         "lat":49.34056,
         "lng":8.166313
      },
      "id":706
   },
   {
      "numbers":[
         24
      ],
      "description":"Consulatul Onorific al României la Klagenfurt am Wörtersee",
      "address":"Bahnhofstraße 7, 9020 Klagenfurt am Wörtersee",
      "country":"Austria",
      "latLng":{
         "lat":46.624913,
         "lng":14.310789
      },
      "id":707
   },
   {
      "numbers":[
         812
      ],
      "description":"Consulatul Onorific al României la Sölvesborg",
      "address":"Tredenborgsvägen 16, 29 435 Sölvesborg",
      "country":"Suedia",
      "latLng":{
         "lat":56.039735,
         "lng":14.577294
      },
      "id":708
   },
   {
      "numbers":[
         304
      ],
      "description":"Consulatul Onorific al României la Bristol",
      "address":"1 Redland Park, Bristol BS6 6SA",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.467857,
         "lng":-2.612475
      },
      "id":709
   },
   {
      "numbers":[
        38
      ],
      "description":"Institutul Cultural Român la Bruxelles",
      "address":"107 Rue Gabrielle 1180 Bruxelles",
      "country":"Belgia",
      "latLng":{
         "lat":50.812313,
         "lng":4.359947
      },
      "id":710
   },
   {
      "numbers":[
         827,
         828
      ],
      "description":"Institutul Cultural Român la Budapesta",
      "address":"1146 Budapest, Izso utca 5",
      "country":"Ungaria",
      "latLng":{
         "lat":47.507994,
         "lng":19.092519
      },
      "id":711
   },
   {
      "numbers":[
         819
      ],
      "description":"Institutul Cultural Român \"Dimitrie Cantemir\"",
      "address":"Siraselviler Cad., 55, Taksim, Beyoglu, 34433, Istanbul",
      "country":"Turcia",
      "latLng":{
         "lat":41.03382,
         "lng":28.98438
      },
      "id":712
   },
   {
      "numbers":[
         532
      ],
      "description":"Institutul Cultural Român – Lisabona",
      "address":"Rua do Barão no. 8-10, 1100-072 Lisboa",
      "country":"Portugalia",
      "latLng":{
         "lat":38.710029,
         "lng":-9.130787
      },
      "id":713
   },
   {
      "numbers":[
         540,
         541
      ],
      "description":"Institutul Cultural Român la Londra",
      "address":"1 Belgrave Square, SW1 X8PH, Londra, UK",
      "country":"Marea Britanie",
      "latLng":{
         "lat":51.50033,
         "lng":-0.15401
      },
      "id":714
   },
   {
      "numbers":[
         628
      ],
      "description":"Institutul Cultural Român - Madrid",
      "address":"Plaza del Cordón, nº1, bajo dcha., 28005, Madrid",
      "country":"Spania",
      "latLng":{
         "lat":40.414191,
         "lng":-3.710274
      },
      "id":715
   },
   {
      "numbers":[
         801
      ],
      "description":"Institutul Cultural Român la New York",
      "address":"200 East 38th Street, New York NY 10016",
      "country":"Sua",
      "latLng":{
         "lat":40.747972,
         "lng":-73.976422
      },
      "id":716
   },
   {
      "numbers":[
         124,
         125
      ],
      "description":"Institutul Cultural Român – Paris",
      "address":"1, Rue de l’Exposition 75007, Paris",
      "country":"Franţa",
      "latLng":{
         "lat":48.858122,
         "lng":2.302748
      },
      "id":717
   },
   {
      "numbers":[
         290,
         291
      ],
      "description":"Accademia di Romania la Roma",
      "address":"Valle Giulia, Piazza José de San Martin 1, 00197 Roma",
      "country":"Italia",
      "latLng":{
         "lat":41.917033,
         "lng":12.479535
      },
      "id":718
   },
   {
      "numbers":[
         809
      ],
      "description":"Institutul Cultural Român – Stockholm",
      "address":"Skeppsbron 20, 111 30 Stockholm",
      "country":"Suedia",
      "latLng":{
         "lat":59.3249791,
         "lng":18.0754872
      },
      "id":719
   },
   {
      "numbers":[
         283
      ],
      "description":"Institutul Cultural Român la Tel Aviv",
      "address":"Bd. Shaul Hamelech nr. 8, 64733 Tel Aviv",
      "country":"Israel",
      "latLng":{
         "lat":32.0432,
         "lng":34.4702
      },
      "id":720
   },
   {
      "numbers":[
         310
      ],
      "description":"Institutul Român de Cultură şi Cercetare Umanistică – Veneţia",
      "address":"Palazzo Correr (Campo Santa Fosca) Cannaregio 2214, 30121 Venezia",
      "country":"Italia",
      "latLng":{
         "lat":45.438038,
         "lng":12.318234
      },
      "id":721
   },
   {
      "numbers":[
         20,
         21
      ],
      "description":"Institutul Cultural Român la Viena",
      "address":"Argentinierstraβe 39, 1040 Viena",
      "country":"Austria",
      "latLng":{
         "lat":48.191829,
         "lng":16.374968
      },
      "id":722
   },
   {
      "numbers":[
         452
      ],
      "description":"Institutul Cultural Român \"Mihai Eminescu\" – Chişinău",
      "address":"Strada Vlaicu Pârcălab, nr. 39, Chișinău",
      "country":"Rep. Moldova",
      "latLng":{
         "lat":47.0201594,
         "lng":28.831467
      },
      "id":723
   }
]
