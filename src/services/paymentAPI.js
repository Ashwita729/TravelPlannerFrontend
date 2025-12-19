const PAYMENT_API_BASE = 'https://jsonplaceholder.typicode.com'; // Mock API

// Payment API functions
export const paymentAPI = {
  // Create payment intent
  createPaymentIntent: async (amount, currency = 'INR') => {
    try {
      const response = await fetch(`${PAYMENT_API_BASE}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount * 100, // Convert to paise
          currency,
          payment_method_types: ['card', 'upi', 'netbanking'],
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Payment intent creation failed:', error);
      throw error;
    }
  },

  // Process card payment
  processCardPayment: async (paymentData) => {
    try {
      const response = await fetch(`${PAYMENT_API_BASE}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });
      return await response.json();
    } catch (error) {
      console.error('Card payment failed:', error);
      throw error;
    }
  },

  // Process UPI payment
  processUPIPayment: async (upiId, amount) => {
    try {
      const response = await fetch(`${PAYMENT_API_BASE}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ upi_id: upiId, amount }),
      });
      return await response.json();
    } catch (error) {
      console.error('UPI payment failed:', error);
      throw error;
    }
  },

  // Process net banking
  processNetBanking: async (bankCode, amount) => {
    try {
      const response = await fetch(`${PAYMENT_API_BASE}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bank_code: bankCode, amount }),
      });
      return await response.json();
    } catch (error) {
      console.error('Net banking payment failed:', error);
      throw error;
    }
  },
};