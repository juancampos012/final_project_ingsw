const express = require('express');
const router = express.Router();
const userController = require("../controllers/TruckController")

router.post('/new-truck', userController.createTruck);
router.get("/list-truck", userController.getListTruck); 
router.get("/get-truck", userController.getTruckByLicencePlate); 
router.get("/get-by-id", userController.getTruckById); 
router.get("/list-license-plate", userController.getListLicensePlate); 
router.patch("/update-truck", userController.updateTruckByLicencePlate); 
router.delete("/delete-truck", userController.deleteTruckByLicencePlate); 
router.delete("/delete-by-id", userController.deleteTruckById); 

module.exports = router;