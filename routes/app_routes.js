import { Router } from "express";
import UserRoutes from "./user_routes.js";
import PostRoute from "./post_routes.js"
import CommentRouter from "./comment_routes.js"
const router = Router();

router.use('/api/v1/user', UserRoutes);
router.use('/api/v1/post', PostRoute);
router.use('/api/v1/comment', CommentRouter);

export default router;