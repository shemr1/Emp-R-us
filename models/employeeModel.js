import mongoose from "mongoose";

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const EmployeeSchema = mongoose.Schema({
	name: { type: String, required: true },
	title: { type: String, required: true },
	age: { type: Number },
	department: { type: String, required: true },
	Contracted: { type: Boolean, required: true },
	image_url: {
		type: String,
	},
	user: { type: String },
});

module.exports =
	mongoose.models?.Employee || mongoose.model("Employee", EmployeeSchema);
