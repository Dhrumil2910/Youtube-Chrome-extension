var notebooks;
var videos = [];
var baseUrl = "https://127.0.0.1:9000/api/v1/";
var token = "lHtKHFFuH96mvYaj4Cd8CwMt3kLDKk";


// universal AJAX Function
$.ajaxCall = function(url, method, data, handleData) {
        var settings = {
            "async": false,
            "crossDomain": true,
            "url": url,
            "method": method,
            "headers": {
                "authorization": "Bearer " + token,
                "cache-control": "no-cache",
            },
            "contentType": "application/json",
            "data": data,
            success: function(response) {
                handleData({"status": true, "output": response});
            },
            error: function(response) {
                handleData({"status": false, "output": response});
            }
        };

        $.ajax(settings)
    }
    /*
    $.ajaxCall("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=JZjAg6fK-BQ&fields=items(id,snippet)&key=AIzaSyAQQ4D2C7oGu2LRNeiuRFk5OS5Xd3u6Qek", "GET", "", function(out){

        console.log(out);

    })*/

$.getTheVideoTitle = function(videoId) {
    var videoTitle;
    var url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + videoId + "&fields=items(id,snippet)&key=AIzaSyAQQ4D2C7oGu2LRNeiuRFk5OS5Xd3u6Qek"
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "contentType": "application/json",
        "data": "",
        success: function(response) {
            videoTitle = response.items[0].snippet.title;
        },
        error: function(response) {
            return false;
        }
    };

    $.ajax(settings)
    return videoTitle;

}

$.getTheNoOfNotes = function(videoId){
    var noOfNotes;
    $.each(notebooks, function(i, item){
        if(notebooks[i].video == videoId){
            noOfNotes = notebooks[i].notes.length;
            return false;
        } 
    })
    return noOfNotes;
}

$.getTheVideos = function() {
    // ajax call to get all the videos
    var url = baseUrl + "notebooks/"
    $.ajaxCall(url, "GET", "", function(response) {
            notebooks = response.output.results;
            // update the videos variable
            $.each(notebooks, function(i, item) {
                videos.push(notebooks[i].video);
            })
        })
        
}


$.extractVideoId = function(url) {
    var videoId = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    return videoId[1];
}

// display all the videos

$.displayVideos = function(videoList) {
    var videoId, videoThumbUrl, videoTitle, noOfNotes;
    
    $.each(videos, function(i, item) {
        // Add the no of notes
        videoThumbUrl = "https://img.youtube.com/vi/" + videoList[i] + "/mqdefault.jpg";
        videoTitle = $.getTheVideoTitle(item);
        videoLink = "https://www.youtube.com/watch?v=" + videoList[i];
        noOfNotes = $.getTheNoOfNotes(videoList[i]);
        $('.own-video-grid').append('<div class="row"  id="' + videoList[i] + '"  style="padding-right:1.4em; padding-left:1.4em;margin-top:-0.5em; padding-bottom:0.1em;padding-top:0.1;height:9em"><div class="seven wide column" style="background-size: cover;padding:0"><a><img src="' + videoThumbUrl + '" style="width:100%;height:100%;padding:0;float:left"></a></div><div class="nine wide column" style="background-size:cover;padding:0"><div class="ui card own-card" style="width:100%;height:8em;max-height:8.9em;overflow-y:hidden;border-radius:0; box-shadow:none;"><div class="content" style="overflow-y:hidden;max-height:4em"><a style="color: black; font-weight: bold" href=' + videoLink + ' class="own-video-title-link"><div class="header" style="overflow-y:hidden;font-size: 1em">' + videoTitle + '</div></a></div><div class="extra content"><span class="right floated tag"><a><i class="tag icon own-tag-icon" data-content="tag" data-position="top center" data-inverted="" data-variation="mini"></i></a></span><span class="right floated trash"><a><i class="trash icon own-trash-icon" data-content="delete" data-position="top center" data-inverted="" data-variation="mini"></i></a></span><span class="right floated share"><a><i class="share icon own-share-icon" data-content="share" data-position="top right" data-inverted="" data-variation="mini"></i></a></span><span class="left floated"><p class="own-no-of-notes"> ' + noOfNotes + ' Notes</p></span></div></div></div></div></div>');
    })
}

$('body').on('click', '.own-video-title-link', function() {
    if ($(this).attr('href') != '') {
        chrome.tabs.create({ url: $(this).attr('href') });
        return false;
    }

});
