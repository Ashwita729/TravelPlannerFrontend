import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCreditCard, FaMobile, FaUniversity, FaLock, FaCheckCircle } from "react-icons/fa";
import { paymentAPI } from '../services/paymentAPI';
import { tripsAPI } from '../services/api';

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const tripData = location.state?.tripData || {};
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Card payment state
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });
  
  // UPI payment state
  const [upiId, setUpiId] = useState('');
  
  // Net banking state
  const [selectedBank, setSelectedBank] = useState('');
  
  const amount = 25000; // Mock amount
  
  const createTrip = async () => {
    try {
      // Check if user is authenticated
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No authentication token found');
        alert('Please log in to save your trip');
        return;
      }
      
      const tripPayload = {
        destination: tripData.destination || 'Goa',
        startDate: tripData.startDate || '2024-03-15',
        endDate: tripData.endDate || '2024-03-20',
        description: `Trip to ${tripData.destination || 'Goa'} for ${(tripData.adults || 2) + (tripData.children || 0)} travelers`
      };
      
      console.log('Creating trip with payload:', tripPayload);
      const result = await tripsAPI.create(tripPayload);
      console.log('Trip created successfully:', result);
    } catch (error) {
      console.error('Error creating trip:', error);
      alert('Failed to save trip. Please check your login status.');
    }
  };
  
  const banks = [
    { code: 'SBI', name: 'State Bank of India' },
    { code: 'HDFC', name: 'HDFC Bank' },
    { code: 'ICICI', name: 'ICICI Bank' },
    { code: 'AXIS', name: 'Axis Bank' },
    { code: 'KOTAK', name: 'Kotak Mahindra Bank' },
  ];

  const handleCardPayment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const paymentData = {
        ...cardData,
        amount,
        tripData,
      };
      
      const response = await paymentAPI.processCardPayment(paymentData);
      console.log('Card payment response:', response);
      
      // Create trip in backend after successful payment
      await createTrip();
      setPaymentSuccess(true);
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUPIPayment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await paymentAPI.processUPIPayment(upiId, amount);
      console.log('UPI payment response:', response);
      
      // Create trip in backend after successful payment
      await createTrip();
      setPaymentSuccess(true);
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNetBanking = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await paymentAPI.processNetBanking(selectedBank, amount);
      console.log('Net banking response:', response);
      
      // Create trip in backend after successful payment
      await createTrip();
      setPaymentSuccess(true);
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    // Navigate to trip confirmation page with trip data
    navigate('/trip-confirmation', { state: { tripData } });
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Complete Your Payment</h1>
          <p className="text-xl text-gray-600">Secure and fast payment processing</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Payment Method</h2>
              
              {/* Payment Method Tabs */}
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-colors ${
                    paymentMethod === 'card' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <FaCreditCard /> Card
                </button>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-colors ${
                    paymentMethod === 'upi' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <FaMobile /> UPI
                </button>
                <button
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-colors ${
                    paymentMethod === 'netbanking' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <FaUniversity /> Net Banking
                </button>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <form onSubmit={handleCardPayment} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.cardNumber}
                      onChange={(e) => setCardData({...cardData, cardNumber: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardData.expiryDate}
                        onChange={(e) => setCardData({...cardData, expiryDate: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={cardData.cardholderName}
                      onChange={(e) => setCardData({...cardData, cardholderName: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : `Pay ₹${amount.toLocaleString()}`}
                  </button>
                </form>
              )}

              {/* UPI Payment Form */}
              {paymentMethod === 'upi' && (
                <form onSubmit={handleUPIPayment} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                    <input
                      type="text"
                      placeholder="yourname@paytm"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : `Pay ₹${amount.toLocaleString()}`}
                  </button>
                </form>
              )}

              {/* Net Banking Form */}
              {paymentMethod === 'netbanking' && (
                <form onSubmit={handleNetBanking} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Bank</label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Choose your bank</option>
                      {banks.map(bank => (
                        <option key={bank.code} value={bank.code}>{bank.name}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : `Pay ₹${amount.toLocaleString()}`}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6 sticky top-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Destination</span>
                  <span className="font-medium">{tripData.destination || 'Goa'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Travelers</span>
                  <span className="font-medium">{(tripData.adults || 2) + (tripData.children || 0)} persons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">5 days</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span>₹{amount.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <FaLock className="text-green-600" />
                <span>Your payment is secured with 256-bit SSL encryption</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}