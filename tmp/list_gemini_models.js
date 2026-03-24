const https = require('https');

const apiKey = 'AIzaSyCHyr1d1pneY1xEhzKP7NAV-1Y1_NoDCBo';
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

const req = https.get(url, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Body: ${body}`);
    process.exit(0);
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
  process.exit(1);
});
