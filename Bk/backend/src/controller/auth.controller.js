import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res, next) => {
	try {
		const { fullName, email, password } = req.body;
		if (!fullName || !email || !password)
			return res.status(400).json({ message: "All fields are required" });

		const exists = await User.findOne({ email });
		if (exists) return res.status(400).json({ message: "Email already in use" });

		const user = await User.create({ fullName, email, password });
		const token = generateToken(user._id);

		res.status(201).json({
			token,
			user: { _id: user._id, fullName: user.fullName, email: user.email, imageUrl: user.imageUrl, role: user.role },
		});
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) return res.status(400).json({ message: "All fields are required" });

		const user = await User.findOne({ email });
		if (!user || !(await user.comparePassword(password)))
			return res.status(401).json({ message: "Invalid email or password" });

		const token = generateToken(user._id);

		res.status(200).json({
			token,
			user: { _id: user._id, fullName: user.fullName, email: user.email, imageUrl: user.imageUrl, role: user.role },
		});
	} catch (error) {
		next(error);
	}
};

export const getMe = async (req, res) => {
	res.json({ user: { _id: req.user._id, fullName: req.user.fullName, email: req.user.email, imageUrl: req.user.imageUrl, role: req.user.role } });
};
