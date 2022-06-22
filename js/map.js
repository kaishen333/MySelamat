let map, infoWindow;

//initialize map
function initMap() {
  const myLatlng = { lat: 4.3401, lng: 101.143 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: myLatlng,
    zoom: 15,
    disableDoubleClickZoom: true,
    mapTypeId: 'satellite'
  });

  test.addEventListener("click", geolocate);
  map.addListener("click", coords);
}

//find current location of user
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );

      // Create a marker and center map on user location
      marker = new google.maps.Marker({
        position: pos,
        map: map,
      });

      map.setCenter(pos);
    });
  }
}

function coords() {
  map.addListener(map, "dblclick", function (e) {
    var positionDoubleclick = e.latLng;
    marker.setPosition(positionDoubleclick);
  });
  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({});
  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("dblclick", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.open(map);
  });
}