const multer = require("multer");
const uuid = require("uuid");
const path = require("path");
const sharp = require("sharp");

const storageAudio = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/audio/");
    },
    filename: function (req, file, cb) {
        cb(null, uuid.v4() + path.extname(file.originalname));
    },
});
const storageImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/image/");
    },
    filename: function (req, file, cb) {
        cb(null, uuid.v4() + path.extname(file.originalname));
    },
});

const uploadAudio = multer({
    storage: storageAudio,
    limits: {
        fileSize: 7 * 1024 * 1024,
    },
    fileFilter: function (req, file, cb) {
        const filetypes = /mp3|wav|ogg/;
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );

        if (extname) {
            return cb(null, true);
        }
        return cb("Error: Audio files only!");
    },
}).single("audioFile");

const uploadImage = multer({
    storage: storageImage,
    limits: {
        fileSize: 7 * 1024 * 1024,
    },
    fileFilter: function (req, file, cb) {
        const filetypes = /png|jpg|jpeg|svg/;
        // const mimetype = filetypes.test(file.mimetype) || file.mimetype === 'audio/mp3';
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );

        if (extname) {
            return cb(null, true);
        }
        return cb("Error: Audio files only!");
    },
});

const checkImageSquare = async (req, res, next) => {
    try {
        let buffer = req.file.buffer;
        let metadata = await sharp(buffer).metadata();
        let width = metadata.width;
        let height = metadata.height;

        if (width !== height) {
            return res.status(400).json({status: false, message: "Required: Image Ratio must be 1:1" });
        }
        next();
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};
const checkImageLongRect = async (req, res, next) => {
    try {
        let buffer = req.file.buffer;
        let metadata = await sharp(buffer).metadata();
        let width = metadata.width;
        let height = metadata.height;
        if (Math.abs((width / height) - (28 / 10))< 0.05) {
            return res.status(400).json({status: false, message: "Required: Image Ratio must be 28:10 (2.8)" });
        }
        next();
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

module.exports = { uploadAudio ,uploadImage ,checkImageSquare,checkImageLongRect };
