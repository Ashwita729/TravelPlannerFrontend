<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

const destinations = [
  { name: "Paris", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80" },
  { name: "Bali", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" },
  { name: "Dubai", img: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=800&q=80" },
  { name: "Switzerland", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80" },
  { name: "Tokyo", img: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=80" },
  { name: "Maldives", img: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=800&q=80" },
  { name: "New York", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80" },
  { name: "Rome", img: "https://images.unsplash.com/photo-1526481280691-3d3b4c7f3c6c?auto=format&fit=crop&w=800&q=80" },
  { name: "Santorini", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" },
  { name: "London", img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80" },
];

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [autoPopupShown, setAutoPopupShown] = useState(false);
  const [index, setIndex] = useState(0);
  const visible = 3;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!autoPopupShown) {
        setShowSignup(true);
        setAutoPopupShown(true);
      }
    }, 40000);
    return () => clearTimeout(timer);
  }, [autoPopupShown]);

  const next = () => {
    if (index < destinations.length - visible) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="w-full overflow-x-hidden bg-[#0b0b0e] text-white">

      {/* POPUPS */}
      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)} 
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}
      {showSignup && (
        <SignupModal 
          onClose={() => setShowSignup(false)} 
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}

      {/* ================= SECTION 1: HERO ================= */}
      <section className="min-h-screen grid md:grid-cols-2">
        <div className="flex flex-col justify-center px-16">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl font-extrabold"
          >
            Travel,
            <br /> re-imagined.
          </motion.h1>
          <p className="mt-6 text-slate-400 max-w-md">
            Discover meaningful journeys crafted for modern explorers.
          </p>
          <div className="mt-10 flex gap-4">
            <button
              onClick={() => setShowSignup(true)}
              className="px-8 py-4 bg-white text-black rounded-full font-semibold"
            >
              Sign Up
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="px-8 py-4 border border-white/30 rounded-full"
            >
              Login
            </button>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
          className="h-full w-full object-cover"
          alt="hero"
        />
      </section>

      {/* ================= SECTION 2: DESTINATIONS SLIDER ================= */}
      <section className="py-24 bg-[#0f0f14]">
        <div className="px-16 flex justify-between items-center mb-10">
          <h2 className="text-4xl font-extrabold">Handpicked Destinations</h2>
          <div className="flex gap-3">
            <button onClick={prev} className="p-3 bg-white/10 rounded-full">
              <HiChevronLeft size={22} />
            </button>
            <button onClick={next} className="p-3 bg-white/10 rounded-full">
              <HiChevronRight size={22} />
            </button>
          </div>
        </div>

        <div className="px-12 overflow-hidden">
          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${index * 360}px)` }}
          >
            {destinations.map((d, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="min-w-[320px] mx-4 bg-[#16161c] rounded-2xl overflow-hidden"
              >
                <img src={d.img} className="h-56 w-full object-cover" alt={d.name} />
                <div className="p-5">
                  <h3 className="text-xl font-bold">{d.name}</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Curated luxury experiences
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: EXPERIENCES ================= */}
      <section className="py-28 bg-black text-center">
        <h2 className="text-4xl font-extrabold">Travel Experiences</h2>
        <p className="mt-4 text-slate-400 max-w-xl mx-auto">
          From solo escapes to luxury retreats — experiences tailored for you.
        </p>
        <div className="mt-16 grid md:grid-cols-3 gap-10 px-16">
          {["Luxury", "Adventure", "Cultural"].map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 bg-[#16161c] rounded-2xl"
            >
              <h3 className="text-2xl font-bold">{t} Travel</h3>
              <p className="mt-3 text-slate-400">
                Thoughtfully designed journeys with premium comfort.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 4: TRUST ================= */}
      <section className="py-24 bg-[#0f172a]">
        <div className="px-16 grid md:grid-cols-3 gap-10 text-center">
          {[
            ["1M+", "Happy Travelers"],
            ["120+", "Countries Covered"],
            ["4.9★", "Average Rating"],
          ].map((s, i) => (
            <div key={i}>
              <h3 className="text-5xl font-extrabold">{s[0]}</h3>
              <p className="text-slate-400 mt-2">{s[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 5: TESTIMONIAL ================= */}
      <section className="py-28 bg-black text-center">
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-2xl italic max-w-3xl mx-auto"
        >
          “This platform changed how I travel. Every trip feels premium.”
        </motion.blockquote>
        <p className="mt-4 text-slate-400">— Verified Traveler</p>
      </section>

      {/* ================= SECTION 6: CTA ================= */}
      <section className="py-28 bg-gradient-to-r from-indigo-600 to-blue-600 text-center">
        <h2 className="text-4xl font-extrabold">Your journey starts now.</h2>
        <p className="mt-4 text-white/80">
          Join thousands of explorers worldwide.
        </p>
        <button
          onClick={() => setShowSignup(true)}
          className="mt-10 px-10 py-4 bg-white text-black rounded-full font-semibold"
        >
          Create Free Account
        </button>
      </section>

      {/* ================= SECTION 7: WHY CHOOSE US ================= */}
      <section className="py-28 bg-[#0f0f14]">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold">Why Travelers Choose Us</h2>
          <p className="text-slate-400 mt-4">Trusted globally by modern explorers</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 px-16">
          {[
            ["Best Price Guarantee", "Unmatched deals worldwide"],
            ["Secure Payments", "100% safe transactions"],
            ["Curated Trips", "Designed by travel experts"],
            ["24/7 Support", "Always here for you"],
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="bg-[#16161c] p-8 rounded-2xl"
            >
              <h3 className="text-xl font-bold">{f[0]}</h3>
              <p className="text-slate-400 mt-2">{f[1]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 8: SERVICES ================= */}
      <section className="py-28 bg-black">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold">
            Everything You Need in One Place
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10 px-16">
          {[
            ["Hotels", "Luxury & budget stays worldwide", "https://images.unsplash.com/photo-1502920917128-1aa500764ce7?auto=format&fit=crop&w=800&q=80"],
            ["Flights", "Domestic & international bookings", "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"],
            ["Holiday Packages", "All-inclusive premium trips", "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=800&q=80"],
          ].map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="rounded-3xl overflow-hidden bg-[#16161c]"
            >
              <img
                src={s[2]}
                className="h-56 w-full object-cover"
                alt={s[0]}
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold">{s[0]}</h3>
                <p className="text-slate-400 mt-2">{s[1]}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 9: NEWSLETTER ================= */}
      <section className="py-28 bg-black text-center">
        <h2 className="text-4xl font-extrabold">Get Exclusive Travel Deals</h2>
        <p className="mt-4 text-slate-400">
          Join our newsletter & never miss an offer
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-6 py-4 w-80 rounded-full text-black outline-none"
          />
          <button className="px-8 py-4 bg-indigo-600 rounded-full">
            Subscribe
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-10 bg-[#020617] text-center text-slate-500 text-sm">
        © 2025 Travel Planner. All rights reserved.
      </footer>
    </div>
  );
}






=======
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

const destinations = [
  { name: "Paris", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80" },
  { name: "Bali", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" },
  { name: "Dubai", img: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=800&q=80" },
  { name: "Switzerland", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80" },
  { name: "Tokyo", img: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=80" },
  { name: "Maldives", img: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=800&q=80" },
  { name: "New York", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80" },
  { name: "Rome", img: "https://images.unsplash.com/photo-1526481280691-3d3b4c7f3c6c?auto=format&fit=crop&w=800&q=80" },
  { name: "Santorini", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" },
  { name: "London", img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80" },
];

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [autoPopupShown, setAutoPopupShown] = useState(false);
  const [index, setIndex] = useState(0);
  const visible = 3;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!autoPopupShown) {
        setShowSignup(true);
        setAutoPopupShown(true);
      }
    }, 40000);
    return () => clearTimeout(timer);
  }, [autoPopupShown]);

  const next = () => {
    if (index < destinations.length - visible) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="w-full overflow-x-hidden bg-[#0b0b0e] text-white">

      {/* POPUPS */}
      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)} 
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}
      {showSignup && (
        <SignupModal 
          onClose={() => setShowSignup(false)} 
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}

      {/* ================= SECTION 1: HERO ================= */}
      <section className="min-h-screen grid md:grid-cols-2">
        <div className="flex flex-col justify-center px-16">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl font-extrabold"
          >
            Travel,
            <br /> re-imagined.
          </motion.h1>
          <p className="mt-6 text-slate-400 max-w-md">
            Discover meaningful journeys crafted for modern explorers.
          </p>
          <div className="mt-10 flex gap-4">
            <button
              onClick={() => setShowSignup(true)}
              className="px-8 py-4 bg-white text-black rounded-full font-semibold"
            >
              Sign Up
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="px-8 py-4 border border-white/30 rounded-full"
            >
              Login
            </button>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
          className="h-full w-full object-cover"
          alt="hero"
        />
      </section>

      {/* ================= SECTION 2: DESTINATIONS SLIDER ================= */}
      <section className="py-24 bg-[#0f0f14]">
        <div className="px-16 flex justify-between items-center mb-10">
          <h2 className="text-4xl font-extrabold">Handpicked Destinations</h2>
          <div className="flex gap-3">
            <button onClick={prev} className="p-3 bg-white/10 rounded-full">
              <HiChevronLeft size={22} />
            </button>
            <button onClick={next} className="p-3 bg-white/10 rounded-full">
              <HiChevronRight size={22} />
            </button>
          </div>
        </div>

        <div className="px-12 overflow-hidden">
          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${index * 360}px)` }}
          >
            {destinations.map((d, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="min-w-[320px] mx-4 bg-[#16161c] rounded-2xl overflow-hidden"
              >
                <img src={d.img} className="h-56 w-full object-cover" alt={d.name} />
                <div className="p-5">
                  <h3 className="text-xl font-bold">{d.name}</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Curated luxury experiences
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: EXPERIENCES ================= */}
      <section className="py-28 bg-black text-center">
        <h2 className="text-4xl font-extrabold">Travel Experiences</h2>
        <p className="mt-4 text-slate-400 max-w-xl mx-auto">
          From solo escapes to luxury retreats — experiences tailored for you.
        </p>
        <div className="mt-16 grid md:grid-cols-3 gap-10 px-16">
          {["Luxury", "Adventure", "Cultural"].map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 bg-[#16161c] rounded-2xl"
            >
              <h3 className="text-2xl font-bold">{t} Travel</h3>
              <p className="mt-3 text-slate-400">
                Thoughtfully designed journeys with premium comfort.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 4: TRUST ================= */}
      <section className="py-24 bg-[#0f172a]">
        <div className="px-16 grid md:grid-cols-3 gap-10 text-center">
          {[
            ["1M+", "Happy Travelers"],
            ["120+", "Countries Covered"],
            ["4.9★", "Average Rating"],
          ].map((s, i) => (
            <div key={i}>
              <h3 className="text-5xl font-extrabold">{s[0]}</h3>
              <p className="text-slate-400 mt-2">{s[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 5: TESTIMONIAL ================= */}
      <section className="py-28 bg-black text-center">
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-2xl italic max-w-3xl mx-auto"
        >
          “This platform changed how I travel. Every trip feels premium.”
        </motion.blockquote>
        <p className="mt-4 text-slate-400">— Verified Traveler</p>
      </section>

      {/* ================= SECTION 6: CTA ================= */}
      <section className="py-28 bg-gradient-to-r from-indigo-600 to-blue-600 text-center">
        <h2 className="text-4xl font-extrabold">Your journey starts now.</h2>
        <p className="mt-4 text-white/80">
          Join thousands of explorers worldwide.
        </p>
        <button
          onClick={() => setShowSignup(true)}
          className="mt-10 px-10 py-4 bg-white text-black rounded-full font-semibold"
        >
          Create Free Account
        </button>
      </section>

      {/* ================= SECTION 7: WHY CHOOSE US ================= */}
      <section className="py-28 bg-[#0f0f14]">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold">Why Travelers Choose Us</h2>
          <p className="text-slate-400 mt-4">Trusted globally by modern explorers</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 px-16">
          {[
            ["Best Price Guarantee", "Unmatched deals worldwide"],
            ["Secure Payments", "100% safe transactions"],
            ["Curated Trips", "Designed by travel experts"],
            ["24/7 Support", "Always here for you"],
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="bg-[#16161c] p-8 rounded-2xl"
            >
              <h3 className="text-xl font-bold">{f[0]}</h3>
              <p className="text-slate-400 mt-2">{f[1]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 8: SERVICES ================= */}
      <section className="py-28 bg-black">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold">
            Everything You Need in One Place
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10 px-16">
          {[
            ["Hotels", "Luxury & budget stays worldwide", "https://images.unsplash.com/photo-1502920917128-1aa500764ce7?auto=format&fit=crop&w=800&q=80"],
            ["Flights", "Domestic & international bookings", "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"],
            ["Holiday Packages", "All-inclusive premium trips", "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=800&q=80"],
          ].map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="rounded-3xl overflow-hidden bg-[#16161c]"
            >
              <img
                src={s[2]}
                className="h-56 w-full object-cover"
                alt={s[0]}
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold">{s[0]}</h3>
                <p className="text-slate-400 mt-2">{s[1]}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 9: NEWSLETTER ================= */}
      <section className="py-28 bg-black text-center">
        <h2 className="text-4xl font-extrabold">Get Exclusive Travel Deals</h2>
        <p className="mt-4 text-slate-400">
          Join our newsletter & never miss an offer
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-6 py-4 w-80 rounded-full text-black outline-none"
          />
          <button className="px-8 py-4 bg-indigo-600 rounded-full">
            Subscribe
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-10 bg-[#020617] text-center text-slate-500 text-sm">
        © 2025 Travel Planner. All rights reserved.
      </footer>
    </div>
  );
}






>>>>>>> ae4ed825a09127380d155ab728c74276ee837ffc
