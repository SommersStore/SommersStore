# Anti-Gravity — Plano de Implantação da Memória em Camadas

## Status deste documento
Este documento **substitui integralmente** a versão anterior.

Ele descreve a implantação prática de um sistema de memória em camadas para o Anti-Gravity, com foco em continuidade operacional, preservação de profundidade, governança de decisões, rastreabilidade de execução e indexação de artefatos.

---

# 1. Objetivo de implantação

Implantar uma arquitetura de memória que resolva a limitação de resumos superficiais e permita ao Anti-Gravity operar com dois comportamentos simultâneos:

1. agir com rapidez a partir de um resumo executivo enxuto;
2. preservar memória profunda suficiente para sustentar projetos longos e complexos.

A implantação deve produzir um sistema com:

- memória ativa para leitura imediata;
- memória profunda para histórico detalhado;
- decisões registradas com racional;
- evidências de execução vinculadas ao que realmente ocorreu;
- artefatos indexados e localizáveis;
- loops abertos e checkpoints para retomada segura.

---

# 2. Resultado-alvo

Ao final da implantação, o Anti-Gravity deverá operar com a seguinte arquitetura:

## Núcleo de leitura rápida
- `memory_current_state.json`
- `memory_open_loops.json`
- `memory_checkpoints.json` (último checkpoint relevante)

## Núcleo de profundidade
- `memory_decision_log.json`
- `memory_execution_journal.json`
- `memory_artifact_index.json`
- pasta `artifacts/`

## Núcleo de controle correlato
- `alerts.json`
- `incidents.json`
- `reruns.json`
- `approvals.json`
- `execution_log.json`

---

# 3. Estrutura de arquivos recomendada

```text
docs/control/
  memory_current_state.json
  memory_open_loops.json
  memory_checkpoints.json
  memory_decision_log.json
  memory_execution_journal.json
  memory_artifact_index.json
  alerts.json
  incidents.json
  reruns.json
  approvals.json
  execution_log.json

artifacts/
  build/
  ops/
  strategy/
  implementation/
  reports/
  recovery/
```

---

# 4. Modelo de dados por componente

## 4.1. memory_current_state.json

### Finalidade
Representar o estado operacional atual do projeto.

### Schema recomendado
```json
{
  "project": "",
  "build_phase": "",
  "ops_stage": "",
  "active_goal": "",
  "active_task": "",
  "deliverable_in_progress": "",
  "current_owner": "",
  "last_relevant_event": "",
  "next_actions": [],
  "open_blockers": [],
  "active_risks": [],
  "latest_active_decision_id": "",
  "latest_checkpoint_id": "",
  "updated_at": ""
}
```

### Regra
Esse arquivo deve ser curto e sempre refletir o presente.
Não usar como depósito de histórico antigo.

---

## 4.2. memory_open_loops.json

### Finalidade
Manter tudo o que está pendente, aberto, bloqueado ou aguardando validação.

### Schema recomendado
```json
{
  "items": [
    {
      "id": "LOOP-0001",
      "title": "",
      "description": "",
      "category": "validation",
      "origin": "build",
      "priority": "high",
      "status": "open",
      "owner": "",
      "depends_on": [],
      "risk_if_ignored": "",
      "due_at": "",
      "opened_at": "",
      "updated_at": "",
      "linked_decisions": [],
      "linked_runs": [],
      "linked_artifacts": []
    }
  ]
}
```

---

## 4.3. memory_checkpoints.json

### Finalidade
Criar pontos de retomada claros e operáveis.

### Schema recomendado
```json
{
  "items": [
    {
      "id": "CHK-0001",
      "timestamp": "",
      "title": "",
      "where_it_stopped": "",
      "completed_since_last_checkpoint": [],
      "do_not_repeat": [],
      "next_exact_action": "",
      "active_risks": [],
      "affected_files": [],
      "linked_loops": [],
      "linked_decisions": [],
      "recovery_instruction": ""
    }
  ]
}
```

### Regra
Checkpoint não deve ser genérico.
Ele precisa dizer exatamente de onde retomar.

---

## 4.4. memory_decision_log.json

### Finalidade
Registrar decisões com justificativa e impacto.

### Schema recomendado
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
      "reversible": true,
      "rollback_plan": "",
      "review_trigger": "",
      "owner": "",
      "status": "active",
      "linked_artifacts": [],
      "linked_runs": [],
      "linked_approvals": []
    }
  ]
}
```

### Regra
Decisões importantes não podem existir apenas no texto corrido da aba Memory.

---

## 4.5. memory_execution_journal.json

### Finalidade
Registrar a trilha detalhada de execução.

### Schema recomendado
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
      "entity": "",
      "action": "",
      "input_summary": "",
      "output_summary": "",
      "result": "success",
      "error_code": "",
      "error_message": "",
      "files_touched": [],
      "artifacts_generated": [],
      "rerun_of": "",
      "linked_incidents": [],
      "linked_decisions": [],
      "correlation_id": ""
    }
  ]
}
```

### Regra
Esse arquivo deve ser detalhado o suficiente para auditoria e recuperação.

---

## 4.6. memory_artifact_index.json

### Finalidade
Indexar o que foi materializado em forma de documento, implementação ou entrega.

### Schema recomendado
```json
{
  "items": [
    {
      "id": "ART-0001",
      "title": "",
      "type": "document",
      "path": "artifacts/strategy/spec_v1.md",
      "module": "strategy",
      "version": "v1",
      "status": "active",
      "summary": "",
      "generated_by": "",
      "generated_at": "",
      "supersedes": "",
      "linked_runs": [],
      "linked_decisions": [],
      "linked_checkpoints": []
    }
  ]
}
```

### Regra
Todo artefato relevante deve ser indexado. Nada importante deve existir “solto”.

---

# 5. Fluxo operacional obrigatório

Toda mutação relevante deve acionar a seguinte sequência:

## Fluxo-padrão
1. executar ação;
2. registrar evidência em `memory_execution_journal.json` e `execution_log.json`;
3. atualizar `memory_current_state.json`;
4. registrar decisão em `memory_decision_log.json`, se houver escolha relevante;
5. atualizar `memory_open_loops.json`, se surgir pendência;
6. criar checkpoint, se a mudança for crítica;
7. indexar artefatos gerados em `memory_artifact_index.json`.

Essa sequência torna a memória confiável.

---

# 6. Gatilhos automáticos por evento

## 6.1. Quando BUILD mudar de fase
Executar automaticamente:
- atualizar estado atual;
- registrar evento;
- verificar se a transição foi planejada ou inesperada;
- registrar decisão se a mudança implicar escolha estrutural;
- criar checkpoint se a fase encerrar um bloco importante;
- indexar artefatos produzidos na fase.

## 6.2. Quando OPS mudar de estágio
Executar automaticamente:
- atualizar estado atual;
- registrar log e evidência;
- abrir alerta se houver salto indevido;
- abrir incidente se houver regressão, quebra ou falha crítica;
- atualizar loops abertos;
- gerar checkpoint em mudança operacional sensível.

## 6.3. Quando houver criação ou alteração de artefato
Executar automaticamente:
- registrar a ação no execution journal;
- inserir ou atualizar item no artifact index;
- vincular o artefato a decisões, runs e checkpoints relacionados;
- atualizar estado, se o artefato representar avanço real de fase.

## 6.4. Quando houver decisão sensível
Executar automaticamente:
- criar item no decision log;
- abrir approval se a decisão exigir validação manual;
- atualizar estado atual com a nova decisão vigente;
- refletir impacto em loops, artefatos e próximos passos.

## 6.5. Quando houver falha
Executar automaticamente:
- criar evidência de erro;
- abrir incidente;
- atualizar loops abertos;
- gerar checkpoint de recuperação;
- atualizar estado com risco ativo;
- abrir rerun quando houver reexecução.

---

# 7. Regras de emissão para CONTROL

## 7.1. alerts.json
Gerar alerta quando:
- houver divergência entre o estado esperado e o estado atual;
- um artefato crítico ficar sem indexação;
- uma decisão ativa entrar em conflito com outra;
- um agente agir fora da sua responsabilidade;
- um resumo executivo perder sincronização com a memória profunda.

## 7.2. incidents.json
Gerar incidente quando:
- uma execução falhar;
- houver regressão de fase;
- ocorrer perda de integridade em arquivo crítico;
- um rerun não recuperar o sistema;
- a retomada ocorrer com checkpoint desatualizado.

## 7.3. reruns.json
Gerar rerun quando:
- uma execução for repetida após falha;
- houver rollback e nova tentativa;
- o sistema refizer uma operação já concluída.

## 7.4. approvals.json
Gerar approval quando:
- a decisão for irreversível ou sensível;
- houver exclusão ou sobrescrita de artefato importante;
- uma mudança de rumo estratégico precisar de confirmação;
- uma regressão planejada exigir autorização explícita.

## 7.5. execution_log.json
Registrar toda mutação importante com correlation_id para facilitar rastreio cruzado entre logs, decisões, incidentes e artefatos.

---

# 8. Política de leitura da memória

## Leitura antes da ação
O agente deve ler nesta ordem:

1. `memory_current_state.json`
2. `memory_open_loops.json`
3. último checkpoint relevante
4. decisão ativa mais recente

## Leitura ampliada quando necessário
Ler também:

5. decisões correlatas;
6. runs recentes do execution journal;
7. artifact index correspondente ao módulo em questão.

## Leitura profunda em caso de auditoria ou retomada crítica
Ler também:

8. artefatos completos relacionados;
9. incidentes, reruns e approvals associados;
10. histórico amplo do módulo.

---

# 9. Política de compressão sem perda de profundidade

A memória curta deve continuar existindo, mas apenas como camada executiva.

## Regra obrigatória
Nunca reduzir a profundidade armazenada ao criar resumo.

### O que pode ser resumido
- estado atual;
- próximos passos;
- riscos mais urgentes;
- decisão ativa dominante.

### O que não pode ser descartado
- racional de decisões;
- histórico de execução;
- checkpoints antigos relevantes;
- artefatos e versões;
- incidentes e reruns;
- justificativas de rollback.

---

# 10. Migração do modelo atual para o modelo novo

## Etapa 1 — Inventário
Mapear o que já existe em:
- Memory atual;
- execution_log.json;
- build_state.json;
- ops_state.json;
- alerts, incidents, reruns e approvals;
- documentos e implementações já gerados.

## Etapa 2 — Separação de conteúdo
Classificar o material existente em:
- estado atual;
- decisões;
- histórico de execução;
- loops abertos;
- checkpoints;
- artefatos.

## Etapa 3 — Criação dos novos arquivos
Criar os 6 arquivos-base da nova arquitetura.

## Etapa 4 — Reidratação inicial
Preencher os arquivos com o melhor estado consolidado disponível.

## Etapa 5 — Indexação de artefatos antigos
Cadastrar documentos, implementações e relatórios anteriores no `memory_artifact_index.json`.

## Etapa 6 — Ativação dos gatilhos
Conectar BUILD, OPS e execução de agentes à nova política de atualização.

## Etapa 7 — Teste de retomada
Simular pausa, falha e retomada para validar a arquitetura.

---

# 11. Critérios de aceite

A implantação só será considerada concluída quando todos os itens abaixo forem verdadeiros.

## 11.1. Estado atual confiável
É possível abrir `memory_current_state.json` e entender imediatamente:
- onde o projeto está;
- o que está em andamento;
- qual o próximo passo;
- quais riscos estão ativos.

## 11.2. Decisões rastreáveis
Toda decisão relevante recente possui:
- id;
- contexto;
- rationale;
- vínculo com o que foi alterado.

## 11.3. Retomada real
Após interrupção, o sistema consegue retomar por checkpoint sem reiniciar raciocínio do zero.

## 11.4. Artefatos localizáveis
Todo documento ou implementação importante possui entrada no artifact index.

## 11.5. Logs correlacionados
Execuções, incidentes, approvals e reruns conseguem ser cruzados por id ou correlation_id.

## 11.6. CONTROL alimentado por eventos
CONTROL reflete a operação real, e não preenchimento artificial.

## 11.7. Resumo sem superficialidade estrutural
O resumo executivo é curto, mas a memória profunda permanece preservada e acessível.

---

# 12. Testes de validação

## Teste A — Retomada simples
1. executar uma alteração pequena;
2. gerar checkpoint;
3. interromper o fluxo;
4. retomar usando apenas estado atual + checkpoint.

### Resultado esperado
O sistema retoma corretamente sem reinventar a tarefa.

## Teste B — Retomada profunda
1. executar uma sequência com múltiplas decisões;
2. produzir artefatos;
3. interromper;
4. pedir auditoria do porquê das decisões.

### Resultado esperado
O sistema consegue explicar o racional e localizar os artefatos correspondentes.

## Teste C — Falha e rerun
1. provocar falha controlada;
2. verificar incidente;
3. rerodar;
4. verificar fechamento ou atualização do incidente.

### Resultado esperado
A memória registra a falha, a recuperação e o novo estado.

## Teste D — Artefato sem indexação
1. criar artefato fora do fluxo;
2. validar geração de alerta.

### Resultado esperado
O sistema sinaliza que existe produção sem registro adequado.

## Teste E — Conflito decisional
1. registrar decisão A;
2. registrar decisão B contraditória sem encerrar A.

### Resultado esperado
O sistema cria alerta ou approval para resolver conflito.

---

# 13. Anti-padrões proibidos

- usar a aba Memory como único repositório da inteligência do projeto;
- resumir decisões sem guardar racional completo;
- gerar documentos sem indexá-los;
- registrar execução sem arquivos afetados;
- atualizar BUILD/OPS sem atualizar memória;
- criar checkpoint genérico demais;
- apagar contexto antigo sem convertê-lo em memória profunda.

---

# 14. Instrução executiva ao Anti-Gravity

Executar a evolução do sistema de memória com base nesta arquitetura em camadas.

## Mandatos obrigatórios
1. manter uma camada executiva curta;
2. preservar uma camada profunda detalhada;
3. separar estado, decisão, execução, artefato, loop aberto e checkpoint;
4. integrar tudo a BUILD, OPS e CONTROL;
5. impedir que a profundidade se perca em nome de concisão.

---

# 15. Encerramento

O objetivo desta implantação não é apenas fazer o sistema “lembrar melhor”.
O objetivo é fazer o Anti-Gravity operar com uma memória mais próxima de um ambiente de trabalho contínuo:

- com contexto imediato para agir;
- com profundidade suficiente para não perder inteligência acumulada;
- com trilha de decisão para evitar regressão;
- com evidência para auditoria;
- com artefatos indexados para continuidade material do projeto.

Esse é o padrão recomendado para tornar a memória do Anti-Gravity robusta, confiável e adequada a projetos longos.
