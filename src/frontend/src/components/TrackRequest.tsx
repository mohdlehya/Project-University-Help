import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface TrackingResult {
    requestId: string;
    studentName: string;
    status: 'pending' | 'reviewed' | 'completed';
    adminResponse: string | null;
    createdAt: string;
}

const TrackRequest = () => {
    const [requestId, setRequestId] = useState('');
    const [result, setResult] = useState<TrackingResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setResult(null);
        setLoading(true);

        if (!requestId.trim()) {
            setError('الرجاء إدخال رقم المتابعة');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${API_URL}/consultations/${requestId.trim()}`);
            setResult(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'حدث خطأ في البحث عن الطلب');
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return (
                    <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full font-semibold">
                        ⏳ قيد المراجعة
                    </span>
                );
            case 'reviewed':
                return (
                    <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full font-semibold">
                        👁️ تمت المراجعة
                    </span>
                );
            case 'completed':
                return (
                    <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full font-semibold">
                        ✅ مكتمل
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        📋 متابعة طلب الاستشارة
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        أدخل رقم المتابعة الخاص بك لمعرفة حالة طلبك
                    </p>
                </div>

                {/* Search Form */}
                <form onSubmit={handleTrack} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={requestId}
                            onChange={(e) => setRequestId(e.target.value.toUpperCase())}
                            placeholder="مثال: REQ-ABC123"
                            className="flex-1 p-4 border border-gray-300 dark:border-gray-600 rounded-xl text-lg font-mono focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold text-lg rounded-xl transition-all"
                        >
                            {loading ? '⏳' : '🔍 بحث'}
                        </button>
                    </div>
                    
                    {error && (
                        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
                            {error}
                        </div>
                    )}
                </form>

                {/* Result */}
                {result && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
                        {/* Header with Status */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">رقم الطلب</p>
                                <p className="text-xl font-mono font-bold text-gray-900 dark:text-white">{result.requestId}</p>
                            </div>
                            {getStatusBadge(result.status)}
                        </div>

                        {/* Details */}
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">اسم الطالب</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">{result.studentName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">تاريخ الإرسال</p>
                                <p className="text-lg text-gray-900 dark:text-white">
                                    {new Date(result.createdAt).toLocaleDateString('ar-EG', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Admin Response */}
                        {result.adminResponse ? (
                            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-xl">
                                <p className="text-sm text-green-700 dark:text-green-400 font-semibold mb-2">📩 رد الإدارة:</p>
                                <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{result.adminResponse}</p>
                            </div>
                        ) : (
                            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-xl">
                                <p className="text-yellow-700 dark:text-yellow-400">
                                    ⏳ طلبك قيد المراجعة. سيتم الرد عليه قريباً.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Back Link */}
                <div className="text-center mt-8">
                    <Link
                        to="/"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        ← العودة للصفحة الرئيسية
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TrackRequest;
