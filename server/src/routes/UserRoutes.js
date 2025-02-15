const express = require('express');
const multer = require('multer');
const router = express.Router();
const userController = require("../controllers/UserController")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/users");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
})

const upload = multer({storage});

router.post('/new-user', upload.single("avatar"), userController.createUser);
router.post('/login', userController.login);
router.get("/list-user", userController.getListUsers); 
router.get("/list-identifications", userController.getListIdentifications); 
router.get("/get-user-by-identification", userController.getUserByIdentification); 
router.get("/get-user-by-id", userController.getUserbyId); 
router.get("/get-user-by-name", userController.getUserByName); 
router.get("/verify-token", userController.verifyTokenjwt);
router.post("/create-cookie", userController.createCookie);
router.patch("/update-user", userController.updateUserByEmail); 
router.delete("/delete-user", userController.deleteUser); 

module.exports = router;