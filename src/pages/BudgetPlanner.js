import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { budgetAPI } from '../services/api';

export default function BudgetPlanner() {
  const [items, setItems] = useState([]);
  const [budgetGoal, setBudgetGoal] = useState(30000);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");

  // Fetch expenses on component mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await budgetAPI.getExpenses();
      console.log('Expenses API Response:', data);
 HEAD
      setItems(data.map(item => ({ ...item, id: item._id })));
      // Keep using local state for demo
ae4ed825a09127380d155ab728c74276ee837ffc
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const total = items.reduce((sum, it) => sum + it.amount, 0);
  const remaining = budgetGoal - total;

  const addItem = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const expense = {
        id: Date.now(),
        name,
        amount: Number(amount),
        category,
        createdAt: new Date().toISOString(),
      };
      
      const response = await budgetAPI.addExpense(expense);
      console.log('Expense added:', response);
      
      setItems([...items, expense]);
      setName("");
      setAmount("");
    } catch (error) {
      console.error('Failed to add expense:', error);
      // Fallback to local addition
      setItems([
        ...items,
        { id: Date.now(), name, amount: Number(amount), category },
      ]);
      setName("");
      setAmount("");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      await budgetAPI.deleteExpense(id);
      console.log('Expense deleted:', id);
      setItems(items.filter((it) => it.id !== id));
    } catch (error) {
      console.error('Failed to delete expense:', error);
      // Fallback to local deletion
      setItems(items.filter((it) => it.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900 p-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Budget Planner
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Take control of your travel expenses with smart budgeting tools and real-time tracking
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          className="p-8 rounded-2xl bg-white shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Goal</span>
          </div>
          <p className="text-sm font-medium text-gray-600 mb-2">Budget Target</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">₹{budgetGoal.toLocaleString()}</h2>
          <input
            type="number"
            value={budgetGoal}
            onChange={(e) => setBudgetGoal(Number(e.target.value))}
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Set your budget"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          className="p-8 rounded-2xl bg-white shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💳</span>
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">Spent</span>
          </div>
          <p className="text-sm font-medium text-gray-600 mb-2">Total Expenses</p>
          <h2 className="text-3xl font-bold text-gray-900">₹{total.toLocaleString()}</h2>
          <p className="text-sm text-gray-500 mt-2">{items.length} transactions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          className="p-8 rounded-2xl bg-white shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${remaining >= 0 ? 'bg-emerald-100' : 'bg-red-100'} rounded-xl flex items-center justify-center`}>
              <span className="text-2xl">{remaining >= 0 ? '💰' : '⚠️'}</span>
            </div>
            <span className={`text-sm font-medium ${remaining >= 0 ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'} px-3 py-1 rounded-full`}>
              {remaining >= 0 ? 'Available' : 'Over Budget'}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-600 mb-2">Remaining Budget</p>
          <h2 className={`text-3xl font-bold ${remaining >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            ₹{Math.abs(remaining).toLocaleString()}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {remaining >= 0 ? 'Within budget' : `₹${Math.abs(remaining).toLocaleString()} over limit`}
          </p>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-12 max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Budget Progress</h3>
          <span className="text-2xl font-bold text-gray-900">
            {Math.min((total / budgetGoal) * 100, 100).toFixed(1)}%
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((total / budgetGoal) * 100, 100)}%` }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className={`h-full rounded-full ${
              remaining < 0 ? "bg-gradient-to-r from-red-500 to-red-600" : "bg-gradient-to-r from-blue-500 to-blue-600"
            }`}
          ></motion.div>
        </div>
        <p className="text-sm text-gray-600">
          {remaining >= 0 
            ? `You have ₹${remaining.toLocaleString()} left to spend` 
            : `You are ₹${Math.abs(remaining).toLocaleString()} over your budget`
          }
        </p>
      </motion.div>

      {/* Add Expense Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 max-w-4xl mx-auto mb-12"
      >
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
            <span className="text-xl">➕</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">Add New Expense</h3>
        </div>

        <form onSubmit={addItem} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Hotel booking"
              className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              type="number"
              className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>🏷️ General</option>
              <option>✈️ Transportation</option>
              <option>🏨 Accommodation</option>
              <option>🍽️ Food & Dining</option>
              <option>🛍️ Shopping</option>
              <option>🎯 Activities</option>
            </select>
          </div>
          <div className="flex items-end">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold p-3 transition-colors shadow-lg"
            >
              Add Expense
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Expense List */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4">
              <span className="text-xl">📋</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">Expense History</h3>
          </div>
          {items.length > 0 && (
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {items.length} {items.length === 1 ? 'expense' : 'expenses'}
            </span>
          )}
        </div>

 HEAD
        <div className="space-y-6">
=======
        <div className="space-y-3">
 ae4ed825a09127380d155ab728c74276ee837ffc
          {items.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💸</span>
              </div>
              <p className="text-gray-500 text-lg mb-2">No expenses recorded yet</p>
              <p className="text-gray-400">Add your first expense to start tracking your budget</p>
            </div>
          )}
HEAD
          {Object.entries(
            items.reduce((groups, item) => {
              const category = item.category;
              if (!groups[category]) {
                groups[category] = [];
              }
              groups[category].push(item);
              return groups;
            }, {})
          ).map(([category, categoryItems], categoryIndex) => {
            const categoryTotal = categoryItems.reduce((sum, item) => sum + item.amount, 0);
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-sm">
                      <span className="text-2xl">
                        {category.includes('Transportation') ? '✈️' :
                         category.includes('Accommodation') ? '🏨' :
                         category.includes('Food') ? '🍽️' :
                         category.includes('Shopping') ? '🛍️' :
                         category.includes('Activities') ? '🎯' : '🏷️'}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900">{category}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="text-lg font-bold text-gray-900">₹{categoryTotal.toLocaleString()}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {categoryItems.map((it, index) => (
                    <motion.div
                      key={it.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                      className="p-4 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <div>
                          <h5 className="font-medium text-gray-900">{it.name}</h5>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-900 font-semibold">₹{it.amount.toLocaleString()}</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => deleteItem(it.id)}
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium shadow-sm"
                        >
                          Remove
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
=======
          {items.map((it, index) => (
            <motion.div
              key={it.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all duration-200 flex justify-between items-center"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-4 shadow-sm">
                  <span className="text-lg">
                    {it.category.includes('Transportation') ? '✈️' :
                     it.category.includes('Accommodation') ? '🏨' :
                     it.category.includes('Food') ? '🍽️' :
                     it.category.includes('Shopping') ? '🛍️' :
                     it.category.includes('Activities') ? '🎯' : '🏷️'}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">{it.name}</h4>
                  <p className="text-sm text-gray-600">{it.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-gray-900 font-bold text-xl">₹{it.amount.toLocaleString()}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => deleteItem(it.id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium shadow-sm"
                >
                  Remove
                </motion.button>
              </div>
            </motion.div>
          ))}
>>>>>>> ae4ed825a09127380d155ab728c74276ee837ffc
        </div>
      </motion.div>
    </div>
  );
}

