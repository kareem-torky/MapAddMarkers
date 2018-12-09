
function initMap(){
    
    // Loading the map 
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

    // Fetching saved markers from localstorage

    var markers = [];
    var infowindows = [];

    if(localStorage.getItem('markers') !== null){
        var markers_string = localStorage.getItem('markers');
        var markers_array = JSON.parse(markers_string);

        for(var i=0; i<markers_array.length; i++){
            var marker = new google.maps.Marker({
                position: markers_array[i].position,
                map: map
             });
            
            var infowindow = new google.maps.InfoWindow({
                content: markers_array[i].placeName
            });

            markers.push(marker);
            infowindows.push(infowindow);

            (function(index) {
                markers[index].addListener('click', function() {
                    infowindows[index].open(map, markers[index]);
                });
           })(i);
        }
    }



    // Adding new markers and infowindows, saving them to localstorage
    google.maps.event.addListener(map, 'click', function(event){
        var position = event.latLng;
        var placeName = prompt("Enter the place name: ");

        if(placeName == ''){
            placeName = "Unknown!"
        }
        var marker = new google.maps.Marker({
            position: position,
            map: map
         });
        
        var infowindow = new google.maps.InfoWindow({
            content: placeName
        });
        
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });

        var markerDataObj = {position: position, placeName:placeName};
        
        if(localStorage.getItem('markers') === null){
            var markers_array = [];
            markers_array.push(markerDataObj);
            var markers_string = JSON.stringify(markers_array);
    
            localStorage.setItem('markers', markers_string);
    
        } else{
            var markers_string = localStorage.getItem('markers');
            var markers_array = JSON.parse(markers_string);
            markers_array.push(markerDataObj);
            markers_string = JSON.stringify(markers_array);
            localStorage.setItem('markers', markers_string);
        }
    
    });
}
