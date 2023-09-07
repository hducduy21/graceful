const express = require("express");
const router = express.Router();
const Playlist = require("../models/model.js").Playlist;
const Artist = require("../models/model.js").Artist;
const Song = require("../models/model.js").Song;

//home page
router.get("/", (req, res) => {
    //get month to show chart, ex: GraceChart July
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
    res.render('home', {month: monthNames[currentMonth]})
});

//get a song
router.get("/song/:id", async (req, res) => {
    let id = req.params.id;
    let song = await Song.findById  (id).populate("artist", {
        _id: 1,
        name: 1,
        image: 1,
    });
    if (song) {
        res.render("user/detailSong", {
            title: "Graceful Manager",
            name: song.title,
            id: song._id,
            artist: song.artist[0].name,
            link: song.link,
            year: song.year,
            view: song.view,
            desc: song.desc,
            image: song.image || song.artist[0].image.bannerImg,
            artistImage: song.artist[0].image.squareImg,
        });
    } else res.render("notfound", { layout: "adminLayout" });
});

//get a playlist
router.get("/playlist/:id", async (req, res) => {
    let id = req.params.id;
    let playlist = await Playlist.findById(id)
        .populate("songs")
        .populate("author", {
            name: 1,
            content: 1,
            birthday: 1,
            image: 1,
            artist: 1,
        });
    let rend = {
        title: "Graceful Manager",
        page: 1,
        size: 10,
        PlaylistManage: true,
        id: id,
        name: playlist.title,
        view: playlist.view,
    };
    let artist;
    let bannerImg;
    await playlist.songs.forEach((e) => {
        if (e.image) {
            bannerImg = e.image;
        }
        if (e.artist[0]) {
            artist = e.artist;
        }
    });

    await playlist.songs.forEach((e) => {
        if (e.image) {
            bannerImg = e.image;
        }
    });
    if (playlist.type === "author") {
        rend = {
            ...rend,
            author: true,
            artist: playlist.author._id,
            birthday: playlist.author.birthday,
            squareImg: playlist.author.image.squareImg,
            bannerImg: playlist.author.image.bannerImg,
            desc: playlist.author.content,
        };
        res.render("user/detailPlaylistArtist", rend);
    } else {
        let squareImg 
        if(artist){
            let Art = await Artist.findById(artist);
            squareImg = Art.image.squareImg;
        }
        rend = {
            ...rend,
            squareImg: squareImg,
            bannerImg: bannerImg,
        };
        res.render("user/detailPlaylist", rend);
    }
});

module.exports = router;