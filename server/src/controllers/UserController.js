//back: hace create, get  y delete
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const createUser = async (req, res) => {
    try{
        const { name, lastName, passwordHash, email, isActive, role, address } = req.body;
        const avatarUrl = req.file ? req.file.filename : "defaultAvatar.png";
        const avatar = `http://localhost:3006/uploads/users/${avatarUrl}`;
        password = createHash(passwordHash);
        const user = await prisma.user.create({
            data: {
                name,
                lastName,
                password,
                email,
                isActive,
                avatar,
                role,
                address,
            },
        });
        res.status(201).json({user});
    }catch(error){
        res.status(500).json({error: "Something went wrong"});
    }
};

var createHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

const login = async (req, res) => {
    try{
        const { email, passwordHash } = req.body;
        const user = await prisma.user.findUnique({
            where: { email: email},
        });      
        console.log(user);  
        if(user && isValidPassword(user, passwordHash)){
            const token = jwt.sign(
                { id: user.id }, 
                process.env.TWT_SECRET, 
                { expiresIn: process.env.JTW_EXPIRATION}
            );
            res.status(200).json({user, token});
        }else{
            res.status(401).json({error: "User undefined or invalid password"});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Something went wrong"});
    }
};

var isValidPassword = function(user, password){
    return bcrypt.compareSync(password, user.password);
}

const getListUsers = async (req, res) => {
    try{
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    }catch(error){
        console.log(error.message);
        res.status(400).json({message: error.message});
    }
};

const deleteUser = async (req, res) => {
    try{ 
        const {id} = req.body;
        const user = await prisma.user.delete({
            where: { id: id },
        });
        if(user){
            res.status(200).json({message: "User deleted successfully"});
        } else {
            throw new Error("User not found");
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const getUserByName = async (req, res) => {
    try{
        const { name } = req.query;

        const users = await prisma.user.findMany({
            where: { name: { contains: name, mode: 'insensitive' },
            },
        });

        res.status(200).json({users});
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Something went wrong"});
    }
};

const getUserbyId = async (req, res) => {
    try{
        const {id} = req.query; 
        const user = await prisma.user.findUnique({
            where: { id: id },
        });
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

const updateUserByEmail = async (req, res) => {
    try{
        const {email} = req.body;
        const { name, lastName, password, isActive, role, address }= req.body;
        const user = await prisma.user.update({
            where: { email: email},
            data: { name, lastName, password, isActive, role, address },
        });
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

module.exports = {createUser, getListUsers, deleteUser, getUserByName, getUserbyId, updateUserByEmail, login};