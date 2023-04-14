const CameraNetwork = require("../models/cameraNetworks");
const Camera = require("../models/camera");

const CameraNetworkController = {
    getCameraNetwork: async function (req, res) {
        try {
            let camera = await CameraNetwork.findOne({ _id: req.params.id });
            if (camera) {
                return res.status(200).send({ success: true, message: "CameraNetwork Fetched Successfully", data: camera });
            }
            return res.status(400).send({ success: false, message: "CameraNetwork Not Found" });
        } catch (error) {
            console.log("error@getCameraNetwork:", error);
            return res.status(400).send({ success: false, message: "CameraNetwork Fetch Failed" });
        }
    },
    getAllCameraNetwork: async function (req, res) {
        try {
            const limit = parseInt(req.body.limit);
            const page = parseInt(req.body.page);
            const skip = (page - 1) * limit;

            let cameras = await CameraNetwork.find({}).skip(skip).limit(limit);
            let count = await CameraNetwork.countDocuments();
            return res.status(200).send({ success: true, message: "CameraNetwork Fetched Successfully", data: cameras, count: count });
        } catch (error) {
            console.log("error@getAllCameraNetwork:", error);
            return res.status(400).send({ success: false, message: "AllCameraNetwork Fetch Failed" });
        }
    },
    addCameraNetwork: async function (req, res) {
        try {
            let cameraNetwork = await new CameraNetwork(req.body).save();
            return res.status(200).send({ success: true, message: "CameraNetwork Added Successfully", data: cameraNetwork });
        } catch (error) {
            console.log("error@addCameraNetwork:", error);
            return res.status(400).send({ success: false, message: "Failed To Add CameraNetwork" });
        }
    },
    editCameraNetwork: async function (req, res) {
        try {
            let cameraNetwork = await CameraNetwork.findByIdAndUpdate(req.params.id,req.body);
            return res.status(200).send({ success: true, message: "CameraNetwork Edited Successfully" });
        } catch (error) {
            console.log("error@editCameraNetwork:", error);
            return res.status(400).send({ success: false, message: "Failed To Edit CameraNetwork" });
        }
    },
    deleteCameraNetwork: async function (req, res) {
        try {
            let cameraNetwork = await CameraNetwork.findById(req.params.id);
            if (!cameraNetwork) {
                return res.status(400).send({ success: false, message: "CameraNetwork Not Found" });
            }
            await Camera.updateMany({ cameraNetworkId: cameraNetwork._id }, { cameraNetworkId: "" });
            await CameraNetwork.findByIdAndDelete(req.params.id);
            return res.status(200).send({ success: true, message: "CameraNetwork Deleted Successfully" });
        } catch (error) {
            console.log("error@deleteCameraNetwork:", error);
            return res.status(400).send({ success: false, message: "Failed To Delete CameraNetwork" });
        }
    },
};
module.exports = CameraNetworkController;
