const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const createMaintenance = async (req, res) => {
    try{
        const { type, nextDate, cost, truckId} = req.body;

        const maintenance = await prisma.maintenance.create({
            data: {
                type,
                nextDate: new Date(nextDate).toISOString(),
                cost, 
                truckId, 
            },
        });
        res.status(201).json({maintenance});
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Something went wrong"});
    }
};


const getListMaintenances = async (req, res) => {
    try{
        const maintenances = await prisma.maintenance.findMany();
        res.status(200).json(maintenances);
    }catch(error){
        console.log(error.message);
        res.status(400).json({message: error.message});
    }
};

const getMaintenancebyId = async (req, res) => {
    try{
        const {id} = req.query; 
        const maintenance = await prisma.maintenance.findUnique({
            where: { id: id },
        });
        res.status(200).json(maintenance);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

const deleteMaintenance = async (req, res) => {
    try{ 
        const {id} = req.body;
        const maintenance = await prisma.maintenance.delete({
            where: { id: id },
        });
        if(maintenance){
            res.status(200).json({message: "Maintenance deleted successfully"});
        } else {
            throw new Error("Maintenance not found");
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const updateMaintenanceById = async (req, res) => {
    try{
        const {id} = req.body;
        const { type, date, cost, truckId} = req.body;
        const maintenance = await prisma.maintenance.update({
            where: { id: id},
            data: { type, date, cots, truckId},
        });
        res.status(201).json(maintenance);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

module.exports = {createMaintenance, getListMaintenances , getMaintenancebyId , deleteMaintenance, updateMaintenanceById }