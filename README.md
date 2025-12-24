# 🎓 Gaza Universities Majors System

A comprehensive web application for exploring university majors in Gaza, featuring an admin panel for data management and advanced search capabilities.

## ✨ Features

### User Features
- **📚 Browse Universities & Majors**: Explore universities, colleges, and academic programs
- **🎨 Visual Experience**: Professional university cards with images and logos
- **🔍 Advanced Search**: 
  - Search by university, college, or major name
  - Filter by university type (Public/Private)
  - Filter by academic field (Engineering, Medical, IT, Business, Arts, Science)
- **💡 Consultation System**: 
  - Submit consultation requests with GPA and preferences
  - **🆕 Track Requests**: Track request status and view admin responses using a unique Request ID
- **⭐ Bookmarks System**: Save favorite majors for quick access (stored in browser)
- **🌓 Dark Mode**: Toggle between light and dark themes
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices

### Admin Features
- **🔐 Secure Admin Panel**: Protected login system
- **➕ Full Content Management**: 
  - Add/Edit/Delete Universities (with images & types)
  - Manage Colleges and Majors
  - **✏️ Advanced Editing**: Edit all fields including academic fields and study years
- **📊 Consultation Management**: 
  - View pending requests
  - Respond to students
  - **✏️ Edit Responses**: Modify responses even after sending
- **🏛️ University Classification**: Mark universities as Public or Private
- **🎯 Academic Field Tagging**: Categorize majors by academic field

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS v4** for styling
- **Context API** for state management

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **RESTful API** architecture

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "Project University Help"
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd src/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Environment Setup**

Create `.env` file in `src/backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Create `.env` file in `src/frontend/`:
```env
VITE_API_URL=http://localhost:5000/api
```

4. **Run the application**

**Option 1: Development Mode**
```bash
# Terminal 1 - Backend
cd src/backend
npm run dev

# Terminal 2 - Frontend
cd src/frontend
npm run dev
```

**Option 2: Using Docker** (Recommended for production)
```bash
docker-compose up -d --build
```

Access the application:
- **Frontend**: http://localhost:80 (or port 80 if via Docker), http://localhost:5173 (dev)
- **Backend API**: http://localhost:5000/api
- **Admin Panel**: http://localhost:5173/admin-panel or /admin-panel

## 📖 API Endpoints

### Universities
- `GET /api/universities` - Get all universities
- `GET /api/universities/:key` - Get single university
- `POST /api/universities` - Create university (Admin)
- `PUT /api/universities/:id` - Update university (Admin)

### Consultation
- `POST /api/consultations` - Submit request
- `GET /api/consultations/:requestId` - Track request (Public)
- `GET /api/admin/consultations` - Get all requests (Admin)
- `PUT /api/admin/consultations/:id` - Respond/Update (Admin)

## 🔜 Roadmap

- [x] User authentication system (Admin only)
- [x] Student Consultation Tracking (Request ID)
- [x] University Images & Branding
- [ ] University comparisons feature
- [ ] Student reviews and ratings
- [ ] Mobile app (React Native)

---

**Made with 🎓 for students in Gaza**
