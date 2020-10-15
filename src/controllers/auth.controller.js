import User from "../models/User";
import jwt from 'jsonwebtoken';
import config from "../config";
import Role from "../models/Role";

export const signUp = async (req, res) => {

    const { username, email, password, roles } = req.body;

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    });

    if (roles) {
        const foundRols = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRols.map(map => map._id);
    }
    else {
        const role = await Role.findOne({ name: 'user' });
        newUser.roles = [role._id];
    }

    const userSave = await newUser.save();

    const token = jwt.sign({ id: userSave._id }, config.SECRET, {
        expiresIn: 86400
    })

    res.status(200).json({ token });
}

export const signIn = async (req, res) => {

    const { username, email, password } = req.body;

    const userFound = await User.findOne({ email: email }).populate("roles");
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const matchPwd = await User.comparePassword(password,userFound.password);

    if(!matchPwd) return res.status(401).json({ token: null, message: "invalid password" });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400
    })

    res.status(200).json({ token });

} 