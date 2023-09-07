const {
    User,
    Song,
    Playlist,
    Comment,
    Artist,
    Chart,
    PlaylistCategory
} = require("../models/model");
const fs = require("fs");

async function initDatabase() {

    let data = await fs.readFileSync("./src/utils/data.json");
    data = JSON.parse(data);
    let arctists = await data.artists.map( element => {
        return new Artist(element);
    });
    let songs = await data.songs.map( element => {
        return new Song(element);
    });
    let users = await data.users.map( element => {
        return new User(element);
    });
    for(let i = 0; i<songs.length; i++){
        if(i<5){
            songs[i].artist.push(arctists[0])
        }else{
            songs[i].artist.push(arctists[1])
        }
    }
    await arctists.forEach(async element => {
        await element.save()
    });
    await songs.forEach(async  element => {
        await element.save()
    });
    await users.forEach(async  element => {
        await element.save()
    });

    let playlist1 = await new Playlist({type: "system",title:"Sweet",desc: "Sad songs", songs: [songs[0],songs[2],songs[4],songs[5]]})
    await playlist1.save()
    let home = await new PlaylistCategory({ type: "home", playlist: [], name: "Top listents" });
    await home.save();
    let suggest = await new PlaylistCategory({ type: "home", playlist: [], name:"Chill" });
    await suggest.save();
    let suggest2 = await new PlaylistCategory({ type: "home", playlist: [], name:"Recommend today" });
    await suggest2.save();
    console.log("Data initialization.....")
}
module.exports = { initDatabase };