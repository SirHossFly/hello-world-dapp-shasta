require('dotenv').config();
const fs = require('fs');

const contractAddress = "THLkaX1QYbowxm53f4q96DeefMn3eBxrAZ"; // Hardcoded for now
const tronGridApiKey = process.env.TRONGRID_API_KEY || "your-trongrid-api-key";

const configContent = `
window.AppConfig = {
  contractAddress: "${contractAddress}",
  tronGridApiKey: "${tronGridApiKey}"
};
`;

fs.writeFileSync('frontend/config.js', configContent.trim());
console.log('Generated frontend/config.js with contract address:', contractAddress, 'and API key:', tronGridApiKey);
console.log('WARNING: frontend/config.js contains sensitive data (API key). Ensure it is not committed to GitHub. It is already added to .gitignore.');