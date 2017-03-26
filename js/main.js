$(document).ready(function() {

    // Main Function
    $.mainFunction = function() {

        $.getTheVideos(); // get the paginated form of videos
        $.displayVideos(videos);
        console.log(videos);

        // delete a video 

        $(document).on("click", ".own-trash-icon", function() {
            // get the video id
            var videoIdDelete = $(this).closest(".row").attr("id");
            console.log(videoIdDelete);

            // delete the video from database -- ajax call
            var url = baseUrl + "notebooks/" + videoIdDelete;
            $.ajaxCall(url, "DELETE", "", function(output) {
                if (output.status) {
                    // delete from the videos variable on success
                    $.each(videos, function(i, item) {
                        if (item.id == parseInt(videoIdDelete)) {
                            videos.splice(i, 1);
                            return false;
                        }
                    });

                    // delete from DOM
                    $('#' + videoIdDelete).hide('fade', { "direction": "up" }, function() { $('#' + videoIdDelete).remove(); });
                }
                else {
                    alert("error in deleting the video");
                }
            })
        })

        // add the tags
        var videoIdTag;
        $(document).on("click", ".own-tag-icon", function() {
            // get the video id
            var videoIdTag = $(this).closest(".row").attr("id");
            // open the modal
            $('.own-tag-modal')
                .modal({
                    blurring: false
                })
                .modal('show');

            // show existing tags using Ajax Call
            var tags;
            var url = baseUrl + "notebooks/" + videoIdTag + "/tags/";
            $.ajaxCall(url, "GET", "", function(response){
                if(response.status){
                    tags = response.output.results;
                }
            })
            $('.ui.dropdown').dropdown('set selected', tags);

        })

        // tag modal submit
        $(document).on("click", ".own-tag-modal-button", function() {
            var tags = $("#tags-input").val();
            // update the tags to the database -- AJAX Call

            //
        })


        // Search Feature
        $(".own-search-input").on("keyup", function(data, response, xhr) {
            console.log($(this).val());
            // search input val
            /* var url = "/api/v1/devs/" + search_item + "search=" + $(this).val();

             $.ajaxCall(url, "GET", "", function(response) {
                 $.displayVideos(response);
             });*/ // SEARCH TODO
        })



        $('#main_menu_toggle').click(function() {
            $('.ui.sidebar')
                .sidebar('setting', 'transition', 'overlay')
                .sidebar('toggle');
        });
        
        $(".row")
            .mouseover(function() {
                $(this).children().css('box-shadow', '-1px 1px 10px -1px #888');

            })
            .mouseout(function() {
                $(this).children().css('box-shadow', '0px 0px 0px #888');
            });

        jQuery(document).on('click', ".own-search", function(data, response, xhr) {
            $(".own-menu").css("background-color", "white");
            $(".own-sidebar-icon").hide(50);
            $(".own-heading-app").hide(50);
            $(".own-search").hide(50);
            $(".own-search-area").fadeIn(500);
            $(".own-search-input").focus();
        });

        $(".own-search-input").blur(function() {
            $(".own-menu").css("background-color", "rgb(245, 245, 245)");
            $(".own-search-area").hide(20);
            $(".own-sidebar-icon").fadeIn(500);
            $(".own-heading-app").fadeIn(500);
            $(".own-search").fadeIn(500);

        });

        $('.ui.dropdown')
            .dropdown();


        $('.ui.dropdown')
            .dropdown({
                allowAdditions: true
            });

        // Share modal

        jQuery(document).on('click', ".share", function(data, response, xhr) {
            $('.own-share-modal')
                .modal({
                    blurring: false
                })
                .modal('show');
        });
    }

    $.mainFunction();
});




// Each time the user scrolls // INFINITE SCROLLING
/*$(".own-video-grid").scroll(function() {
    if($('.own-video-grid').scrollTop() == $('.own-video-grid').innerHeight()){
    console.log("Hi");
}
    // End of the document reached?
    if ($(".own-video-grid")[0].scrollHeight - $(".own-video-grid").height() == $(".own-video-grid").scrollTop()) {
        console.log("bottom reached");*/

// Uncomment this AJAX call to test it
/*
$.ajax({
    url: 'get-post.php',
    dataType: 'html',
    success: function(html) {
        $('#posts').append(html);
        $('#loading').hide();
    }
});
*/

/*  $('.own-video-grid').append('<div class="row" style="padding-right:1.7em; padding-left:1.7em;margin-top:-1.3em;height:8.9em"><div class="six wide column" style="background-size: cover;padding:0"><a><img src="./images/uni.jpg" style="width:100%;height:100%;padding:0;float:left"></a></div><div class="ten wide column" style="background-size:cover;padding:0"><div class="ui cards" style="overflow-y:hidden"><div class="ui card own-card" style="width:100%;height:7em;max-height:8.9em;overflow-y:hidden;border-radius:0"><div class="content" style="overflow-y:hidden;max-height:4em"><a style="color: black; font-weight: bold"><div class="header" style="overflow-y:hidden;font-size: 1em">Ed Sheeran - Shape Of You [Official Lyric Video]</div></a></div><div class="extra content"><span class="right floated tag"><a><i class="tag icon own-tag-icon" data-content="tag" data-position="top center" data-inverted="" data-variation="mini"></i></a></span><span class="right floated trash"><a><i class="trash icon own-trash-icon" data-content="delete" data-position="top center" data-inverted="" data-variation="mini"></i></a></span><span class="right floated share"><a><i class="share icon own-share-icon" data-content="share" data-position="top right" data-inverted="" data-variation="mini"></i></a></span><span class="left floated"><p class="own-no-of-notes"> 3 Notes </p></span></div></div></div></div></div>');
    }
});
*/
