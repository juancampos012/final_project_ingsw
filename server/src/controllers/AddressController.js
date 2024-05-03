const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const getListAddress = async (req, res) => {
    try{
        const address = await prisma.address.findMany();
        res.status(200).json(address);
    }catch(error){
        console.log(error.message);
        res.status(400).json({message: error.message});
    }
};

const getAddressbyId = async (req, res) => {
    try{
        const {id} = req.query; 
        const address = await prisma.address.findUnique({
            where: { id: id },
        });
        res.status(200).json(address);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

const deleteAddress = async (req, res) => {
    try{ 
        const {id} = req.body;
        const address = await prisma.address.delete({
            where: { id: id },
        });
        if(address){
            res.status(200).json({message: "Address deleted successfully"});
        } else {
            throw new Error("Address not found");
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const updateAddressById = async (req, res) => {
    try{
        const {id} = req.body;
        const { department, municipality, nomenclature, user, userId} = req.body;
        const address = await prisma.address.update({
            where: { id: id},
            data: { department, municipality, nomenclature, user, userId},
        });
        res.status(201).json(address);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

module.exports = { getListAddress, getAddressbyId, deleteAddress, updateAddressById}