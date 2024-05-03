const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const createRefueling = async (req, res) => {
    try{
        const { quantity, cost, efficiency, truck} = req.body;
        const refueling = await prisma.refueling.create({
            data: {
                quantity,
                cost,
                efficiency, 
                truck, 
                
            },
        });
        res.status(201).json({truck});
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Something went wrong"});
    }
};


const getListRefueling = async (req, res) => {
    try{
        const refueling = await prisma.refueling.findMany();
        res.status(200).json(refueling);
    }catch(error){
        console.log(error.message);
        res.status(400).json({message: error.message});
    }
};

const getRefuelingbyId = async (req, res) => {
    try{
        const {id} = req.query; 
        const refueling = await prisma.refueling.findUnique({
            where: { id: id },
        });
        res.status(200).json(refueling);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

const deleteRefueling = async (req, res) => {
    try{ 
        const {id} = req.body;
        const refueling = await prisma.refueling.delete({
            where: { id: id },
        });
        if(refueling){
            res.status(200).json({message: "refueling deleted successfully"});
        } else {
            throw new Error("refueling not found");
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const updateRefuelingById = async (req, res) => {
    try{
        const {id} = req.body;
        const { quantity, cost, efficiency, truck} = req.body;
        const refueling = await prisma.refueling.update({
            where: { id: id},
            data: { quantity, cost, efficiency, truck},
        });
        res.status(201).json(refueling);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

module.exports = {createRefueling, getListRefueling , getRefuelingbyId , deleteRefueling, updateRefuelingById }