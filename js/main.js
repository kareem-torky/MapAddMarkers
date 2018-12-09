
function initMap(){
    var mapDiv = document.getElementById('map-div');
    
    var mapOptions = {
        center: {lat:30.0444, lng:31.2357},
        zoom: 15,
        minZoom:14,
        maxZoom:16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggable: false
    };

    var map = new google.maps.Map(mapDiv, mapOptions);

    google.maps.event.addListener(map, 'click', function(event){
        var position = event.latLng;
        var placeName = prompt("Enter the place name: ");
        var marker = new google.maps.Marker({
            position: position,
            map: map,
         });
        
        var infowindow = new google.maps.InfoWindow({
            content: placeName
        });
        
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    });
}
