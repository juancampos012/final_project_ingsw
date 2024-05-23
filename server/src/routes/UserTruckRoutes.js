const express = require('express');
const router = express.Router();
const userTruckController = require("../controllers/UserTruckController")

router.post('/new-usertruck', userTruckController.createUserTruck);
router.get("/list-usertrucks", userTruckController.getUserTrucks); 
router.get("/get-usertruck-id", userTruckController.getUserTruckById); 
router.patch("/update-usertruck", userTruckController.updateUserTruckById); 
router.delete("/delete-usertruck", userTruckController.deleteUserTruck); 

module.exports = router;
