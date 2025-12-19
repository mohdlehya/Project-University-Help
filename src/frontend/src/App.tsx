import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UniversityList from './components/UniversityList';
import CollegeList from './components/CollegeList';
import MajorList from './components/MajorList';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <header className="bg-gray-800 text-white p-4 shadow-lg">
          <h1 className="text-2xl font-bold text-center">🎓 تخصصات جامعات غزة</h1>
        </header>
        <Routes>
          <Route path="/" element={<UniversityList />} />
          <Route path="/universities/:uniKey" element={<CollegeList />} />
          <Route path="/universities/:uniKey/colleges/:collegeKey" element={<MajorList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
