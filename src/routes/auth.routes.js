import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";
import { authJwt,verifySignup } from '../middlewares';


const router = Router();

router.post('/signup',[verifySignup.checkDuplicateUsernameorEmail,verifySignup.checkRolesExisted],authCtrl.signUp);
router.post('/signin',authCtrl.signIn);

export default router;