import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import ItemCalendar from './pages/ItemCalendar';
import { AuthProvider, useAuth } from "./AuthContext";
import RequireAuth from "./RequireAuth";

function AppRoutes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="page">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <HomePage />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/items"
        element={
          <RequireAuth>
            <ItemCalendar />
          </RequireAuth>
        }
      />
      <Route path="/about" element={<About />} />
      <Route path="/signin" element={user ? <Navigate to="/dashboard" replace /> : <SignIn />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <SignUp />} />
    </Routes>
  );
}

function App() {

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="app-main">
          <AppRoutes />
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  )
}

export default App;
