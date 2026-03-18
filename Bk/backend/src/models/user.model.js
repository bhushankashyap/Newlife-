import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true },
		email: { type: String, required: true, unique: true, lowercase: true },
		password: { type: String, required: true },
		imageUrl: { type: String, default: "" },
		role: { type: String, enum: ["user", "admin"], default: "user" },
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const bcrypt = await import("bcryptjs");
	this.password = await bcrypt.default.hash(this.password, 12);
	next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
	const bcrypt = await import("bcryptjs");
	return bcrypt.default.compare(candidatePassword, this.password);
};

export const User = mongoose.model("User", userSchema);
