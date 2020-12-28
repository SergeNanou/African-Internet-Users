let map = L.map('map').setView([1.2, 17], 4);
    
let OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '© Openstreetmap France | © OpenStreetMap contributors'
});
    
map.addLayer(OpenStreetMap_France);
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h5>Informations </h5>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.popul_int_2000.toLocaleString()  + 
        ' utilisateurs internet 2000' + '</b><br />' + props.popul_int_2020.toLocaleString()  + ' utilisateurs internet 2020'
        + '</b><br />' + props.penetration.toLocaleString()  + ' : taux de penetration internet(%)'
        + '</b><br />' + props.int_growth.toLocaleString()  + ' : taux augmantation utiliisateurs internet(%)'
        + '</b><br />' + props.face_subs.toLocaleString()  + ' utilisateurs facebook 2020'
        : 'Passer la souris sur un pays');
};

info.addTo(map);
var legend = L.control({position: 'bottomright'});


legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 5, 15, 30, 50, 60, 120];

    div.innerHTML += "<h6>Echelle de grandeurs</h6>";
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
        '<i style="background:' + getColor((grades[i] + 1) * 1000) + '"></i>' 
            // grades[i] + (grades[i + 1] ? 'M – ' + grades[i + 1] + 'M <br>' : '+');
    }

    return div;
};

legend.addTo(map);

let geoJSONLayer = L.geoJson(data, { 
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);
function style(feature) {
    return {
        fillColor: getColor(feature.properties.popul_int_2000),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
let geoJSONLayer_1 = L.geoJson(data, { 
    style: style_1,
    onEachFeature: onEachFeature_1
});
function style_1(feature) {
    return {
        fillColor: getColor_1(feature.properties.popul_int_2020),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
let geoJSONLayer_2 = L.geoJson(data, { 
    style: style_2,
    onEachFeature: onEachFeature_2
});
function style_2(feature) {
    return {
        fillColor: getColor_2(feature.properties.penetration),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
let geoJSONLayer_3 = L.geoJson(data, { 
    style: style_3,
    onEachFeature: onEachFeature_3
});
function style_3(feature) {
    return {
        fillColor: getColor_2(feature.properties.int_growth),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
let geoJSONLayer_4 = L.geoJson(data, { 
    style: style_4,
    onEachFeature: onEachFeature_4
});
function style_4(feature) {
    return {
        fillColor: getColor_1(feature.properties.face_subs),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}
function onEachFeature_1(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight_1
    });
}
function onEachFeature_2(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight_2
    });
}
function onEachFeature_3(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight_3
    });
}
function onEachFeature_4(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight_4
    });
}
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront(); // Permet de garantir que le pays est au-dessus des autres couches de données
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geoJSONLayer.resetStyle(e.target);
    info.update();
}
function resetHighlight_1(e) {
    geoJSONLayer_1.resetStyle(e.target);
    info.update();
}
function resetHighlight_2(e) {
    geoJSONLayer_2.resetStyle(e.target);
    info.update();
}
function resetHighlight_3(e) {
    geoJSONLayer_3.resetStyle(e.target);
    info.update();
}
function resetHighlight_4(e) {
    geoJSONLayer_4.resetStyle(e.target);
    info.update();
}  
  var layers = [geoJSONLayer, geoJSONLayer_1, geoJSONLayer_2, geoJSONLayer_3, geoJSONLayer_4];
  
  selId = null;
  
  function processCheck(checkbox) {
    var checkId = checkbox.id;

    if (checkbox.checked) {
      if (selId != null) {
        map.removeLayer(layers[selId - 1]);
        document.getElementById(selId).checked = false;
      }
      layers[checkId - 1].addTo(map);
      selId = checkId;
      }
    else {
      map.removeLayer(layers[checkId - 1]);
      selId = null;
    }
  }

function getColor(d) {
    return d < 5000 ? '#FF4500' :
        d < 15000  ? '#FF6347' :
        d < 30000  ? '#FF7F50' :
        d < 50000  ? '#FFA500' :
        d < 60000   ? '#FEB24C' :
        d < 120000   ? '#808000' :
         '#008000' ;
        
}
function getColor_1(d) {
    return d < 500000 ? '#FF4500' :
        d < 1000000  ? '#FF6347' :
        d < 3000000  ? '#FF7F50' :
        d < 7000000  ? '#FFA500' :
        d < 15000000   ? '#FEB24C' :
        d < 35000000   ? '#808000' :
         '#008000' ;
        
}
function getColor_2(d) {
    return d < 10 ? '#FF4500' :
        d < 20  ? '#FF6347' :
        d < 30  ? '#FF7F50' :
        d < 40  ? '#FFA500' :
        d < 60   ? '#FEB24C' :
        d < 70   ? '#808000' :
         '#008000' ;
        
}
function getColor_4(d) {
    return d < 250000 ? '#FF4500' :
        d < 500000  ? '#FF6347' :
        d < 1000000  ? '#FF7F50' :
        d < 2500000  ? '#FFA500' :
        d < 5000000   ? '#FEB24C' :
        d < 10000000   ? '#808000' :
         '#008000' ;
        
}
