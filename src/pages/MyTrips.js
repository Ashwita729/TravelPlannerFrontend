import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { tripsAPI } from '../services/api';
import { FaCalendarAlt, FaMapMarkerAlt, FaTrash, FaCheckCircle } from 'react-icons/fa';

const destinations = [
  {
    name: "Goa",
    image:
      "https://images.unsplash.com/photo-1587502536263-9298f55a47b9?auto=format&fit=crop&w=800&q=80",
    description: "Relax on sunny beaches and enjoy vibrant nightlife.",
  },
  {
    name: "Bali",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description: "Peaceful islands with stunning beaches and culture.",
  },
  {
    name: "Paris",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    description: "Iconic landmarks, art, and romantic experiences.",
  },
  {
    name: "Maldives",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80",
    description: "Luxury resorts with crystal-clear waters.",
  },
];

export default function MyTrips() {
  const navigate = useNavigate();
  const location = useLocation();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    fetchTrips();
  }, []);

  useEffect(() => {
    // Check if coming from successful booking
    if (location.state?.bookingSuccess) {
      setShowSuccessMessage(true);
      // Hide message after 5 seconds
      setTimeout(() => setShowSuccessMessage(false), 5000);
      // Re-fetch trips to include the newly booked one
      fetchTrips();
    }
  }, [location.state?.bookingSuccess]);
  const fetchTrips = async () => {
    try {
      console.log('Fetching trips...');
      
      // First try to get from localStorage
      const localTrips = JSON.parse(localStorage.getItem('userTrips') || '[]');
      console.log('Local trips:', localTrips);
      
      // Try to get from backend if user is logged in
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const backendTrips = await tripsAPI.getAll();
          console.log('Backend trips:', backendTrips);
          // Combine local and backend trips, removing duplicates
          const allTrips = [...localTrips, ...backendTrips];
          const uniqueTrips = allTrips.filter((trip, index, self) => 
            index === self.findIndex(t => t.id === trip.id || t._id === trip._id)
          );
          setTrips(uniqueTrips);
        } catch (error) {
          console.log('Backend fetch failed, using local trips:', error.message);
          setTrips(localTrips);
        }
      } else {
        console.log('No token, using local trips only');
        setTrips(localTrips);
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        // Remove from localStorage
        const localTrips = JSON.parse(localStorage.getItem('userTrips') || '[]');
        const updatedLocalTrips = localTrips.filter(trip => trip.id !== id);
        localStorage.setItem('userTrips', JSON.stringify(updatedLocalTrips));
        
        // Try to remove from backend if it exists there
        const token = localStorage.getItem('token');
        if (token && id.length === 24) { // MongoDB ObjectId length
          try {
            await tripsAPI.delete(id);
          } catch (error) {
            console.log('Backend delete failed:', error.message);
          }
        }
        
        // Update UI
        setTrips(trips.filter(trip => (trip._id || trip.id) !== id));
      } catch (error) {
        console.error('Error deleting trip:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your trips...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">

      {/* SUCCESS MESSAGE */}
      {showSuccessMessage && (
        <div className="max-w-5xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-green-800">
              <FaCheckCircle className="text-green-600" />
              <span className="font-medium">Trip booked successfully!</span>
            </div>
          </motion.div>
        </div>
      )}
      {/* HEADER */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-3xl font-semibold text-slate-800">
          {trips.length === 0 ? "You haven't planned any trips yet" : "My Trips"}
        </h1>
        <p className="text-slate-600 mt-3 max-w-xl mx-auto">
          {trips.length === 0
            ? "Start by choosing a destination. We'll help you plan everything step by step."
            : `You have ${trips.length} trip${trips.length > 1 ? 's' : ''} planned`
          }
        </p>

        <button
          onClick={() => navigate('/plan')}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
        >
          {trips.length === 0 ? 'Plan Your First Trip' : 'Plan Another Trip'}
        </button>
      </div>

      {/* MY TRIPS LIST */}
      {trips.length > 0 && (
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            {trips.map((trip) => (
              <motion.div
                key={trip._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{trip.destination}</h3>
                  <button
                    onClick={() => handleDelete(trip._id || trip.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
                
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-600" />
                    <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                  </div>
                  {trip.description && (
                    <p className="text-sm mt-2">{trip.description}</p>
                  )}
                  {trip.id && (
                    <p className="text-xs text-blue-600">Booking ID: {trip.id}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* DESTINATIONS */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">
          Popular Destinations
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {destinations.map((place, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white border rounded-lg overflow-hidden cursor-pointer hover:shadow-md"
            >
              <img
                src={place.image}
                alt={place.name}
                className="h-40 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-medium text-slate-800">
                  {place.name}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {place.description}
                </p>

                <button className="mt-4 text-sm text-blue-600 font-medium hover:underline">
                  Explore →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-medium text-slate-800 mb-2">
            Plan Your Trip
          </h3>
          <p className="text-sm text-slate-600">
            Create itineraries, select dates, and organize travel details.
          </p>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-medium text-slate-800 mb-2">
            Manage Budget
          </h3>
          <p className="text-sm text-slate-600">
            Track expenses and stay within your travel budget.
          </p>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-medium text-slate-800 mb-2">
            Discover Places
          </h3>
          <p className="text-sm text-slate-600">
            Explore destinations curated for every travel style.
          </p>
        </div>
      </div>

    </div>
  );
}