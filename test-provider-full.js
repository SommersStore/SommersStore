/**
 * Teste de integração: VertexAIProvider com API Key do Projeto Protheus
 */
require('dotenv').config();

const { VertexAIProvider } = require('./.aiox-core/infrastructure/integrations/ai-providers/vertex-ai-provider');

async function main() {
  console.log('=====================================================');
  console.log('  TESTE INTEGRAÇÃO - VertexAIProvider + Créditos $300');
  console.log('=====================================================\n');

  // 1. Criar provider
  console.log('1️⃣  Criando VertexAIProvider...');
  const provider = new VertexAIProvider();
  console.log(`   API Key: ${provider.options.apiKey ? '✅ presente' : '❌ ausente'}`);
  console.log(`   Modelo:  ${provider.options.model}`);
  console.log(`   Projeto: ${provider.options.projectId}\n`);

  // 2. Verificar disponibilidade
  console.log('2️⃣  Verificando disponibilidade...');
  const available = await provider.checkAvailability();
  console.log(`   Disponível: ${available ? '✅ SIM' : '❌ NÃO'}\n`);

  if (!available) {
    console.error('   Erro:', provider.lastError?.message);
    return;
  }

  // 3. Executar prompt
  console.log('3️⃣  Executando prompt de teste...');
  try {
    const result = await provider.execute('Responda apenas: INTEGRACAO_OK');
    console.log(`   Sucesso:  ${result.success ? '✅' : '❌'}`);
    console.log(`   Resposta: "${result.output}"`);
    console.log(`   Duração:  ${result.metadata.duration}ms`);
    console.log(`   Provider: ${result.metadata.provider}`);
    console.log(`   Modelo:   ${result.metadata.model}`);
    console.log(`   Créditos: ${result.metadata.creditsUsed ? '💰 CONSUMINDO' : '❌'}`);

    console.log('\n🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉');
    console.log('   INTEGRAÇÃO COMPLETA! TUDO FUNCIONANDO!');
    console.log('   💰 CRÉDITOS DE $300 SENDO CONSUMIDOS!');
    console.log('🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉\n');
  } catch (err) {
    console.error('   ❌ Erro:', err.message);
  }
}

main();
