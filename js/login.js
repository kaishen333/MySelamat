//login
const form = document.querySelector("form");

const login = async (e) => {
  e.preventDefault();
  const icInput = document.getElementById("ic").value;
  const phoneInput = document.getElementById("phone").value;

  const id = icInput.slice(icInput.length - 4);
  const obj = {
    ic: icInput,
    phone: phoneInput,
    registration: {
      location: "",
      pregnant: "",
      oku: "",
      state1: "",
      state2: "",
      allergies: "",
      illness: "",
    },
    assessment: "pending registration",
    appointment: {
      locateId: "",
      date1: "",
      date2: "",
      comp1: "",
      comp2: "",
    },
  };
  let users = [];
  fetch("./db.json")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      users = data.user;
      for (let i = 0; i < users.length; i++) {
        if (icInput === users[i].ic && phoneInput === users[i].phone) {
          // Found, set info in session storage
          sessionStorage.setItem("id", id);
          sessionStorage.setItem("login", true);
          sessionStorage.setItem("userid", users[i].id);
          sessionStorage.setItem("ic", icInput);
          window.location.href = "index.html";
          console.log("found!");
        }
      }
    });
  /*not found, register user data
  console.log("creating user!");
  await fetch("http://localhost:3000/user", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: { "Content-Type": "application/json" },
  });
  alert("New Account Created, Please re-enter details to login");
  window.location.href = "login.html";
  */
};

form.addEventListener("submit", login);

window.sr = ScrollReveal();
sr.reveal(".bg-image", {
  duration: 2200,
  origin: "bottom",
});
sr.reveal(".btn", {
  duration: 2600,
  origin: "bottom",
});
sr.reveal(".brand", {
  duration: 2600,
  origin: "top",
})