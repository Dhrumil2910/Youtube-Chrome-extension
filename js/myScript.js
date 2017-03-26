$(document).ready(function() {
    var Title = $("#eow-title").attr("title");
    $(".ytp-chrome-controls").append("<div class='annotation annotation-type-custom iv-branding' id='Hi1' style='background-color:white; display:none;width: 25em; height:12em; left: 40%;margin-bottom:5em;opacity:1;border-radius: 80%'><div class='card w-100 h-100' style='background-color:white;'><span><a><i style='margin-top:0.5em; margin-left:17.3em;' class='fa fa-times-circle fa-lg own-cancel' ></i></a><a><i class='fa fa-trash fa-lg own-trash' style='margin-left:-2em; margin-top:0.5em;'></i></a></span><div class='own-content'  contentEditable='true' id='own-conten' style='padding-left:1em;margin-top:0em; height: 6em; overflow-y: auto;'><p style='font-size:1em'>"+Title+"</p></div> <button type = 'button' class = 'btn btn-primary ' style='width: 20%;height: 19%; margin-left: 78%; font-size: 100%;font-weight: bold'>Add</button></div></div>");
    $('.ytp-progress-list').append("<div class='ytp-play-progress' id='hi' style='left:40%; transform: scaleX(0.01);background-color:yellow; border-radius:50%;height:1.5em;width:100em; margin-bottom:-0.5em'></div><div class='ytp-play-progress' id='hi' style='left:60%; transform: scaleX(0.01);background-color:orange; border-radius:50%;height:1.5em;width:100em;margin-bottom:-0.5em'></div><div class='ytp-play-progress' id='hi' style='left:50%; transform: scaleX(0.01);background-color:cyan; border-radius:50%;height:1.5em;width:100em;margin-bottom:-0.5em'></div><div class='ytp-play-progress' id='hi' style='left:20%; transform: scaleX(0.01);background-color:orange; border-radius:50%;height:1.5em;width:100em;margin-bottom:-0.5em'></div>");
       $("body").append("<div class='modal fade' style='z-index: 2147483647;position: absolute; ' id='dialog_confirm_map' tabindex='-1' role='dialog' aria-labelledby='dialog_confirm_mapLabel' aria-hidden='true'><div class='modal-dialog' style='z-index: 2147483647;'><div class='modal-content' style='z-index: 2147483647;'><div class='modal-body'><p>You didn't move the map pin, are you sure it is on your address/house?</p></div><div class='modal-footer'> <span style='float:left'><button type='button' class='btn btn-default' data-dismiss='modal'>No, I'll do it now </button></span><span style='float:right'><button type='button' class='btn btn-primary' data-dismiss='modal' onClick='jQuery('#mapchanged').val(1);jQuery('#registration').submit();'>Yes, I am sure</button></span></div></div><!-- /.modal-content --></div><!-- /.modal-dialog --></div><!-- /.modal --></div>")
    $("#hi").mouseover(function() {
        /*alert($("video").position().top);   
        $("#Hi1").fadeIn(100);*/
        $('#dialog_confirm_map').modal();

    });
    $("video").css("position","relative");
    $('.modal-backdrop').appendTo('#page');






    jQuery(document).on('click', ".own-cancel", function(data, response, xhr) {
        $("#Hi1").fadeOut(100);
    });


    /*$('.own-content').focus(
        function() {
            $(this).parents().blur();
            document.getElementsByTagName('video')[0].pause();
            var time = document.getElementsByTagName('video')[0].currentTime;
            document.body.onkeydown = function(e) {
                if (e.keyCode == 57) {
                    $('.html5-video-player').css('background-color','grey');
                    e.stopPropagation();
                    document.getElementsByTagName('video')[0].currentTime = time;
                    
                    $('#player').blur();
                    
                    var te = document.getElementById("own-conten").innerHTML;

                    document.getElementById("own-conten").innerHTML = 'dhrumil';
                    e.preventDefault();
                    $('.own-content').focus();
                }
                else if (e.keyCode == 70) {
                    $('.html5-video-player').css('background-color','grey');
                    e.stopPropagation();
                    document.webkitExitFullscreen();
                    document.getElementsByTagName('video')[0].currentTime = time;
                    
                    $('#player').blur();
                    
                    var te = document.getElementById("own-conten").innerHTML;

                    document.getElementById("own-conten").innerHTML = 'dhrumil';
                    e.preventDefault();
                    $('.own-content').focus();
                }
            }

            $(this).css({ 'outline': 'none' });

        });*/





    $(".ytp-chrome-controls").append("<div style='margin-left:41%; width:14.5em;background-color:rgba(0,0,0, 0.7)'><button class='ytp-button' style='height:5em;margin-top:-0.6em;margin-left:0.6em'><i class='fa fa-plus fa-2x own-plus' style='color:white;opacity:1;'></i></button><button class='ytp-button' style='height:5em;margin-top:-0.6em;margin-left:0.6em'><i class='fa fa-share fa-2x own-share' style='color:white;opacity:1;'></i></button><button class='ytp-button' style='height:5em;margin-top:-0.6em;margin-left:0.6em'><i class='fa fa-bookmark fa-2x own-bookmark' style='color:white;opacity:1;'></i></button><button class='ytp-button' style='height:5em;margin-top:-0.6em;margin-left:0.6em'><i class='fa fa-tags fa-2x own-tags' style='color:white;opacity:1;'></i></button></div>");
    $(".ytp-chrome-controls").append("<div class='annotation annotation-type-custom iv-branding' id='Hi2' style='display:none;width: 32em; height:4.5em; left: 33%;margin-bottom:10em;opacity:1'><div class='input-group' style='margin-top:0.5em;width:30em;margin-left:1em'><input type='text' value='http://shareable.com?share_id=saj283nn2' class='form-control' style='border-radius:0;border-style:none;background-color:black'><span class='input-group-btn'><button class='btn btn-primary' style='border-radius:0'  type='button'>Copy</button></span></div></div>");
    jQuery(document).on('click', ".own-share", function(data, response, xhr) {

        $("#Hi2").toggle(300);
    });

    

});
