const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const UserModal = require("../models/user.js");

const secret = "adarsh0901";

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const oldUser = await UserModal.findOne({ email });
        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "10h" });
        res.status(200).json({ result: oldUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(err);
    }
}

const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const oldUser = await UserModal.findOne({ email });
        if (oldUser) {
            return res.status(400).json("User already exist");
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await UserModal.create({
            email,
            password: hashedPassword,
            name
        });

        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });
        res.status(201).json({ result, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(err)
    }
}

module.exports = { signup, login };