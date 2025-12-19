import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaMapMarkerAlt, FaPlay, FaStar, FaCalendarAlt, FaUsers, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { destinationsAPI } from '../services/api';
import { authAPI } from '../services/authAPI';

const DESTINATIONS = [
  {
    name: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    price: "₹15,000",
    duration: "5 days",
    description: "Beautiful beaches and vibrant nightlife"
  },
  {
    name: "Bali",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    price: "₹45,000",
    duration: "7 days",
    description: "Tropical paradise with rich culture"
  },
  {
    name: "Paris",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    price: "₹85,000",
    duration: "6 days",
    description: "City of love and iconic landmarks"
  },
  {
    name: "Maldives",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    price: "₹120,000",
    duration: "5 days",
    description: "Luxury resorts and crystal clear waters"
  },
  {
    name: "Dubai",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    price: "₹65,000",
    duration: "4 days",
    description: "Modern city with luxury shopping"
  },
  {
    name: "Thailand",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    price: "₹35,000",
    duration: "8 days",
    description: "Exotic temples and street food"
  }
];

const FEATURED_EXPERIENCES = [
  {
    title: "Adventure in the Alps",
    video: "https://player.vimeo.com/video/76979871?autoplay=1&loop=1&muted=1",
    description: "Experience breathtaking mountain adventures",
    duration: "7 days",
    price: "₹95,000"
  },
  {
    title: "Safari in Kenya",
    video: "https://player.vimeo.com/video/158148793?autoplay=1&loop=1&muted=1",
    description: "Wildlife safari in the heart of Africa",
    duration: "6 days",
    price: "₹150,000"
  },
  {
    title: "Island Hopping Greece",
    video: "https://player.vimeo.com/video/169599296?autoplay=1&loop=1&muted=1",
    description: "Explore the beautiful Greek islands",
    duration: "10 days",
    price: "₹110,000"
  }
];

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [destinations, setDestinations] = useState(DESTINATIONS);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Get current user on component mount
  useEffect(() => {
    const currentUser = authAPI.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Fetch destinations on component mount
  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const data = await destinationsAPI.getAll();
      console.log('API Response:', data);
      setDestinations(DESTINATIONS);
    } catch (error) {
      console.error('Failed to fetch destinations:', error);
      setDestinations(DESTINATIONS);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const apiResults = await destinationsAPI.search(query);
      console.log('Search API Response:', apiResults);
      
      const filtered = destinations.filter((d) =>
        d.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setSearched(true);
    } catch (error) {
      console.error('Search failed:', error);
      const filtered = destinations.filter((d) =>
        d.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 text-slate-800">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            {user ? (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                  Welcome back, {user.name}! 👋
                </h2>
                <p className="text-gray-600">Ready for your next adventure?</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                  Welcome to Travel Planner! 🌍
                </h2>
                <p className="text-gray-600">Discover amazing destinations around the world</p>
              </motion.div>
            )}
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Your Journey Starts Here
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover amazing destinations, plan unforgettable experiences, and create memories that last a lifetime
            </p>
            
            {/* SEARCH */}
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-xl max-w-2xl mx-auto"
            >
              <FaSearch className="text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 outline-none text-lg text-gray-700"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Explore
              </motion.button>
            </form>
          </motion.div>

          {/* QUICK STATS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">150+</div>
              <div className="text-gray-600">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">50K+</div>
              <div className="text-gray-600">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">4.9</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEARCH RESULTS */}
      {searched && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Search Results</h2>

          {results.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-gray-500">No destinations found for "{query}"</p>
              <p className="text-gray-400 mt-2">Try searching for popular destinations like Goa, Bali, or Paris</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  onClick={() => {
                    if (d.name === "Goa") navigate("/goa-itinerary");
                    else if (d.name === "Paris") navigate("/paris-itinerary");
                    else if (d.name === "Bali") navigate("/bali-itinerary");
                    else if (d.name === "Maldives") navigate("/maldives-itinerary");
                    else navigate("/plan-trip");
                  }}
                  className="cursor-pointer bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={d.image}
                      alt={d.name}
                      className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                      <FaHeart className="text-gray-400 hover:text-red-500 transition-colors" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-900">{d.name}</h3>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className="text-sm font-medium">{d.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{d.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{d.duration}</span>
                      <span className="font-bold text-blue-600">{d.price}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* TRAVEL TIPS SECTION */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Essential Travel Tips
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Master the art of travel with these expert insights from seasoned adventurers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "✈️",
                title: "Smart Booking Strategies",
                description: "Book flights 6-8 weeks in advance for international trips and 3-4 weeks for domestic. Use incognito mode to avoid price tracking and consider flexible dates for better deals.",
                highlight: "Save up to 40% on flights",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: "💡",
                title: "Packing Like a Pro",
                description: "Roll clothes instead of folding to save 30% space. Pack one week's worth regardless of trip length and always bring a change of clothes in carry-on for long flights.",
                highlight: "Travel lighter, stress less",
                color: "from-emerald-500 to-teal-500"
              },
              {
                icon: "🛡️",
                title: "Stay Safe & Connected",
                description: "Download offline maps, keep digital copies of important documents in cloud storage, and always inform someone about your itinerary. Get travel insurance for peace of mind.",
                highlight: "Prevention is better than cure",
                color: "from-purple-500 to-pink-500"
              }
            ].map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${tip.color}`}></div>
                
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {tip.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-4 font-serif">
                  {tip.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6 font-light text-lg">
                  {tip.description}
                </p>
                
                <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${tip.color} text-white text-sm font-semibold shadow-md`}>
                  💎 {tip.highlight}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
            <p className="text-xl text-gray-600">Discover the world's most loved travel spots</p>
          </motion.div>

          {/* SCROLLABLE DESTINATIONS */}
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-6" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              {DESTINATIONS.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => {
                    if (d.name === "Goa") navigate("/goa-itinerary");
                    else if (d.name === "Paris") navigate("/paris-itinerary");
                    else if (d.name === "Bali") navigate("/bali-itinerary");
                    else if (d.name === "Maldives") navigate("/maldives-itinerary");
                    else navigate("/plan-trip");
                  }}
                  className="flex-shrink-0 w-80 cursor-pointer bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={d.image}
                      alt={d.name}
                      className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                      <FaHeart className="text-gray-400 hover:text-red-500 transition-colors" />
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      {d.duration}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-600" />
                        <h3 className="font-bold text-xl text-gray-900">{d.name}</h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span className="font-medium">{d.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{d.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <FaUsers /> Popular choice
                      </span>
                      <span className="text-2xl font-bold text-blue-600">{d.price}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* NEWSLETTER SIGNUP */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Never Miss an Adventure</h2>
            <p className="text-xl text-gray-300 mb-8">Get exclusive travel deals, destination guides, and insider tips delivered to your inbox</p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
            
            <p className="text-sm text-gray-400 mt-4">Join 50,000+ travelers who trust us with their adventures</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

