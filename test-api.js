const { GeminiProvider } = require('./.aiox-core/infrastructure/integrations/ai-providers/gemini-provider');
const fs = require('fs');
const path = require('path');

async function test() {
  const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
  const lines = envContent.split('\n');
  for (const line of lines) {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  }
  
  const provider = new GeminiProvider({
    model: 'gemini-2.0-flash'
  });

  console.log('--- Testing Gemini Connectivity ---');
  try {
    const response = await provider.execute('Hello, please respond with "Hello World" if you are working correctly.');
    console.log('Response:', response.output);
    console.log('Success:', response.success);
  } catch (error) {
    console.error('Error during test:', error.message);
  }
}

test();
