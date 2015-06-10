// ++++++++++++++++++++++++++++++++++++++++++++++++
// NOTICE!! THIS JAVASCRIPT IS USED JUST FOR DOCS
// YOU MAY NEED SOME CODE FOR YOUR PROJECT
// NOT INCLUDE THIS FILES AS IS
// ++++++++++++++++++++++++++++++++++++++++++++++++

(function($, window, document){

  $(function() { // document.ready

    ///////////////////////////
    // Disable links in docs //
    ///////////////////////////
    $('[href=#]').click(function (e) {
      e.preventDefault();
    });

    // tooltip demo
    $("[data-toggle=tooltip]").tooltip();

    // popover demo
    $("[data-toggle=popover]")
      .popover();

    // button state demo
    $('#fat-btn')
      .click(function () {
        var btn = $(this);
        btn.button('loading');
        setTimeout(function () {
          btn.button('reset');
        }, 3000);
      });

    /* Style switcher */
    if ( 'localStorage' in window && window['localStorage'] !== null ) {
      
      var stylesheet = $("#elemento-theme"), stKey = 'elemento-bs3';

      localStorage[stKey] && stylesheet.attr("href", localStorage[stKey]);

      $("#css-switcher a").click(function() {
          localStorage[stKey] = $(this).attr('rel');
          stylesheet.attr("href", localStorage[stKey]);
          return false;
      });
    }

    // carousel demo
    $('#myCarousel').carousel();
    $('#myCarouselV').carousel();
    $('#testimonialCarousel').carousel();
    $('#galleryCarousel').carousel();


    /////////////////////////////
    // ACCORDION ICON TOGGLE
    /////////////////////////////
    var iconOpen = 'fa-minus',
        iconClose = 'fa-plus';

    $(document).on('show.bs.collapse hide.bs.collapse', '.accordion', function (e) {
        var $target = $(e.target);
          $target.siblings('.accordion-heading')
          .find('em').toggleClass(iconOpen + ' ' + iconClose);
          if(e.type == 'show')
              $target.prev('.accordion-heading').find('.accordion-toggle').addClass('active');
          if(e.type == 'hide')
              $(this).find('.accordion-toggle').not($target).removeClass('active');
    });


    /////////////////////////////
    // TYPEAHEAD (autocomplete)
    /////////////////////////////

    /* Bootstrap 3 doesn't include typeahead so*/
    $.fn.typeahead && 
    $('[data-provide="typeahead"]').typeahead({
      name: "states",
      local: ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],
      limit: 4
    });

    /////////////////////////////
    // GMAP v3
    /////////////////////////////

    if(typeof google !== 'undefined' && $.fn.gMap )
      $('.gmap').each(function(){
        var d = $(this).data('markers').split(';'),
            m = [];
        for(var a in d) { m.push({'address' : d[a]}); }
        $(this).gMap({
          zoom: $(this).data('zoom') || 14,
          markers: m
        });

      });

    /////////////////////////////
    // DATEPICKER
    /////////////////////////////
    
    $('#dp-input1').datepicker();
    $('#dp-input2').datepicker();

    /////////////////////////////
    // COLORPICKER
    /////////////////////////////

    $('#cp1').colorpicker({
      format: 'hex'
    });
    $('#cp2').colorpicker();
    $('#cp3').colorpicker();

    var btnStyle = $('#cp4').length && $('#cp4')[0].style;
    $('#cp4').colorpicker().on('changeColor', function(ev){
        btnStyle.backgroundColor = ev.color.toHex();
    });

  });

}(jQuery, window, document));