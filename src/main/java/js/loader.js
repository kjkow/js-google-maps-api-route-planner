/**
 * Created by kjkow on 2017-09-19.
 */
window.onload = function() {
    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');

    fileInput.addEventListener('change', getAddressesFromFile);
};

function getAddressesFromFile(){
    var file = fileInput.files[0];
    var textType = /text.*/;

    if (file.type.match(textType)) {
        buildUlTagAndCreateLatLngObjects(file);
    } else {
        fileDisplayArea.innerText = "File not supported!"
    }
}

function buildUlTagAndCreateLatLngObjects(file){
    var reader = new FileReader();
    reader.onload = function(){
        var lines = this.result.split('\n');
        var addressList = '<ul id="waypoints">';
        for(var line = 0; line < lines.length; line++){
            console.log(lines[line]);
            addressList +=  "<li>";
            addressList += lines[line];
            addressList += "</li>";
            createLatLngFromAddress(lines[line]);
        }

        addressList += "</ul>";
        document.getElementById('waypointsWrapper').innerHTML = addressList;
    };

    reader.readAsText(file);
    fileDisplayArea.innerText = "";
}


function createLatLngFromAddress(address){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log("Creating LatLang object from address... " + results[0].geometry.location.lat() + " " + results[0].geometry.location.lng());
            waypts.push(
                {
                    lat: results[0].geometry.location.lat(),
                    lng:  results[0].geometry.location.lng()
                }


            );
        }
    });
}
