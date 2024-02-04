import prisma from "../db/db.config.js";

export const createUser = async (req, res) => {

    const { name, email, password } = req.body;
    const findUser = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });

    if (findUser) {
        return res.json({ status: 400, message: 'User already exists.' });
    }

    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password
        }
    });

    return res.json({ status: 200, message: 'user created.', data: newUser });
};


export const fetchAllUsers = async (req, res) => {
    const fetchedUsers = await prisma.user.findMany();
    return res.json({ status: 200, message: 'user fetched.', data: fetchedUsers });
}

export const fetchSingleUser = async (req, res) => {
    const userId = req.params.id;
    const fetchedUser = await prisma.user.findFirst({
        where: {
            id: Number(userId),
        },
        include: {
            Post: {
                select: {
                    title: true,
                    description: true,
                },
            },
        },
    });
    return res.json({ status: 200, message: 'user fetched.', data: fetchedUser });
}

export const updateUser = async (req, res) => {

    const userId = req.params.id;
    const { name, email, password } = req.body;

    await prisma.user.update({
        where: {
            id: Number(userId)
        },
        data: {
            name,
            email,
            password
        }
    });
    return res.json({ status: 200, message: 'user updated.' });
}

export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    await prisma.user.delete({
        where: {
            id: Number(userId)
        }
    });
    return res.json({ status: 200, message: 'user deleted.' });
}