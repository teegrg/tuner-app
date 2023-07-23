//DEPENDENCIES
const cors = require("cors");
const express = require("express");

//CONFIGURE
const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//ROUTES
app.get("/", (req,res) => {
    res.send("Wellcome to Tuner App")
})

//SONGS ROUTE
const songsController = require("./controllers/songController.jsx");
app.use("/songs", songsController);

//404 PAGE
app.get("*", (req, res) => {
    res.status(404).send("ooops, Page not found")
})

//EXPORT
module.exports = app;