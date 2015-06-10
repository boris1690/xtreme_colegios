/*! jQuery JavaScript Library v1.4.2 (document.ready) */
(function(){var e=function(i,j){},c=window.jQuery,h=window.$,d,g=false,f=[],b;e.fn={ready:function(i){e.bindReady();if(e.isReady){i.call(document,e)}else{if(f){f.push(i)}}return this}};e.isReady=false;e.ready=function(){if(!e.isReady){if(!document.body){return setTimeout(e.ready,13)}e.isReady=true;if(f){var k,j=0;while((k=f[j++])){k.call(document,e)}f=null}if(e.fn.triggerHandler){e(document).triggerHandler("ready")}}};e.bindReady=function(){if(g){return}g=true;if(document.readyState==="complete"){return e.ready()}if(document.addEventListener){document.addEventListener("DOMContentLoaded",b,false);window.addEventListener("load",e.ready,false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",b);window.attachEvent("onload",e.ready);var i=false;try{i=window.frameElement==null}catch(j){}if(document.documentElement.doScroll&&i){a()}}}};d=e(document);if(document.addEventListener){b=function(){document.removeEventListener("DOMContentLoaded",b,false);e.ready()}}else{if(document.attachEvent){b=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",b);e.ready()}}}}function a(){if(e.isReady){return}try{document.documentElement.doScroll("left")}catch(i){setTimeout(a,1);return}e.ready()}window.jQuery=window.$=e})();

$.fn.ready(function() { // document ready

    var iframePreview = document.getElementById('preview');

    document.getElementById('conmutador-wrapper').onclick = closeMenu;
    document.getElementById('selector').onclick = toggleMenu;
	document.onclick = closeMenu;

	document.onkeydown = function(evt) {
		evt = evt || window.event;
		if (evt.keyCode == 27) {
			closeMenu();
		}
	};
	  
    function toggleMenu(e) {
        e.stopPropagation();
        var content = document.getElementById('temas');
        content.className = (content.className == 'open') ? '' : 'open';
    }

    function closeMenu() {
        var content = document.getElementById('temas');
        content.className = '';
    }

    setIframeHeight();

    function setIframeHeight () { // keep iframe filling  page
        var winHg = window.innerHeight || document.documentElement.clientHeight || body.clientHeight;
        iframePreview.height = (winHg - document.getElementById('conmutador-wrapper').offsetHeight);
    }

    window.onresize = setIframeHeight;

    /*  View switcher */

    document.getElementById('phone-view').onclick = setPreviewDevice;
    document.getElementById('tablet-view').onclick = setPreviewDevice;
    document.getElementById('full-view').onclick = setPreviewDevice;

    function setPreviewDevice(e) {
      e.preventDefault();
      iframePreview.className = this.id;
    }

});
