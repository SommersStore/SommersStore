const { VertexAIProvider } = require('./.aiox-core/infrastructure/integrations/ai-providers/vertex-ai-provider');
require('dotenv').config();
async function run() {
  const provider = new VertexAIProvider({ model: 'gemini-1.5-flash-001' });
  const ok = await provider.checkAvailability();
  console.log("Available:", ok, "LastError:", provider.lastError);
  if (ok) {
    const result = await provider.execute("say hi");
    console.log("Result:", result.output);
  }
}
run().catch(console.error);
