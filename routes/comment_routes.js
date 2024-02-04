import Router from "express";
import {
    createComment,
    fetchAllComments,
    fetchSingleComments,
    updateComment,
    deleteComment
} from "../controller/comment_controller.js";

const router = Router();

router.post('/', createComment);
router.get('/', fetchAllComments);
router.get('/:id', fetchSingleComments);
router.patch('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;