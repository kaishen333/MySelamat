$(document).ready(function () {
  $("#name")
    .on("change", function () {
      $(".data").hide();
      $("#" + $(this).val()).fadeIn(100);
    })
    .change();
});

function checLogin() {
  $("#loginlink").attr("href", "login.html");
  renderDetails()
  if (sessionStorage.getItem("login") == "true") {
    $(document).ready(function () {
      $("#detail").show();
      renderPosts();
      var id = sessionStorage.getItem("id");
      $("#loginlink").html(id);
    });
  }
}

