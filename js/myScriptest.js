$(document).ready(function() {
    var Title = $("#eow-title").attr("title");
    $(".ytp-chrome-controls").append("<div class='annotation annotation-type-custom iv-branding' id='Hi1' style='background-color:white; display:none;width: 25em; height:12em; left: 40%;margin-bottom:5em;opacity:1;border-radius: 80%'><div class='card w-100 h-100' style='background-color:white;'><span><a><i style='margin-top:0.5em; margin-left:17.3em;' class='fa fa-times-circle fa-lg own-cancel' ></i></a><a><i class='fa fa-trash fa-lg own-trash' style='margin-left:-2em; margin-top:0.5em;'></i></a></span><div class='own-content'  contentEditable='true' id='own-conten' style='padding-left:1em;margin-top:0em; height: 6em; overflow-y: auto;'><p style='font-size:1em'>" + Title + "</p></div> <button type = 'button' class = 'btn btn-primary ' id = 'add-but' style='width: 20%;height: 19%; margin-left: 78%; font-size: 100%;font-weight: bold'>Add</button></div></div>");
    /*$('.ytp-progress-list').append("<div class='ytp-play-progress' id='hi' style='left:40%; transform: scaleX(0.01);background-color:yellow; border-radius:50%;height:1.5em;width:100em; margin-bottom:-0.5em'></div><div class='ytp-play-progress' id='hi' style='left:60%; transform: scaleX(0.01);background-color:orange; border-radius:50%;height:1.5em;width:100em;margin-bottom:-0.5em'></div><div class='ytp-play-progress' id='hi' style='left:50%; transform: scaleX(0.01);background-color:cyan; border-radius:50%;height:1.5em;width:100em;margin-bottom:-0.5em'></div><div class='ytp-play-progress' id='hi' style='left:20%; transform: scaleX(0.01);background-color:orange; border-radius:50%;height:1.5em;width:100em;margin-bottom:-0.5em'></div>");
     */
    $("#page").append("<div id='myModal' class='modal1'><!-- Modal content --><div class='modal-content'><div class='own-content'  contentEditable='true' id='own-conten' style='padding-left:1em;padding-top:2em; height: 75%; overflow-y: auto;'><p style='font-size:1em; color: black'>" + Title + "</p></div> <button type = 'button' class = 'btn btn-primary ' style='width: 20%;height: 19%; margin-left: 78%; font-size: 100%;font-weight: bold'>Add</button></div></div></div>")







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

    jQuery(".own-plus").on('click', function(data, response, xhr) {
        $('#content').css("opacity", "0.1");
        $('#player').css("opacity", "0.1");

        $('.modal1').show('fade', { 'direction': "up" }, 300)
    });

    $(".modal-content").click(function(e) {
        e.stopPropagation(); // This is the preferred method.
        return false; // This should not be used unless you do not want
        // any click events registering inside the div
    });
    $(window).keydown(function(e) {
        switch (e.keyCode) {
            case 71:
                if (($(".modal1:visible").length == 0)) {
                    $('#content').css("opacity", "0.1");
                    $('#player').css("opacity", "0.1");
                    $('.modal1').show('fade', { 'direction': "up" }, 300);
                }
                return; // left arrow key
            case 38: // up arrow key
                e.preventDefault(); // avoid browser scrolling due to pressed key
                // TODO: go to previous image
                return;
            case 39: // right arrow key
            case 40: // up arrow key
                e.preventDefault();
                // TODO: go to next image
                return;
        }
    });

    $(".modal1").click(function() {
        $('.modal1').hide('fade', { 'direction': "up" }, 300)
        $('#content').css("opacity", "1");
        $('#player').css("opacity", "1");
    });

    jQuery(document).on('click', "#add-but", function(data, response, xhr) {

        $.ajax({
            type: 'POST',
            url: '/vbook/set_fav_note',
            data: {
                id: id,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),

            },
            success: function(response) {
                if (response.fav) {
                    $('#' + $this.attr('id')).attr("class", "star orange icon own-fav-icon")
                } else {
                    $('#' + $this.attr('id')).attr("class", "star gray icon own-fav-icon")
                }
            }
        });
    });




});
