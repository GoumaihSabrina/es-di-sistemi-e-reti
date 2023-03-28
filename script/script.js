function init() {
    let popup = document.getElementById('popup');
  
    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        src: './img/marker.png',
        scale: 0.2,
        anchor: [0.5, 1]
      })
    });
  
    var marker= new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([ 11.709917353610585 , 45.51906853118708 ])),
      name: 'CASA SAB CODICE: AC001E00914'
      
    });
  
   
  
    var markerLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [marker]
      }),
      style: iconStyle
    });
  
    var overlay = new ol.Overlay({
      element: popup,
      positioning: 'bottom-center',
      autopan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
  
    var map = new ol.Map({
      target: "mappa",
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        markerLayer
      ],
      overlays: [overlay],
      view: new ol.View({
        center: ol.proj.fromLonLat([11.709917353610585 , 45.51906853118708]),
        zoom: 18
      })
    });
  
    map.on('click', function(evt) {
      var features = map.getFeaturesAtPixel(evt.pixel);
      if (features.length > 0) {
        var feature = features[features.length - 1];
        popup.innerHTML = feature.get('name');
        overlay.setPosition(feature.getGeometry().getCoordinates());
  
  
    map.getInteractions().forEach(function(interaction) {
      if (interaction instanceof ol.interaction.DragPan) {
        interaction.setActive(false);
      }
    });
  }
  })}