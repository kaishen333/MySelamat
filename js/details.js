//logout
$("#loginlink").click(function () {
  if (sessionStorage.getItem("login") == "true") {
    var result = confirm("Would you like to logout?");
    if (result == true) {
      sessionStorage.setItem("login", false);
      $("#detail").hide();
      $("#loginlink").attr("href", "index.html");
    } else return false;
  }
});

$("#reglink").click(function () {
  if ($("#loginlink").html() == "Login") {
    alert("Please login to continue!");
    $("#reglink").attr("href", "login.html");
  }
}); 
$("#applink").click(function () {
  if ($("#loginlink").html() == "Login") {
    alert("Please login to continue!");
    $("#applink").attr("href", "login.html");
  }
}); 

//load details div
async function renderPosts() {
  let ic = sessionStorage.getItem("ic");
  let uri = "http://localhost:3000/user?ic=" + ic;

  const res = await fetch(uri);
  const user = await res.json();
  console.log(user);
  $("#post1").val(user[0].registration.location);
  $("#post2").val(user[0].registration.state1);
  $("#post3").val(user[0].registration.state2);
  $("#status").append(user[0].assessment);
  $("#ic").append(user[0].ic);
  $("#ph").append(user[0].phone);
  $("#d1").append(user[0].appointment.date1);
  $("#t1").append(user[0].appointment.date1);
  $("#l1").append(user[0].appointment.locateId);
  $("#d2").append(user[0].appointment.date2);
  $("#t2").append(user[0].appointment.date2);
  $("#l2").append(user[0].appointment.locateId);
  if (user[0].registration.pregnant == "option1") {
    $("#y1").prop("checked", true);
  } else $("#n1").prop("checked", true);
  if (user[0].registration.oku == "option1") {
    $("#y2").prop("checked", true);
  } else $("#n2").prop("checked", true);
  if (user[0].registration.allergies == "option1") {
    $("#y3").prop("checked", true);
  } else $("#n3").prop("checked", true);
  if (user[0].registration.illness == "option1") {
    $("#y4").prop("checked", true);
  } else $("#n4").prop("checked", true);
}

$(document).ready(function () {
  // Listen to submit event on the <form> itself!
  $("#target").submit(function (e) {
    e.preventDefault();
    submitform();
    alert("Registration details updated!");
  });
});

async function submitform() {
  console.log("in");
  var subform = {
    registration: {
      location: $("#post1").val(),
      pregnant: $('input[name="inlineRadioOptions1"]:checked').val(),
      oku: $('input[name="inlineRadioOptions2"]:checked').val(),
      state1: $("#post2").val(),
      state2: $("#post3").val(),
      allergies: $('input[name="inlineRadioOptions3"]:checked').val(),
      illness: $('input[name="inlineRadioOptions4"]:checked').val(),
    },
  };
  let id = sessionStorage.getItem("userid");
  let uri = "http://localhost:3000/user/"+id;
  await fetch(uri, {
    method: "PATCH",
    body: JSON.stringify(subform),
    headers: { "Content-Type": "application/json" },
  });
}


window.sr = ScrollReveal();
sr.reveal(".navbar", {
  duration: 2200,
  origin: "bottom",
});
sr.reveal("#test", {
  duration: 2000,
  origin: "right",
  distance: "250px"
});
sr.reveal("#area", {
  duration: 2250,
  origin: "right",
  distance: "250px",
});
sr.reveal("#lhfc", {
  duration: 2550,
  origin: "right",
  distance: "250px",
});
sr.reveal("#detail", {
  duration: 2550,
  origin: "right",
  distance: "250px",
});
sr.reveal("#app", {
  duration: 2550,
  origin: "right",
  distance: "250px",
})

