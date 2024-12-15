import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';

export const verifyjwt = async (req, res, next) => {
    try {

        const token = req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer", "");

        // console.log(token)

        if (!token) {
            return res.status(401).json({ message: "user  not found" })
        }

        const decodedtoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedtoken?._id).select("-password -refreshtoken")
        // console.log(user)

        if (!user) {
            return res.status(401).json({ message: "access token not found" })
        }

        req.user = user;
        next();

    } catch (error) {

    }
}