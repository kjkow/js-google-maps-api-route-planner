/**
 * Created by Kamil.Kowalczyk on 2017-09-19.
 */
var waypts = [];

var busStops = [];
function generateBusStops(){
    console.log("Start iterating through waypoints... " + waypts);
    //waypts.forEach(searchNearby); //todo: maybe this will work

    for(var i=0; i<waypts.length; i++){
        searchNearby(waypts[i], i);
    }

}

function searchNearby(item, index){
    var service = new google.maps.places.PlacesService(globalMap);
    console.log("Generating bus stop from " +  new google.maps.LatLng(item.lat, item.lng) + " index: " + index);
    service.nearbySearch({
        location: new google.maps.LatLng(item.lat, item.lng),
        radius: 500,
        type: ['bus_stop']
    },nearbySearchCallback)
}

function nearbySearchCallback(results, status){
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log("Generation bus stop location" + results[1].geometry.location);
        busStops.push({
            location: results[1].geometry.location,   //todo: why results[1]? Also: it generates close, but weird locations, make it better
            stopover: true
        });
    }
}


function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var originAndDestination = "Jana Roso³a 10, Warszawa";
    console.log(busStops);
    directionsService.route({
        origin: originAndDestination,
        destination: originAndDestination,
        waypoints: busStops,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
