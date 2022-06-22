async function renderDetails() {
  // initial value
  var totalcase = 0;
  var cpostcode = "unknown";
  var zone = "unidentified";
  var latlngpos = null;
  var address = null;

  // condition and result
  map.addListener("dblclick", function (e) {
    // (lat,lng)
    var temp1 = e.latLng.toString();
    var temp2 = temp1.replace("(", "");
    // lat,lng
    latlngpos = temp2.replace(")", "");
    // get address
    const geocoder = new google.maps.Geocoder();
    const latlngStr = latlngpos.split(", ", 2);
    const slatlng = {
      lat: parseFloat(latlngStr[0]),
      lng: parseFloat(latlngStr[1]),
    };
    geocoder.geocode({ location: slatlng }, function (result, status) {
      if (status === "OK") {
        if (result[0]) {
          //console.log("GeoCode Results Found:"+JSON.stringify(result));
          address = result[0].formatted_address;
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }

      // get postcode
      cpostcode = address.replace(/[^\d.]/g, "") % 100000;

      cases(cpostcode).then((r) => {
        totalcase = r.totalcase;
        zone = r.zone;
      });
      area.addEventListener("click", () => CheckArea());
    });
    lhfc.addEventListener("click", () => locateHF(cpostcode));
  });

  function CheckArea() {
    document.getElementById("case").innerHTML = "There are total " + totalcase;
    document.getElementById("post").innerHTML =
      "postcode " + cpostcode + " in current month. <br>(" + zone + " ZONE)";

    if (zone == "RED") {
      $(".stat1").css("background-color", "red");
    } else if (zone == "YELLOW") {
      $(".stat1").css("background-color", "yellow");
    } else if (zone == "GREEN") {
      $(".stat1").css("background-color", "green");
    } else {
      $(".stat1").css("background-color", "tomato");
    }
  }
}
