/*!
 * jQuery Cookie Plugin v1.3
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function(f,b,g){var a=/\+/g;function e(h){return h}function c(h){return decodeURIComponent(h.replace(a," "))}var d=f.cookie=function(p,o,u){if(o!==g){u=f.extend({},d.defaults,u);if(o===null){u.expires=-1}if(typeof u.expires==="number"){var q=u.expires,s=u.expires=new Date();s.setDate(s.getDate()+q)}o=d.json?JSON.stringify(o):String(o);return(b.cookie=[encodeURIComponent(p),"=",d.raw?o:encodeURIComponent(o),u.expires?"; expires="+u.expires.toUTCString():"",u.path?"; path="+u.path:"",u.domain?"; domain="+u.domain:"",u.secure?"; secure":""].join(""))}var h=d.raw?e:c;var r=b.cookie.split("; ");for(var n=0,k=r.length;n<k;n++){var m=r[n].split("=");if(h(m.shift())===p){var j=h(m.join("="));return d.json?JSON.parse(j):j}}return null};d.defaults={};f.removeCookie=function(i,h){if(f.cookie(i)!==null){f.cookie(i,null,h);return true}return false}})(jQuery,document);

// ++++++++++++++++++++++++++++++++++++++++++++++++
// NOTICE!! THIS JAVASCRIPT IS USED JUST FOR DOCS
// YOU MAY NEED SOME CODE FOR YOUR PROJECT
// NOT INCLUDE THIS FILES AS IS
// ++++++++++++++++++++++++++++++++++++++++++++++++

!function ($) {

  $(function(){

    var $window = $(window)

    // Disable certain links in docs
    $('section [href^=#]').click(function (e) {
      e.preventDefault()
    })

    // side bar
    $('.bs-docs-sidenav').affix({
      offset: {
        top: function () { return $window.width() <= 980 ? 290 : 210 }
      , bottom: 270
      }
    })

    // make code pretty
    window.prettyPrint && prettyPrint()

    // add-ons
    $('.add-on :checkbox').on('click', function () {
      var $this = $(this)
        , method = $this.attr('checked') ? 'addClass' : 'removeClass'
      $(this).parents('.add-on')[method]('active')
    })

    // add tipsies to grid for scaffolding
    if ($('#gridSystem').length) {
      $('#gridSystem').tooltip({
          selector: '.show-grid > div'
        , title: function () { return $(this).width() + 'px' }
      })
    }

    // tooltip demo
    $('.tooltip-demo').tooltip({
      selector: "a[rel=tooltip]"
    })

    $('.tooltip-test').tooltip()
    $('.popover-test').popover()

    // popover demo
    $("a[rel=popover]")
      .popover()
      .click(function(e) {
        e.preventDefault()
      })

    // button state demo
    $('#fat-btn')
      .click(function () {
        var btn = $(this)
        btn.button('loading')
        setTimeout(function () {
          btn.button('reset')
        }, 3000)
      })

    // carousel demo
    $('#myCarousel').carousel()
    $('#myCarouselFade').carousel()


    /**
     *  Dropper style sheet switcher 
     * *********************************/
    
    if($.cookie("dropper-theme")) {
      $("#dropper-theme").attr("href",$.cookie("dropper-theme"));
    }

    $("#css-switcher > a").click(function() { 
        $("#dropper-theme").attr("href",$(this).attr('rel'));
        $.cookie("dropper-theme",$(this).attr('rel'), {expires: 5, path: '/'});
        return false;
    });

    
    // Dropper CAROUSEL
    $('#testimonialCarousel').carousel()
    $('#galeryCarousel').carousel()
    $('#textCarousel').carousel()
    
    $('#dp-input1').datepicker();
    $('#dp-input2').datepicker();


    /**
     * Flickr Feed
     ************************************************/
    
    // 
    // Add class 'flickr-gallery' and 
    // attribute data-flickr-id="999999@N99" to the list container
    
    $('.flickr-gallery').each(function(){
      $(this).jflickrfeed({
        limit: 12,
        qstrings: {
            id: $(this).data('flickr-id')
        },
        itemTemplate: '<li class="span1"><a href="{{image_b}}"><img alt="{{title}}" src="{{image_s}}" /></a></li>'
      });
    });

    /////////////////////////////
    // GMAP v3
    /////////////////////////////

    if(typeof google !== 'undefined')
    $('.gmap').each(function(){
      var d = $(this).data('markers').split(';'),
          m = [];
      for(a in d) { m.push({'address' : d[a]}) }
      $(this).gMap({
        zoom: $(this).data('zoom') || 16,
        markers: m
      });

    })

    /**
     * Colorpicker Plugin
     ************************************************/

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
    
}(window.jQuery);
