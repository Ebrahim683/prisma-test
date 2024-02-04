import prisma from "../db/db.config.js";

export const createPost = async (req, res) => {

    const { user_id, title, description } = req.body;

    const newPost = await prisma.post.create({
        data: {
            user_id: Number(user_id),
            title: title,
            description: description
        }
    });

    return res.json({ status: 200, message: 'Post created.', data: newPost });
};


export const fetchAllPosts = async (req, res) => {
    const posts = await prisma.post.findMany({
        include: {
            comment: true,
        },

    });
    return res.json({ status: 200, message: 'Post fetched.', data: posts });
}

export const fetchSinglePosts = async (req, res) => {
    const id = req.params.id;
    const post = await prisma.post.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            comment: true,
        }
    }
    );
    return res.json({ status: 200, message: 'Post fetched.', data: post });
}


export const updatePost = async (req, res) => {

    const postId = req.params.id;
    const { title, description } = req.body;

    await prisma.post.update({
        where: {
            id: Number(postId)
        },
        data: {
            title: title,
            description: description,
        }
    });
    return res.json({ status: 200, message: 'Post updated.' });
}

export const deletePost = async (req, res) => {
    const postId = req.params.id;
    await prisma.post.delete({
        where: {
            id: Number(postId)
        }
    });
    return res.json({ status: 200, message: 'Post deleted.' });
}