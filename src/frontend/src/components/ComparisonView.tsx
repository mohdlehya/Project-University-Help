import { useState } from 'react';
import { useComparison } from '../contexts/ComparisonContext';

const ComparisonView = () => {
    const { selectedMajors, removeFromComparison, clearComparison } = useComparison();
    const [isOpen, setIsOpen] = useState(false);

    if (selectedMajors.length === 0) return null;

    return (
        <>
            {/* Floating Compare Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 left-6 z-50 bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 font-bold transition-all transform hover:scale-110"
            >
                <span className="text-2xl">⚖️</span>
                <span>مقارنة ({selectedMajors.length})</span>
            </button>

            {/* Comparison Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                ⚖️ مقارنة التخصصات
                            </h2>
                            <div className="flex gap-3">
                                <button
                                    onClick={clearComparison}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                                >
                                    مسح الكل
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
                                >
                                    إغلاق
                                </button>
                            </div>
                        </div>

                        {/* Comparison Table */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {selectedMajors.map((major) => (
                                    <div key={major._id} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 relative">
                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeFromComparison(major._id)}
                                            className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold"
                                        >
                                            ×
                                        </button>

                                        {/* Major Name */}
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pr-8">
                                            {major.name}
                                        </h3>

                                        {/* Details */}
                                        <div className="space-y-3">
                                            <div>
                                                <span className="text-gray-600 dark:text-gray-400 text-sm">الجامعة:</span>
                                                <p className="font-semibold text-gray-900 dark:text-white">{major.university?.name || 'غير محدد'}</p>
                                            </div>

                                            <div>
                                                <span className="text-gray-600 dark:text-gray-400 text-sm">الكلية:</span>
                                                <p className="font-semibold text-gray-900 dark:text-white">{major.college?.name || 'غير محدد'}</p>
                                            </div>

                                            <div>
                                                <span className="text-gray-600 dark:text-gray-400 text-sm">المجال الأكاديمي:</span>
                                                <p className="font-semibold text-gray-900 dark:text-white">
                                                    {major.academic_field === 'engineering' && '🔧 هندسة'}
                                                    {major.academic_field === 'medical' && '⚕️ علوم طبية'}
                                                    {major.academic_field === 'it' && '💻 تكنولوجيا معلومات'}
                                                    {major.academic_field === 'business' && '💼 إدارة وأعمال'}
                                                    {major.academic_field === 'science' && '🔬 العلوم'}
                                                    {major.academic_field === 'arts' && '🎨 فنون'}
                                                </p>
                                            </div>

                                            {major.study_info && (
                                                <>
                                                    <div>
                                                        <span className="text-gray-600 dark:text-gray-400 text-sm">مدة الدراسة:</span>
                                                        <p className="font-semibold text-gray-900 dark:text-white">
                                                            {major.study_info.duration_years} سنوات
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <span className="text-gray-600 dark:text-gray-400 text-sm">الساعات المعتمدة:</span>
                                                        <p className="font-semibold text-gray-900 dark:text-white">
                                                            {major.study_info.credit_hours} ساعة
                                                        </p>
                                                    </div>

                                                    {major.study_info.credit_hour_price && (
                                                        <div>
                                                            <span className="text-gray-600 dark:text-gray-400 text-sm">سعر الساعة:</span>
                                                            <p className="font-semibold text-green-600 dark:text-green-400">
                                                                ${major.study_info.credit_hour_price}
                                                            </p>
                                                        </div>
                                                    )}
                                                </>
                                            )}

                                            {major.admission_requirements?.min_gpa && (
                                                <div>
                                                    <span className="text-gray-600 dark:text-gray-400 text-sm">الحد الأدنى للمعدل:</span>
                                                    <p className="font-semibold text-blue-600 dark:text-blue-400">
                                                        {major.admission_requirements.min_gpa}%
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Empty Slots */}
                            {selectedMajors.length < 3 && (
                                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-xl text-center">
                                    <p className="text-blue-700 dark:text-blue-300">
                                        يمكنك إضافة {3 - selectedMajors.length} تخصص/تخصصات أخرى للمقارنة
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ComparisonView;
