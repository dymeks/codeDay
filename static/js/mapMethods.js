var platform = new H.service.Platform({
    'app_id': '0MiTIWKBB6KGdxIwKHnl',
    'app_code': 'vIPILNohinUZxKgIimj2qg'
  });

function getTest(){
    console.log("Get Location was clicked!");
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + 
    "Longitude: " + position.coords.longitude);
    var defaultLayers = platform.createDefaultLayers();
    // Instantiate (and display) a map object:
    var map = new H.Map(
    document.getElementById('demo'),
    defaultLayers.normal.map,
    {
        zoom: 10,
        center: { lat: position.coords.latitude, lng: position.coords.longitude }
    }); 

    coords = {lat: position.coords.latitude, lng: position.coords.longitude},
    marker = new H.map.DomMarker(coords);
    marker.setData("This is your location!");
    marker.addEventListener('tap', function(evt){
        console.log("A Marker Was Clicked!");
    });
    console.log(marker);
    map.addObject(marker);

    // Enable the event system on the map instance:
    var mapEvents = new H.mapevents.MapEvents(map);

    // Add event listeners:
    map.addEventListener('drag', function(evt) {
    // Log events
    console.log(evt.type, evt.currentPointer.type);
    });

    // Add event listeners:
    map.addEventListener('tap', function(evt) {
        console.log(EventTarget);
        var coord = map.screenToGeo(evt.currentPointer.viewportX,
            evt.currentPointer.viewportY);
        marker = new H.map.DomMarker(coord);
        map.addObject(marker);
    });

    // Instantiate the default behavior, providing the mapEvents object: 
    var behavior = new H.mapevents.Behavior(mapEvents);
    }

function getLocation() {
    console.log("Got to getLocation()");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

