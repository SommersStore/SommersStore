---
name: Pajero Clone Technical Corpus
project: Pajero V77W 6G75 V5A51
purpose: Fonte processavel para Extrair, Auditar e Harmonizar clones tecnicos do projeto Pajero.
status: inicial
---

# Pajero Clone Technical Corpus

Este corpus e a fonte processavel comum dos clones tecnicos do projeto Pajero. Ele nao substitui manual de servico, catalogo de pecas, medicao real, scanner ou foto real. A funcao dele e dar aos clones um nucleo operacional padronizado para diagnostico, revisao e auditoria.

## Padrao importado do projeto Sais

O Sais usa clones globais com tres camadas claras:

- base do clone em Markdown;
- materiais processaveis, como transcricoes completas e fontes longas;
- anexos de suporte, como context packets e documentos auxiliares.

Para o Pajero, o padrao correto e:

- cada agente tecnico tem um clone primario proprio;
- context packet e corpus tecnico entram como materiais processaveis;
- documentos, checklists e dados do veiculo entram como suporte;
- skills, agents, workflows e squad manifest ficam na camada de orquestracao, nao como fonte tecnica direta do clone.

## Veiculo e escopo fixo

- Veiculo: Pajero HPE 3.8 gasolina 5P 4x4 AT-S.
- Codigo/modelo: V77W.
- Motor: 6G75RN6738, base 6G75 V6 gasolina.
- Cambio: V5A51 automatico.
- Quilometragem: 200.000 km.
- Historico: inexistente ou desconhecido.
- Catalisador: ausente.
- Sintomas atuais: marcha lenta instavel, consumo elevado proximo de 4 km/l, trancos nas trocas, direcao hidraulica um pouco dura.

## Regras maes

- Diagnostico antes de troca de peca.
- Scanner ECU, TCU e ABS antes de conclusao.
- Fonte tecnica antes de torque, fluido, capacidade, peca ou procedimento.
- Foto real antes de desmontagem quando a posicao ou montagem puder gerar erro.
- Separar sempre confirmado, provavel e pendente de validacao.
- Nao usar dados de Pajero Sport, Pajero Dakar, TR4, diesel, V87W ou V97W sem validacao explicita.
- Nao recomendar flush pressurizado do cambio sem inspecao previa do ATF, carter e limalha.
- Nao recomendar compra de pecas antes do diagnostico inicial.

## Prioridade inicial por risco

Critico:

- scanner completo ECU / TCU / ABS;
- marcha lenta instavel;
- consumo excessivo;
- catalisador ausente;
- sondas lambda e escapamento;
- trancos no cambio V5A51;
- estado do ATF;
- arrefecimento;
- freios;
- pneus e suspensao com folgas.

Preventivo obrigatorio:

- correia dentada e componentes associados sem comprovacao;
- velas, bobinas, cabos quando aplicavel e ignicao;
- TBI, admissao e entrada falsa de ar;
- bicos injetores;
- fluido da direcao hidraulica;
- oleo dos diferenciais;
- oleo da caixa de transferencia;
- buchas, pivos, terminais e amortecedores;
- fluido de freio.

Preventivo programavel:

- ar-condicionado;
- vedacao;
- pintura A19;
- acabamentos;
- conforto;
- detalhamento estetico.

## Clones primarios por agente

- Pajero Chief Diagnostician: clone de orquestracao e causa-raiz.
- OEM Technical Librarian: clone de fontes, manuais, torques e compatibilidade.
- Evidence & Anti-Hallucination Auditor: clone de bloqueio por evidencia.
- Combustion & Fuel Trim Engineer: clone de consumo, mistura, lambda, STFT/LTFT e catalisador ausente.
- Driveability Electronics Diagnostician: clone de scanner, DTCs, freeze frame, sensores e chicotes.
- 6G75 Practical Engine Mechanic: clone de mecanica pratica do motor, correia, ignicao, compressao e arrefecimento.
- V5A51 Transmission Specialist: clone de ATF, TCU, carter, solenoides, corpo de valvulas e coxins.
- Super Select & Drivetrain Specialist: clone de caixa de transferencia, diferenciais, cardans, cruzetas e 4x4.
- Suspension & Hydraulic Steering Engineer: clone de suspensao, geometria, pneus e direcao hidraulica.
- Brake & Road Safety Inspector: clone de freios, rodas, rolamentos, pneus, ABS e gate de rodagem.
- Visual Teardown Mapper: clone de fotos reais, localizacao, diagramas, vista explodida e legenda tecnica.
- Work Order & Parts Planner: clone de ordem de servico, BOM, insumos e validacao pos-servico.

## Clones globais usados apenas como referencia metodologica

Estes clones podem inspirar formato de raciocinio e organizacao, mas nao podem substituir conhecimento automotivo:

- Alan Nicolas: orquestracao logica, mecanismos, pipelines e estrutura de decisao.
- Enzo Barbatto: automacao, apps de IA e fluxo operacional.
- Russell Brunson: organizacao de funis e clareza de etapas, usado somente como analogia de fluxo.
- Julian/Vinci: acabamento visual do painel e atlas, nunca como fonte tecnica mecanica.
- Nectar Auditor: gate de qualidade para harmonizacao de clones.

## Contratos de resposta dos clones

Todo clone tecnico deve responder com:

- status: confirmado, provavel ou pendente de validacao;
- evidencia usada;
- fonte aplicavel quando houver especificacao tecnica;
- risco se a acao for ignorada;
- proxima acao objetiva;
- bloqueios antes de comprar peca, desmontar ou validar.

## Bloqueios obrigatorios

- Especificacao de fluido sem fonte: bloquear.
- Torque sem fonte: bloquear.
- Peca recomendada sem evidencia: bloquear.
- Diagnostico de cambio antes de estabilizar motor quando houver marcha lenta/consumo anormal: marcar como pendente.
- Teste de rodagem com freio, pneu ou suspensao insegura: bloquear.
- Imagem sem origem ou validacao: marcar como pendente.

## Links de suporte

- [Matriz de clones e agentes](Pajero/docs/matriz-clones-agentes.md)
- [Dossie tecnico do veiculo](Pajero/docs/dossie-tecnico-veiculo.md)
- [Regras anti-alucinacao](Pajero/docs/regras-antialucinacao.md)
- [Diagnostico dos sintomas atuais](Pajero/docs/diagnostico-sintomas-atuais.md)
- [Plano de revisao](Pajero/docs/plano-de-revisao.md)
- [Fluxograma diagnostico](Pajero/docs/fluxograma-diagnostico.md)
