import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface FormData {
    studentName: string;
    gpa: string;
    graduationYear: string;
    desiredMajor: string;
    majorsForConsultation: string[];
    message: string;
}

const ConsultationRequest = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        studentName: '',
        gpa: '',
        graduationYear: new Date().getFullYear().toString(),
        desiredMajor: '',
        majorsForConsultation: [],
        message: ''
    });
    const [currentMajor, setCurrentMajor] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [requestIdResult, setRequestIdResult] = useState('');

    const copyToClipboard = () => {
        navigator.clipboard.writeText(requestIdResult);
    };

    const handleAddMajor = () => {
        if (currentMajor.trim() && !formData.majorsForConsultation.includes(currentMajor.trim())) {
            setFormData({
                ...formData,
                majorsForConsultation: [...formData.majorsForConsultation, currentMajor.trim()]
            });
            setCurrentMajor('');
        }
    };

    const handleRemoveMajor = (index: number) => {
        setFormData({
            ...formData,
            majorsForConsultation: formData.majorsForConsultation.filter((_, i) => i !== index)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validation
        if (!formData.studentName.trim()) {
            setError('الرجاء إدخال الاسم الكامل');
            setLoading(false);
            return;
        }

        const gpa = parseFloat(formData.gpa);
        if (isNaN(gpa) || gpa < 0 || gpa > 100) {
            setError('الرجاء إدخال معدل صحيح (0-100)');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/consultations`, {
                ...formData,
                gpa: parseFloat(formData.gpa),
                graduationYear: parseInt(formData.graduationYear)
            });

            setRequestIdResult(response.data.requestId);
            setShowSuccess(true);
        } catch (err: any) {
            setError(err.response?.data?.message || 'حدث خطأ في إرسال الطلب');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        طلب استشارة لاختيار التخصص
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        املأ البيانات أدناه وسنساعدك في اختيار التخصص المناسب
                    </p>
                    
                    {/* Track Request Button */}
                    <a
                        href="/track-request"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg"
                    >
                        📋 متابعة طلب سابق
                    </a>
                </div>


                {/* Success Message */}
                {showSuccess && (
                    <div className="mb-6 p-6 bg-green-50 dark:bg-green-900/30 border-2 border-green-500 rounded-xl space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-4xl">✅</span>
                            <div>
                                <p className="text-green-800 dark:text-green-300 font-bold text-xl">
                                    تم إرسال طلبك بنجاح!
                                </p>
                                <p className="text-green-700 dark:text-green-400 text-sm">
                                    سيتم مراجعته والرد عليك في أقرب وقت
                                </p>
                            </div>
                        </div>
                        
                        {/* Request ID Display */}
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-green-300 dark:border-green-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">رقم المتابعة الخاص بك:</p>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-mono font-bold text-green-700 dark:text-green-300">
                                    {requestIdResult}
                                </span>
                                <button
                                    type="button"
                                    onClick={copyToClipboard}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition"
                                >
                                    📋 نسخ
                                </button>
                            </div>
                            <p className="text-xs text-red-600 dark:text-red-400 mt-2 font-semibold">
                                ⚠️ احتفظ بهذا الرقم لمتابعة الرد لاحقاً
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            <a
                                href="/track-request"
                                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-center rounded-lg transition"
                            >
                                📋 متابعة الطلب
                            </a>
                            <a
                                href="/"
                                className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold text-center rounded-lg transition"
                            >
                                🏠 العودة للرئيسية
                            </a>
                        </div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 space-y-6">
                    {/* Full Name */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
                            الاسم الكامل <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.studentName}
                            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            placeholder="الاسم الكامل"
                            required
                        />
                    </div>

                    {/* GPA */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
                            المعدل الدراسي <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            max="100"
                            value={formData.gpa}
                            onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            placeholder="العدل"
                            required
                        />
                    </div>

                    {/* Graduation Year */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
                            سنة التخرج <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            min="2020"
                            max="2030"
                            value={formData.graduationYear}
                            onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            required
                        />
                    </div>

                    {/* Desired Major (Optional) */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
                            التخصص الذي ترغب الالتحاق به (اختياري)
                        </label>
                        <input
                            type="text"
                            value={formData.desiredMajor}
                            onChange={(e) => setFormData({ ...formData, desiredMajor: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            placeholder="التخصص"
                        />
                    </div>

                    {/* Majors for Consultation */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
                            التخصصات التي تحتاج استشارة فيها
                        </label>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={currentMajor}
                                onChange={(e) => setCurrentMajor(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMajor())}
                                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                placeholder="التخصصات التي تحتاج استشارة فيها"
                            />
                            <button
                                type="button"
                                onClick={handleAddMajor}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                            >
                                إضافة
                            </button>
                        </div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {formData.majorsForConsultation.map((major, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full"
                                >
                                    {major}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveMajor(index)}
                                        className="text-blue-600 dark:text-blue-400 hover:text-red-600 dark:hover:text-red-400 font-bold"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
                            رسالة إضافية
                        </label>
                        <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={4}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            placeholder="أية ملاحظات أو استفسارات إضافية..."
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
                    >
                        {loading ? '⏳ جاري الإرسال...' : '📤 إرسال الطلب'}
                    </button>

                    {/* Back Button */}
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="w-full py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition"
                    >
                        العودة للرئيسية
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ConsultationRequest;
