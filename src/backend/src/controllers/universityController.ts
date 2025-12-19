import { Request, Response } from 'express';
import University from '../models/University';

export const getUniversities = async (req: Request, res: Response) => {
    try {
        const universities = await University.find();
        res.json(universities);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createUniversity = async (req: Request, res: Response) => {
    try {
        const university = new University(req.body);
        const savedUniversity = await university.save();
        res.status(201).json(savedUniversity);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
