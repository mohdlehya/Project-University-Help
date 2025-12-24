import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
            {/* Hero Section */}
            <div 
                className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center overflow-hidden"
                style={{
                    backgroundImage: `url('/hero-campus.png')`,
                }}
            >
                {/* Gradient-enhanced Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-gray-900 dark:to-gray-950"></div>
                
                {/* Hero Content */}
                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-8 animate-slide-up">
                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                        اهلا بك عزيزي الطالب في موقعنا
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-400">
                            حيث الدليل إلى التخصص الأمثل
                        </span>
                    </h1>
                    
                    {/* Sub-heading */}
                    <p className="text-2xl md:text-3xl text-gray-200 font-light drop-shadow-md">
                        اختر طموحك من مكان واحد
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
                        {/* Primary Button - Browse */}
                        <Link
                            to="/universities"
                            className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 flex items-center justify-center gap-3"
                        >
                            <span>🎓</span>
                            <span>تصفح الجامعات والتخصصات</span>
                        </Link>
                        
                        {/* Secondary Button - Consultation */}
                        <Link
                            to="/consultation-request"
                            className="w-full sm:w-auto px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3"
                        >
                            <span>💡</span>
                            <span>طلب استشارة تخصص</span>
                        </Link>
                    </div>
                    
                    {/* Footer Note */}
                    <p className="mt-12 text-gray-400 text-sm font-medium animate-fade-in opacity-80">
                        يتم مراجعة الطلب ثم الرد عليه لاحقا
                    </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
            </div>
            
            {/* Features Section (Optional but good for landing) */}
            <div className="py-24 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">لماذا تختار منصتنا؟</h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature Card 1 */}
                    <div className="group p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                            🎯
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">دليل شامل</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                            قاعدة بيانات متكاملة تحتوي على جميع التفاصيل اللازمة عن الجامعات والتخصصات المتاحة في غزة.
                        </p>
                    </div>
                    
                    {/* Feature Card 2 */}
                    <div className="group p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                            🔍
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">بحث ذكي</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                            محرك بحث متطور يساعدك على الوصول إلى التخصص الذي يناسب طموحك ومعدلك بسرعة فائقة.
                        </p>
                    </div>
                    
                    {/* Feature Card 3 */}
                    <div className="group p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                            💬
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">استشارة مجانية</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                            نقدم لك خدمة استشارية مجانية لمساعدتك في اتخاذ القرار الأكاديمي الصائب لمستقبلك.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
