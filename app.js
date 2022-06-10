import {Deck, MapView} from '@deck.gl/core';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
// const AIR_PORTS = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';
const AIR_PORTS =  'ne_10m_airports_gcj02.geojson'

let layers = [
    new GeoJsonLayer({
      id: 'airports',
      data: AIR_PORTS,
      // Styles
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 2000,
      getPointRadius: f => 11 - f.properties.scalerank,
      getFillColor: [200, 0, 80, 180],
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onClick: info =>
        // eslint-disable-next-line
        info.object && alert(`${info.object.properties.name} (${info.object.properties.abbrev})`)
    }),
    new ArcLayer({
      id: 'arcs',
      data: AIR_PORTS,
      dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
      // Styles
      getSourcePosition: f => [-0.4531566, 51.4709959], // London
      getTargetPosition: f => f.geometry.coordinates,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      getWidth: 1
    })
  ]


if (1) {
  const deck = new Deck({
    canvas: 'deck-canvas',
    width: '100%',
    height: '100%',
    views: [new MapView()],
    controller: false,
    layers: layers
  });

  AMap.plugin('AMap.CustomLayer', function() {
    var canvas = document.getElementById('deck-canvas');

    // 将 canvas 宽高设置为地图实例的宽高
    canvas.width = amap.k.width;
    canvas.height = amap.k.height;

    // 创建一个自定义图层
    var customLayer = new AMap.CustomLayer(canvas, {
      zIndex: 12,
      // alwaysRender: false,
      zooms: [0, 20] // 设置可见级别，[最小级别，最大级别]
    });
    var onRender = function() {
      const INITIAL_VIEW_STATE = {
        latitude: amap.getCenter().lat,
        longitude: amap.getCenter().lng,
        zoom: amap.getZoom() - 1,
        bearing: -amap.getRotation(),
        pitch: amap.getPitch()
      };
      console.log("INITIAL_VIEW_STATE: ")
      console.table(JSON.stringify(INITIAL_VIEW_STATE))
      deck.setProps({ viewState: INITIAL_VIEW_STATE });
    }
    customLayer.render = onRender;
    customLayer.setMap(amap);
})

}





