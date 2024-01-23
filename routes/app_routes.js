import { Router } from "express";
import UserRoutes from "./user_routes.js";

const router = Router();

router.use('/api/v1/user', UserRoutes);

export default router;