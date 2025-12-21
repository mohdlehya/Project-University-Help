import { Request, Response } from 'express';
import University from '../models/University';
import College from '../models/College';
import Major from '../models/Major';

export const globalSearch = async (req: Request, res: Response) => {
    try {
        const query = req.query.query as string;
        const type = req.query.type as string;

        if (!query) {
            return res.json({ universities: [], colleges: [], majors: [] });
        }

        const searchRegex = new RegExp(query, 'i');
        let universities: any[] = [];
        let colleges: any[] = [];
        let majors: any[] = [];

        if (!type || type === 'all' || type === 'university') {
            universities = await University.find({ name: searchRegex });
        }

        if (!type || type === 'all' || type === 'college') {
            colleges = await College.find({ name: searchRegex }).populate('universityKey', 'name type');
        }

        if (!type || type === 'all' || type === 'major') {
            const majors = await Major.find({ name: searchRegex });
            // Populate with university and college info
            for (const major of majors) {
                const university = await University.findOne({ key: major.universityKey });
                const college = await College.findOne({
                    key: major.collegeKey,
                    universityKey: major.universityKey
                });
                results.majors.push({
                    ...major.toObject(),
                    university: university ? { name: university.name, color: university.color, key: university.key } : null,
                    college: college ? { name: college.name, key: college.key } : null
                });
            }
        }

        res.json(results);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
