import { Router } from "express";
import { createPost, fetchAllPosts, fetchSinglePosts, updatePost, deletePost } from "../controller/post_controller.js";


const router = Router();

router.post('/', createPost);
router.get('/', fetchAllPosts);
router.get('/:id', fetchSinglePosts);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;