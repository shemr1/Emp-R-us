import connectDB from "../../../lib/connectDB";
import Emp from "../../../models/employeeModel";
import { getSession, useSession } from "next-auth/react";

export default async function handler(req, res, session) {
	const { method, headers } = req;

	connectDB();

	switch (method) {
		case "GET":
			try {
				const emp = await Emp.find({
					userId: headers.user,
				}); /* find all the data in our database */
				res.status(200).json({ success: true, data: emp });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case "POST":
			try {
				const emp = await Emp.create(
					req.body,
				); /* create a new model in the database */
				res.status(201).json({ success: true, data: emp });
			} catch (error) {
				res.status(400).json({ success: false, msg: error.message });
			}
			break;
		case "DELETE":
			try {
				await Emp.deleteOne({
					_id: req.body,
				});
				res.status(201).json({ success: true });
			} catch (e) {
				res.status(400).json({ success: false, msg: e.message });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
