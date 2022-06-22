async function locateHF(cpostcode) {
  let latlong = { lat: null, lng: null };

  var response = await fetch("./db.json");
  var locate = await response.json();
  var InfoObj = [];

  locate = locate.locate.filter((l) => l.postcode == cpostcode);
  for (let i = 0; i < locate.length; i++) {
    latlong = { lat: locate[i].lat, lng: locate[i].long };

    var contentString = "<h3>" + locate[i].name + "</h3>";

    //plant marker on health facility location
    marker = new google.maps.Marker({
      position: latlong,
      map: map,
    });

    var infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
        InfoObj: infowindow,
      });
    });
  }
}
