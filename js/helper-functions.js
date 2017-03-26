    // Set all the global variables

    var notes = {};
    var tags = ["TVF", "Sardar", "Dilli", "CoCanStudio"];
    var videoTitle = $("#eow-title").attr("title");
    var videoUrl = window.location.href;
    var $video, token, videoDuration, notesAjax;
    var baseUrl = "https://127.0.0.1:9000/api/v1/";

    //  Ajax function
    $.ajaxCall = function(url, method, data, handleData) {
        var settings = {
            "async": true,
            "crossDomain": false,
            "url": url,
            "method": method,
            "headers": {
                "authorization": "Bearer " + token,
                "cache-control": "no-cache",
            },
            "contentType": "application/json",
            "dataType": "json",
            "data": JSON.stringify(data),
            success: function(response) {
                handleData({ "status": true, "output": response });
            },
            error: function(response) {
                handleData({ "status": false, "output": response });
            }
        };

        $.ajax(settings)
    }


    /* Checking if the current video is present in the database or not */
    $.checkForBookmark = function() {
        // ajax call --- TODO
        var color = 'white';
        return color;
    }

    $.str_pad_left = function(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    }

    /* Converting from seconds to H:M:S */
    $.getTimeformat = function(time) {
        var time = Math.floor(time);
        var minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;
        return $.str_pad_left(minutes, '0', 2) + ':' + $.str_pad_left(seconds, '0', 2);
    }

    $.extractVideoId = function(url) {
        var videoId = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        return videoId[1];
    }

    var videoThumbnail = "https://img.youtube.com/vi/" + $.extractVideoId(videoUrl) + "/0.jpg";
    var _onPaste_StripFormatting_IEPaste = false;

    function OnPaste_StripFormatting(elem, e) {

        if (e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) {
            e.preventDefault();
            var text = e.originalEvent.clipboardData.getData('text/plain');
            window.document.execCommand('insertText', false, text);
        } else if (e.clipboardData && e.clipboardData.getData) {
            e.preventDefault();
            var text = e.clipboardData.getData('text/plain');
            window.document.execCommand('insertText', false, text);
        } else if (window.clipboardData && window.clipboardData.getData) {
            // Stop stack overflow
            if (!_onPaste_StripFormatting_IEPaste) {
                _onPaste_StripFormatting_IEPaste = true;
                e.preventDefault();
                window.document.execCommand('ms-pasteTextOnly', false);
            }
            _onPaste_StripFormatting_IEPaste = false;
        }

    }

    $.convertFromISO8601ToSec = function(duration) {
        var a = duration.match(/\d+/g);

        if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
            a = [0, a[0], 0];
        }

        if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
            a = [a[0], 0, a[1]];
        }
        if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
            a = [a[0], 0, 0];
        }

        duration = 0;

        if (a.length == 3) {
            duration = duration + parseInt(a[0]) * 3600;
            duration = duration + parseInt(a[1]) * 60;
            duration = duration + parseInt(a[2]);
        }

        if (a.length == 2) {
            duration = duration + parseInt(a[0]) * 60;
            duration = duration + parseInt(a[1]);
        }

        if (a.length == 1) {
            duration = duration + parseInt(a[0]);
        }
        return duration;
    }

    // display the notes on the progress bar
    $.displayNotes = function(videoJSON) {
        var leftPercent, leftPercentForNote;
        if ($(".own-note-card").length) {
            $(".own-note-card").remove();
        }
        if ($(".own-notes-markers").length) {
            $(".own-notes-markers").remove();
        }
        $.each(videoJSON, function(key, value) {
            leftPercent = (parseInt(key) / parseInt(videoDuration)) * 100;
            leftPercentForNote = leftPercent <= 67 ? leftPercent : 67;
            $(".ytp-player-content.ytp-iv-player-content").append("<div class='annotation annotation-type-custom iv-branding own-note-card' id='note-" + key + "' style=' background-color: rgba(0, 0, 0, 0.7); display:none;width: 20em; height:9em; left: " + leftPercentForNote + "%;margin-bottom: 1.5em;border-radius:2.5%'><div class='card' style=' background-color: rgba(0, 0, 0, 0.7);width: 100%;height:100%; border-radius:2.5%'><div class='own-content' style='padding-left:1em;margin-top:1em; height: 5.7em;width:95%; overflow-y: auto; color:white'><p style='font-size:1em;'>" + value.content + "</p></div><span><a><i style='margin-top:0.5em; margin-left:90%;display:none;color:grey' class='fa fa-times-circle fa-lg own-cancel' ></i></a><a><i class='fa fa-pencil-square-o fa-lg own-edit-note' style='margin-left:-2em; margin-top:0.5em;display:none;color:grey;'></i></a><a><i class='fa fa-trash fa-lg own-trash' style='margin-left:-2em; margin-top:0.5em;display:none;color:#660000'></i></a></span></div></div>");
            $('.ytp-progress-list').append("<div class='ytp-play-progress own-notes-markers' id='marker-" + key + "'  style='left:" + leftPercent + "%; transform: scaleX(0.1);background-color:white; width:7em;height:1em; margin-bottom:-0.25em;border-radius:100%'></div>")
        })
    }

    // display the notes as a list
    $.displayAllNotes = function(videoJSON) {
        $(".ytp-player-content.ytp-iv-player-content").append("<div class='annotation annotation-type-custom iv-branding own-all-notes' id='notesList' style=' background-color: black; display:block;width: 20em; min-height:10em;max-height:30em; left: 60%;margin-bottom: 1.5em;border-radius:2.5%;padding: 1em 1em 1em 1em;'>" +
            "<div class='ui selection inverted list own-notes-list' style='width:100%;'></div></div>");
        if (!Object.keys(videoJSON).length) {
            $(".own-notes-list").append(
                "<div class='item own-note-item' style='min-height:3em'>" +
                "<div class='content' style='color:#323232; font-size:2em;margin-left: 2em'> No Notes " +
                "</div>" +
                "</div>");
        } else {
            $.each(videoJSON, function(key, value) {
                key = parseInt(key).toFixed(2)
                $(".own-notes-list").append(
                    "<div class='item own-note-item' style='min-height:4em;overflow-y:hidden'>" +
                    "<div class='right floated content' style='color:grey'>" +
                    "<span>" + key.toString() + "</span>" +
                    "</div>" +
                    "<div class='content' style='color:white;'>" +
                    value.content +
                    "</div>" +
                    "</div><hr style='display:block;height:1px;border:0;border-top: 1px solid #121212; margin: 0.3em 0;padding: 0'>");
            })
        }
    }

    $.makePlayerControls = function() {

        /* Constructing the youtube player controls : Add, Share, Bookmark, Tags */
        $(".ytp-chrome-controls").append("<div style='margin-left:42%; width:13.3em;padding-top:0.5em;background-color:rgba(0,0,0, 0.7)'><button class='ytp-button' style='height:2.5em;width:2.5em;margin-top:-0.6em;margin-left:0.6em;padding-left:0.5em' title='Add a note'><i class='fa fa-plus fa-2x own-plus' style='color:white;opacity:1;'></i></button><button class='ytp-button' style='height:2.5em;width:2.5em;margin-top:-0.6em;margin-left:0.6em;padding-left:0.5em'  title='Share'><i class='fa fa-share fa-2x own-share' style='color:white;opacity:1;'></i></button><button class='ytp-button' style='height:2.5em;width:2.5em;margin-top:-0.6em;margin-left:0.6em;padding-left:0.3em'  title='Add tags for video'><i class='fa fa-tags fa-2x own-tags' style='color:white;opacity:1;'></i></button><button class='ytp-button' style='height:2.5em;width:2.5em;margin-top:-0.9em;margin-left:0.6em;padding-left:0.5em'  title='See all the notes'><i class='fa fa-chevron-up fa-2x' style='color:white;opacity:1;'></i></button></div>");
    }

    $.makeAddNoteModal = function() {

        /* Constructing a modal to add a note */
        $("#page").append("<div id='myModal' class='own-add-modal'><!-- Modal content --><div class='modal-content'><div style='margin-top:0em;margin-left:-3em;position:absolute;width: 1em; height:1em; border-radius: 100%; background-color:#660000; border: 0.2em solid white' title='Drag'></div><div class='own-add-content' contentEditable='true' onpaste='OnPaste_StripFormatting(this, event)' id='own-add-content' data-ph='Enter a note here....'></div><span><p style='left:3%;bottom:5%;color:grey; position:absolute' id='add_note_time'></p></span> <button type = 'button' class = 'ui-button ui-widget ui-corner-all own-add-note-button' style='width: 4.5em;height: 2.5em; border-style: none; background-color: #660000; color: white; font-size: 100%;font-weight: bold;right:3%;bottom:5%;position:absolute'>Add</button></div></div>");

        var nonparent = $('.html5-video-container');
        var position = nonparent.offset();
        $('.own-add-modal').offset({
            top: position.top,
            left: position.left
        });
        $(".modal-content").draggable();
    }

    $.makeEditNoteModal = function() {

        /* Constructing a modal to edit a note */
        $("#page").append("<div class='own-edit-modal'><!-- Modal content --><div class='modal-edit-content'><div style='margin-top:0em;margin-left:-3em;position:absolute;width: 1em; height:1em; border-radius: 100%; background-color:#660000; border: 0.2em solid white' title='Drag'></div><div class='own-edit-content' contentEditable='true' onpaste='OnPaste_StripFormatting(this, event)' id='own-edit-content' data-ph='Enter a note here....'></div><span><p style='left:3%;bottom:5%;color:grey; position:absolute' id='edit_note_time'></p></span> <button type = 'button' class = 'ui-button ui-widget ui-corner-all own-edit-note-button' style='width: 4.5em;height: 2.5em; border-style: none; background-color: #660000; color: white; font-size: 100%;font-weight: bold;right:3%;bottom:5%;position:absolute'>Edit</button></div></div>");

        var nonparent = $('.html5-video-container');
        var position = nonparent.offset();
        $('.own-edit-modal').offset({
            top: position.top,
            left: position.left
        });
        $(".modal-edit-content").draggable();
    }

    $.makeTagNoteModal = function() {

        /* Constructing a modal to add a note */
        $("#page").append("<div class='own-tag-modal'><!-- Modal content --> <div class='modal-tag-content'><input type='text' id='tagBox' placeholder='Enter tags... ' style='height: auto; background: rgba(0,0,0,1)'><button type = 'button' class = 'ui-button ui-widget ui-corner-all' style='width: 15%;height: 30%; border-style: none; background-color: #660000; color: white; margin-left: 83%; margin-top: 1em; font-size: 100%;font-weight: bold;margin-bottom:1em'>Add</button></div></div>")
        var nonparent = $('.html5-video-container');
        var position = nonparent.offset();
        $('.own-tag-modal').offset({
            top: position.top,
            left: position.left
        });
    }

    $.makeShareModal = function() {

        /* Constructing a share modal for shareable link */
        $(".ytp-chrome-controls").append("<div class='annotation annotation-type-custom iv-branding' id='own-share-modal' style='display:none;width: 32em; height:4.5em; left: 33%;margin-bottom:10em;opacity:1'><input type='text' value='http://www/shareabe.com/v/asdacWSS1' id='share_link' style='margin-top:0.5em;width:20em;height: 3em;padding-left: 1em; font-size: 1.2em;margin-left:1em'></div>");
        $('#share_link').addClass('ui-widget ui-state-default ui-corner-all');
    }

    // get the duration of the video

    // Converting a notes variable received by ajax call to some appropriate form

    $.convertToTimeContent = function(noteList) {
        $.each(noteList, function(i, item) {
            notes[noteList[i].time_snap] = { "content": noteList[i].content, "id": noteList[i].id }
        })
    }


    /* -------------------------------------
    Shortcuts:
    ----------
        Add a note: Ctrl + Shift + A
        Close the Add Note Modal: Esc
        Bookmark a Video: Ctrl + Shift + S
        Tag a Video: Ctrl + Shift + X
    -------------------------------------- */

    $.makeShortcuts = function() {
        $(document).keydown(function(e) {
            if (e.ctrlKey && e.shiftKey && e.keyCode == 65) {
                // Add Modal Open
                if (!$(".own-add-modal").length) {
                    $(".own-note-card").fadeOut(100);
                    $.makeAddNoteModal();
                    $video.pause();
                    add_button_time = $video.currentTime;
                    $('#add_note_time').text($.getTimeformat($video.currentTime));
                    $('.own-add-modal').show('fade', { 'direction': "up" }, 300);
                    setTimeout(function() {
                        $(".own-add-content").focus();
                    }, 0);
                }
            } else if (e.ctrlKey && e.shiftKey && e.keyCode == 88) {
                // Tag Modal Open
                if (!$(".own-tag-modal").length) {
                    $.makeTagNoteModal();
                    $('#tagBox').tagEditor();
                    $('.own-tag-modal').show('fade', { 'direction': "up" }, 300);
                    $('#tagBox').focus();
                }
            } else if (e.keyCode == 27) {
                // Close the add modal
                if ($(".own-add-modal").length) {
                    $('.own-add-modal').hide('fade', { 'direction': "up" }, 300, function() { $(this).remove(); });
                    $video.play();
                } else if ($(".own-tag-modal").length) {
                    // Close the Tag Modal if open
                    $('.own-tag-modal').hide('fade', { 'direction': "up" }, 300, function() { $(this).remove(); });
                }
            }
        });
    }

    $.getVideoDuration = function(videoId) {
        var url = "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=" + videoId + "&key=AIzaSyAQQ4D2C7oGu2LRNeiuRFk5OS5Xd3u6Qek";
        var settings = {
            "async": false,
            "crossDomain": true,
            "url": url,
            "method": "GET",
            "contentType": "application/json",
            "data": "",
            success: function(response) {
                videoDuration = $.convertFromISO8601ToSec(response.items[0].contentDetails.duration);
                $.displayNotes(notes);
            },
            error: function(response) {
                return false;
            }
        };
        $.ajax(settings);
    }

    // Let it be the last function to execute
    $.getExistingVideoData = function(videoId) {

        // ajax call to get all the notes 
        var url = baseUrl + "notebooks/" + videoId;
        $.ajaxCall(url, "GET", "", function(response) {
            if (response.status) {
                // add to the notesAjax variable
                notesAjax = response.output.notes;
                $.convertToTimeContent(notesAjax);
            } else {
                console.log("Error in Retrieveing Notes");
            }
            $.getVideoDuration($.extractVideoId(videoUrl));
        })
    }
