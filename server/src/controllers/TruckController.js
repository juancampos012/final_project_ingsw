const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTruck = async (req, res) => {
    try{
        const { licensePlate, brand, model, year, capacity } = req.body;
        const truck = await prisma.truck.create({
            data: {
                licensePlate,
                brand,
                model,
                year, 
                capacity, 
            },
        });
        res.status(201).json({truck});
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Something went wrong"});
    }
};

const getListTruck = async (req, res) => {
    try{
        const trucks = await prisma.truck.findMany();
        res.status(200).json(trucks);
    }catch(error){
        console.log(error.message);
        res.status(400).json({message: error.message});
    }
};

const getTruckByLicencePlate = async (req, res) => {
    try{
        const {licensePlate} = req.query; 
        const truck = await prisma.truck.findUnique({
            where: { licensePlate: licensePlate},
        });
        res.status(200).json(truck);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

const deleteTruckByLicencePlate = async (req, res) => {
    try{ 
        const {licensePlate} = req.body;
        const truck = await prisma.truck.delete({
            where: { licensePlate: licensePlate},
        });
        if(truck){
            res.status(200).json({message: "Truck deleted successfully"});
        } else {
            throw new Error("Truck not found");
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const updateTruckByLicencePlate = async (req, res) => {
    try{
        const { licensePlate, brand, model, year, capacity } = req.body;
        const truck = await prisma.truck.update({
            where: { licensePlate: licensePlate},
            data: { brand, model, year, capacity },
        });
        res.status(201).json(truck);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

module.exports = { createTruck, getListTruck, getTruckByLicencePlate, deleteTruckByLicencePlate, updateTruckByLicencePlate }