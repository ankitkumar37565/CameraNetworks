const mongoose = require("mongoose");
const cameraSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    cameraNetworkId: {
        type: String,
    },
    ISO: {
        //sensor sensitivity to light
        type: Number,
        default: 3200,
    },
    shutterSpeed: {
        //shutterSpeed of Camera means how many times per second it allows light to let in in each frame
        type: Number,
        default: 60,
    },

    aperture: {
        //size of lens
        type: String,
        default: "f22",
    },
    fps: {
        //frames per second recoded
        type: Number,
        default: 60,
    },
});
const Camera = mongoose.model("Camera", cameraSchema);
module.exports = Camera;
