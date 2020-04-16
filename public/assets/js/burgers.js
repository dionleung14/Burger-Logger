// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    const newBurger = {
      burger_name: $("#burger").val().trim(),
    //   sleepy: $("[name=sleepy]:checked").val().trim(),
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(function () {
      console.log("ordered a burger");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".delete").on("click", function (event) {
    event.preventDefault();
    // console.log("Clicked")
    console.log($(this).attr("data-id"))
    const burgerId = $(this).attr("data-id");
    // console.log($(this))
    $.ajax(`/api/burgers/${burgerId}`, {
      type: "DELETE",
    }).then(function () {
      console.log("burger deleted and yeeted :(");
      location.reload();
    });
  });
});
