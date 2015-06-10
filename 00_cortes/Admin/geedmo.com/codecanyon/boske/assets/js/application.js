// ++++++++++++++++++++++++++++++++++++++++++++++++
// NOTICE!! THIS JAVASCRIPT IS USED JUST FOR DOCS
// YOU MAY NEED SOME CODE FOR YOUR PROJECT
// NOT INCLUDE THIS FILES AS IS
// ++++++++++++++++++++++++++++++++++++++++++++++++

(function($, window, document){

  $(function(){

    // Disable links in docs
    $('[href^=#]').click(function (e) {
      e.preventDefault();
    });

    // tooltip demo
    $("[data-toggle='tooltip']").tooltip();

    // popover demo
    $("[data-toggle=popover]").popover();

    // button state demo
    $('#fat-btn')
      .click(function () {
        var btn = $(this);
        btn.button('loading');
        setTimeout(function () {
          btn.button('reset');
        }, 3000);
      });

    // carousel demo
    $('#myCarousel').carousel();

  });

}(jQuery, window, document));
