const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTruck = async (req, res) => {
    try {
        const { licensePlate, brand, model, year, mileage, capacity } = req.body;
        console.log(req.body);
        const truck = await prisma.truck.create({
            data: {
                licensePlate,
                brand,
                model,
                year,
                mileage,
                capacity,
            },
        });
        res.status(201).json({ truck });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
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

const deleteTruckById = async (req, res) => {
    try {
        const { id } = req.query;

        await prisma.userTruck.deleteMany({
            where: {
                truckId: id,
            },
        });

        await prisma.tire.deleteMany({
            where: {
                truckId: id,
            },
        });

        await prisma.trip.deleteMany({
            where: {
                userTruck: {
                    truckId: id,
                },
            },
        });

        await prisma.refueling.deleteMany({
            where: {
                truckId: id,
            },
        });

        await prisma.maintenance.deleteMany({
            where: {
                truckId: id,
            },
        });

        const deletedTruck = await prisma.truck.delete({
            where: {
                id: id,
            },
        });

        if (deletedTruck) {
            res.status(200).json({ message: "Truck deleted successfully" });
        } else {
            throw new Error("Truck not found");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTruckByLicencePlate = async (req, res) => {
    try{
        const { licensePlate, brand, model, year, capacity, actualStatus } = req.body;
        const truck = await prisma.truck.update({
            where: { licensePlate: licensePlate},
            data: { brand, model, year, capacity, actualStatus },
        });
        res.status(201).json(truck);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

const getListLicensePlate= async (req, res) => {
    try {
        const licensePlates = await prisma.truck.findMany({
            select: {
                licensePlate: true
            }
        });
        res.status(200).json(licensePlates);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createTruck, getListTruck, getTruckByLicencePlate, deleteTruckByLicencePlate, updateTruckByLicencePlate, getListLicensePlate, deleteTruckById}