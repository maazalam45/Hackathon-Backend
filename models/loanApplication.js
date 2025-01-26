import mongoose from 'mongoose';

const loanApplicationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        subCategory: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: 'pending'
        },
        adminResponse: {
            type: String,
            default: 'No response yet'
        },
        appointmentDate: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
);

const LoanApplication = mongoose.model('LoanApplication', loanApplicationSchema);

export default LoanApplication;
