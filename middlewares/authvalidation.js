import Joi from "joi";

// Register Validation Middleware
const registerValidation = (req, res, next) => {
    // Joi schema for validation
    const schema = Joi.object({
        fullname: Joi.string().min(3).max(50).required().messages({
            "string.base": "Full name must be a string",
            "string.min": "Full name should have at least 3 characters",
            "string.max": "Full name should have a maximum of 50 characters",
            "any.required": "Full name is required",
        }),

        email: Joi.string().email().required().messages({
            "string.base": "Email must be a string",
            "string.email": "Email must be a valid email",
            "any.required": "Email is required",
        }),

        password: Joi.string().min(6).max(20).required().messages({
            "string.base": "Password must be a string",
            "string.min": "Password should have at least 6 characters",
            "string.max": "Password should have a maximum of 20 characters",
            "any.required": "Password is required",
        }),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: "Bad Request",
            error: error.details[0].message, // Send specific error message
        });
    }

    next();
};

// Login Validation Middleware
const loginValidation = (req, res, next) => {
    // Joi schema for validation
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            "string.base": "Email must be a string",
            "string.email": "Email must be a valid email",
            "any.required": "Email is required",
        }),

        password: Joi.string().min(6).max(20).required().messages({
            "string.base": "Password must be a string",
            "string.min": "Password should have at least 6 characters",
            "string.max": "Password should have a maximum of 20 characters",
            "any.required": "Password is required",
        }),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: "Bad Request",
            error: error.details[0].message, // Send specific error message
        });
    }

    next();
};

export { registerValidation, loginValidation };
