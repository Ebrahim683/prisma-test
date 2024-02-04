import prisma from "../db/db.config.js";

export const createComment = async (req, res) => {
    const { post_id, user_id, comment } = req.body;
    const post = await prisma.comment.create({
        data: {
            post_id,
            user_id,
            comment,
        }
    });
    await prisma.post.update({
        where: {
            id: post.post_id,
        },
        data: {
            comment_count: {
                increment: 1,
            }
        }
    });
    return res.json({ status: 200, message: 'Comment added.' });
};


export const fetchAllComments = async (req, res) => {
    const comments = await prisma.comment.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                }
            },
            post: {
                select: {
                    title: true,
                    description: true,
                }
            },
        }
    });
    return res.json({ status: 200, message: 'Comment fetched.', data: comments });
}

export const fetchSingleComments = async (req, res) => {
    const id = req.params.id;
    const comment = await prisma.comment.findFirst({
        where: {
            id: id
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                }
            },
            post: {
                select: {
                    title: true,
                    description: true,
                }
            },
        }
    }
    );
    return res.json({ status: 200, message: 'Comment fetched.', data: comment });
}


export const updateComment = async (req, res) => {

    const commentId = req.params.id;
    const { comment } = req.body;

    await prisma.comment.update({
        where: {
            id: commentId
        },
        data: {
            comment
        }
    });
    return res.json({ status: 200, message: 'Comment updated.' });
}

export const deleteComment = async (req, res) => {
    const commentId = req.params.id;
    const post = await prisma.comment.delete({
        where: {
            id: commentId,
        }
    });

    await prisma.post.update({
        where: {
            id: post.post_id,
        },
        data: {
            comment_count: {
                decrement: 1,
            }
        }
    });

    return res.json({ status: 200, message: 'Comment deleted.' });
}