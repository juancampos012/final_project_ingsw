const express = require('express');
const router = express.Router();
const userController = require("../controllers/TripController")

router.post('/new-trip', userController.createTrip);
router.get("/list-trips", userController.getListTrips); 
router.get("/get-trip", userController.getTripbyId); 
router.delete("/delete-trip", userController.deleteTrip); 

module.exports = router;