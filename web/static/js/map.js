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
    this._div.innerHTML = '<h5>Population utilisant Internet </h5>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.popul_int_2000.toLocaleString()  + ' habitants'
        : 'Passer la souris sur un pays');
};

info.addTo(map);
var legend = L.control({position: 'bottomright'});


legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 5, 15, 30, 50, 60, 120];

    div.innerHTML += '<h6>En milliers</h6>';
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
        '<i style="background:' + getColor((grades[i] + 1) * 1000) + '"></i>' + 
            grades[i] + (grades[i + 1] ? 'M – ' + grades[i + 1] + 'M <br>' : '+');
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


function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
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