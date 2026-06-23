# Escapamento - Mapa Visual Inicial

## Objetivo

Criar um primeiro teste visual do sistema de escapamento da Pajero V77W 6G75, cobrindo o caminho dos gases desde os coletores ate a ponteira final.

Este mapa e uma estrutura de trabalho. Nao libera compra de pecas, solda, remocao, torque ou diagnostico final sem fotos reais, scanner e fonte tecnica aplicavel.

## Imagem principal

- Diagrama proprio do projeto: [`../assets/diagramas/escapamento-v77w-6g75-fluxo.svg`](../assets/diagramas/escapamento-v77w-6g75-fluxo.svg)
- Pagina de teste visual: [`../ui/escapamento-visual.html`](../ui/escapamento-visual.html)

## Sequencia de inspecao

| Ordem | Trecho | O que fotografar | Risco principal |
| --- | --- | --- | --- |
| 1 | Coletor esquerdo | Coletor, junta, prisioneiros, marcas de fuligem, calor e trincas | Entrada falsa de ar antes das sondas |
| 2 | Coletor direito | Coletor, junta, escudo termico e flanges | Vazamento quente, ruido e leitura lambda errada |
| 3 | Tubos dianteiros | Front pipes, flexiveis, flanges e suportes | Vazamento, batida no chassi, solda improvisada |
| 4 | Sondas lambda | Posicao antes/depois do ponto do catalisador, chicotes, emendas e conectores | Mistura errada, consumo alto, DTC e emulador |
| 5 | Catalisadores | Trecho onde deveriam estar catalisadores, adaptacoes e emendas | Catalisador ausente, mistura/consumo/conformidade |
| 6 | Linha intermediaria | Tubo central, protetores de calor, suportes e borrachas | Vazamento, vibracao, calor no assoalho |
| 7 | Silencioso principal | Corpo do abafador, soldas, entrada/saida, suportes e corrosao | Restricao, ruido, quebra de suporte |
| 8 | Tubo final/ponteira | Saida final, alinhamento, fuligem e condensacao | Obstrucao, fumaca, cheiro e ruido final |

## Fontes externas para referencia visual

| Fonte | Link | Uso permitido |
| --- | --- | --- |
| PartSouq - V77W General Export - Exhaust pipe & muffler | https://partsouq.com/en/catalog/genuine/unit?c=Mitsubishi&cid=1&q=&ssd=%24%2AKwF7T15BEwN8FAcJFwkjaSM3FxAOf3B9fG5Bcjo8DwEMBTESYG10CQUde3l7fHgiYGEJM206a3JtFzIyICpqdX80NjoNazx2a3JtFGtkbS5-PDhrCnd-egB7fSdfIGVqLCdrcn5hMmsgc2p-e2R9fn4NeH9_ICdWazUxOCwgDzYydyBzJjoiJWRtLjIkIAtwf30BfH96UTwuayVtdGseeHpHPC5rKyNscyY6IXxjAAAAAB6McS4%3D%24&uid=70662&vid=0 | Conferir diagrama/lista de pecas V77W 3800 long wagon General Export; pendente de VIN/frame |
| Nengun - Pajero V77W exhaust OEM catalog | https://www.nengun.com/oem/mitsubishi/pajero-v77w/exhaust | Triagem de pecas OEM de escapamento V77W; nao substitui EPC oficial |
| Nengun - V77W 6G75 Exhaust Manifold 1 | https://www.nengun.com/oem/mitsubishi/md050076 | Evidencia auxiliar de catalogo para manifold 6G75/V77W; verificar part number por VIN |
| Out-Club - Exhaust pipe and muffler 6G75 | https://faq.out-club.ru/download/pajero_iv/maintenance/Service_Manual_2008_2013/2008_ge/15/html/M215000300107600ENG.HTM | Referencia auxiliar de arquitetura 6G75/Pajero posterior; nao usar para valores sem validacao |

## Fotos reais pendentes

As imagens reais devem ser salvas em `Pajero/assets/imagens_reais/escapamento/` e registradas em `Pajero/data/image-manifest.json`.

Prioridade de fotos:

- Visao inferior completa do escapamento, da frente para tras.
- Coletor/banco esquerdo.
- Coletor/banco direito.
- Tubos dianteiros e flanges.
- Local dos catalisadores, sondas e chicotes.
- Linha intermediaria, protetores e suportes.
- Silencioso principal.
- Tubo final e ponteira.

## Bloqueios mantidos

- Nao comprar catalisador, sonda, junta, coletor, tubo ou abafador sem EPC/OEM ou conferencia fisica.
- Nao concluir causa de consumo alto apenas pela ausencia do catalisador.
- Nao usar fonte de Pajero IV, Montero EUA ou aftermarket como aplicacao final sem validacao V77W/6G75/V5A51 e mercado correto.
