import express from 'express';
import { getUniversities, createUniversity } from '../controllers/universityController';
import { getColleges, createCollege } from '../controllers/collegeController';
import { getMajors, createMajor, getMajorDetails } from '../controllers/majorController';

const router = express.Router();

// Universities
router.get('/universities', getUniversities);
router.post('/universities', createUniversity);

// Colleges
router.get('/universities/:uniKey/colleges', getColleges);
router.post('/colleges', createCollege);

// Majors
router.get('/universities/:uniKey/colleges/:collegeKey/majors', getMajors);
router.post('/majors', createMajor);
router.get('/universities/:uniKey/colleges/:collegeKey/majors/:majorId', getMajorDetails);

export default router;
