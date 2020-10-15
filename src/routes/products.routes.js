import { Router } from "express";
import { authJwt } from '../middlewares';

import * as productsCtrl from "../controllers/products.controller";

const router = Router();


router.post('/', [authJwt.verifyToken, authJwt.isModerator], productsCtrl.createProduct);
router.get('/', [authJwt.verifyToken], productsCtrl.getProducts);
router.get('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.getProductById);
router.put('/:productId', [authJwt.verifyToken], productsCtrl.updateProduct);
router.delete('/:productId', [authJwt.verifyToken], productsCtrl.deleteProductById);


export default router;