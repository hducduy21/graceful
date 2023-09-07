const express = require("express");
const router = express.Router();
const Song = require("../models/model.js").Song;
const Artist = require("../models/model.js").Artist;
const upload = require("../utils/Upload.js");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { Playlist, Chart } = require("../models/model.js");

router.get("/", async (req, res) => {
    let { page, size, artist } = req.query;
    let find;
    if (artist) {
        find = { artist: { $in: [artist] } };
    }
    let song = await Song.find(find, {
        _id: 1,
        title: 1,
        year: 1,
        view: 1,
        createdAt: 1,
        link: 1,
        lyrics: 1,
    })
        .populate("artist", { name: 1, image: 1 })
        .skip(page - 1)
        .limit(size)
        .sort({ createdAt: -1 });
    res.json(song);
});
router.get("/chart", async (req, res) => {
    let songs = await Song.find({},{_id: 1, title: 1, link:1}).populate("artist",{image:1, name:1,lyrics:1, author: 1}).skip(0)
    .limit(5).sort({ view: -1 });
    res.json(songs);
});

router.get("/autocomplete", async (req, res) => {
    let songs = await Song.find({},{title: 1})
    let arr = []
    await songs.forEach(e=>{
        arr.push(e.title)
    })
    res.json(arr);
});
router.get("/lyrics", async (req, res) => {
    let id = req.query.id;
    try {
        let song = await Song.findOne({ _id: id }, { lyrics: 1 });
        res.json({
            status: true,
            message: "Get lyric complete!",
            data: song.lyrics,
        });
    } catch (err) {
        res.json({ status: false, message: "Get lyric fail!" });
    }
});

router.post("/creaseview", async (req, res) => {
    let id = req.query.id;
    try {
        let song = await Song.findOne({ _id: id });
        song.view =  song.view+1;
        let artist = await Artist.findOne({_id : song.artist[0]})
        artist.view =  artist.view+1;
        await song.save()
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth() + 1;
        let chart = Chart.findOne({type:"song",month :currentMonth, year: currentYear, song:id })
        if(chart){
            chart.view = chart.view+1;
            await chart.save()
        }else{
            let c = new Chart({type:"song",month :currentMonth, year: currentYear, song:id, view:0 })
            await c.save()
        }
        res.json({ status: true, message: "Crease view success!" });
    } catch (err) {
        res.json({ status: false, message: "Crease view fail!" });
    }
});


router.get("/getIdByName", async (req, res) => {
    let name = req.query.name;
    try {
        let id = await Song.findOne({ title: name }, { _id: 1 });

        res.json({
            status: true,
            data: id._id,
        });
    } catch (err) {
        res.json({ status: false, message: "Get id fail!" });
    }
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let song = await Song.findOne(
        { _id: id },
        { _id: 1, title: 1, year: 1, view: 1, createdAt: 1, link: 1, lyrics: 1 }
    ).populate("artist", { name: 1, image: 1 });
    res.json(song);
});
router.post("/", async (req, res) => {
    upload.uploadAudio(req, res, async function (err) {
        if (err) {
            res.json({ status: 400, message: err });
        } else {
            let { name, artist, year, desc } = req.body;
            let artistArr = artist.trim().split(", ");
            let s = await new Song({
                title: name,
                artist: artistArr,
                link: req.file.filename,
                year: year,
                view: 0,
                desc: desc,
            });

            await s.save();
            res.json({
                status: 200,
                message: "File uploaded successfully!",
                data: s,
            });
        }
    });
});
router.put("/", async (req, res) => {
    let { id, name, artist, year, desc } = req.body;
    console.log({ id, name, artist, year, desc })
    let song = await Song.findById(id).populate("artist", { name: 1 });
    let t = song.artist.map((e) => e.name).join(", ");
    if (artist.trim() !== t.trim()) {
        let artistArr = artist.trim().split(", ");
        song.artist = artistArr;
    }
    song.year = year || song.year;
    song.name = name || song.name;
    song.desc = desc || song.desc;
    await song.save();
    res.json({ status: true, message: "Update successfully singer info" });
});
router.put("/audio", upload.uploadAudio, async (req, res) => {
    let { id } = req.body;
    let song = await Song.findById(id);
    if (
        fs.existsSync(
            path.join(__dirname, "..", "..", "public", "audio", song.link)
        )
    ) {
        await fs.unlinkSync(
            path.join(__dirname, "..", "..", "public", "audio", song.link)
        );
    }
    (song.link = req.file.filename), (song.lyrics = []);
    await song.save();
    res.json({ status: true, message: "Update audio successfully" });
});
router.put(
    "/image",
    upload.uploadImage.single("imageFile"),
    async (req, res) => {
        let { id } = req.body;
        let song = await Song.findById(id);
        (song.image = req.file.filename), await song.save();
        res.json({ status: true, message: "Update image successfully" });
    }
);
router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let song = await Song.findById(id);
    let filename = song.link;
    try {
        await fs.unlinkSync(
            path.join(__dirname, "..", "..", "public", "audio", filename)
        );
        await Song.findOneAndRemove({ _id: id });
        res.json({ status: true, message: "Delete successfully" });
    } catch (err) {
        res.json({ status: false, message: err });
    }
});

router.post("/lyrics", async (req, res) => {
    let id = req.body.id;
    let lyric = req.body.lyric;
    try {
        await Song.findByIdAndUpdate(id, { $unset: { lyrics: 1 } });
        await Song.findByIdAndUpdate(id, { lyrics: lyric });
        res.json({ status: true, message: "Update lyric complete!" });
    } catch (err) {
        res.json({ status: false, message: "Update lyric fail!" });
    }
});


module.exports = router;
