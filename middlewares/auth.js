import jwt from "jsonwebtoken";

const ensureAuth = (req, res, next) => {
    try {
        const token = req.headers["authorization"];

        if (!token) {
            return res.status(401).json({
                message: "Access denied. No token provided.",
            });
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (err) {
        console.error("Authorization error:", err);
        return res.status(403).json({
            message: "Invalid or expired token.",
        });
    }
};

export default ensureAuth;
