async function cases(cpostcode) {
  //set current date
  var today = new Date();
  var cmm = String(today.getMonth() + 1).padStart(2, "0"); // Jan = 0 + 1
  var cyy = today.getFullYear();

  let totalcase = 0;

  var response = await fetch("./db.json");
  var cases = await response.json();

  //comparing the postcode by using filter function
  cases = cases.cases.filter((c) => c.postcode == cpostcode);
  //cases.length is the number of filtered item
  if (cases.length == 0) {
    zone = "unidentified";
    totalcase = "unknown";
  } else {
    //calling function once for each element in array
    cases.forEach((c) => {
      if (cmm == c.date.substring(5, 7) && cyy == c.date.substring(0, 4)) {
        totalcase += c.count;
      }
    });
    // define zone color by cases
    // >=100
    if (totalcase > 99) {
      zone = "RED";
    }
    // 50-99
    else if (totalcase > 49 && totalcase < 100) {
      zone = "YELLOW";
    }
    // 0-49
    else if (totalcase < 50) {
      zone = "GREEN";
    }
  }

  return {
    totalcase: totalcase,
    zone: zone,
  };
}



