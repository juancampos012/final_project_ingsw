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

const getListUsers = async (req, res) => {
    try{
        console.log('Listar usuarios');
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    }catch(error){
        console.log(error.message);
        res.status(400).json({message: error.message});
    }
};

const deleteUser = async (req, res) => {
    try{ 
        const {id} = req.body;
        const user = await prisma.user.delete({
            where: { id: id },
        });
        if(product){
            res.status(200).json({message: "User deleted successfully"});
        } else {
            throw new Error("User not found");
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}