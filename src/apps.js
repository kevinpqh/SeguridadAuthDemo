import express from 'express';
import morgan from "morgan";
import pkg from "../package.json";
import productsRoutes from "./routes/products.routes";

const apps = express();

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

export default apps;