import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaPlane, FaHotel, FaLeaf, FaWater, FaSpa, FaShoppingBag } from "react-icons/fa";

const ITINERARY_DATA = {
  day1: {
    title: "Arrival & Beach Bliss",
    activities: [
      { activity: "Arrival in Bali", description: "Land at Ngurah Rai International Airport", icon: FaPlane },
      { activity: "Resort check-in", description: "Uluwatu or Seminyak beachfront resort", icon: FaHotel },
      { activity: "Beach relaxation", description: "Unwind on pristine tropical beaches", icon: FaWater }
    ]
  },
  day2: {
    title: "Cultural Immersion",
    activities: [
      { activity: "Ubud temples", description: "Sacred temples and spiritual sites", icon: FaLeaf },
      { activity: "Rice terraces", description: "UNESCO World Heritage Jatiluwih terraces", icon: FaLeaf },
      { activity: "Balinese dinner", description: "Traditional cuisine and cultural show", icon: FaLeaf }
    ]
  },
  day3: {
    title: "Nature & Wellness",
    activities: [
      { activity: "Waterfall exploration", description: "Hidden jungle waterfalls and nature walks", icon: FaWater },
      { activity: "Spa session", description: "Traditional Balinese massage and wellness", icon: FaSpa }
    ]
  },
  day4: {
    title: "Leisure & Shopping",
    activities: [
      { activity: "Beach clubs", description: "Luxury beach clubs and infinity pools", icon: FaWater },
      { activity: "Local markets", description: "Shopping for crafts and souvenirs", icon: FaShoppingBag }
    ]
  },
  day5: {
    title: "Farewell Paradise",
    activities: [
      { activity: "Departure", description: "Transfer to airport for departure", icon: FaPlane }
    ]
  }
};

export default function BaliItinerary() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* HERO SECTION */}
      <section className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/50 to-teal-900/30"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-6xl font-bold mb-4">Bali Travel Itinerary</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover the Island of Gods through temples, nature, and tropical serenity
            </p>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2 mt-6 inline-block">
              <span className="text-lg font-semibold">5 Days • 4 Nights</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ITINERARY CARDS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Tropical Journey</h2>
            <p className="text-xl text-gray-600">Experience the magic of Bali's culture and nature</p>
          </motion.div>

          <div className="grid gap-8">
            {Object.entries(ITINERARY_DATA).map(([day, data], dayIndex) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, x: dayIndex % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: dayIndex * 0.1 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-green-100"
              >
                <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6">
                  <h3 className="text-2xl font-bold text-white">
                    Day {dayIndex + 1}: {data.title}
                  </h3>
                </div>
                
                <div className="p-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.activities.map((activity, actIndex) => (
                      <motion.div
                        key={actIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: actIndex * 0.1 }}
                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                            <activity.icon className="text-white text-lg" />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-800 mb-1">{activity.activity}</h4>
                          <p className="text-gray-600 text-sm">{activity.description}</p>
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

      {/* HIGHLIGHTS */}
      <section className="py-20 bg-gradient-to-r from-green-100 to-teal-100">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Tropical Paradise Awaits</h2>
            <p className="text-xl text-gray-700">Immerse yourself in Bali's natural beauty and rich culture</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌿",
                title: "Nature & Temples",
                description: "Sacred sites and lush landscapes",
                highlights: ["Ancient Temples", "Rice Terraces", "Jungle Walks"]
              },
              {
                icon: "🏖️",
                title: "Beach Paradise",
                description: "Pristine beaches and crystal waters",
                highlights: ["Beach Clubs", "Sunset Views", "Water Sports"]
              },
              {
                icon: "🧘",
                title: "Wellness & Spa",
                description: "Rejuvenation and relaxation",
                highlights: ["Traditional Spa", "Yoga Sessions", "Meditation"]
              }
            ].map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-8 border border-green-200"
              >
                <div className="text-4xl mb-4 text-center">{highlight.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{highlight.title}</h3>
                <p className="text-gray-600 mb-6 text-center">{highlight.description}</p>
                <ul className="space-y-2">
                  {highlight.highlights.map((item, j) => (
                    <li key={j} className="text-gray-700 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK NOW */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Ready for Bali?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Experience the perfect blend of culture, nature, and relaxation
            </p>
            
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8 mb-8 border border-green-200">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600">$1,200</div>
                  <div className="text-gray-600">Starting Price</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600">5 Days</div>
                  <div className="text-gray-600">Duration</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-700">4.8★</div>
                  <div className="text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/plan-trip")}
              className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-12 py-4 rounded-2xl text-xl font-semibold hover:shadow-2xl transition-all duration-300"
            >
              Book This Trip
            </motion.button>
            
            <p className="text-sm text-gray-500 mt-4">Tropical resorts • Cultural experiences • Natural wonders</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}