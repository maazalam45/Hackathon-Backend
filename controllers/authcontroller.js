import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";


const signup = async (req, res) => {
    try {
        const { email, password, fullname } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already in use, please try a different one."
            });
        }

        // Hash password before storing it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword, // Store the hashed password
        });

        // Save the new user to the database
        await newUser.save();

        // Send successful response
        res.status(201).json({
            message: "User registered successfully!",
            success: true,
            user: { fullname: newUser.fullname, email: newUser.email } // Send back user info except password
        });
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({
            message: "Server error, please try again later.",
            success: false
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found. Please register first.",
            });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password. Please try again.",
            });
        }
        const token = jwt.sign(
            { userId: existingUser._id, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Login successful!",
            success: true,
            token,
            fullname: existingUser.fullname,
            email: existingUser.email,
        });

    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({
            message: "Server error, please try again later.",
            success: false,
        });
    }
};

export { signup, login };
