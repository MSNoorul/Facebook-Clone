
const fs = require('fs');
const path = require('path');

function envConfig(){
// Read the .env file
const envPath = path.resolve(__dirname, '../../.env');
const envFile = fs.readFileSync(envPath, 'utf8');

// Parse the .env file and set environment variables
const lines = envFile.split('\n');
lines.forEach(line => {
  const index = line.indexOf('=');
  let key = line.slice(0,index).trim(); // most remove unwanted space otherwivse key store properly in process.env obj
  let value = line.slice(index+1).trim();// most remove unwanted space otherwivse uri not work
  process.env[key] = value;
});
}

module.exports = envConfig ;
