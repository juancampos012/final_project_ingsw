const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const createTrip = async (req, res) => {
    try{
        const { originPlace, destinationPlace, distance, time, userId, truckId } = req.body;

        // Aquí se crea la relación userTruck
        const userTruck = await prisma.userTruck.create({
            data: {
                userId: userId,
                truckId: truckId
            },
        });

        const trip = await prisma.trip.create({
            data: {
                originPlace,
                destinationPlace,
                distance,
                time,
                userTruckId: userTruck.id
            },
        });

        // Aquí se añade el viaje al array de trips en el registro userTruck
        await prisma.userTruck.update({
            where: { id: userTruck.id },
            data: { trips: { connect: { id: trip.id } } }
        });

        res.status(201).json({trip});
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Algo salió mal"});
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

const updateTrip = async (req, res) => {
    try{
        const { id, originPlace, destinationPlace, distance, time, userId, truckId } = req.body;

        // Aquí se actualiza la relación userTruck
        const userTruck = await prisma.userTruck.update({
            where: { id: userTruckId },
            data: {
                userId: userId,
                truckId: truckId
            },
        });

        const trip = await prisma.trip.update({
            where: { id: id },
            data: {
                originPlace,
                destinationPlace,
                distance,
                time,
                userTruckId: userTruck.id
            },
        });

        res.status(200).json({trip});
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Algo salió mal"});
    }
};


module.exports = {createTrip, getListTrips , getTripbyId , deleteTrip }