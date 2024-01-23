import { Router } from "express";
import {
    createUser,
    updateUser,
    fetchAllUsers,
    fetchSingleUser,
    deleteUser
} from "../controller/user_controller.js";

const router = Router();

router.post('/create', createUser);
router.get('/', fetchAllUsers);
router.get('/:id', fetchSingleUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;