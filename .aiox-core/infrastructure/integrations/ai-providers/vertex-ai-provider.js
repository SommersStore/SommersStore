const https = require('https');
const { AIProvider } = require('./ai-provider');

/**
 * Vertex AI / Gemini Provider using API Key from Google AI Studio.
 * 
 * Uses the Generative Language API (generativelanguage.googleapis.com)
 * with an API key linked to the Google Cloud project "projeto-protheus"
 * to consume the $300 GCP credits from Account B.
 * 
 * @class VertexAIProvider
 * @extends AIProvider
 */
class VertexAIProvider extends AIProvider {
  /**
   * Create a Vertex AI provider
   * @param {Object} [config={}] - Provider configuration
   * @param {string} [config.apiKey] - Gemini API Key (from AI Studio, linked to GCP project)
   * @param {string} [config.model='gemini-2.5-flash'] - Model ID
   */
  constructor(config = {}) {
    super({
      name: 'vertex',
      timeout: config.timeout || 300000,
      maxRetries: config.maxRetries || 3,
      options: {
        ...config,
        apiKey: process.env.GEMINI_CREDITS_API_KEY || process.env.GOOGLE_API_KEY || config.apiKey,
        model: process.env.VERTEX_MODEL_ID || config.model || 'gemini-2.5-flash',
        projectId: process.env.VERTEX_PROJECT_ID || config.projectId || 'projeto-protheus',
      },
    });
  }

  /**
   * Check if provider is available (API key present)
   */
  async checkAvailability() {
    if (!this.options.apiKey) {
      this.isAvailable = false;
      this.lastError = new Error('GEMINI_CREDITS_API_KEY not set');
      return false;
    }

    try {
      // Quick validation: list models to see if key works
      const result = await this._request('GET', '/v1beta/models?pageSize=1');
      this.isAvailable = result.status === 200;
      this.version = 'v1beta';
      if (!this.isAvailable) {
        this.lastError = new Error(`API key validation failed (${result.status})`);
      }
      return this.isAvailable;
    } catch (error) {
      this.isAvailable = false;
      this.lastError = error;
      return false;
    }
  }

  /**
   * Execute a prompt using Gemini API with API Key
   */
  async execute(prompt, options = {}) {
    const startTime = Date.now();
    const model = options.model || this.options.model;

    const payload = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        maxOutputTokens: options.maxTokens || 2048,
        temperature: options.temperature || 0.7
      }
    };

    const result = await this._request(
      'POST',
      `/v1beta/models/${model}:generateContent`,
      payload
    );

    const duration = Date.now() - startTime;

    if (result.status === 200) {
      try {
        const json = JSON.parse(result.body);
        const text = json.candidates[0].content.parts
          .map(p => p.text)
          .join('');

        return {
          success: true,
          output: text.trim(),
          metadata: {
            duration,
            provider: 'vertex',
            model,
            projectId: this.options.projectId,
            creditsUsed: true
          }
        };
      } catch (e) {
        throw new Error(`Failed to parse Gemini response: ${e.message}`);
      }
    } else {
      let errorMsg = `Gemini API Error (${result.status})`;
      try {
        const err = JSON.parse(result.body);
        errorMsg += `: ${err.error?.message || result.body.substring(0, 200)}`;
      } catch (e) {
        errorMsg += `: ${result.body.substring(0, 200)}`;
      }
      throw new Error(errorMsg);
    }
  }

  /**
   * Internal HTTPS request helper
   */
  _request(method, path, payload) {
    return new Promise((resolve, reject) => {
      const data = payload ? JSON.stringify(payload) : null;
      const separator = path.includes('?') ? '&' : '?';
      const fullPath = `${path}${separator}key=${this.options.apiKey}`;

      const opts = {
        hostname: 'generativelanguage.googleapis.com',
        port: 443,
        path: fullPath,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
        }
      };

      const req = https.request(opts, (res) => {
        let body = '';
        res.on('data', d => body += d);
        res.on('end', () => resolve({ status: res.statusCode, body }));
      });
      req.on('error', reject);
      if (data) req.write(data);
      req.end();
    });
  }
}

module.exports = { VertexAIProvider };
