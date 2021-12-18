$(function () {
  $("#contact input, #contact textarea").jqBootstrapValidation({
    preventSubmit: true,
    filter: function () {
      return $(this).is(":visible");
    }
  });

  $('a[data-toggle="tab"]').click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
