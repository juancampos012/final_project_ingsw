//back: hace create, get  y delete
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (req, res) => {
    try{
        const { name, lastName, password, email, isActive, role, address } = req.body;
        console.log(req.body);
        const avatar = req.file ? req.file.filename : null;

        const user = await prisma.user.create({
            data: {
                name,
                lastName,
                password,
                email,
                isActive,
                avatar,
                role,
                address,
            },
        });

        res.status(201).json({user});
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Something went wrong"});
    }
};

const getUserByName = async (req, res) => {
    try{
        const { name } = req.query;

        const users = await prisma.user.findMany({
            where: { name: { contains: name, mode: 'insensitive' },
            },
        });

        res.status(200).json({users});
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Something went wrong"});
    }
};

const getUserbyId = async (req, res) => {
    try{
        const {id} = req.query; 
        const user = await prisma.user.findUnique({
            where: { id: id },
        });
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}