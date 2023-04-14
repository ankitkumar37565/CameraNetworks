const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/cameraNetworks");

mongoose.connection.on("connected", function () {
    console.log("Mongodb connected");
});

// Mongodb connection error
mongoose.connection.on("error", function (err) {
    console.log("Mongodb connection error:" + err);
});

// Mongodb connection disconnected
mongoose.connection.on("disconnected", function () {
    console.log("Mongodb is disconnected");
});
