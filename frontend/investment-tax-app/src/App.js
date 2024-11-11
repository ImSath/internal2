// App.js
import React, { useState } from 'react';
import InvestmentForm from './InvestmentForm';
import axios from 'axios';
import TaxImpactChart from './TaxImpactChart';
import './App.css';

function App() {
  const [taxImpact, setTaxImpact] = useState(null);
  const [investmentDetails, setInvestmentDetails] = useState(null);
  const [investmentHistory, setInvestmentHistory] = useState([]);
  const [totalTaxes, setTotalTaxes] = useState(0);

  const handleFormSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:4000/calculate-tax', formData);
      const currentTaxImpact = response.data.taxImpact;
      setTaxImpact(currentTaxImpact);
      setInvestmentDetails(formData);

      setInvestmentHistory(prevHistory => [
        ...prevHistory,
        { ...formData, taxImpact: currentTaxImpact }
      ]);

      setTotalTaxes(prevTotal => prevTotal + currentTaxImpact);

    }
    
    // Here you can send formData to the backend
    catch (error) {
      console.error('Error calculating tax impact:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Investment and Tax Calculator</h1>
      <InvestmentForm onSubmit={handleFormSubmit} />

      {taxImpact !== null && investmentDetails && (
        <div className="dashboard">
          <h2 className="summary-header">Investment Summary</h2>
          <p className="summary-text"><strong>Income:</strong> ₹{investmentDetails.income}</p>
          <p className="summary-text"><strong>Investment Type:</strong> {investmentDetails.investmentType}</p>
          <p className="summary-text"><strong>Investment Amount:</strong> ₹{investmentDetails.investmentAmount}</p>
          <h3 className="tax-impact">Calculated Tax Impact: ₹{taxImpact.toFixed(2)}</h3>
        </div>
      )}

      {/* Display investment history */}
      {investmentHistory.length > 0 && (
        <div className="investment-history">
          <h2 className="history-header">Investment History</h2>
          <table className="history-table">
            <thead>
              <tr>
                <th>Income</th>
                <th>Investment Type</th>
                <th>Investment Amount</th>
                <th>Tax Impact</th>
              </tr>
            </thead>
            <tbody>
              {investmentHistory.map((investment, index) => (
                <tr key={index}>
                  <td>{investment.income}</td>
                  <td>{investment.investmentType}</td>
                  <td>{investment.investmentAmount}</td>
                  <td>{investment.taxImpact.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Display total taxes */}
      <div className="total-taxes">
        <h2 className="total-taxes-header">Total Taxes Up to Now</h2>
        <p className="total-taxes-amount">₹{totalTaxes.toFixed(2)}</p>
      </div>

      {/* Display tax impact chart */}
      {investmentHistory.length > 0 && <TaxImpactChart investmentHistory={investmentHistory} />}
    </div>
    
  );
}

export default App;
