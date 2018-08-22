$(window).on('load',function() {
    var columns = $("#buttons").find(".col-sm-3");
    for(let i in columns) {
        $("body").append("<audio type='audio/mp3'></audio>");
    }

    for(let i in columns) {
        columns.eq(i).append("<img class='img-fluid'>");
        columns.eq(i).append("<button class='fa fa-play-circle'></button>");
        columns.eq(i).append("<div id='progress'><div id='bar'></div></div>");
        columns.eq(i).append("<div id='currTime'></div>");
        columns.eq(i).append("<div id='duration'></div>");
    }

    $.get("assets/songs.json", function(data,status) {
        let songs = data.songs;
        let audio = $("audio");
        let buttons = columns.find("button");
        let images = columns.find("img");
        for(let i in songs) {
            audio.eq(i).addClass(songs[i].class);
            audio[i].src=songs[i].src;
            buttons[i].id = songs[i].class;
            images[i].src = songs[i].imgSrc;
            images[i].alt = songs[i].alt;
        }
    });
});