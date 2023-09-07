const express = require("express");
const router = express.Router();
const Song = require("../models/model.js").Song;
const Playlist = require("../models/model.js").Playlist;
const fs = require("fs");
const { Artist } = require("../models/model.js");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {authMiddlewareAdmin} = require("../utils/auth.js");


router.get("/", (req, res) => {
    let { page, size, artist } = req.query;
    if (!page) {
        page = 1;
        size = 10;
    }
    let ren = {
        layout: "adminLayout",
        title: "Graceful Manager",
        page: page,
        size: size,
        SongManage: true,
    };
    if (artist) {
        ren = { ...ren, artist: artist };
    }
    res.render("admin/admin", ren);
});
router.get("/artist", (req, res) => {
    let { page, size } = req.query;
    if (page && size)
        res.render("admin/artist", {
            layout: "adminLayout",
            title: "Graceful Manager",
            page: page,
            size: size,
            ArtistManage: true,
        });
    else
        res.render("admin/artist", {
            layout: "adminLayout",
            title: "Graceful Manager",
            page: 1,
            size: 10,
            ArtistManage: true,
        });
});
router.get("/playlist", (req, res) => {
    let { page, size } = req.query;
    if (page && size)
        res.render("admin/playlist", {
            layout: "adminLayout",
            title: "Graceful Manager",
            page: page,
            size: size,
            PlaylistManage: true,
        });
    else
        res.render("admin/playlist", {
            layout: "adminLayout",
            title: "Graceful Manager",
            page: 1,
            size: 10,
            PlaylistManage: true,
        });
});
router.get("/song/:id", async (req, res) => {
    let id = req.params.id;
    let song = await Song.findById(id).populate("artist", {
        _id: 1,
        name: 1,
        image: 1,
    });
    if (song) {
        res.render("admin/detailSong", {
            layout: "adminLayout",
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
        layout: "adminLayout",
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
        res.render("admin/detailPlaylistArtist", rend);
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
        res.render("admin/detailPlaylist", rend);
    }
});

module.exports = router;
