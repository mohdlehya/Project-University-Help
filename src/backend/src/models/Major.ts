import mongoose, { Document, Schema } from 'mongoose';

interface IStudyInfo {
    duration_years?: number;
    degree_type?: string;
    language?: string;
    credit_hours?: number;
    credit_hour_price?: number;
}

interface IAdmissionRequirements {
    min_gpa?: number;
    admission_test?: boolean;
    required_subjects?: string[];
}

interface ICoursePlan {
    level: string;
    courses: string[];
}

export interface IMajor extends Document {
    name: string;
    universityKey: string;
    collegeKey: string;
    description?: string;
    plan_url?: string;
    study_info?: IStudyInfo;
    admission_requirements?: IAdmissionRequirements;
    plan?: ICoursePlan[];
}

const MajorSchema: Schema = new Schema({
    name: { type: String, required: true },
    universityKey: { type: String, required: true, ref: 'University' },
    collegeKey: { type: String, required: true, ref: 'College' },
    description: { type: String },
    plan_url: { type: String },
    study_info: {
        duration_years: Number,
        degree_type: String,
        language: String,
        credit_hours: Number,
        credit_hour_price: Number
    },
    admission_requirements: {
        min_gpa: Number,
        admission_test: Boolean,
        required_subjects: [String]
    },
    plan: [{
        level: String,
        courses: [String]
    }]
}, {
    timestamps: true
});

export default mongoose.model<IMajor>('Major', MajorSchema);
