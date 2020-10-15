import { Router } from "express";
import { authJwt,verifySignup } from '../middlewares';
import * as usersCtrl from "../controllers/user.controller";

const router = Router();

router.post('/', [authJwt.verifyToken, authJwt.isAdmin,verifySignup.checkRolesExisted], usersCtrl.createUser);

export default router;