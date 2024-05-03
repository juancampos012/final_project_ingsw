const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const createTrip = async (req, res) => {
    try{
        const { route, distance, time, truck} = req.body;
        const trip = await prisma.trip.create({
            data: {
                route,
                distance,
                time, 
                truck, 
            },
        });
        res.status(201).json({truck});
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Something went wrong"});
    }
};


const getListTrips = async (req, res) => {
    try{
        const trips = await prisma.trip.findMany();
        res.status(200).json(trips);
    }catch(error){
        console.log(error.message);
        res.status(400).json({message: error.message});
    }
};

const getTripbyId = async (req, res) => {
    try{
        const {id} = req.query; 
        const trip = await prisma.trip.findUnique({
            where: { id: id },
        });
        res.status(200).json(trip);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

const deleteTrip = async (req, res) => {
    try{ 
        const {id} = req.body;
        const trip = await prisma.trip.delete({
            where: { id: id },
        });
        if(trip){
            res.status(200).json({message: "Trip deleted successfully"});
        } else {
            throw new Error("Trip not found");
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const updateTripById = async (req, res) => {
    try{
        const {id} = req.body;
        const { route, distance, time, truck} = req.body;
        const trip = await prisma.trip.update({
            where: { id: id},
            data: { brand, model, wear, truck},
        });
        res.status(201).json(trip);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

module.exports = {createTrip, getListTrips , getTripbyId , deleteTrip, updateTripById }