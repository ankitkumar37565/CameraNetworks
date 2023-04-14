const mongoose = require("mongoose");
const cameraNetworkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cameras: {
        type: [],
    },
});
const CameraNetwork = mongoose.model("CameraNetwork", cameraNetworkSchema);
module.exports = CameraNetwork;
