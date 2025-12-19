import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaPlane, FaHotel, FaCamera, FaShoppingBag, FaUtensils, FaCoffee } from "react-icons/fa";

const ITINERARY_DATA = {
  day1: {
    title: "Arrival & First Impressions",
    activities: [
      { activity: "Arrival in Paris", description: "Land at Charles de Gaulle Airport", icon: FaPlane },
      { activity: "Hotel check-in", description: "Luxury accommodation near city center", icon: FaHotel },
      { activity: "Evening walk", description: "Stroll along the Seine with Eiffel Tower views", icon: FaCamera }
    ]
  },
  day2: {
    title: "Art & Romance",
    activities: [
      { activity: "Louvre Museum visit", description: "Explore world's finest art collection", icon: FaCamera },
      { activity: "Seine River Cruise", description: "Romantic boat ride through the heart of Paris", icon: FaCamera },
      { activity: "Café dining experience", description: "Authentic Parisian bistro dinner", icon: FaCoffee }
    ]
  },
  day3: {
    title: "Culture & Shopping",
    activities: [
      { activity: "Montmartre exploration", description: "Visit Sacré-Cœur and artist quarters", icon: FaCamera },
      { activity: "Champs-Élysées shopping", description: "Luxury shopping on the famous avenue", icon: FaShoppingBag },
      { activity: "French cuisine", description: "Fine dining at a Michelin-starred restaurant", icon: FaUtensils }
    ]
  },
  day4: {
    title: "Farewell Paris",
    activities: [
      { activity: "Leisure morning", description: "Final moments in the City of Light", icon: FaCoffee },
      { activity: "Departure", description: "Transfer to airport for departure", icon: FaPlane }
    ]
  }
};

export default function ParisItinerary() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* HERO SECTION */}
      <section className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/60 to-orange-900/40"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-6xl font-bold mb-4 font-serif">Paris Travel Itinerary</h1>
            <p className="text-xl max-w-2xl mx-auto font-light">
              Experience the elegance and romance of the City of Light
            </p>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2 mt-6 inline-block">
              <span className="text-lg font-medium">4 Days • 3 Nights</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ITINERARY TIMELINE */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">Your Parisian Journey</h2>
            <p className="text-xl text-gray-600">A carefully curated experience of French elegance</p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-300 to-orange-400"></div>

            <div className="space-y-12">
              {Object.entries(ITINERARY_DATA).map(([day, data], dayIndex) => (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: dayIndex * 0.1 }}
                  className="relative"
                >
                  {/* Day Number Circle */}
                  <div className="absolute left-4 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                    {dayIndex + 1}
                  </div>

                  {/* Day Content */}
                  <div className="ml-20 bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-100">
                    <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 border-b border-amber-200">
                      <h3 className="text-2xl font-bold text-gray-800 font-serif">
                        Day {dayIndex + 1}: {data.title}
                      </h3>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-4">
                        {data.activities.map((activity, actIndex) => (
                          <motion.div
                            key={actIndex}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: actIndex * 0.1 }}
                            className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                                <activity.icon className="text-white text-lg" />
                              </div>
                            </div>
                            
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gray-800 mb-1">{activity.activity}</h4>
                              <p className="text-gray-600">{activity.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS SECTION */}
      <section className="py-20 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">Parisian Elegance</h2>
            <p className="text-xl text-gray-700">Immerse yourself in the sophistication of France</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎨",
                title: "Art & Culture",
                description: "World-class museums and galleries",
                highlights: ["Louvre Museum", "Montmartre Artists", "Historic Architecture"]
              },
              {
                icon: "🥐",
                title: "Culinary Excellence",
                description: "Authentic French gastronomy",
                highlights: ["Michelin Dining", "Café Culture", "Wine Tasting"]
              },
              {
                icon: "🛍️",
                title: "Luxury Shopping",
                description: "Fashion capital experiences",
                highlights: ["Champs-Élysées", "Designer Boutiques", "Local Markets"]
              }
            ].map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-8 border border-amber-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4 text-center">{highlight.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center font-serif">{highlight.title}</h3>
                <p className="text-gray-600 mb-6 text-center">{highlight.description}</p>
                <ul className="space-y-2">
                  {highlight.highlights.map((item, j) => (
                    <li key={j} className="text-gray-700 flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
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
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">Ready for Paris?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Embark on an unforgettable journey through the City of Light
            </p>
            
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-8 border border-amber-200">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-amber-600">€2,500</div>
                  <div className="text-gray-600">Starting Price</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">4 Days</div>
                  <div className="text-gray-600">Duration</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-700">4.9★</div>
                  <div className="text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/plan-trip")}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-12 py-4 rounded-2xl text-xl font-semibold hover:shadow-2xl transition-all duration-300 font-serif"
            >
              Book This Trip
            </motion.button>
            
            <p className="text-sm text-gray-500 mt-4">Luxury accommodations • Expert guides • Unforgettable memories</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}