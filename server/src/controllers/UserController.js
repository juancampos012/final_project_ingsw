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
