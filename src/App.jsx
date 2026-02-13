import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Stakeholders from './components/Stakeholders';
import Stats from './components/Stats';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact';
import FeaturesPage from './components/FeaturesPage';
import Register from './components/Register';
import StudentRegistration from './components/StudentRegistration';
import StudentAcademicDetails from './components/StudentAcademicDetails';
import StudentDocuments from './components/StudentDocuments';
import StudentReview from './components/StudentReview';
import RecruiterRegistration from './components/RecruiterRegistration';
import AdminRegistration from './components/AdminRegistration';
import RegistrationSuccess from './components/RegistrationSuccess';
import StudentProfile from './components/StudentProfile';
import StudentDashboard from './components/StudentDashboard';
import StudentJobDrives from './components/StudentJobDrives';
import StudentApplications from './components/StudentApplications';
import StudentNotifications from './components/StudentNotifications';
import StudentSettings from './components/StudentSettings';
import StudentInterviewSchedule from './components/StudentInterviewSchedule';
import StudentResources from './components/StudentResources';
import StudentCertifications from './components/StudentCertifications';
import StudentOfferDetails from './components/StudentOfferDetails';
import RecruiterRegistrationSuccess from './components/RecruiterRegistrationSuccess';
import AdminRegistrationSuccess from './components/AdminRegistrationSuccess';
import RecruiterDashboard from './components/RecruiterDashboard';
import AdminDashboard from './components/AdminDashboard';
import JobPostForm from './components/JobPostForm';
import RecruiterJobApplications from './components/RecruiterJobApplications';





// Layout component handles the common page structure (Navbar + Page Content + Footer)
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

// Landing page content
const LandingPage = () => (
  <>
    <Hero />
    <Features />
    <Stakeholders />
    <Stats />
    <CTA />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login is a standalone page without Navbar/Footer */}
        <Route path="/login" element={<Login />} />

        {/* All other pages use MainLayout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <LandingPage />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />
        <Route
          path="/features"
          element={
            <MainLayout>
              <FeaturesPage />
            </MainLayout>
          }
        />
        <Route
          path="/register"
          element={
            <MainLayout>
              <Register />
            </MainLayout>
          }
        />
        <Route
          path="/register/student"
          element={
            <MainLayout>
              <StudentRegistration />
            </MainLayout>
          }
        />
        <Route
          path="/register/student/academic"
          element={
            <MainLayout>
              <StudentAcademicDetails />
            </MainLayout>
          }
        />
        <Route
          path="/register/student/documents"
          element={
            <MainLayout>
              <StudentDocuments />
            </MainLayout>
          }
        />
        <Route
          path="/register/student/review"
          element={
            <MainLayout>
              <StudentReview />
            </MainLayout>
          }
        />
        <Route
          path="/register/recruiter"
          element={
            <MainLayout>
              <RecruiterRegistration />
            </MainLayout>
          }
        />
        <Route
          path="/register/admin"
          element={
            <MainLayout>
              <AdminRegistration />
            </MainLayout>
          }
        />

        <Route
          path="/register/student/success"
          element={<RegistrationSuccess />}
        />
        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />
        <Route
          path="/student/profile"
          element={<StudentProfile />}
        />
        <Route
          path="/student/job-drives"
          element={<StudentJobDrives />}
        />
        <Route
          path="/student/applications"
          element={<StudentApplications />}
        />
        <Route
          path="/student/notifications"
          element={<StudentNotifications />}
        />
        <Route
          path="/student/settings"
          element={<StudentSettings />}
        />
        <Route
          path="/student/interview-schedule"
          element={<StudentInterviewSchedule />}
        />
        <Route
          path="/student/resources"
          element={<StudentResources />}
        />
        <Route
          path="/student/certifications"
          element={<StudentCertifications />}
        />
        <Route
          path="/student/applications/offer/:id"
          element={<StudentOfferDetails />}
        />

        <Route
          path="/admin/registration-success"
          element={<AdminRegistrationSuccess />}
        />
        <Route
          path="/recruiter/registration-success"
          element={<RecruiterRegistrationSuccess />}
        />
        <Route
          path="/recruiter/dashboard"
          element={<RecruiterDashboard />}
        />
        <Route
          path="/recruiter/post-job"
          element={<JobPostForm />}
        />
        <Route
          path="/recruiter/jobs/:jobId/applications"
          element={<RecruiterJobApplications />}
        />
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
