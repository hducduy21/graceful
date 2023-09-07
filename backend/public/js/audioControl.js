let play = false;
let randomSong = false;
let loopSong = false;
let idLyrics = 0;
let lyrics = [];

const audio = new Audio();

let index_play = 0;

var playlist = [];

//viet lyrics hien tai
const changeLyrics = () => {
    if (lyrics[idLyrics]) {
        $(".lyrics_run_1").text(lyrics[idLyrics].lyric);
    } else {
        $(".lyrics_run_1").text("");
    }
    if (lyrics[idLyrics + 1]) {
        $(".lyrics_run_2").text(lyrics[idLyrics + 1].lyric);
    } else {
        $(".lyrics_run_2").text("");
    }
    if (lyrics[idLyrics + 2]) {
        $(".lyrics_run_3").text(lyrics[idLyrics + 2].lyric);
    } else {
        $(".lyrics_run_3").text("");
    }
    if (lyrics[idLyrics + 3]) {
        $(".lyrics_run_4").text(lyrics[idLyrics + 3].lyric);
    } else {
        $(".lyrics_run_4").text("");
    }
    if (lyrics[idLyrics + 4]) {
        $(".lyrics_run_5").text(lyrics[idLyrics + 4].lyric);
    } else {
        $(".lyrics_run_5").text("");
    }
    if (lyrics[idLyrics + 5]) {
        $(".lyrics_run_6").text(lyrics[idLyrics + 5].lyric);
    } else {
        $(".lyrics_run_6").text("");
    }
};
function loadQueue(){
    $(".righbar_queue").empty();
    for(let i=0; i<playlist.length;i++){
        if(i===index_play)
            $(".righbar_queue").append(`
            <div class="tab__friend tab--active" style="font-weight: 700" onclick="index_play=`+i+`; changeSong(playlist[`+i+`],0,true)">
                <img src="`+playlist[i].img+`" alt="user" class="friend__icon" />
                <div class="friend__title">
                    <span class="friend__name">`+playlist[i].title+`</span>
                    <span class="friend__last_song"><i class="fa-sharp fa-solid fa-music mr-2"></i>`+playlist[i].author+`</span>
                </div>
            </div>`)
        else{
            $(".righbar_queue").append(`
            <div class="tab__friend" style="font-weight: 700" onclick="index_play=`+i+`;changeSong(playlist[`+i+`],0,true)">
                <img src="`+playlist[i].img+`" alt="user" class="friend__icon" />
                <div class="friend__title">
                    <span class="friend__name">`+playlist[i].title+`</span>
                    <span class="friend__last_song"><i class="fa-sharp fa-solid fa-music mr-2"></i>`+playlist[i].author+`</span>
                </div>
            </div>`
            )
        }
    }
}

async function changeSong(data, time, play) {
    $(".bar__song__name").text(data.title);
    $(".bar__song__author").text(data.author);
    $(".bar__song_img").attr("src", data.img);
    await fetch("/api/song/lyrics?id=" + data.id, {
        method: "GET",
        headers: { "Content-Type": "application/json; charset=utf-8" },
    })
        .then((re) => re.json())
        .then((re) => {
            if (re.data) {
                lyrics = re.data;
                idLyrics = 0;
                changeLyrics();
            } else lyrics = [];
        });
    $(".lyrics__title").text(data.title)
    audio.src = data.file;
    audio.currentTime = time;
    
    loadQueue()
    if (play) audio.play();
    else audio.pause();
}
function changeSongPlay(element, song) {
    console.log(song)
    if (element.classList.contains("playing-active")) {
        if (play) {
            audio.pause();
        } else {
            audio.play();
        }
    } else {
        playlist = [song];
        console.log(playlist);
        $(".playing-active").removeClass("fa-pause");
        $(".playing-active").addClass("fa-play");
        $(".playing-active").removeClass("playing-active");
        element.classList.add("playing-active");
        index_play = 0;
        changeSong(song, 0, true);
    }
}

function changeSongPlay2(song) {
    playlist = [song];
    index_play = 0;
    changeSong(song, 0, true);
}

function changePlaylistPlay(element, id) {
    if(element.classList.contains("playing-active")){
        if (play) {
            audio.pause();
        } else {
            audio.play();
        }
    }else{
        fetch("/api/playlist/song?id=" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then((data) => data.json())
            .then((data) => {
                playlist = data;
                index_play = 0;
                changeSong(playlist[index_play], 0, true);
                $(".playing-active").removeClass("fa-pause");
                $(".playing-active").addClass("fa-play");
                $(".playing-active").removeClass("playing-active");
                element.classList.add("playing-active");
            });
        }
}
function changePlaylistPlay2(element, id) {
    if(element.classList.contains("playing-active")){
        if (play) {
            audio.pause();
        } else {
            audio.play();
        }
    }else{
        fetch("/api/playlist/song?id=" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then((data) => data.json())
            .then((data) => {
                console.log(data)
                playlist = data;
                index_play = 0;
                changeSong(playlist[index_play], 0, true);
                $(".playing-active").removeClass("fa-pause");
                $(".playing-active").addClass("fa-play");
                $(".playing-active").removeClass("playing-active");
                element.classList.add("playing-active");
            });
    }
    
}
$(document).ready(() => {
    var interval;
    var isCreaseView = false;
    var listenTime = 0;
    const currentList = JSON.parse(sessionStorage.getItem("ListSongStatus"));
    if (currentList) {
        playlist = currentList.playlist;
        lyrics = currentList.lyrics;
        time = currentList.time;
        idLyrics = currentList.idLyrics;
        randomSong = currentList.randomSong;
        loopSong = currentList.loopSong;
        play = currentList.play;
        index_play = currentList.index_play;
        changeSong(playlist[index_play], time, play);
    }
    const clickPlayAndPause = () => {
        if (playlist.length > 0) {
            if (!audio.src.includes(playlist[index_play].file)) {
                changeSong(playlist[index_play], 0, true);
            } else {
                if (play) {
                    audio.pause();
                } else {
                    audio.play();
                }
            }
        } else {
            toast({
                title: "Notification",
                message: "No songs/playlists selected yet",
                type: "info",
                duration: 5000,
            });
        }
    };

    const clickNextSong = () => {
        index_play = (index_play + 1) % playlist.length;
        changeSong(playlist[index_play], 0, true);
    };
    const clickPreSong = () => {
        index_play = (index_play + playlist.length - 1) % playlist.length;
        changeSong(playlist[index_play], 0, true);
    };

    $(".bar__control__play").click(clickPlayAndPause);
    $(".bar__control__prev").click(clickPreSong);
    $(".bar__control__next").click(clickNextSong);
    $(".bar__control__loop").click(() => {
        if (loopSong) {
            $(".bar__control__loop").css("color", "#212529");
            loopSong = false;
        } else {
            $(".bar__control__loop").css("color", "var(--main)");
            loopSong = true;
        }
    });
    $(".bar__control__random").click(() => {
        if (randomSong) {
            $(".bar__control__random").css("color", "#212529");
            randomSong = false;
        } else {
            $(".bar__control__random").css("color", "var(--main)");
            randomSong = true;
        }
    });
    audio.addEventListener("play", () => {
        $(".current_play").removeClass("fa-play");
        $(".current_play").addClass("fa-pause");
        $(".bar__song_img").css("animation-play-state", "running");
        $(".playing-active").removeClass("fa-play");
        $(".playing-active").addClass("fa-pause");
        play = true;
        interval = setInterval(function() {
            listenTime++;
            console.log(listenTime)
            if (listenTime == 10) {
                fetch("/api/song/creaseview?id=" + playlist[index_play].id, {
                    method: "POST",
                    headers: { "Content-Type": "application/json; charset=utf-8" },
                })
                    .then((re) => re.json())
                    .then((re) => {
                    });
                clearInterval(interval);
            }
          }, 1000);
    });
    audio.addEventListener("pause", () => {
        $(".current_play").removeClass("fa-play");
        $(".current_play").removeClass("fa-pause");
        $(".current_play").addClass("fa-play");
        $(".bar__song_img").css("animation-play-state", "paused");
        $(".playing-active").removeClass("fa-pause");
        $(".playing-active").addClass("fa-play");
        play = false;
        clearInterval(interval);
        listenTime = 0;
    });
    audio.addEventListener("ended", () => {
        audio.pause();
        if (randomSong) {
            index_play = Math.floor(Math.random() * playlist.length);
            changeSong(playlist[index_play], 0, true);
        } else {
            if (index_play !== playlist.length - 1) {
                index_play = (index_play + 1) % playlist.length;
                changeSong(playlist[index_play], 0, true);
            } else {
                if (loopSong) {
                    index_play = (index_play + 1) % playlist.length;
                    changeSong(playlist[index_play], 0, true);
                } else {
                    index_play = (index_play + 1) % playlist.length;

                    changeSong(playlist[index_play], 0, true);
                    audio.pause();
                }
            }
        }
        
        clearInterval(interval);
        listenTime = 0;
    });

    const range = document.getElementById("volume");
    const songRange = document.getElementById("currentTimeSong");

    range.addEventListener("input", function () {
        audio.volume = this.value / 100;
        document.documentElement.style.setProperty(
            "--range-volume-value",
            this.value
        );
        $(".volume_icon").removeClass("fa-volume-high");
        $(".volume_icon").removeClass("fa-volume-xmark");
        $(".volume_icon").removeClass("fa-volume-low");
        if (this.value > 60) {
            $(".volume_icon").addClass("fa-volume-high");
        } else if (this.value > 2) {
            $(".volume_icon").addClass("fa-volume-low");
        } else {
            $(".volume_icon").addClass("fa-volume-xmark");
        }
    });

    audio.addEventListener("timeupdate", async function () {
        if (lyrics[idLyrics]) {
            if (audio.currentTime >= lyrics[idLyrics].time) {
                await changeLyrics();
                idLyrics = idLyrics + 1;
            }
        }
        const progress = parseInt((audio.currentTime / audio.duration) * 1000);
        $("#currentTimeSong").val(progress);
        // console.log(progress/10)
        document.documentElement.style.setProperty(
            "--range-time-song-value",
            progress / 10
        );
    });
    songRange.addEventListener("input", function () {
        audio.currentTime = (this.value / 1000) * audio.duration;
        idLyrics = 0;
        document.documentElement.style.setProperty(
            "--range-time-song-value",
            this.value
        );
    });

    //add event keyboard shortcuts
    document.addEventListener("keydown", function (event) {
        // if (event.code === "Space") {
        //     clickPlayAndPause();
        // }
        if (event.code === "ArrowLeft") clickPreSong();
        if (event.code === "ArrowRight") clickNextSong();
    });

    //luu lyric khi nguoi dung an luu
    $(".saveLyrics").click(() => {
        console.log(lyrics);
        fetch("/api/song/lyrics", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ lyric: lyrics, id: $("#idSong").val() }),
        })
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                if (data.status) {
                    toast({
                        title: "Success!",
                        message: data.message || "Save lyric Successfully!",
                        type: "success",
                        duration: 5000,
                    });
                } else {
                    toast({
                        title: "Fail!",
                        message: data.message || "Save lyric fail!",
                        type: "error",
                        duration: 5000,
                    });
                }
            });
    });

});
