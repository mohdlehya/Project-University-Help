import { Request, Response } from 'express';
import College from '../models/College';

export const getColleges = async (req: Request, res: Response) => {
    try {
        const colleges = await College.find({ universityKey: req.params.uniKey });
        res.json(colleges);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createCollege = async (req: Request, res: Response) => {
    try {
        const college = new College(req.body);
        const savedCollege = await college.save();
        res.status(201).json(savedCollege);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
