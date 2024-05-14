const express = require('express');
const router = express.Router();
const userController = require("../controllers/TireController")

router.post('/new-tire', userController.createTire);
router.get("/list-tire", userController.getListTires); 
router.get("/get-tire-id", userController.getTirebyId); 
router.patch("/update-tire", userController.updateTireById); 
router.delete("/delete-tire", userController.deleteTire); 

module.exports = router;