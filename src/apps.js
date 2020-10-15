import express from 'express';
import morgan from "morgan";
import pkg from "../package.json";

import { createRoles } from "./libs/initialSetup";

import productsRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";

const apps = express();

createRoles();

apps.set('pkg',pkg)

apps.use(morgan('dev'));
apps.use(express.json())

apps.get('/',(req,res) => {
    res.json({
        name: apps.get('pkg').name,
        author: apps.get('pkg').author,
        description: apps.get('pkg').description,
        version: apps.get('pkg').version,
    });

});

apps.use('/api/products',productsRoutes);
apps.use('/api/auth',authRoutes);

export default apps;