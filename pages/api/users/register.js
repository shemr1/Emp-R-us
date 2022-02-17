import { MongoClient } from "mongodb";
import User from "../../../models/userModel";
import { hash } from "bcryptjs";

async function handler(req, res) {
	//Only POST mothod is accepted
	if (req.method === "POST") {
		//Getting email and password from body
		const { email, password, name, image } = req.body;
		//Validate
		if (!email || !email.includes("@") || !password) {
			res.status(422).json({ message: "Invalid Data" });
			return;
		}
		//Connect with database
		const client = new MongoClient(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		await client.connect();

		const db = client.db("ScheduleMe");
		//Check existing
		const checkExisting = await db
			.collection("users")
			.findOne({ email: email });
		//Send error response if duplicate user is found
		if (checkExisting) {
			res.status(422).json({ message: "User already exists" });
			client.close();
			return;
		}
		//Hash password
		const newUser = new User({
			name: name,
			email: email,
			password: await hash(password, 12),
			image: image,
		});
		const status = await db.collection("users").insertOne(newUser);
		//Send success response
		res.status(201).json({ message: "User created", ...status });
		//Close DB connection
		client.close();
	} else {
		//Response for other than POST method
		res.status(500).json({ message: "Route not valid" });
	}
}

export default handler;
