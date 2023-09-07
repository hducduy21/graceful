const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");
const bcrypt = require("bcrypt");


const ArtistSchema = new Schema({
    name: { type: String, required: true, maxlength: 50 },
    gender: { type: Boolean },
    birthday: { type: String, maxlength: 10 },
    view: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Playlist" },
    albums: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
    image: {
        squareImg: { type: String },
        bannerImg: { type: String },
    },
    content: { type: String, maxlength: 1000 },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const SongSchema = new Schema({
    id: { type: String, index: true, maxlength: 36 },
    title: { type: String, required: true, maxlength: 100 },
    artist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }],
    playlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
    link: { type: String },
    year: { type: Number },
    image: { type: String },
    lyrics: [
        {
            time: { type: Number },
            lyric: { type: String },
        },
    ],
    desc: { type: String },
    view: { type: Number, default: 0 },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const monthlyChart = new Schema({
    type: {
        type: String,
        required: true,
        enum: ["song", "playlist"],
    },
    song: { type: mongoose.Schema.Types.ObjectId, ref: "Song" },
    playlist: { type: mongoose.Schema.Types.ObjectId, ref: "Playlist" },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    view: { type: Number, required: true, default: 0 },
});

const playlistSchema = new Schema({
    id: { type: String, index: true, maxlength: 36 },
    type: {
        type: String,
        required: true,
        enum: ["system", "album", "author", "create", "favorite"],
    },
    title: { type: String, required: true, maxlength: 100 },
    desc: { type: String, maxlength: 500 },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
    view: { type: Number, default: 0 },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UserSchema = new Schema({
    name: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, unique:true, maxlength: 50 },
    password: { type: String, maxlength: 150 },
    role: { type: String, required: true, enum: ["user", "vip", "admin"] },
    status: {
        type: String,
        enum: ["active", "inactive", "pending"],
    },
    history: { type: mongoose.Schema.Types.ObjectId, ref: "Playlist" },
    favoritePlaylists: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
    },
    favoriteSong: { type: mongoose.Schema.Types.ObjectId, ref: "Playlist" },
});

const CommentSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    song: { type: mongoose.Schema.Types.ObjectId, ref: "Playlist" },
    content: { type: String, maxlength: 500 },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const PlaylistCategorySchema = new Schema({
    type: {
        type: String,
        enum: ["home", "suggest","history"]
    },
    name: { type: String, maxlength: 500, require: true, unique: true },
    playlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const PlaylistCategory = mongoose.model(
    "PlaylistCategory",
    PlaylistCategorySchema
);
const Playlist = mongoose.model("Playlist", playlistSchema);



ArtistSchema.pre("save", async function (next) {
    if (this.isNew) {
        try {
            let playlistUser = new Playlist({
                type: "author",
                title: this.name,
                author: this._id,
                songs: [],
            });
            await playlistUser.save();
            this.author = await Playlist.findOne({
                type: "author",
                author: this._id,
            });
            next();
        } catch (err) {
            next(err);
        }
    }
    next();
});
const Artist = mongoose.model("Artist", ArtistSchema);

SongSchema.pre("save", async function (next) {
    if (this.isNew) {
        try {
            this.artist.forEach(async (e) => {
                let p = await Playlist.findOne({
                    type: "author",
                    author: e._id,
                });
                if (p != null) {
                    if (p.song) p.songs = [this];
                    else p.songs.push(this);
                    p.save();
                }
                next();
            });
            next();
        } catch (err) {
            next(err);
        }
    }
    next();
});
UserSchema.pre("save", async function (next) {
    if (this.isNew) {
        this.password =await bcrypt.hashSync(this.password,10)
    }
    next();
});

const Song = mongoose.model("Song", SongSchema);
const User = mongoose.model("User", UserSchema);
const Comment = mongoose.model("Comment", CommentSchema);
const Chart = mongoose.model("Chart", monthlyChart);

module.exports = {
    User,
    Song,
    Playlist,
    Comment,
    Artist,
    Chart,
    PlaylistCategory
};
