import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getUniversities = async () => {
    const response = await api.get('/universities');
    return response.data;
};

export const getColleges = async (uniKey: string) => {
    const response = await api.get(`/universities/${uniKey}/colleges`);
    return response.data;
};

export const getMajors = async (uniKey: string, collegeKey: string) => {
    const response = await api.get(`/universities/${uniKey}/colleges/${collegeKey}/majors`);
    return response.data;
};

export const getMajorDetails = async (uniKey: string, collegeKey: string, majorId: string) => {
    const response = await api.get(`/universities/${uniKey}/colleges/${collegeKey}/majors/${majorId}`);
    return response.data;
};

export default api;
