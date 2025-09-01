import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization; // "Bearer <token>"



    if (!authHeader || !authHeader.startsWith("Bearer ")) {

        return res.status(401).json({ message: "No token, authorization denied" });

    }



    const token = authHeader.split(" ")[1]; // get actual token



    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // put user info into request

        next();

    } catch (err) {

        return res.status(401).json({ message: "Token is not valid" });

    }

};