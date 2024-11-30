// import jwt from "jsonwebtoken";
// import User from "../models/userModel";

// const auth = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;

// 		if (!token) {
// 			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
// 		}

//         jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//             console.log(err);

//             if (err) return res.sendStatus(403);

//             req.user = user;
//             console.log(req.user.role);
        
//             next();
//         })

//     } catch (error) {
//         return res.status(500).json({msg: err.message});
//     }
// }