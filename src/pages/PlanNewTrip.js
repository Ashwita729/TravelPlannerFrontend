import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaEnvelope, FaPhone, FaUser, FaPassport, FaHotel, FaPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { tripsAPI } from '../services/api';

const destinations = [
  {
    id: 1,
    name: "Goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    tag: "Beaches • Nightlife",
  },
  {
    id: 2,
    name: "Bali",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    tag: "Relax • Nature",
  },
  {
    id: 3,
    name: "Paris",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    tag: "Culture • Romance",
  },
  {
    id: 4,
    name: "Maldives",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80",
    tag: "Luxury • Resorts",
  },
];

export default function PlanNewTrip() {
  const navigate = useNavigate();
  const [tripDetails, setTripDetails] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    adults: 1,
    children: 0,
    // Contact Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // Travel Preferences
    accommodation: "3-star",
    flightClass: "economy",
    specialRequests: "",
  });

  const handleChange = (e) => {
    setTripDetails({ ...tripDetails, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const tripData = {
        ...tripDetails,
        createdAt: new Date().toISOString(),
        id: Date.now(),
      };
      
      // Navigate to payment page with trip data
      navigate('/payment', { state: { tripData } });
    } catch (error) {
      console.error('Failed to proceed to payment:', error);
      alert('Failed to proceed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900 px-6 py-12">

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Plan Your Next Journey ✈️
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Choose a destination, set your dates, and let us handle the rest.
        </p>
      </motion.div>

      {/* FORM */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* Trip Details Section */}
        <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FaMapMarkerAlt className="mr-3 text-blue-600" />
            Trip Details
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Destination */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-700 font-medium mb-2 block">
                Destination
              </label>
              <select
                name="destination"
                value={tripDetails.destination}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select destination</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Dates */}
            <div>
              <label className="text-sm text-gray-700 font-medium mb-2 block">
                <FaCalendarAlt className="inline mr-2" />
                Departure Date
              </label>
              <input
                type="date"
                name="startDate"
                value={tripDetails.startDate}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 font-medium mb-2 block">
                <FaCalendarAlt className="inline mr-2" />
                Return Date
              </label>
              <input
                type="date"
                name="endDate"
                value={tripDetails.endDate}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Travelers */}
            <div>
              <label className="text-sm text-gray-700 font-medium mb-2 block">
                <FaUsers className="inline mr-2" />
                Adults (18+)
              </label>
              <input
                type="number"
                min="1"
                name="adults"
                value={tripDetails.adults}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 font-medium mb-2 block">
                <FaUsers className="inline mr-2" />
                Children (0-17)
              </label>
              <input
                type="number"
                min="0"
                name="children"
                value={tripDetails.children}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FaUser className="mr-3 text-blue-600" />
            Contact Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-700 font-medium mb-2 block">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={tripDetails.firstName}
                onChange={handleChange}
                required
                placeholder="Enter your first name"
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 font-medium mb-2 block">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={tripDetails.lastName}
                onChange={handleChange}
                required
                placeholder="Enter your last name"
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 font-medium mb-2 block">
                <FaEnvelope className="inline mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={tripDetails.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 font-medium mb-2 block">
                <FaPhone className="inline mr-2" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={tripDetails.phone}
                onChange={handleChange}
                required
                placeholder="+91 98765 43210"
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Travel Preferences Section */}
        <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FaHotel className="mr-3 text-blue-600" />
            Travel Preferences
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-700 font-medium mb-2 block">
                <FaHotel className="inline mr-2" />
                Accommodation Type
              </label>
              <select
                name="accommodation"
                value={tripDetails.accommodation}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="3-star">3-Star Hotel</option>
                <option value="4-star">4-Star Hotel</option>
                <option value="5-star">5-Star Hotel</option>
                <option value="resort">Resort</option>
                <option value="boutique">Boutique Hotel</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700 font-medium mb-2 block">
                <FaPlane className="inline mr-2" />
                Flight Class
              </label>
              <select
                name="flightClass"
                value={tripDetails.flightClass}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="economy">Economy Class</option>
                <option value="premium-economy">Premium Economy</option>
                <option value="business">Business Class</option>
                <option value="first">First Class</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-700 font-medium mb-2 block">
                Special Requests (Optional)
              </label>
              <textarea
                name="specialRequests"
                value={tripDetails.specialRequests}
                onChange={handleChange}
                rows="3"
                placeholder="Any special requirements, dietary restrictions, accessibility needs, etc."
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Confirm Booking & Proceed to Payment'}
          </motion.button>
          <p className="text-sm text-gray-500 mt-3">
            You'll be redirected to secure payment gateway
          </p>
        </div>
      </motion.form>

      {/* TRUST INDICATORS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mt-16 bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure Booking</h3>
            <p className="text-sm text-gray-600">256-bit SSL encryption protects your data</p>
          </div>
          <div>
            <div className="text-3xl mb-3">📞</div>
            <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-sm text-gray-600">Round-the-clock customer assistance</p>
          </div>
          <div>
            <div className="text-3xl mb-3">💯</div>
            <h3 className="font-semibold text-gray-900 mb-2">Best Price Guarantee</h3>
            <p className="text-sm text-gray-600">We'll match any lower price you find</p>
          </div>
        </div>
      </motion.div>

      {/* FOOTER NOTE */}
      <div className="text-center mt-20 text-gray-500 text-sm">
        Start with one trip — the rest will follow 🌍
      </div>
    </div>
  );
}

