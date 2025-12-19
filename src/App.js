import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PlanNewTrip from './pages/PlanNewTrip';
import MyTrips from './pages/MyTrips';
import BudgetPlanner from './pages/BudgetPlanner';
import Settings from './pages/Settings';
import GoaItinerary from './pages/GoaItinerary';
import ParisItinerary from './pages/ParisItinerary';
import BaliItinerary from './pages/BaliItinerary';
import MaldivesItinerary from './pages/MaldivesItinerary';
import Payment from './pages/Payment';
import Admin from './pages/Admin';
import { authAPI } from './services/authAPI';

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authAPI.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">

      {/* FULL-WIDTH NAVBAR */}
      <nav className="bg-white shadow w-full">
        <div className="w-full flex items-center justify-between px-8 py-4">
          <Link to="/home" className="text-2xl font-bold text-indigo-600">
            Travel Planner
          </Link>

          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-6">
              <Link className="text-sm" to="/home">Home</Link>
              <Link className="text-sm" to="/dashboard">Dashboard</Link>
              <Link className="text-sm" to="/my-trips">My Trips</Link>
              <Link className="text-sm" to="/plan">Plan Trip</Link>
              <Link className="text-sm" to="/budget">Budget</Link>
              <Link className="text-sm" to="/settings">Settings</Link>
              <Link className="text-sm" to="/admin">Admin</Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {user && (
                <>
                  <span className="text-sm text-gray-600">Hi, {user.name}</span>
                  <button 
                    onClick={handleLogout}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* FULL-WIDTH CONTENT (NO BOXING) */}
      <main className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plan" element={<PlanNewTrip />} />
          <Route path="/plan-trip" element={<PlanNewTrip />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/budget" element={<BudgetPlanner />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/goa-itinerary" element={<GoaItinerary />} />
          <Route path="/paris-itinerary" element={<ParisItinerary />} />
          <Route path="/bali-itinerary" element={<BaliItinerary />} />
          <Route path="/maldives-itinerary" element={<MaldivesItinerary />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

    </div>
  );
}
