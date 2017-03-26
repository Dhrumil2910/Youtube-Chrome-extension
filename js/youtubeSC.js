$(document).ready(function() {

    function getToken(callback) {
        var token;
        chrome.runtime.sendMessage({ command: "get_access_token" }, function(response) {
            token = response.token; // prints ["word1, "word2" ..]
            callback(response);
        });
    }

    function processToken(response) {
        token = response.token;
        $.checkAuthorization();
    }
    getToken(processToken); // get the authorization token

    // check for authorization
    $.checkAuthorization = function() {
        var url = baseUrl + "user/";

        $.ajaxCall("https://127.0.0.1:9000/api/v1/user/", "GET", "", function(response) {
            if (response.output.status == 401) {
                var loginLink = "<div style='margin-left:47%; width:7em;height:3em;background-color:#660000; border-radius:5%'>" +
                    "<a href='https://127.0.0.1:9000/login' target='_blank' id='loginLink'>Login</a>" +
                    "</div>"
                $(".ytp-chrome-controls").append(loginLink);

            } else {
                // regex for checking a valid youtube url
                var matchUrl = videoUrl.match(/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/);
                if (matchUrl) {
                    $.getExistingVideoData($.extractVideoId(videoUrl));
                }
            }
            console.log(token);
        })

    }


    /* defining the initiation function */
    $.mainFunction = function() {

            $.makePlayerControls(); //  make the video controls 
            $.displayNotes();
            $.makeShortcuts();
            $(".ytp-preview.ytp-tooltip").remove();

            // Event Listeners for hovering and displaying the relevant notes
            $(document).on("mouseover", ".own-notes-markers", function() {
                var key_note_marker = $(this).attr("id");
                var key_note = key_note_marker.split('-')[1];
                var splitted;
                $(".ytp-preview.ytp-tooltip").remove();
                $.each(notes, function(key, value) {
                    splitted = key.split('.');
                    if (key != key_note) {
                        if (splitted[1]) {
                            $("#note-" + splitted[0] + "\\." + splitted[1]).hide(100);
                        } else {
                            $("#note-" + key).hide(100);
                        }
                    } else {
                        if (splitted[1]) {
                            $("#note-" + splitted[0] + "\\." + splitted[1]).fadeIn(100);
                        } else {
                            $("#note-" + key).fadeIn(100);
                        }

                    }
                })
            });

            $(document).on("click", ".fa-chevron-up", function() {
                $(this).toggleClass('fa-chevron-up fa-chevron-down')
                $.displayAllNotes(notes);
            })

            $(document).on("click", ".fa-chevron-down", function() {
                $(this).toggleClass('fa-chevron-down fa-chevron-up')
                $('.own-all-notes').remove();
            })


            $(document).on("mouseover", ".own-note-item", function() {
                $(this).css("background", "#660000");
            })
            $(document).on("mouseleave", ".own-note-item", function() {
                $(this).css("background", "black");
            })

            $(document).on("mouseleave", ".own-notes-markers", function() {
                var key_note_marker = $(this).attr("id");
                var key_note = key_note_marker.split('-')[1];
                var splitted = key_note.split('.');
                if (splitted[1]) {
                    $("#note-" + splitted[0] + "\\." + splitted[1]).fadeOut(100);
                } else {
                    $("#note-" + key_note).fadeOut(100);
                }
            });

            $(document).on("mouseenter", ".own-note-card", function() {
                $(this).find(".own-trash").fadeIn(200);
                $(this).find(".own-cancel").fadeIn(200);
                $(this).find(".own-edit-note").fadeIn(200);

            });
            $(document).on("mouseleave", ".own-note-card", function() {
                $(this).find(".own-trash").fadeOut(200);
                $(this).find(".own-cancel").fadeOut(200);
                $(this).find(".own-edit-note").fadeOut(200);

            });
            $(document).on("click", ".own-cancel", function() {
                $(this).closest(".own-note-card").fadeOut(100);
            });
            // deleting the note
            $(document).on("click", ".own-trash", function() {
                var note_time_marker = $(this).closest(".own-note-card").attr("id");
                var note_time = note_time_marker.split('-')[1];

                // Ajax call to delete the note
                var url = baseUrl + "notes/" + notes[note_time].id;
                $.ajaxCall(url, "DELETE", "", function(response) {

                    if (response.status) {
                        // On success
                        delete notes[note_time];
                        console.log($(this).closest(".own-note-card"));

                        var splitted = note_time.split('.');
                        if (splitted[1]) {
                            $("#marker-" + splitted[0] + "\\." + splitted[1]).remove();
                        } else {
                            $("#marker-" + splitted[0]).remove();
                        }
                    } else {
                        // On failure
                        console.log("not able to delete the note");
                    }
                })
                $(this).closest(".own-note-card").remove();
            });

            var $add_button = $('.own-plus');
            var $content = $('#content');
            var $player = $('#player');
            var $own_content = $('.own-content');

            // Add Button Clicked! - Opening the Modal
            var add_button_time;
            $add_button.on('click', function(data, response, xhr) {
                $(".own-note-card").fadeOut(100);
                $.makeAddNoteModal();
                $video.pause();
                add_button_time = $video.currentTime;
                $('#add_note_time').text($.getTimeformat($video.currentTime));

                $('.own-add-modal').show('fade', { 'direction': "up" }, 300);
                setTimeout(function() {
                    $(".own-add-content").focus();
                }, 0);

            });

            //clicks on the modal 
            $(document).on("click", ".modal-content", function(e) {
                setTimeout(function() {
                    $(".own-add-content").focus();
                }, 0);
                e.stopPropagation(); // This is the preferred method.
                return false; // This should not be used unless you do not want
                // any click events registering inside the div
            });

            //closing the add-modal
            $(document).on("click", ".own-add-modal", function(e) {
                $('.own-add-modal').hide('fade', { 'direction': "up" }, 300, function() { $(this).remove(); });
                $video.play();
            });

            // Making a note and storing it in the database at a particular time
            $(document).on("click", ".own-add-note-button", function(data, response, xhr) {
                var note = $('.own-add-content').html();
                var data = {
                    "url_id": $.extractVideoId(videoUrl),
                    "content": note,
                    "time_snap": add_button_time.toString()
                };

                console.log("add button");
                // Ajax call to add the note
                var url = baseUrl + "notes/"
                $.ajaxCall(url, "POST", data, function(response) {

                    if (response.status) {
                        // add to the notes list
                        notes[add_button_time] = { "content": response.output.content, "id": response.output.id }
                        $.displayNotes(notes);
                        $('.own-add-modal').hide('fade', { 'direction': "up" }, 300, function() { $(this).remove(); });
                        $video.play();
                    } else {
                        alert("Note addition failed");
                    }
                })
            });


            // Edit a note
            var edit_note_id;
            $(document).on('click', '.own-edit-note', function(data, response, xhr) {
                edit_note_id = $(this).closest(".own-note-card").attr("id").split("-")[1];
                $(".own-note-card").fadeOut(100);
                $.makeEditNoteModal();
                $(".own-edit-modal").attr("id", edit_note_id);
                $video.pause();
                $('#edit_note_time').text($.getTimeformat(edit_note_id));
                $('.own-edit-modal').show('fade', { 'direction': "up" }, 300);
                setTimeout(function() {
                    $(".own-edit-content").focus();
                }, 0);

                // get the already existing contents of the note
                $('#own-edit-content').text($(this).closest(".own-note-card").find('.own-content').text());

            });

            //clicks on the modal 
            $(document).on("click", ".modal-edit-content", function(e) {
                setTimeout(function() {
                    $(".own-edit-content").focus();
                }, 0);
                e.stopPropagation(); // This is the preferred method.
                return false; // This should not be used unless you do not want
                // any click events registering inside the div
            });

            //closing the add-modal
            $(document).on("click", ".own-edit-modal", function(e) {
                $('.own-edit-modal').hide('fade', { 'direction': "up" }, 300, function() { $(this).remove(); });
                $video.play();
            });

            $(document).on("click", ".own-edit-note-button", function(data, response, xhr) {
                var note = $('.own-edit-content').html();

                // Ajax call for editing the note
                var url = baseUrl + "notes/" + notes[edit_note_id].id + "/";
                var data = {
                    "url_id": $.extractVideoId(videoUrl),
                    "content": note,
                    "time_snap": edit_note_id.toString()
                };

                $.ajaxCall(url, "PUT", data, function(response) {

                    if (response.status) {

                        // add to the notes list
                        notes[edit_note_id].content = response.output.content;
                        $.displayNotes(notes);
                        $('.own-edit-modal').hide('fade', { 'direction': "up" }, 300, function() { $(this).remove(); });
                        $video.play();
                    } else {
                        alert("Error in editing the note");
                    }
                })
            });

            // Bookmarking or removing the bookmark of the video

            var $bookmark_icon = $('.own-bookmark');

            $bookmark_icon.on('click', function(data, response, xhr) {
                if ($bookmark_icon.css('color') == 'rgb(255, 0, 0)') { /*--------- TODO : To remove the bookmark ----------*/
                    alert("Bookmark Removed");
                    $bookmark_icon.css('color', 'rgb(255, 255, 255)');
                } else if ($bookmark_icon.css('color') == 'rgb(255, 255, 255)') {

                    /* Collecting all the data relevant to the video */
                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://127.0.0.1:8000/videos/",
                        "method": "POST",
                        "headers": {
                            "authorization": "Basic c2FnYXI6dGVtcG9wYXNz",
                            "content-type": "application/x-www-form-urlencoded",
                            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                            //"accept-encoding": "gzip, deflate, br",
                            //"cache-control": "no-cache",
                            //"postman-token": "18d12e70-e8d5-1268-e370-72276031c5f9"
                        },
                        "data": {
                            "title": videoTitle,
                            "link": videoUrl,
                            "duration": parseInt(document.getElementsByTagName('video')[0].duration),
                            "thumbnail": videoThumbnail,
                            "share_id": "123",
                            "tag": "video",
                            "shared": false
                        },
                    }

                    // Making the Ajax call
                    $.ajax(settings).done(function(response) {
                        console.log(response);
                        alert('Bookmark Added');
                        $bookmark_icon.css('color', 'rgb(255, 0, 0)');
                    });

                }

            });

            // Tagging a video // TODO: To fetch already existing tags



            var $tag_button = $('.own-tags');


            // Add Button Clicked! - Opening the Modal

            $tag_button.on('click', function(data, response, xhr) {
                $.makeTagNoteModal();
                $('#tagBox').tagEditor();
                $('.own-tag-modal').show('fade', { 'direction': "up" }, 300);
                $('#tagBox').focus();
            });

            //clicks on the modal 

            $(document).on("click", ".modal-tag-content", function(e) {
                e.stopPropagation(); // This is the preferred method.
                return false; // This should not be used unless you do not want
                // any click events registering inside the div
            });

            //closing the tag-modal

            $(document).on("click", ".own-tag-modal", function() {
                $('.own-tag-modal').hide('fade', { 'direction': "up" }, 300, function() { $(this).remove(); });
            });


            // Making shareable link input box

            $.makeShareModal();

            // Share icon clicked !!

            var $share_button = $('.own-share');
            var $modal_share = $('#own-share-modal');
            $share_button.on('click', function(data, response, xhr) {
                $modal_share.slideToggle(500);
            });

        }

    // the main initiation function
    $.mainFunction();

    // check if the video is loaded
    document.getElementsByTagName('video')[0].onloadeddata = function(e) {
        videoDuration = e.target.duration;
        $video = document.getElementsByTagName('video')[0];
    };
})
