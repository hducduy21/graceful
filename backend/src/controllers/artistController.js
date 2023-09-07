const express = require("express");
const router = express.Router();
const Artist = require("../models/model.js").Artist;
const path = require("path");
const fs = require("fs");
const upload = require("../utils/Upload.js");
const { Playlist } = require("../models/model.js");

//get all
router.get("/", async (req, res) => {
    let { page, size } = req.query;
    if (!page) {
        page = 1;
        size = 10;
    }
    let artist = await Artist.find(
        {},
        { _id: 1, name: 1, gender: 1, view: 1, birthday: 1, createdAt: 1 }
    ).populate("author",{_id:1})
        .skip(page - 1)
        .limit(size)
        .sort({ createdAt: -1 });
    res.json(artist);
});
//get all (lay het du lieu)
router.get("/data", async (req, res) => {
    let artist = await Playlist.find()
    res.json(artist);
});
//get all name + id artist
router.get("/autocomplete", async (req, res) => {
    let artist = await Artist.find({}, { _id: 1, name: 1 });
    res.json(artist);
});
//get id by name
router.get("/getIdByName", async (req, res) => {
    let artist = await Artist.find({ name: req.query.name }, { _id: 1 });
    res.set("Content-Type", "application/json");
    console.log(req.query.name);
    res.json(artist);
});
//add new song
router.post(
    "/",
    upload.uploadImage.fields([
        { name: "squareImage", maxCount: 1 },
        { name: "rectImage", maxCount: 1 },
    ]),
    async (req, res) => {
        let {birthday, name , gender , desc} = req.body
        let s = await new Artist({
            name: name,
            gender:gender,
            birthday:birthday,
            image: {
                squareImg: req.files.squareImage[0].filename,
                bannerImg: req.files.rectImage[0].filename
            },
            view: 0,
            desc: desc||"",
        });
        await s.save();
        res.json({
            status: true,
            message: "Artist upload successfully!",
            data: s,
        });
    }
);

//put info update song
router.put(
    "/",
    async (req, res) => {
        let {id, birthday, name , gender , desc} = req.body
        console.log(name)
        await Artist.findByIdAndUpdate(id,{name: name, gender: gender, birthday: birthday, content:desc})
        res.json({
            status: true,
            message: "Artist update information successfully!",
        });
    }
);

// put square image of update artist
router.put(
    "/squareImage",upload.uploadImage.single("squareImage"),
    async (req, res) => {
        let id = req.body.id
        let s = await Artist.findById(id)
        if (fs.existsSync(path.join(__dirname, "..", "..", "public", "image", s.image.squareImg))){
            await fs.unlinkSync(
                path.join(__dirname, "..", "..", "public", "image", s.image.squareImg)
            );
        }
        s.image.squareImg = req.file.filename
        await s.save();
        res.json({
            status: true,
            message: "Artist update square image successfully!",
            data: s,
        });
    }
);

// put banner image of update artist
router.put(
    "/bannerImage",upload.uploadImage.single("bannerImage"),
    async (req, res) => {
        let id = req.body.id
        let s = await Artist.findById(id)
        if (fs.existsSync(path.join(__dirname, "..", "..", "public", "image", s.image.bannerImg))){
            await fs.unlinkSync(
                path.join(__dirname, "..", "..", "public", "image", s.image.bannerImg)
            );
        }
        
        s.image.bannerImg = req.file.filename
        await s.save();
        res.json({
            status: true,
            message: "Artist update square image successfully!",
            data: s,
        });
    }
);

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let art = await Artist.findOne({ _id: id }, { image: 1 }).populate("author",{_id:1,songs:1});
    if(art.author.songs.length>0){
        res.json({ status: false, message: "You must delete all of the artist's songs before deleting this artist" });
    }else{
        let filename1 = art.image.bannerImg;
        let filename2 = art.image.squareImg;
        try {
            if (filename1) {
                await fs.unlinkSync(
                    path.join(__dirname, "..", "..", "public", "image", filename1)
                );
            }
            if (filename2) {
                await fs.unlinkSync(
                    path.join(__dirname, "..", "..", "public", "image", filename2)
                );
            }
    
            await Artist.findOneAndRemove({ _id: id });
            res.json({ status: true, message: "Delete successfully" });
        } catch (err) {
            console.log(err);
            res.json({ status: false, message: err });
        }
    }
    
});
module.exports = router;
