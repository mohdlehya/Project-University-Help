import mongoose, { Document, Schema } from 'mongoose';

export interface ICollege extends Document {
    key: string;
    name: string;
    universityKey: string;
}

const CollegeSchema: Schema = new Schema({
    key: { type: String, required: true },
    name: { type: String, required: true },
    universityKey: { type: String, required: true, ref: 'University' }
}, {
    timestamps: true
});

// Compound index to ensure college keys are unique per university
CollegeSchema.index({ key: 1, universityKey: 1 }, { unique: true });

export default mongoose.model<ICollege>('College', CollegeSchema);
