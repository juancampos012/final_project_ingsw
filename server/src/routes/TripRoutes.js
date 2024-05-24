const express = require('express');
const router = express.Router();
const userController = require("../controllers/TripController");

router.post('/new-trip', userController.createTrip);
router.get("/list-trips", userController.getListTrips); 
router.get("/get-list", userController.getList); 
router.get("/get-trip", userController.getTripbyId); 
router.post("/get-trip-date", userController.getListDate); 
router.patch("/update-trip", userController.updateTrip);
router.delete("/delete-trip", userController.deleteTrip); 

module.exports = router;