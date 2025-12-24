import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUniversities } from '../services/api';
import type { University } from '../types';

// University logo mapping (can be expanded with actual logos)
const universityLogos: Record<string, string> = {
    'islamic': '🕌',
    'azhar': '📚',
    'alaqsa': '🏛️',
    'palestine': '🌍',
    'default': '🎓'
};

const UniversityList = () => {
    const [universities, setUniversities] = useState<University[]>([]);
    const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'public' | 'private'>('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const data = await getUniversities();
                setUniversities(data);
                setFilteredUniversities(data);
            } catch (err) {
                setError('Failed to load universities');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUniversities();
    }, []);

    useEffect(() => {
        let filtered = universities.filter((uni) =>
            uni.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        if (filterType !== 'all') {
            filtered = filtered.filter((uni) => uni.type === filterType);
        }
        
        setFilteredUniversities(filtered);
    }, [searchTerm, filterType, universities]);

    const getLogo = (key: string) => {
        return universityLogos[key] || universityLogos['default'];
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">🎓</div>
                    <p className="text-xl text-gray-600 dark:text-gray-400">جارٍ تحميل الجامعات...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center p-8 bg-red-50 dark:bg-red-900/30 rounded-xl">
                    <div className="text-6xl mb-4">❌</div>
                    <p className="text-xl text-red-600 dark:text-red-400">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        🎓 جامعات غزة
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        اختر جامعتك واستكشف التخصصات المتاحة
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-10 max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                        {/* Search Bar */}
                        <div className="relative mb-4">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="🔍 ابحث عن جامعة..."
                                className="w-full p-4 pl-12 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
                            />
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex flex-wrap gap-3 justify-center">
                            <button
                                onClick={() => setFilterType('all')}
                                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                                    filterType === 'all'
                                        ? 'bg-indigo-600 text-white shadow-lg'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                الكل ({universities.length})
                            </button>
                            <button
                                onClick={() => setFilterType('public')}
                                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                                    filterType === 'public'
                                        ? 'bg-green-600 text-white shadow-lg'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                🏛️ حكومية ({universities.filter(u => u.type === 'public').length})
                            </button>
                            <button
                                onClick={() => setFilterType('private')}
                                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                                    filterType === 'private'
                                        ? 'bg-purple-600 text-white shadow-lg'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                🏢 خاصة ({universities.filter(u => u.type === 'private').length})
                            </button>
                        </div>
                    </div>
                </div>

                {/* Universities Grid */}
                {filteredUniversities.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <p className="text-xl text-gray-500 dark:text-gray-400">لا توجد نتائج للبحث</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredUniversities.map((uni) => (
                            <div
                                key={uni._id}
                                onClick={() => navigate(`/universities/${uni.key}`)}
                                className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-2"
                            >
                                {/* Gradient Top Border */}
                                <div 
                                    className="h-2 w-full"
                                    style={{ background: `linear-gradient(90deg, ${uni.color}, ${uni.color}88)` }}
                                ></div>

                                {/* Card Content */}
                                <div className="p-8">
                                    {/* Logo/Icon */}
                                    <div 
                                        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform overflow-hidden"
                                        style={{ backgroundColor: `${uni.color}20` }}
                                    >
                                        {uni.imageUrl ? (
                                            <img 
                                                src={uni.imageUrl} 
                                                alt={uni.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    // Fallback to emoji if image fails to load
                                                    e.currentTarget.style.display = 'none';
                                                    e.currentTarget.parentElement!.innerHTML = `<span class="text-5xl">${getLogo(uni.key)}</span>`;
                                                }}
                                            />
                                        ) : (
                                            <span className="text-5xl">{getLogo(uni.key)}</span>
                                        )}
                                    </div>

                                    {/* University Name */}
                                    <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-3">
                                        {uni.name}
                                    </h2>

                                    {/* Type Badge */}
                                    <div className="flex justify-center mb-4">
                                        <span 
                                            className={`px-4 py-1 rounded-full text-sm font-semibold ${
                                                uni.type === 'public' 
                                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                                                    : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                                            }`}
                                        >
                                            {uni.type === 'public' ? '🏛️ جامعة حكومية' : '🏢 جامعة خاصة'}
                                        </span>
                                    </div>

                                    {/* Action Hint */}
                                    <div className="text-center">
                                        <span className="text-indigo-600 dark:text-indigo-400 font-semibold group-hover:underline">
                                            استكشف الكليات →
                                        </span>
                                    </div>
                                </div>

                                {/* Hover Overlay Effect */}
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                                    style={{ backgroundColor: uni.color }}
                                ></div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Stats Section */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-6 px-8 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                        <div>
                            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{universities.length}</p>
                            <p className="text-gray-600 dark:text-gray-400">جامعة</p>
                        </div>
                        <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
                        <div>
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                                {universities.filter(u => u.type === 'public').length}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">حكومية</p>
                        </div>
                        <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
                        <div>
                            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                                {universities.filter(u => u.type === 'private').length}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">خاصة</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniversityList;
