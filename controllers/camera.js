const Camera = require("../models/camera");
const CameraNetwork = require("../models/cameraNetworks");

const CameraController = {
    getCamera: async function (req, res) {
        try {
            let camera = await Camera.findOne({ _id: req.params.id });
            if (camera) {
                return res.status(200).send({ success: true, message: "Camera Fetched Successfully", data: camera });
            }
            return res.status(400).send({ success: false, message: "Camera Not Found" });
        } catch (error) {
            console.log("error@getCamera:", error);
            return res.status(400).send({ success: false, message: "Camera Fetch Failed" });
        }
    },
    getAllCamera: async function (req, res) {
        try {
            const limit = parseInt(req.body.limit);
            const page = parseInt(req.body.page);
            const skip = (page - 1) * limit;

            let cameras = await Camera.find({}).skip(skip).limit(limit);
            let count = await Camera.countDocuments();
            return res.status(200).send({ success: true, message: "All Camera Fetched Successfully", data: cameras, count: count });
        } catch (error) {
            console.log("error@getAllCamera:", error);
            return res.status(400).send({ success: false, message: "AllCamera Fetch Failed" });
        }
    },
    addCamera: async function (req, res) {
        try {
            let cameraNetwork = await CameraNetwork.findOne({ _id: req.body.cameraNetworkId });
            if (cameraNetwork) {
                let camera = await new Camera(req.body).save();
                cameraNetwork.cameras.push(camera._id.toString());
                await cameraNetwork.save();
                return res.status(200).send({ success: true, message: "Camera Added Successfully", data: camera });
            } else {
                return res.status(400).send({ success: false, message: "Failed To Find cameraNetwork" });
            }
        } catch (error) {
            console.log("error@addCamera:", error);
            return res.status(400).send({ success: false, message: "Failed To Add Camera" });
        }
    },
    editCamera: async function (req, res) {
        try {
            let update = req.body;
            if (req.body.cameraNetworkId) {
                let cameraNetwork1 = await CameraNetwork.findOne({ _id: req.body.cameraNetworkId });
                if (!cameraNetwork1) {
                    return res.status(400).send({ success: false, message: "Failed To Find CameraNetwork" });
                }

                let camera = await Camera.findOne({ _id: req.params.id });
                if (camera.cameraNetworkId) {
                    let cameraNetwork2 = await CameraNetwork.findOne({ _id: camera.cameraNetworkId });
                    if (cameraNetwork2) {
                        cameraNetwork2.cameras = cameraNetwork2.cameras.filter((id) => {
                            return id !== camera._id.toString();
                        });
                        await cameraNetwork2.save();
                    }
                }

                await Camera.findByIdAndUpdate(req.params.id, update);
                cameraNetwork1.cameras.push(camera._id.toString());
                await cameraNetwork1.save();
                return res.status(200).send({ success: true, message: "Camera Edited Successfully", data: camera });
            } else {
                let camera = await Camera.findByIdAndUpdate(req.params.id, update);
                return res.status(200).send({ success: true, message: "Camera Edited Successfully" });
            }
        } catch (error) {
            console.log("error@editCamera:", error);
            return res.status(400).send({ success: false, message: "Failed To Edit Camera" });
        }
    },
    deleteCamera: async function (req, res) {
        try {
            let camera = await Camera.findById(req.params.id);
            if (!camera) {
                return res.status(400).send({ success: false, message: "Camera Not Found" });
            }
            if (camera.cameraNetworkId) {
                let cameraNetwork = await CameraNetwork.findOne({ _id: camera.cameraNetworkId });

                if (cameraNetwork) {
                    cameraNetwork.cameras = cameraNetwork.cameras.filter((id) => {
                        return id !== camera._id.toString();
                    });

                    await cameraNetwork.save();
                }
            }
            await Camera.findByIdAndDelete(req.params.id);
            return res.status(200).send({ success: true, message: "Camera Deleted Successfully" });
        } catch (error) {
            console.log("error@deleteCamera:", error);
            return res.status(400).send({ success: false, message: "Failed To Delete Camera" });
        }
    },
};
module.exports = CameraController;
