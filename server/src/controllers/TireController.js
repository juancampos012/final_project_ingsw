const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const createTire = async (req, res) => {
    try{
        const { brand, mileage, position, wear, velocityIndex, wetGrip, truckId} = req.body;

        const existingTire = await prisma.tire.findFirst({
            where: {
                truckId: truckId,
                position: position,
            },
        });
        if (existingTire) {
            return res.status(400).json({ error: "Ya existe una llanta en esta posición. ¿Desea reemplazarla?" });
        }

        const tire = await prisma.tire.create({
            data: {
                brand,
                mileage,
                position,
                wear, 
                velocityIndex,
                wetGrip,
                truckId, 
            },
        });
        res.status(201).json({tire});
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Something went wrong"});
    }
};


const getListTires = async (req, res) => {
    try{
        const tires = await prisma.tire.findMany();
        res.status(200).json(tires);
    }catch(error){
        console.log(error.message);
        res.status(400).json({message: error.message});
    }
};

const getTirebyId = async (req, res) => {
    try{
        const {id} = req.query; 
        const tire = await prisma.tire.findUnique({
            where: { id: id },
        });
        res.status(200).json(tire);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

const getTireByTruckId = async (req, res) => {
    try{
        const { truckId, position } = req.query; 
        const tire = await prisma.tire.findFirst({
            where: { 
                truckId: truckId,
                position: parseInt(position)
            },
        });
        res.status(200).json(tire);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

const deleteTire = async (req, res) => {
    try{ 
        const {id} = req.body;
        const tire = await prisma.tire.delete({
            where: { id: id },
        });
        if(tire){
            res.status(200).json({message: "Tire deleted successfully"});
        } else {
            throw new Error("Tire not found");
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const updateTireById = async (req, res) => {
    try{
        const {id} = req.body;
        const { brand, mileage, wear, position, velocityIndex, wetGrip, truck} = req.body;
        const tire = await prisma.tire.update({
            where: { id: id},
            data: { brand, mileage, wear, position, velocityIndex, wetGrip, truck},
        });
        res.status(201).json(tire);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

module.exports = {createTire, getListTires , getTirebyId , deleteTire, updateTireById, getTireByTruckId }