import React from "react";
import { Routes, Route } from "react-router-dom";

// 🧩 Import CSS (đảm bảo các file này có tồn tại)
import "./App.css";
import "./components/Navbar.css";
import "./pages/home.css";

// 🧭 Import các trang
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ApplyJobs from "./pages/ApplyJobs";
import SavedJobs from "./pages/SavedJobs";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";

// 🔒 Import các component
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app-container">
      {/* Thanh điều hướng */}
      <Navbar />

      {/* Vùng nội dung chính */}
      <main className="main-content">
        <Routes>
          {/* Trang chính */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetail />} />

          {/* Xác thực */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Các trang cần đăng nhập */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply-jobs"
            element={
              <ProtectedRoute>
                <ApplyJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-jobs"
            element={
              <ProtectedRoute>
                <SavedJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/companies"
            element={
              <ProtectedRoute>
                <Companies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company/:id"
            element={
              <ProtectedRoute>
                <CompanyDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
