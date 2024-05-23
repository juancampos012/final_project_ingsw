const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUserTruck = async (req, res) => {
    try{
        const { userId, truckId } = req.body;
        const newUserTruck = await prisma.userTruck.create({
            data: { userId, truckId },
        });
        res.status(201).json(newUserTruck);
    }catch(error){
        res.status(400).json({message: error.message});
    }
};

const getUserTrucks = async (req, res) => {
    try{
        const userTrucks = await prisma.userTruck.findMany();
        res.status(200).json(userTrucks);
    }catch(error){
        console.log(error.message);
        res.status(400).json({message: error.message});
    }
};

const getUserTruckById = async (req, res) => {
    try{
        const {id} = req.query; 
        const userTruck = await prisma.userTruck.findUnique({
            where: { id: id },
        });
        res.status(200).json(userTruck);
    }catch(error){
        res.status(400).json({message: error.message});
    }
};

const deleteUserTruck = async (req, res) => {
    try{ 
        const {id} = req.body;
        const userTruck = await prisma.userTruck.delete({
            where: { id: id },
        });
        if(userTruck){
            res.status(200).json({message: "User truck deleted successfully"});
        } else {
            throw new Error("User truck not found");
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

const updateUserTruckById = async (req, res) => {
    try{
        const {id} = req.body;
        const { userId, truckId } = req.body;
        const userTruck = await prisma.userTruck.update({
            where: { id: id},
            data: { userId, truckId },
        });
        res.status(201).json(userTruck);
    }catch(error){
        res.status(400).json({message: error.message});
    }
};



module.exports = { getUserTrucks, getUserTruckById, deleteUserTruck, updateUserTruckById, createUserTruck }
