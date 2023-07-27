const express = require("express");
const songs = express.Router();
const {getAllSongs, getSong, createSong, deleteSong, updateSong} = require("../queries/songs")
const { checkName, checkBoolean} = require( "../validations/checkSongValidation")

//INDEX
songs.get("/", async (req, res) => {
    //res.json({status: "ok"})
     const allSongs = await getAllSongs();
     if (allSongs[0]) {
        res.status(200).json(allSongs);
     } else {
        res.status(500).json({error: "server error"})
     }
})

//ORDER : ASC / DESC // not working???
songs.get('/', async (req, res) => {
   const order = req.query.order
   res.json(order);
   const allSongs = await getAllSongs();
   if (order === "asc"){
      res.json(allSongs.sort((a,b) => a.title.localeCompare(b.title)))
   }else if (order === "desc") {
      res.json(allSongs.sort((a,b) => b.title.localeCompare(a.title)))
   }
})

//SHOW
songs.get("/:id", async (req, res) => {
   const { id } = req.params;
   const song = await getSong(id);
   if (song) {
      res.json(song);
   } else {
      res.status(404).json({error: "ooops, ..not found"})
   }

});

//CREATE 
songs.post("/",checkBoolean,checkName, async (req, res) => {
   try {
      const song = await createSong(req.body);
      res.json(song);
   } catch(error) {
      res.status(404).json({error: error})
   }
});

//DELETE
songs.delete("/:id", async (req, res) => {
   const { id } = req.params;
   const deletedSong = await deleteSong(id);
   if (deletedSong.id){
      res.status(200).json(deletedSong);
   } else {
      res.status(404).json("song not found")
   }
});
//UPDATE
songs.put("/:id", checkName, checkBoolean, async (req,res) => {
   const { id } = req.params;
   const updatedSong = await updateSong(id, req.body);
   res.status(200).json(updatedSong)
})


module.exports = songs;