const express = require('express');
const router = express.Router();
const userController = require("../controllers/MaintenanceController")

router.post('/new-maintenance', userController.createMaintenance);
router.get("/list-maintenance", userController.getListMaintenances); 
router.get("/get-maintenance-id", userController.getMaintenancebyId); 
router.patch("/update-maintenance", userController.updateMaintenanceById); 
router.delete("/delete-maintenance", userController.deleteMaintenance); 

module.exports = router;