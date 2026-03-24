const fs = require('fs');
const path = require('path');
const https = require('https');

async function testGeminiDirect() {
  console.log('--- Testing Gemini API Content Generation ---');
  
  // Load .env
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) {
    console.error('Error: .env file not found');
    return;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const env = {};
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim();
  });

  const apiKey = env.GEMINI_API_KEY || env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error('Error: GEMINI_API_KEY or GOOGLE_API_KEY not found in .env');
    return;
  }

  console.log(`Using API Key: ${apiKey.substring(0, 8)}...`);

  // Try to generate content with a common model
  const data = JSON.stringify({
    contents: [{
      parts: [{ text: "Respond 'OK' if you can read this." }]
    }]
  });

  const options = {
    hostname: 'generativelanguage.googleapis.com',
    port: 443,
    path: `/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (d) => body += d);
    res.on('end', () => {
      console.log(`Status Code: ${res.statusCode}`);
      try {
        const response = JSON.parse(body);
        if (res.statusCode === 200) {
          console.log('SUCCESS: Gemini API generated content successfully!');
          console.log('Response:', response.candidates[0].content.parts[0].text.trim());
        } else {
          console.error('API Error:', response.error ? response.error.message : body);
          if (body.includes('quota') || body.includes('upgrade') || body.includes('billing')) {
            console.log('\n--- DIAGNOSIS ---');
            console.log('This key is hitting a limit. You need to enable Billing for this project in Google AI Studio.');
          }
        }
      } catch (e) {
        console.error('Parse Error:', e.message);
        console.log('Raw Body:', body);
      }
    });
  });

  req.on('error', (e) => {
    console.error('Request Error:', e.message);
  });

  req.write(data);
  req.end();
}

testGeminiDirect();
