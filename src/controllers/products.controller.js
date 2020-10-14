import Product from "../models/Product";

export const createProduct = async (req, res) => {
    const { name, category, price, imgURL } = req.body;

    const newProduct = new Product({ name, category, price, imgURL });

    const productSave = await newProduct.save();

    res.status(201).json(productSave);
}

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
}


export const getProductById = async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    res.status(201).json(product);
}

export const updateProduct = async (req, res) => {
    const { productId } = req.params;

    const productUpt = await Product.findByIdAndUpdate(productId, req.body, {
        new: true
    });
    res.status(200).json(productUpt);
}

export const deleteProductById = async (req, res) => {
    const { productId } = req.params;

    const productdelete = await Product.findByIdAndDelete(productId);
    res.status(200).json(productdelete);
}