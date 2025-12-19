import mongoose, { Document, Schema } from 'mongoose';

export interface IUniversity extends Document {
    key: string;
    name: string;
    color: string;
}

const UniversitySchema: Schema = new Schema({
    key: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    color: { type: String, required: true, default: '#0a4b78' }
}, {
    timestamps: true
});

export default mongoose.model<IUniversity>('University', UniversitySchema);
