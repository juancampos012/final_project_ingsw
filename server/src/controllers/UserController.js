//back: hace create, get  y delete
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const createUser = async (req, res) => {
    try{
        const { name, lastName, identification, passwordHash, email, isActive, role, department, municipality, nomenclature } = req.body;
        const avatarUrl = req.file ? req.file.filename : "defaultAvatar.png";
        const avatar = `http://localhost:3006/uploads/users/${avatarUrl}`;
        password = createHash(passwordHash);
        const user = await prisma.user.create({
            data: {
                name,
                lastName,
                identification,
                password,
                email,
                isActive,
                avatar,
                role,
                address: {
                    create: {
                        department,
                        municipality,
                        nomenclature,
                    }
                }
            },
        });
        res.status(201).json({user});
    }catch(error){
        console.error(error);
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
        if(user && isValidPassword(user, passwordHash)){
            const token = jwt.sign({ user }, process.env.TWT_SECRET, { expiresIn: process.env.JTW_EXPIRATION });
            res.status(200).json({user, token});
        }else{
            res.status(401).json({error: "User undefined or invalid password"});
        }
    }catch(error){
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

const getListIdentifications = async (req, res) => {
    try {
        const identifications = await prisma.user.findMany({
            select: {
                identification: true
            }
        });
        res.status(200).json(identifications);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
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
        const user = await prisma.address.findUnique({
            where: { id: id },
        });
        console.log(user);
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

const getUserByIdentification = async (req, res) => {
    try{
        const {identification} = req.query; 
        const user = await prisma.address.findUnique({
            where: { identification: identification },
        });
        console.log(user);
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

const updateUserByEmail = async (req, res) => {
    try{
        const {email} = req.body;
        const { name, lastName, identification, passwordHash, isActive, role, address }= req.body;
        password = createHash(passwordHash);
        const user = await prisma.user.update({
            where: { email: email},
            data: { name, lastName, identification, password, isActive, role, address },
        });
        res.status(201).json(user);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

const verificarTokenJWT = (token, secreto) => {
    try {
        const decoded = jwt.verify(token, secreto);
        return decoded; 
    } catch (error) {
        return null; 
    }
}

const verifyTokenjwt = async (req, res ) => {
    const { token } = req.query; 
    const secret = process.env.TWT_SECRET;

    if (!token) {
        return res.status(401).json({ message: "Token de autorización no proporcionado" });
    }

    const information = verificarTokenJWT(token, secret);
    if (information) {
        res.status(201).json({ user: information });
    } else {
        return res.status(401).json({ message: "Token de autorización no válido" });
    }
}

const createCookie =async (req, res) => {
    const { name, token } = req.body;
    res.cookie(name, token);
    res.send('Cookie establecida');
}

module.exports = {createUser, getListUsers, deleteUser, getUserByName, getUserbyId, updateUserByEmail, login, verifyTokenjwt, createCookie, getListIdentifications, getUserByIdentification };