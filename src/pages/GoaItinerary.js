import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaPlane, FaHotel, FaUmbrellaBeach, FaWater, FaMoon, FaChurch, FaShoppingBag, FaCocktail, FaUtensils } from "react-icons/fa";

const ITINERARY_DATA = {
  day1: {
    title: "Arrival & Beach Relaxation",
    activities: [
      { activity: "Arrival in Goa", description: "Land at Goa Airport and transfer to hotel", icon: FaPlane },
      { activity: "Check-in at beachside hotel", description: "Baga / Calangute beachfront accommodation", icon: FaHotel },
      { activity: "Evening beach walk", description: "Stroll along the coastline and watch sunset", icon: FaUmbrellaBeach },
      { activity: "Dinner at beach shack", description: "Fresh seafood with ocean views", icon: FaUmbrellaBeach }
    ]
  },
  day2: {
    title: "North Goa Adventure",
    activities: [
      { activity: "North Goa sightseeing", description: "Explore the vibrant northern beaches", icon: FaUmbrellaBeach },
      { activity: "Visit Baga, Anjuna, Vagator", description: "Tour the famous beach destinations", icon: FaUmbrellaBeach },
      { activity: "Water sports activities", description: "Parasailing, jet skiing, and banana boat rides", icon: FaWater },
      { activity: "Nightlife experience", description: "Experience Goa's famous party scene", icon: FaMoon }
    ]
  },
  day3: {
    title: "Culture & Departure",
    activities: [
      { activity: "South Goa temples and churches", description: "Visit historic religious sites", icon: FaChurch },
      { activity: "Relaxation and shopping", description: "Last-minute souvenirs and beach time", icon: FaShoppingBag },
      { activity: "Departure", description: "Check-out and transfer to airport", icon: FaPlane }
    ]
  }
};

export default function GoaItinerary() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
      {/* HERO SECTION */}
      <section className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1587502536263-9298f55a47b9?auto=format&fit=crop&w=1920&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-teal-900/70"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-6xl font-bold mb-4">Goa Travel Itinerary</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Experience the perfect blend of beaches, culture, and nightlife in India's coastal paradise
            </p>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2 mt-6 inline-block">
              <span className="text-lg font-semibold">3 Days • 2 Nights</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ITINERARY DAYS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your 3-Day Adventure</h2>
            <p className="text-xl text-gray-600">Carefully crafted experiences for the perfect Goa getaway</p>
          </motion.div>

          <div className="space-y-16">
            {Object.entries(ITINERARY_DATA).map(([day, data], dayIndex) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, x: dayIndex % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: dayIndex * 0.1 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden"
              >
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-8">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Day {dayIndex + 1}: {data.title}
                  </h3>
                </div>
                
                <div className="p-8">
                  <div className="grid gap-6">
                    {data.activities.map((activity, actIndex) => (
                      <motion.div
                        key={actIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: actIndex * 0.1 }}
                        className="flex items-center gap-6 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                            <activity.icon className="text-white text-xl" />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{activity.activity}</h4>
                          <p className="text-gray-600">{activity.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS SECTION */}
      <section className="py-20 bg-gradient-to-r from-cyan-500 to-blue-600">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">What Makes This Special</h2>
            <p className="text-xl text-cyan-100">Experience the best of Goa across three amazing categories</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FaUmbrellaBeach,
                title: "Pristine Beaches",
                description: "From bustling Baga to serene Palolem, experience Goa's diverse coastline",
                highlights: ["Water Sports", "Sunset Views", "Beach Shacks"]
              },
              {
                icon: FaMoon,
                title: "Vibrant Nightlife",
                description: "Dance the night away at world-famous clubs and beach parties",
                highlights: ["Tito's Club", "Beach Parties", "Live Music"]
              },
              {
                icon: FaUmbrellaBeach,
                title: "Authentic Cuisine",
                description: "Savor the unique blend of Portuguese and Indian flavors",
                highlights: ["Fish Curry", "Bebinca", "Feni Tasting"]
              }
            ].map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20"
              >
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
                  <highlight.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{highlight.title}</h3>
                <p className="text-cyan-100 mb-6">{highlight.description}</p>
                <ul className="space-y-2">
                  {highlight.highlights.map((item, j) => (
                    <li key={j} className="text-cyan-100 flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-300 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK NOW SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready for Your Goa Adventure?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Book now and get ready for an unforgettable 3-day journey through paradise
            </p>
            
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-cyan-600">₹15,000</div>
                  <div className="text-gray-600">Starting Price</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">3 Days</div>
                  <div className="text-gray-600">Duration</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600">4.8★</div>
                  <div className="text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/plan-trip")}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-4 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all duration-300"
            >
              Book This Trip
            </motion.button>
            
            <p className="text-sm text-gray-500 mt-4">Free cancellation • Best price guarantee</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}