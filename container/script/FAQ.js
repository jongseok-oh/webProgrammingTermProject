$(document).ready(function () {
  $("#subject").on("keyup", function () {
    $("#nowByte").html($(this).val().length);

    if ($(this).val().length > 200) {
      $(this).val($(this).val().substring(0, 200));
      $("#nowByte").html("200");
    }
  });
});
