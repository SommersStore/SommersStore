# Anti-Gravity — Orientação Estratégica para Evolução do Sistema de Memória

## Status deste documento
Este documento **substitui integralmente** a versão anterior.

A diretriz central passa a ser a seguinte:

> A memória do Anti-Gravity não deve ser baseada apenas em resumos curtos. Ela deve operar em **camadas**, separando leitura rápida, histórico detalhado, decisões, evidências e artefatos de implementação.

---

# 1. Objetivo

O objetivo desta orientação é propor uma evolução do sistema de memória do Anti-Gravity para que ele funcione de modo mais confiável em projetos longos, com múltiplas fases, agentes, skills, documentos, alterações estruturais e retomadas frequentes.

A proposta não é apenas “melhorar a aba Memory”.
A proposta é transformar a memória em **infraestrutura operacional de continuidade**.

Essa evolução deve permitir que o Anti-Gravity:

- retome contexto sem superficialidade;
- preserve inteligência acumulada do projeto;
- registre decisões e justificativas;
- mantenha histórico detalhado do que foi feito;
- vincule memória aos documentos e implementações produzidas;
- reduza regressão, retrabalho e perda de coerência;
- diferencie o que é contexto imediato do que é memória profunda.

---

# 2. Diagnóstico do problema atual

O modelo atual baseado em resumos muito pequenos pode até ajudar na reidratação rápida, mas tende a falhar em projetos que exigem:

- continuidade entre sessões;
- entendimento de decisões antigas;
- recuperação após travamentos;
- preservação de implementações e artefatos;
- auditoria do que foi alterado;
- coordenação entre BUILD, OPS e CONTROL.

O problema não é a existência de resumos.
O problema é usar o resumo curto como **memória principal**.

Resumo curto é útil como camada de acesso rápido.
Mas ele não é suficiente para sustentar memória arquitetural, memória decisional e memória de execução.

---

# 3. Princípio central

A memória do Anti-Gravity deve ser reestruturada em **camadas hierárquicas**.

Em termos conceituais:

- uma camada funciona como o “consciente operacional”;
- outra funciona como “memória profunda consultável”;
- outra registra decisões e racional;
- outra preserva evidências e artefatos gerados.

Isso evita dois extremos igualmente ruins:

## Extremo 1 — memória superficial demais
Rápida, mas frágil.

Consequências:
- perda de justificativa;
- simplificação excessiva;
- retomadas imprecisas;
- regressão silenciosa.

## Extremo 2 — memória monolítica demais
Completa, mas pesada e pouco utilizável.

Consequências:
- lentidão de recuperação;
- dificuldade de localizar o que importa agora;
- excesso de contexto irrelevante;
- confusão entre estado atual e histórico antigo.

A solução madura é **memória em níveis**.

---

# 4. Arquitetura recomendada

A memória deve ser organizada em **4 níveis principais** e **2 camadas auxiliares**.

## Nível 1 — Memória Ativa

É a camada que o sistema deve ler primeiro.
Ela responde à pergunta:

> “O que eu preciso saber agora para continuar sem me perder?”

### Conteúdo mínimo
- estado atual do projeto;
- fase atual de BUILD;
- estágio atual de OPS;
- tarefa corrente;
- último evento relevante;
- próximos passos imediatos;
- bloqueios e riscos ativos;
- decisão mais recente ainda vigente.

### Função
Fornecer contexto operacional imediato.

### Requisito
Deve ser curta, clara e objetiva.
Não deve tentar conter todo o histórico.

### Nome sugerido
`memory_current_state.json`

### Estrutura sugerida
```json
{
  "project": "",
  "build_phase": "",
  "ops_stage": "",
  "active_goal": "",
  "active_task": "",
  "last_relevant_event": "",
  "current_owner": "",
  "next_actions": [],
  "open_blockers": [],
  "active_risks": [],
  "latest_active_decision_id": "",
  "updated_at": ""
}
```

---

## Nível 2 — Memória Decisional

É a camada que responde:

> “O que já foi decidido, por qual motivo, e o que não deve ser refeito ou contradito sem justificativa?”

### Conteúdo mínimo
- decisão tomada;
- contexto;
- motivo;
- alternativas rejeitadas;
- impacto esperado;
- risco aceito;
- condição de revisão;
- vínculo com incidentes, approvals ou artefatos.

### Função
Evitar contradições, retrocessos e retrabalho.

### Nome sugerido
`memory_decision_log.json`

### Estrutura sugerida
```json
{
  "items": [
    {
      "id": "DEC-0001",
      "timestamp": "",
      "category": "architectural",
      "context": "",
      "decision": "",
      "rationale": "",
      "alternatives_rejected": [],
      "expected_impact": "",
      "accepted_risks": [],
      "review_trigger": "",
      "owner": "",
      "status": "active",
      "linked_artifacts": [],
      "linked_events": []
    }
  ]
}
```

---

## Nível 3 — Memória de Execução Profunda

É a camada factual do trabalho realizado.
Ela responde:

> “O que foi tentado, executado, corrigido, refeito ou interrompido?”

### Conteúdo mínimo
- execução iniciada;
- execução concluída, falha ou rerun;
- agente, squad e skill acionados;
- input resumido;
- output resumido;
- arquivos alterados;
- incidentes associados;
- correlação com estado e decisão.

### Função
Criar rastreabilidade operacional real.

### Nome sugerido
`memory_execution_journal.json`

### Estrutura sugerida
```json
{
  "items": [
    {
      "id": "RUN-0001",
      "timestamp_start": "",
      "timestamp_end": "",
      "actor": "",
      "squad": "",
      "skill": "",
      "module": "",
      "input_summary": "",
      "output_summary": "",
      "result": "success",
      "error_code": "",
      "error_message": "",
      "rerun_of": "",
      "files_touched": [],
      "artifacts_generated": [],
      "linked_decisions": [],
      "linked_incidents": [],
      "correlation_id": ""
    }
  ]
}
```

---

## Nível 4 — Memória de Artefatos e Implementações

É a camada que preserva o que foi efetivamente produzido.
Ela responde:

> “Onde está a implementação real, o documento, a especificação, a entrega ou o arquivo que materializa a memória?”

### Conteúdo mínimo
- documentos gerados;
- versões relevantes;
- arquivos alterados;
- entregáveis finais;
- especificações de projeto;
- material de apoio usado para retomada.

### Função
Impedir que a memória seja apenas narrativa.

### Requisito
Todo artefato importante deve ser indexado e ligado ao histórico e às decisões.

### Estrutura recomendada
Pasta de artefatos + índice.

### Nomes sugeridos
- `artifacts/`
- `memory_artifact_index.json`

### Estrutura sugerida do índice
```json
{
  "items": [
    {
      "id": "ART-0001",
      "title": "",
      "type": "document",
      "path": "",
      "version": "",
      "status": "active",
      "summary": "",
      "generated_by": "",
      "generated_at": "",
      "linked_decisions": [],
      "linked_runs": [],
      "linked_modules": []
    }
  ]
}
```

---

## Camada auxiliar A — Loops Abertos

### Função
Manter pendências visíveis.

### Conteúdo mínimo
- tarefa interrompida;
- decisão pendente;
- dependência externa;
- validação aguardando aprovação;
- risco de esquecimento.

### Nome sugerido
`memory_open_loops.json`

---

## Camada auxiliar B — Checkpoints de Retomada

### Função
Permitir retomada limpa após travamento, pausa ou troca de contexto.

### Conteúdo mínimo
- onde parou;
- o que foi concluído;
- o que não deve ser refeito;
- próxima ação exata;
- riscos ativos;
- arquivos afetados.

### Nome sugerido
`memory_checkpoints.json`

---

# 5. Leitura em cascata

A memória deve ser lida em cascata, e não toda de uma vez.

## Ordem recomendada de leitura

### Leitura de primeiro nível
Usada antes de agir.

1. `memory_current_state.json`
2. `memory_open_loops.json`
3. último item relevante de `memory_checkpoints.json`
4. último resumo executivo de decisões ativas

### Leitura de segundo nível
Usada quando há necessidade de contexto ampliado.

5. `memory_decision_log.json`
6. `memory_execution_journal.json`
7. `memory_artifact_index.json`

### Leitura de terceiro nível
Usada quando há investigação, retomada profunda, rollback ou auditoria.

8. artefatos completos em `artifacts/`
9. histórico detalhado associado
10. incidents, alerts, approvals e logs correlatos

---

# 6. Regra de ouro da atualização

Toda mutação relevante do sistema deve gerar, no mínimo, os seguintes efeitos:

1. atualizar o estado atual;
2. registrar evidência da execução;
3. registrar decisão, se houve escolha relevante;
4. atualizar loops abertos, se necessário;
5. criar checkpoint quando a mudança for crítica;
6. vincular qualquer artefato gerado ao índice de artefatos.

Sem isso, a execução ocorreu, mas a memória ficou incompleta.

---

# 7. Relação com BUILD, OPS e CONTROL

## BUILD
Mudanças de fase em BUILD devem atualizar:
- memória ativa;
- log de execução;
- decisões, quando houver mudança de rota;
- checkpoint, quando a transição for sensível.

## OPS
Mudanças de estágio em OPS devem atualizar:
- memória ativa;
- loops abertos;
- evidência de execução;
- alertas ou incidentes, se houver anomalia.

## CONTROL
CONTROL não deve depender de preenchimento manual.
Ele deve refletir eventos reais derivados da operação.

### Exemplo de vínculo
- falha -> `incidents.json`
- divergência -> `alerts.json`
- reexecução -> `reruns.json`
- decisão sensível -> `approvals.json`
- mutação importante -> `execution_log.json`

---

# 8. O que precisa mudar na concepção da aba Memory

A aba Memory não deve ser apenas um campo de texto resumido.
Ela deve atuar como **portal de memória composta**.

Ela precisa ser capaz de exibir, no mínimo:

- resumo executivo atual;
- última decisão ativa;
- loops críticos abertos;
- último checkpoint;
- links para decisões detalhadas;
- links para artefatos relevantes;
- indicadores de divergência ou desatualização.

A mudança-chave é esta:

> A Memory deve deixar de ser apenas resumo e passar a ser índice, síntese e ponto de entrada para as demais camadas.

---

# 9. Comportamentos que devem ser evitados

## 9.1. Apagar profundidade em nome de concisão
Resumo não pode destruir memória útil.

## 9.2. Misturar estado atual com histórico antigo
Isso confunde retomada e priorização.

## 9.3. Gerar artefatos sem indexá-los
Documento sem vínculo some da memória operacional.

## 9.4. Tomar decisão sem registrar racional
Depois o sistema repete discussões já resolvidas.

## 9.5. Corrigir algo sem produzir evidência
A alteração passa a existir, mas sem explicação auditável.

---

# 10. Modelo mental recomendado

O Anti-Gravity deve passar a operar com o seguinte modelo mental:

## Consciência operacional
Leitura curta e imediata para agir rápido.

## Memória profunda
Histórico detalhado para manter inteligência acumulada.

## Memória decisional
Registro do porquê das escolhas.

## Memória materializada
Artefatos e implementações que provam o trabalho realizado.

Esse modelo é muito mais robusto do que um sistema baseado apenas em pequenos resumos.

---

# 11. Critério de maturidade

O sistema de memória será considerado maduro quando o Anti-Gravity conseguir:

- retomar um projeto sem depender de conversa anterior;
- explicar por que determinada decisão foi tomada;
- localizar rapidamente a implementação correspondente;
- diferenciar estado atual de histórico;
- reconstruir uma execução falha;
- apontar o próximo passo exato sem simplificação excessiva;
- manter resumos curtos sem sacrificar profundidade armazenada.

---

# 12. Instrução final ao Anti-Gravity

Implemente uma evolução do sistema de memória do painel seguindo a seguinte diretriz obrigatória:

> Substituir o modelo de memória centrado em resumos curtos por uma arquitetura em camadas composta por memória ativa, memória decisional, memória de execução profunda, memória de artefatos, loops abertos e checkpoints de retomada.

Requisitos obrigatórios:

1. preservar leitura rápida sem perder profundidade;
2. vincular memória aos artefatos reais do projeto;
3. atualizar memória a cada mutação relevante;
4. integrar memória com BUILD, OPS e CONTROL;
5. permitir retomada, auditoria, correção e continuidade sem superficialidade.

---

# 13. Resultado esperado

Ao final da implementação, o Anti-Gravity não deve apenas “lembrar um resumo”.
Ele deve operar com:

- **contexto executivo imediato** para agir;
- **memória profunda** para não perder inteligência acumulada;
- **decisão registrada** para evitar regressão;
- **evidência rastreável** para auditoria;
- **artefatos indexados** para continuidade real do projeto.

Esse é o modelo recomendado para um ambiente que pretende funcionar como sistema de trabalho contínuo e não apenas como interface de conversação.
