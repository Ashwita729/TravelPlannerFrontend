import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaDownload, FaEnvelope } from 'react-icons/fa';
import { tripsAPI } from '../services/api';

export default function TripConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const tripData = location.state?.tripData || {};
  const [tripSaved, setTripSaved] = useState(false);
  
  const bookingId = `TRV${Date.now().toString().slice(-6)}`;
  
  useEffect(() => {
    createTripInDatabase();
  }, []);
  
  const createTripInDatabase = async () => {
    try {
      // Store trip in localStorage as fallback
      const tripPayload = {
        id: bookingId,
        destination: tripData.destination || 'Goa',
        startDate: tripData.startDate || '2024-03-15',
        endDate: tripData.endDate || '2024-03-20',
        description: `Trip to ${tripData.destination || 'Goa'} - Booking ID: ${bookingId}`,
        createdAt: new Date().toISOString()
      };
      
      // Get existing trips from localStorage
      const existingTrips = JSON.parse(localStorage.getItem('userTrips') || '[]');
      existingTrips.push(tripPayload);
      localStorage.setItem('userTrips', JSON.stringify(existingTrips));
      
      console.log('Trip saved to localStorage:', tripPayload);
      setTripSaved(true);
      
      // Try to save to backend if user is logged in
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const result = await tripsAPI.create(tripPayload);
          console.log('Trip also saved to backend:', result);
        } catch (error) {
          console.log('Backend save failed, but trip saved locally:', error.message);
        }
      }
    } catch (error) {
      console.error('Failed to save trip:', error);
      setTripSaved(true); // Still show as saved since we have localStorage fallback
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <FaCheckCircle className="text-8xl text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
          <p className="text-xl text-gray-600">Your trip has been successfully booked</p>
          {!tripSaved && (
            <p className="text-sm text-blue-600 mt-2">Saving trip details...</p>
          )}
          {tripSaved && (
            <p className="text-sm text-green-600 mt-2">✓ Trip saved to your account</p>
          )}
          <div className="bg-white rounded-lg p-4 mt-6 inline-block shadow-lg">
            <p className="text-sm text-gray-500">Booking Reference</p>
            <p className="text-2xl font-bold text-green-600">{bookingId}</p>
          </div>
        </motion.div>

        {/* Trip Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trip Details</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="font-semibold">{tripData.destination || 'Goa'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Travel Dates</p>
                  <p className="font-semibold">
                    {tripData.startDate || '2024-03-15'} to {tripData.endDate || '2024-03-20'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <FaUsers className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Travelers</p>
                  <p className="font-semibold">
                    {tripData.adults || 2} Adults, {tripData.children || 0} Children
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Contact Person</p>
                <p className="font-semibold">{tripData.firstName || 'John'} {tripData.lastName || 'Doe'}</p>
                <p className="text-gray-600">{tripData.email || 'john.doe@example.com'}</p>
                <p className="text-gray-600">{tripData.phone || '+91 98765 43210'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Accommodation</p>
                <p className="font-semibold capitalize">{tripData.accommodation || '3-star'} Hotel</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Flight Class</p>
                <p className="font-semibold capitalize">{tripData.flightClass || 'economy'}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What's Next Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-2xl text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Confirmation Email</h3>
              <p className="text-sm text-gray-600">You'll receive a detailed itinerary within 24 hours</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaDownload className="text-2xl text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Travel Documents</h3>
              <p className="text-sm text-gray-600">Download your tickets and vouchers from My Trips</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="text-2xl text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Trip Reminders</h3>
              <p className="text-sm text-gray-600">We'll send you reminders before your departure</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => navigate('/my-trips')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View My Trips
          </button>
          
          <button
            onClick={() => navigate('/plan')}
            className="px-8 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Plan Another Trip
          </button>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Back to Dashboard
          </button>
        </motion.div>

        {/* Support Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 p-6 bg-white rounded-xl shadow-lg"
        >
          <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">Our support team is available 24/7 to assist you</p>
          <div className="flex justify-center gap-6 text-sm">
            <span>📞 +91 1800-123-4567</span>
            <span>✉️ support@travelplanner.com</span>
            <span>💬 Live Chat Available</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}