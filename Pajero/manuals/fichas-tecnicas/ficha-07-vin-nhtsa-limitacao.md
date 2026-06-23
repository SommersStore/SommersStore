# Ficha 07 - VIN NHTSA e Limitacao de Decodificacao

## Identificacao

- Fonte: NHTSA vPIC API.
- URL de documentacao: https://vpic.nhtsa.dot.gov/api/Home/Index
- Consulta executada: `DecodeVinValues/JMYLYV77W5JA00169?format=json`
- Status: confirmado como consulta executada; resultado nao valida o VIN para mercado EUA.
- Aplicabilidade ao projeto: apoio de auditoria, nao fonte tecnica mecanica.

## Resultado resumido

- A API retornou sucesso operacional da consulta, mas o VIN informado teve erros de decodificacao para a base NHTSA.
- VehicleDescriptor retornado: `JMYLYV77*5J`.
- ErrorCode retornado em 2026-05-22: `1,7,400`.
- Erros reportados: check digit nao calculou corretamente, fabricante nao registrado para venda/importacao nos EUA para uso em vias dos EUA, e caractere invalido na posicao 9 (`W`).
- A propria mensagem da API informa que valores ausentes nao devem ser interpretados como ausencia de recurso no veiculo.

## Uso permitido

- Registrar que o VIN JMYLYV77W5JA00169 nao deve ser validado por base NHTSA como se fosse veiculo de mercado EUA.
- Reforcar que a confirmacao deve vir de plaqueta, documento, VIN fisico, motor, cambio e fonte Mitsubishi aplicavel ao mercado correto.

## Uso proibido

- Nao usar NHTSA para negar existencia de ABS, airbag, motor, cambio ou recurso neste veiculo.
- Nao usar NHTSA para escolher peca, torque, fluido ou procedimento.

## Clones consumidores

- `prs-pajero-evidence-anti-hallucination-auditor`
- `prs-pajero-oem-technical-librarian`
- `prs-pajero-pajero-chief-diagnostician`
- `prs-pajero-work-order-parts-planner`
