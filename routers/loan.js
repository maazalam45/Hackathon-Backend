import express from 'express';

import auth from '../middlewares/auth.js';
import { generateStrongPassword } from '../middlewares/password.js';

import LoanApplication from '../models/loanApplication.js';
import User from '../models/user.js';

const router = express.Router();

// Submit loan application
router.post('/data', async (req, res) => {
    try {
        const { cnic, email, fullname, amount, category, subCategory } = req.body;
        console.log('Request body:', req.body);

        // Check if the user already exists
        let user = await User.findOne({ email, cnic });

        if (!user) {
            const userPayload = {
                fullname,
                email,
                cnic,
                password: generateStrongPassword(),
            };
            user = await User.create(userPayload);
        }

        // Create the loan application
        const loanApplication = await LoanApplication.create({
            userId: user._id,
            amount,
            category,
            subCategory,
        });

        res.status(201).json({ message: 'Application submitted successfully', loanApplication });
    } catch (error) {
        console.error('Error submitting application:', error);

        // Return a more informative error message
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate entry: User with this email or CNIC already exists.' });
        }

        res.status(500).json({ message: 'Error submitting application' });
    }
});

// Check application status
router.get('/status/:cnic', async (req, res) => {
    try {
        const application = await LoanApplication.findOne({ cnic: req.params.cnic });
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json(application);
    } catch (error) {
        console.error('Error checking status:', error.message);
        res.status(500).json({ message: `Error checking application status: ${error.message}` });
    }
});

// Admin: Fetch all applications
router.get('/admin/applications', auth, async (req, res) => {
    try {
        const applications = await LoanApplication.find().sort({ createdAt: -1 });
        res.json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error.message);
        res.status(500).json({ message: `Error fetching applications: ${error.message}` });
    }
});

// Admin: Update application status
router.put('/admin/applications/:id', auth, async (req, res) => {
    try {
        const { status, message, appointmentDate } = req.body;
        const application = await LoanApplication.findByIdAndUpdate(
            req.params.id,
            {
                status,
                adminResponse: message, // Correct field name
                appointmentDate: appointmentDate ? new Date(appointmentDate) : undefined
            },
            { new: true }
        );
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json(application);
    } catch (error) {
        console.error('Error updating application:', error.message);
        res.status(500).json({ message: `Error updating application: ${error.message}` });
    }
});

export default router;
