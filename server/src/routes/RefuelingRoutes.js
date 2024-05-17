const express = require('express');
const router = express.Router();
const userController = require("../controllers/RefuelingController")

router.post('/new-refueling', userController.createRefueling);
router.get("/list-refueling", userController.getListRefueling); 
router.get("/get-refueling-id", userController.getRefuelingbyId); 
router.patch("/update-refueling", userController.updateRefuelingById); 
router.delete("/delete-refueling", userController.deleteRefueling); 

module.exports = router;