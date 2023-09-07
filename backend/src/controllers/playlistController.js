const express = require("express");
const router = express.Router();
const Song = require("../models/model.js").Song;
const Playlist = require("../models/model.js").Playlist;
const PlaylistCategory = require("../models/model.js").PlaylistCategory;
const path = require("path");
const fs = require("fs");
const upload = require("../utils/Upload.js");
const { Artist } = require("../models/model.js");

//get all by page and pagesize
router.get("/", async (req, res) => {
    let { page, size, type } = req.query;
    if (!page) {
        page = 1;
        size = 10;
    }
    let find = {};
    if (type) {
        find = { type: type };
    }
    let playlist = await Playlist.find(find, {
        _id: 1,
        title: 1,
        type: 1,
        desc: 1,
        songs: 1,
        createdAt: 1,
    })
        .skip(page - 1)
        .limit(size)
        .sort({ createdAt: -1 });
    res.json(playlist);
});

//get all by page and pagesize
router.get("/category", async (req, res) => {
    let category = await PlaylistCategory.find()
        .populate("playlist", { _id: 1, type: 1, title: 1 })
        .sort({ createdAt: -1 });
    console.log(category.playlist);
    res.json(category);
});
router.post("/category/playlist", async (req, res) => {
    let category = await PlaylistCategory.findOne({_id: req.body.category})
    await category.playlist.push(req.body.playlist)
    await category.save()
    res.json({ state: true });
});
//create playlist
router.post("/", async (req, res) => {
    let { title, desc } = req.body;
    try {
        let playlist = await new Playlist({
            title: title,
            desc: desc,
            type: "system",
        });
        await playlist.save();
        res.status(200).json({
            state: true,
            message: "Create playlist succcessfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            state: false,
            message: "Create playlist faily",
        });
    }
});
router.get("/squareimg", async (req, res) => {
    let id = req.query.id
    let song = await Playlist.findById(id).populate("songs")
    if(song){
        let art = song.songs[0]
        if(song.songs[0]){
            let art = song.songs[0].artist[0]
            let artist = await Artist.findById(art)
            res.json(artist.image.squareImg)
        }
        else{
            res.json("")
        }
        
    }else{
        res.json("")
    }
});
//edit playlist
router.put("/", async (req, res) => {
    let { id, title, desc } = req.body;
    try {
        let playlist = await Playlist.findById(id);
        console.log(id);
        playlist.title = title;
        playlist.desc = desc;
        await playlist.save();
        res.json({ status: true, message: "Update playlist succcessfully" });
    } catch (err) {
        res.json({ status: false, message: "Update playlist faily" });
    }
});

//create category playlist
router.post("/category", async (req, res) => {
    let name = req.body.name;
    if (name) {
        let a = await new PlaylistCategory({ name: name });
        a.save();
        res.json({ status: true });
    } else {
        res.json({
            status: false,
            message: "Can not create cateory with emty name!",
        });
    }
});

//delete category playlist
router.delete("/category", async (req, res) => {
    let id = req.body.id;
    if (id) {
        await PlaylistCategory.findByIdAndDelete(id);
        res.status(200).json({ state: true });
    } else {
        res.status(404).json({
            state: false,
            message: "Can not find category!",
        });
    }
});
router.delete("/category/:id", async (req, res) => {
    let category = req.params.id;
    let playlist = req.body.playlist;
    if (category) {
        let cate = await PlaylistCategory.findById(category);
        let index = await cate.playlist.indexOf(playlist)
        cate.playlist.splice(index, 1);
        await cate.save();
        res.status(200).json({ state: true });
    } else {
        res.status(404).json({
            state: false,
            message: "Can not find category!",
        });
    }
});

//get playlist in homepage
router.get("/home", async (req, res) => {
    let playlist = await PlaylistCategory.find({ type: "home" })
        .populate("playlist")
        .sort({ createdAt: -1 });
    res.json(playlist);
});
//getIdByName Category
router.get("/category/getIdByName", async (req, res) => {
    let name = req.query.name
    let Category = await PlaylistCategory.findOne({ name: name },{_id: 1})
    if(Category)
        res.json({state: true, data: Category._id});
    else
    res.json({state: false});
});

//add a playlist to homepage
router.post("/home", async (req, res) => {
    let playlist = await PlaylistCategory.findOne({ _id: req.body.id });
    if (playlist) {
        if (playlist.type === "home") {
            res.json({ status: false, message: "Already in home page" });
        } else {
            playlist.type = "home";
            await playlist.save();
            res.json({ status: true });
        }
    } else {
        res.json({ status: false, message: "category playlist notfound" });
    }
});
//delete a category in home page
router.delete("/home", async (req, res) => {
    let playlist = await PlaylistCategory.findOne({ _id: req.body.id });
    if (playlist) {
        if (!playlist.type === "home") {
            res.json({ status: false, message: "Not found in home page" });
        } else {
            playlist.type = "suggest";
            await playlist.save();
            res.json({ status: true });
        }
    } else {
        res.json({ status: false, message: "category playlist notfound" });
    }
});

//get playlist type author
router.get("/author", async (req, res) => {
    let { page, size } = req.query;
    if (!page) {
        page = 1;
        size = 10;
    }
    let playlist = await Playlist.find(
        { type: "author" },
        { _id: 1, creator: 1, type: 1, desc: 1, songs: 1 }
    )
        .populate("author")
        .skip(page - 1)
        .limit(size)
        .sort({ createdAt: -1 });
    res.json(playlist);
});

//get song of playlist
router.get("/song", async (req, res) => {
    let id = req.query.id;
    let playlist = await Playlist.findOne({ _id: id }, { _id: 1, songs: 1 });
    let t = await Promise.all(
        playlist.songs.map(async (e) => {
            let t2 = await Song.findById(e, {
                id: 1,
                title: 1,
                artist: 1,
                link: 1,
                view: 1,
                artist: 1,
            }).populate("artist", { name: 1, image: 1,author: 1 });

            return {
                id: t2._id,
                title: t2.title,
                author: t2.artist[0].name,
                authorID: t2.artist[0].id,
                authorPlaylist: t2.artist[0].author,
                img: "/image/" + t2.artist[0].image.squareImg,
                file: "/audio/" + t2.link,
            };
        })
    );
    res.json(t);
});

router.post("/song", async (req, res) => {
    let id = req.body.id;
    let playlist = await Playlist.findOne({ _id: id }, { _id: 1, songs: 1 });
    if (req.body.context) {
        let ids = req.body.context.trim().split(", ");
        for (let index = 0; index < ids.length; index++) {
            console.log(req.body.context);
            const element = ids[index];
            await playlist.songs.push(element);
        }
        await playlist.save()
        res.json({ state: true, message: "" });
    } else {
        res.json({ state: false, message: "Can not add" });
    }
});

//delete by id
router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    if (!id) {
        id = req.body.id;
    }
    let playlist = await Playlist.findById(id);
    if (playlist) {
        if (
            playlist.type === "author" ||
            playlist.type === "create" ||
            playlist.type === "favorite"
        ) {
            res.json({
                status: false,
                message: "Could not delete this type playlist",
            });
        } else {
            await Playlist.findByIdAndDelete(id);
            res.json({ status: true, message: "Delete successfully" });
        }
    } else {
        res.json({ status: false, message: "Could not find playlist" });
    }
});

module.exports = router;
