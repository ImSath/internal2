// server.js
const http = require('http');
const url = require('url');

const PORT = 4000;

const server = http.createServer((req, res) => {

  console.log('Received request:', req.method, req.url);

  const parsedUrl = url.parse(req.url, true);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  
  // Only process POST requests to "/calculate-tax"
  if (req.method === 'POST' && parsedUrl.pathname === '/calculate-tax') {
    let body = '';

    // Gather the incoming data
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { income, investmentType, investmentAmount } = JSON.parse(body);

      // Dummy tax calculation logic
      const taxImpact = calculateTaxImpact(income, investmentType, investmentAmount);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ taxImpact }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Example function to calculate tax impact
function calculateTaxImpact(income, investmentType, investmentAmount) {
  let taxImpact = 0;

  // Simple calculation based on investment type
  if (investmentType === 'stocks') {
    taxImpact = investmentAmount * 0.15; // Assume 15% tax on stocks
  } else if (investmentType === 'bonds') {
    taxImpact = investmentAmount * 0.10; // Assume 10% tax on bonds
  } else if (investmentType === 'real-estate') {
    taxImpact = investmentAmount * 0.20; // Assume 20% tax on real estate
  }

  // Modify taxImpact based on income (simple example)
  if (income > 50000) {
    taxImpact += income * 0.05;
  }

  return taxImpact;
}

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});
