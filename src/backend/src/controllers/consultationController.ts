import { Request, Response } from 'express';
import ConsultationRequest from '../models/ConsultationRequest';

// Create new consultation request
export const createRequest = async (req: Request, res: Response) => {
    try {
        const { studentName, gpa, graduationYear, desiredMajor, majorsForConsultation, message } = req.body;

        // Validation
        if (!studentName || !gpa || !graduationYear) {
            return res.status(400).json({ message: 'الرجاء إدخال جميع الحقول المطلوبة' });
        }

        if (gpa < 0 || gpa > 100) {
            return res.status(400).json({ message: 'المعدل يجب أن يكون بين 0 و 100' });
        }

        const newRequest = new ConsultationRequest({
            studentName,
            gpa,
            graduationYear,
            desiredMajor,
            majorsForConsultation: majorsForConsultation || [],
            message,
            status: 'pending'
        });

        await newRequest.save();

        res.status(201).json({
            message: 'تم إرسال طلبك بنجاح',
            requestId: newRequest.requestId,
            request: newRequest
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get request status by ID (Public - for students to track)
export const getRequestStatus = async (req: Request, res: Response) => {
    try {
        const { requestId } = req.params;

        const request = await ConsultationRequest.findOne({ requestId });

        if (!request) {
            return res.status(404).json({ message: 'الطلب غير موجود. تأكد من رقم المتابعة.' });
        }

        res.json({
            requestId: request.requestId,
            studentName: request.studentName,
            status: request.status,
            adminResponse: request.adminResponse || null,
            createdAt: request.createdAt
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get all requests (Admin only)
export const getAllRequests = async (req: Request, res: Response) => {
    try {
        const requests = await ConsultationRequest.find().sort({ createdAt: -1 });
        res.json(requests);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Update request status and add response (Admin only)
export const updateRequest = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status, adminResponse } = req.body;

        const request = await ConsultationRequest.findByIdAndUpdate(
            id,
            { status, adminResponse },
            { new: true }
        );

        if (!request) {
            return res.status(404).json({ message: 'الطلب غير موجود' });
        }

        res.json({
            message: 'تم تحديث الطلب بنجاح',
            request
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Delete request (Admin only)
export const deleteRequest = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const request = await ConsultationRequest.findByIdAndDelete(id);

        if (!request) {
            return res.status(404).json({ message: 'الطلب غير موجود' });
        }

        res.json({ message: 'تم حذف الطلب بنجاح' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
