import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaPlane, FaWater, FaGem, FaSpa, FaUmbrellaBeach } from "react-icons/fa";

const ITINERARY_DATA = {
  day1: {
    title: "Luxury Arrival",
    activities: [
      { activity: "Seaplane arrival", description: "Scenic transfer by speedboat or seaplane", icon: FaPlane },
      { activity: "Overwater villa", description: "Check-in to exclusive overwater accommodation", icon: FaGem },
      { activity: "Sunset dinner", description: "Private dining with panoramic ocean views", icon: FaUmbrellaBeach }
    ]
  },
  day2: {
    title: "Marine Adventures",
    activities: [
      { activity: "Coral reef snorkeling", description: "Explore vibrant underwater ecosystems", icon: FaWater },
      { activity: "Water activities", description: "Kayaking, paddleboarding, and diving", icon: FaWater }
    ]
  },
  day3: {
    title: "Ultimate Relaxation",
    activities: [
      { activity: "Spa sanctuary", description: "World-class spa treatments over water", icon: FaSpa },
      { activity: "Private beach", description: "Exclusive beach access and personalized service", icon: FaUmbrellaBeach }
    ]
  },
  day4: {
    title: "Farewell Paradise",
    activities: [
      { activity: "Leisure morning", description: "Final moments in tropical paradise", icon: FaUmbrellaBeach },
      { activity: "Departure", description: "Seaplane transfer to international airport", icon: FaPlane }
    ]
  }
};

export default function MaldivesItinerary() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50">
      {/* HERO SECTION */}
      <section className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1920&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/40 to-blue-900/20"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-6xl font-bold mb-4 font-light">Maldives Travel Itinerary</h1>
            <p className="text-xl max-w-2xl mx-auto font-light">
              Escape to exclusive overwater luxury in the world's most pristine waters
            </p>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2 mt-6 inline-block">
              <span className="text-lg font-medium">4 Days • 3 Nights</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LUXURY ITINERARY */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-light">Exclusive Island Experience</h2>
            <p className="text-xl text-gray-600">Indulge in unparalleled luxury and pristine natural beauty</p>
          </motion.div>

          <div className="space-y-12">
            {Object.entries(ITINERARY_DATA).map(([day, data], dayIndex) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: dayIndex * 0.2 }}
                className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-cyan-100"
              >
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-8">
                  <h3 className="text-3xl font-bold text-white font-light">
                    Day {dayIndex + 1}: {data.title}
                  </h3>
                </div>
                
                <div className="p-10">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.activities.map((activity, actIndex) => (
                      <motion.div
                        key={actIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: actIndex * 0.1 }}
                        className="text-center p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl hover:shadow-lg transition-all duration-300 border border-cyan-100"
                      >
                        <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <activity.icon className="text-white text-xl" />
                        </div>
                        
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{activity.activity}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{activity.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LUXURY HIGHLIGHTS */}
      <section className="py-20 bg-gradient-to-r from-cyan-100 to-blue-100">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-light">Unmatched Luxury</h2>
            <p className="text-xl text-gray-700">Experience the pinnacle of tropical sophistication</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: "🏝️",
                title: "Overwater Villas",
                description: "Exclusive accommodations above crystal waters",
                highlights: ["Private Deck", "Glass Floor Panels", "Direct Ocean Access"]
              },
              {
                icon: "🐠",
                title: "Marine Paradise",
                description: "World-class diving and snorkeling",
                highlights: ["Coral Gardens", "Manta Rays", "Tropical Fish"]
              },
              {
                icon: "💎",
                title: "Premium Service",
                description: "Personalized luxury at every moment",
                highlights: ["Butler Service", "Private Dining", "Spa Treatments"]
              }
            ].map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl p-8 border border-cyan-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-6 text-center">{highlight.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center font-light">{highlight.title}</h3>
                <p className="text-gray-600 mb-6 text-center leading-relaxed">{highlight.description}</p>
                <ul className="space-y-3">
                  {highlight.highlights.map((item, j) => (
                    <li key={j} className="text-gray-700 flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXCLUSIVE BOOKING */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-light">Ready for Paradise?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Indulge in the ultimate luxury escape to the Maldives
            </p>
            
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl p-10 mb-10 border border-cyan-200">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-cyan-600">$5,500</div>
                  <div className="text-gray-600 mt-2">Starting Price</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-600">4 Days</div>
                  <div className="text-gray-600 mt-2">Duration</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-cyan-700">5.0★</div>
                  <div className="text-gray-600 mt-2">Luxury Rating</div>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/plan-trip")}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-16 py-5 rounded-2xl text-xl font-semibold hover:shadow-2xl transition-all duration-300 font-light"
            >
              Book This Trip
            </motion.button>
            
            <p className="text-sm text-gray-500 mt-6">Overwater villas • Private butler • Exclusive experiences</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}