jQuery(document).ready(function()
{jQuery(".asalah_color_switcher").live("click",function()
{var color=jQuery(this).attr("name");var dataString='color='+ color;jQuery.ajax
({type:"POST",url:"http://projects.asalahsolutions.com/bostan/wp-content/themes/bostan/switcher/actions/color.php",data:dataString,cache:false,success:function(response)
{jQuery(".switched_style").html(response);}});jQuery('#asalah_color_switcher_picker').css('backgroundColor','#'+ color);});jQuery(".asalah_html_bg_switcher").live("click",function()
{var bg=jQuery(this).attr("src");var bg_att='url("'+ bg+'")'
jQuery('html').css("background",bg_att)});jQuery(".style_switcher_control.closed_switcher").live("click",function()
{jQuery('.style_switcher_control').addClass('opened_switcher');jQuery('.style_switcher').addClass('opened_switcher');jQuery('.style_switcher_control').removeClass('closed_switcher');jQuery('.style_switcher').removeClass('closed_switcher');});jQuery(".style_switcher_control.opened_switcher").live("click",function()
{jQuery('.style_switcher_control').addClass('closed_switcher');jQuery('.style_switcher').addClass('closed_switcher');jQuery('.style_switcher_control').removeClass('opened_switcher');jQuery('.style_switcher').removeClass('opened_switcher');});jQuery("select[name='asalah_body_layout_switcher']").change(function(){    
        var selected_swithcer_layout = jQuery("select[name='asalah_body_layout_switcher'] option:selected ").val();

        if (selected_swithcer_layout == 'boxed_body') {
            jQuery(".switched_layout").html(" <style>.body_width {width: 1000px;margin: 0px auto;} body {box-shadow: 0 0 8px rgba(0, 0, 0, 0.4); margin: 20px auto!important; }.site_secondary_footer { padding: 0; } @media (max-width:979px){ .body_width { width: 760px; } } @media (max-width: 767px) { body { background-image:none; background-attachment: fixed; background-size: cover; background:none; background:#fff!important; } .body_width { width: auto; } }</style>");

        } else if (selected_swithcer_layout == 'fluid_body') {
            jQuery(".switched_layout").html("");                        
        }
    });    
// activate color picker
    jQuery('#asalah_color_switcher_picker').ColorPicker({
        color: '#ffffff',
        onShow: function(colpkr) {
            jQuery(colpkr).fadeIn(500);
            return false;
        },
        onHide: function(colpkr) {
            jQuery(colpkr).fadeOut(500);
            return false;
        },
        onChange: function(hsb, hex, rgb) {
            jQuery('#asalah_color_switcher_picker').css('backgroundColor', '#' + hex);
            var color = hex;
             var dataString = 'color=' + color;


        jQuery.ajax
                ({
                    type: "POST",
                    url: "http://projects.asalahsolutions.com/bostan/wp-content/themes/bostan/switcher/actions/color.php",
                    data: dataString,
                    cache: false,
                    success: function(response)
                    {
                        jQuery(".switched_style").html(response);

                    }
                });
        }
    });
});


