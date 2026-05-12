# Matriz de Clones por Agente - Pajero

Esta matriz padroniza a relacao entre agentes, clones e materiais do projeto Pajero. A referencia foi o comportamento dos clones do projeto Sais: clone base, material processavel e anexos de suporte separados.

## Regra de padronizacao

- O clone primario e sempre tecnico e especifico do Pajero.
- Clones globais entram apenas como referencia de metodo, nunca como fonte mecanica.
- Materiais processaveis ficam em `full_transcript_files` para liberar Extrair, Auditar e Harmonizar.
- Anexos ficam em `support_files` para consulta.
- Skills, agents, workflows e squad manifest nao ficam como anexos diretos do clone.

## Mapeamento

| Agente | Clone primario | Referencias auxiliares | Uso permitido |
|---|---|---|---|
| Pajero Chief Diagnostician | `prs-pajero-pajero-chief-diagnostician` | Alan Nicolas, Nectar Auditor | Orquestracao, causa-raiz, prioridade e gate de decisao |
| OEM Technical Librarian | `prs-pajero-oem-technical-librarian` | Enzo Barbatto, Nectar Auditor | Organizacao de fontes, manuais, torques e compatibilidade |
| Evidence & Anti-Hallucination Auditor | `prs-pajero-evidence-anti-hallucination-auditor` | Nectar Auditor | Bloqueio de conclusoes sem fonte ou evidencia |
| Combustion & Fuel Trim Engineer | `prs-pajero-combustion-fuel-trim-engineer` | Alan Nicolas | Consumo, mistura, STFT/LTFT, lambda e escape |
| Driveability Electronics Diagnostician | `prs-pajero-driveability-electronics-diagnostician` | Enzo Barbatto | Scanner, DTC, freeze frame, sensores e chicotes |
| 6G75 Practical Engine Mechanic | `prs-pajero-engine-6g75-practical-mechanic` | Nectar Auditor | Motor, correia, ignicao, compressao, vazamentos e arrefecimento |
| V5A51 Transmission Specialist | `prs-pajero-transmission-v5a51-specialist` | Nectar Auditor | ATF, carter, limalha, solenoides, corpo de valvulas e TCU |
| Super Select & Drivetrain Specialist | `prs-pajero-super-select-drivetrain-specialist` | Nectar Auditor | Transferencia, 4x4, diferenciais, cardans, folgas e ruidos |
| Suspension & Hydraulic Steering Engineer | `prs-pajero-suspension-hydraulic-steering-engineer` | Nectar Auditor | Suspensao, direcao hidraulica, geometria e pneus |
| Brake & Road Safety Inspector | `prs-pajero-brake-road-safety-inspector` | Nectar Auditor | Gate de freio, pneu, rolamento, ABS e teste de rodagem |
| Visual Teardown Mapper | `prs-pajero-visual-teardown-mapper` | Julian/Vinci, Enzo Barbatto | Atlas visual, fotos reais, diagramas e legenda tecnica |
| Work Order & Parts Planner | `prs-pajero-work-order-parts-planner` | Alan Nicolas, Enzo Barbatto | Ordem de servico, BOM, insumos e plano pos-revisao |

## Clones globais de referencia

- Alan Nicolas: usar para organizar mecanismo logico, funil de decisao e pipeline operacional.
- Enzo Barbatto: usar para automacao, ingestao de dados e fluxo de app/painel.
- Russell Brunson: usar somente como analogia de clareza de etapas; nao usar para decisao tecnica.
- Julian/Vinci: usar para acabamento visual do painel e atlas.
- Nectar Auditor: usar como gate de qualidade antes de harmonizar fontes no clone.

## Materiais processaveis padrao

- `knowledge/clones/pajero/source_materials/pajero-clone-technical-corpus.md`
- `knowledge/clones/pajero/context_packets/<clone>_context_packet.md`

## Materiais de suporte padrao

- `Pajero/manuals/fichas-tecnicas/README.md`
- `Pajero/docs/dossie-tecnico-veiculo.md`
- `Pajero/docs/regras-antialucinacao.md`
- `Pajero/docs/diagnostico-sintomas-atuais.md`
- `Pajero/docs/fontes-tecnicas-pendentes.md`
- `Pajero/docs/plano-de-revisao.md`
- `Pajero/docs/fluxograma-diagnostico.md`
- `Pajero/data/vehicle-profile.json`
- `Pajero/data/symptoms.json`
- `Pajero/data/revision-modules.json`
- `Pajero/data/diagnostic-status.json`
- `Pajero/data/image-manifest.json`

## Criterio de aceite

O clone esta completo quando:

- tem clone base;
- tem context packet;
- tem pelo menos um material processavel;
- tem anexos de suporte sem misturar skills/squad/agent como fonte direta;
- mostra botoes de Extrair, Auditar, Harmonizar, Previa e Reset nos materiais processaveis;
- mantem toda conclusao tecnica como confirmado, provavel ou pendente de validacao.
