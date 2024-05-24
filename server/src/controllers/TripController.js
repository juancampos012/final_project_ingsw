const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createTrip = async (req, res) => {
    try {
        const { originPlace, destinationPlace, waypoints, distance, time, userId, truckId } = req.body;

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
                waypoints,
                distance,
                time,
                userTruckId: userTruck.id
            },
        });

        await prisma.userTruck.update({
            where: { id: userTruck.id },
            data: { trips: { connect: { id: trip.id } } }
        });

        const truck = await prisma.truck.update({
            where: { id: truckId },
            data: { mileage: { increment: distance } },
        });

        await prisma.tire.updateMany({
            where: { truckId: truckId },
            data: { mileage: { increment: distance } },
        });

        res.status(201).json({trip});
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Algo salió mal" });
    }
};

const getListTrips = async (req, res) => {
    const userId = req.query.userId;

    try {
        const userTrucks = await prisma.userTruck.findMany({
            where: {
                userId: userId
            },
            include: {
                trips: true 
            }
        });

        const trips = userTrucks.flatMap(userTruck => userTruck.trips);

        res.status(200).json(trips);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

const getList = async (req, res) => {
    try {
        const trips = await prisma.trip.findMany();
        
        res.status(200).json(trips);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

getListDate = async (req, res) => {
    const { userId, truckId, date } = req.body;

    try {
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);

        const trips = await prisma.trip.findMany({
            where: {
                AND: [
                    {
                        userTruck: {
                            userId: userId,
                            truckId: truckId,
                        }
                    },
                    {
                        createdAt: {
                            gte: startDate,
                            lt: endDate
                        }
                    }
                ]
            }
        });

        res.status(200).json(trips);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

const getTripbyId = async (req, res) => {
    try {
        const { id } = req.query; 
        const trip = await prisma.trip.findUnique({
            where: { id: id },
        });
        res.status(200).json(trip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteTrip = async (req, res) => {
    try { 
        const { id } = req.body;
        const trip = await prisma.trip.delete({
            where: { id: id },
        });
        if (trip) {
            res.status(200).json({ message: "Trip deleted successfully" });
        } else {
            throw new Error("Trip not found");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTrip = async (req, res) => {
    try {
        const { id, completed } = req.body;

        const trip = await prisma.trip.update({
            where: { id: id },
            data: {
                completed: completed,
            },
        });

        res.status(200).json({ trip });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Algo salió mal" });
    }
};

module.exports = { createTrip, getListTrips, getList, getTripbyId, deleteTrip, updateTrip, getListDate };