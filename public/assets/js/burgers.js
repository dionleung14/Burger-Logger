// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $(".change-devoured").on("click", function(event) {
    var id = $(this).data("id");
    var newDevoured = true;

    var newDevouredState = {
      devoured: newDevoured
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function() {
        console.log("changed devoured to", newDevoured);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
  
  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    const newBurger = {
      burger_name: $("#burger").val().trim(),
      devoured: false
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

  // // Send the PUT request.
  // $.ajax("/api/burgers/" + id, {
  //   type: "PUT",
  //   data: newdevoured
  // }).then(
  //   function() {
  //     console.log("changed sleep to", newSleep);
  //     // Reload the page to get the updated list
  //     location.reload();
  //   }
  // );

  $(".delete").on("click", function (event) {
    event.preventDefault();
    // console.log("Clicked")
    // console.log($(this).attr("data-id"))
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
