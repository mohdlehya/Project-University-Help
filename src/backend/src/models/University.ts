import mongoose, { Document, Schema } from 'mongoose';

export interface IUniversity extends Document {
    key: string;
    name: string;
    color: string;
    type?: 'public' | 'private';
    imageUrl?: string;
}

const UniversitySchema: Schema = new Schema({
    key: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    color: { type: String, required: true, default: '#0a4b78' },
    type: { type: String, enum: ['public', 'private'], default: 'public' },
    imageUrl: { type: String, trim: true }
}, {
    timestamps: true
});

export default mongoose.model<IUniversity>('University', UniversitySchema);
