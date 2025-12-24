import mongoose, { Document, Schema } from 'mongoose';

// Generate unique 8-character request ID
const generateRequestId = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'REQ-';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

export interface IConsultationRequest extends Document {
    requestId: string;
    studentName: string;
    gpa: number;
    graduationYear: number;
    desiredMajor?: string;
    majorsForConsultation: string[];
    message?: string;
    status: 'pending' | 'reviewed' | 'completed';
    adminResponse?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ConsultationRequestSchema: Schema = new Schema({
    requestId: {
        type: String,
        required: true,
        unique: true,
        default: generateRequestId
    },
    studentName: {
        type: String,
        required: true,
        trim: true
    },
    gpa: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    graduationYear: {
        type: Number,
        required: true
    },
    desiredMajor: {
        type: String,
        trim: true
    },
    majorsForConsultation: {
        type: [String],
        default: []
    },
    message: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'completed'],
        default: 'pending'
    },
    adminResponse: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

export default mongoose.model<IConsultationRequest>('ConsultationRequest', ConsultationRequestSchema);
