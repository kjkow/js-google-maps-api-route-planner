/**
 * Created by Kamil.Kowalczyk on 2017-09-19.
 */
var globalMap;

function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: new google.maps.LatLng(52.133999, 21.074677)
        //center: {lat: 52.133999, lng: 21.074677}
    });
    directionsDisplay.setMap(map);

    document.getElementById('submit').addEventListener('click', function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    });

    globalMap = map;
    document.getElementById('busstops').addEventListener('click', function() {
        generateBusStops();
    });
}
