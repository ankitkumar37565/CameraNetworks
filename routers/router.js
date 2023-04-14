const express = require("express");
const router = express.Router();
const CameraController = require("../controllers/camera");
const CameraNetworkController = require("../controllers/cameraNetworks");

const handler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
//

//camera routers
router.get("/camera/get/:id", handler(CameraController.getCamera));
router.post("/camera/getAll", handler(CameraController.getAllCamera));
router.post("/camera/add", handler(CameraController.addCamera));
router.patch("/camera/edit/:id", handler(CameraController.editCamera));
router.delete("/camera/delete/:id", handler(CameraController.deleteCamera));

//cameraNetworks routers
router.get("/cameraNetworks/get/:id", handler(CameraNetworkController.getCameraNetwork));
router.post("/cameraNetworks/getAll", handler(CameraNetworkController.getAllCameraNetwork));
router.post("/cameraNetworks/add", handler(CameraNetworkController.addCameraNetwork));
router.patch("/cameraNetworks/edit/:id", handler(CameraNetworkController.editCameraNetwork));
router.delete("/cameraNetworks/delete/:id", handler(CameraNetworkController.deleteCameraNetwork));

module.exports = router;
