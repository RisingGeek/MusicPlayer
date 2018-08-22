$(window).on('load',function() {
    $("#buttons").click(function(event) {
        if(event.target!==event.currentTarget) {
            let clickedItem = event.target.id;
            if(!clickedItem || clickedItem=="progress" || clickedItem=="bar" || clickedItem=="duration" || clickedItem=="currTime")
                return;
            let song = $("."+clickedItem).get(0);

            var duration=song.duration;
            let click = $("#"+clickedItem);
            let progress = click.next();
            let bar = progress.find("#bar");
            let currTime = progress.next();
            let dur = currTime.next();

            let minutes = parseInt(song.duration/60);
            let seconds = parseInt(song.duration%60);
            if(parseInt(minutes/10) == 0)
                minutes = "0" + minutes;
            if(parseInt(seconds/10) == 0)
                seconds = "0" +seconds;
            dur.text(minutes + ":" + seconds);

            /*sets the current time*/
            progress.click(function(event) {
                song.currentTime = (event.offsetX/progress.get(0).offsetWidth)*duration;
            });

            var interval = setInterval(updateTime,100);

            /*updates the progress bar continuously*/
            function updateTime() {
                if((song.currentTime*100)/duration == 100)
                    clearInterval(interval);
                bar.css("width", (song.currentTime*100)/duration + "%");
                let minutes = parseInt(song.currentTime/60);
                let seconds = parseInt(song.currentTime%60);
                if(parseInt(minutes/10) == 0)
                    minutes = "0" + minutes;
                if(parseInt(seconds/10) == 0)
                    seconds = "0" +seconds;
                currTime.text(minutes + ":" + seconds);
            }

            /*replaces the play button when song has ended*/
            jQuerySong = $("."+clickedItem);
            jQuerySong.on('ended',function() {
                song.currentTime=0;
                clickedButton.removeClass("fa-pause-circle");
                clickedButton.addClass("fa-play-circle");
            });

            /*sets the volume*/
            $("#volume").change(function() {
                song.volume = this.value/100;
            });

            let clickedButton = $("#"+clickedItem);
            song.paused ? song.play() : song.pause();
            song.paused ? clickedButton.removeClass("fa-pause-circle") : clickedButton.removeClass("fa-play-circle"); 
            song.paused ? clickedButton.addClass("fa-play-circle") : clickedButton.addClass("fa-pause-circle");
            stopRest(song,clickedItem);
        }
        event.stopPropagation();
    });

    /*stops the rest of the songs if one song is already playing*/
    function stopRest(song,clickedItem) {
        var a = $("audio");
        var btn = $("#buttons").find("button");
        if(!song.paused) {
            for(let i = 0; i < a.length; i++) {
                if(a.eq(i).hasClass(clickedItem))
                    continue;
                a[i].pause();
                btn.eq(i).removeClass("fa-pause-circle");
                btn.eq(i).addClass("fa-play-circle");
            }
        }
    }
});

