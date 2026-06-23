# Pajero V77W 6G75 - Painel de Diagnostico e Revisao

Projeto tecnico para organizar diagnostico, revisao completa, evidencias fotograficas e status de execucao da Pajero HPE 3.8 gasolina 5P 4x4 AT-S.

## Identificacao

- Modelo: Pajero HPE 3.8 Gasolina 5P 4x4 AT-S
- Codigo do modelo: V77W
- Chassi/VIN: JMYLYV77W5JA00169
- Motor: 6G75RN6738
- Motor base: 6G75 V6 gasolina
- Cambio: V5A51 automatico
- Quilometragem: 200.000 km
- Historico de manutencao: inexistente/desconhecido
- Catalisador: ausente

## Sintomas iniciais

- Marcha lenta instavel
- Consumo elevado, aproximadamente 4 km/l
- Tranco nas trocas de marcha
- Direcao hidraulica um pouco dura
- Outros sintomas pendentes de catalogacao

## Regra operacional

O projeto prioriza diagnostico antes de troca aleatoria de pecas. Scanner, dados ao vivo, fotos, vazamentos, folgas, fluidos e evidencias devem ser registrados antes de qualquer recomendacao de compra.

## Painel visual

Abra:

`Pajero/ui/index.html`

O painel e estatico e funciona com dados iniciais embutidos. Quando aberto por um servidor HTTP local, ele tambem tenta ler os arquivos JSON em `Pajero/data/`.

Para o teste inicial do escapamento, abra:

`Pajero/ui/escapamento-visual.html`

## Fotos reais

Adicione fotos em:

- `Pajero/assets/imagens_reais/`
- `Pajero/assets/imagens_reais/escapamento/`
- `Pajero/assets/ilustracoes/`
- `Pajero/assets/diagramas/`
- `Pajero/assets/pecas/`

Depois registre cada imagem em `Pajero/data/image-manifest.json` com origem, status de validacao, localizacao e observacoes.

## Fontes e validacao

Todo torque, capacidade de fluido, especificacao de oleo, codigo de peca e procedimento mecanico deve receber fonte antes de ser tratado como confirmado. Enquanto nao houver fonte, classifique como `pendente de validacao`.

## Atualizacao 2026-05-22

- VIN `JMYLYV77W5JA00169` e motor `6G75RN6738` reconfirmados pelo usuario.
- Pesquisa internet registrada em `Pajero/docs/pesquisa-internet-fontes-2026-05-22.md`.
- Consulta NHTSA/vPIC registrada como limitacao de base EUA, nao como invalidacao do veiculo.
