import React, { useState } from 'react';
import { tripsAPI } from '../services/api';

export default function TestTrip() {
  const [result, setResult] = useState('');

  const testCreateTrip = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      
      if (!token) {
        setResult('No token found - please login first');
        return;
      }

      const tripData = {
        destination: 'Test Destination',
        startDate: '2024-03-15',
        endDate: '2024-03-20',
        description: 'Test trip'
      };

      console.log('Creating trip:', tripData);
      const response = await tripsAPI.create(tripData);
      console.log('Trip created:', response);
      setResult('Trip created successfully: ' + JSON.stringify(response));
    } catch (error) {
      console.error('Error:', error);
      setResult('Error: ' + error.message);
    }
  };

  const testGetTrips = async () => {
    try {
      const trips = await tripsAPI.getAll();
      console.log('Trips:', trips);
      setResult('Trips: ' + JSON.stringify(trips, null, 2));
    } catch (error) {
      console.error('Error:', error);
      setResult('Error: ' + error.message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Test Trip API</h1>
      <div className="space-x-4 mb-4">
        <button 
          onClick={testCreateTrip}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Test Create Trip
        </button>
        <button 
          onClick={testGetTrips}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Test Get Trips
        </button>
      </div>
      <div className="bg-gray-100 p-4 rounded">
        <pre>{result}</pre>
      </div>
    </div>
  );
}