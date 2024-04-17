const express = require("express");
const app = express();
app.use(express.static("public"));

//new
const Joi = require("joi");
const multer = require("multer");
app.use("/uploads", express.static("uploads"));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://asm25:tMhK79wEcuM10rfR@finalproject.nxyuw6t.mongodb.net/?retryWrites=true&w=majority&appName=finalProject")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("couldn't connect to mongodb", error);
  });

  //tMhK79wEcuM10rfR
const songSchema = new mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
  name:String,
  artist:String,
  genre:String,
  image:String
});

const Song = mongoose.model("Song", songSchema);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

app.get("api/songs",(req,res)=>{
    console.log("someone is launching the website");
    res.sendFile(__dirname + "/index.html");
});




app.get("/api/songs", (req, res) => {
    getSongs(res);
});

const getSongs  = async (res) => {
    const songs = await Song.find();
    res.send(songs);
};
      
app.post("/api/songs", upload.single("img"), (req, res) => {
    console.log("in post");
    const result = validateSongs(req.body);
    console.log(result);
  if (result.error) {
    console.log("problem");
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const song = new Song({
    name: req.body.name,
    description: req.body.artist,
    supplies: req.body.genre
  });

  if (req.file) {
    song.image = req.file.filename;
  }
  
  createSong(song, res);
    

});

const createSong = async (song, res) => {
    console.log("in create song");
    const result = await song.save();
    res.send(song);
}

app.put("/api/songs/:id", upload.single("img"), (req,res)=>{

    const result = validateSongs(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    updateSong(req, res);
});

const updateSong = async (req, res) => {
    console.log(req.body);
    let fieldsToUpdate = {
        name: req.body.name,
        artist: req.body.artist,
        genre: req.body.genre
    };

    if (req.file) {
        fieldsToUpdate.image = "images/" + req.file.filename;
    }

    const result = await Song.updateOne({ _id: req.params.id}, fieldsToUpdate);

    res.send(result);
}

app.delete("/api/songs/:id", (req,res)=>{
    removeSong(res, req.params.id);
  });

  const removeSong = async (res, id) => {
    const song = await Song.findByIdAndDelete(id);
    res.send(song);
  }

const validateSongs = (song) => {
    const schema = Joi.object({
      _id: Joi.allow(""),
      genre: Joi.string().min(3).required,
      name: Joi.string().min(3).required(),
      artist: Joi.string().min(3).required(),
    });
  
    return schema.validate(song);
  };

app.listen(3000, ()=>{
    console.log("listening");
});