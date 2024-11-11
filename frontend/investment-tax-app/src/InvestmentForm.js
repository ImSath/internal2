// InvestmentForm.js
import React, { useState } from 'react';
import './InvestmentForm.css';

const InvestmentForm = ({ onSubmit }) => {
  const [income, setIncome] = useState('');
  const [investmentType, setInvestmentType] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Passing form data to the onSubmit function (e.g., sending data to the backend)
    onSubmit({ income, investmentType, investmentAmount });

    // Reset form fields after submission
    setIncome('');
    setInvestmentType('');
    setInvestmentAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Income:</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label>Investment Type:</label>
        <select
          value={investmentType}
          onChange={(e) => setInvestmentType(e.target.value)}
          required
        >
          <option value="">Select Type</option>
          <option value="stocks">Stocks</option>
          <option value="bonds">Bonds</option>
          <option value="real-estate">Real Estate</option>
        </select>
      </div>

      <div>
        <label>Investment Amount:</label>
        <input
          type="number"
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(e.target.value)}
          required
        />
      </div>

      <button type="submit">Calculate Tax Impact</button>
    </form>
  );
};

export default InvestmentForm;
