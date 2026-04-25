# Skill Playbook: SKL-QRO-06 - NectarSourceQuality

## Objetivo Operacional
Avaliar a qualidade da fonte antes de permitir que ela influencie um clone.

## Donos
- Grupo: `QRO`
- Squad: `SQD-QRO`
- Agente: `@nectar-auditor`

## Entradas
- Arquivo fonte: transcricao base, transcricao completa ou anexo.
- Nectar extraido em `knowledge/clones/staging/`.
- Base atual do clone quando disponivel.

## Procedimento
1. Medir especificidade, densidade, coerencia, fidelidade e valor operacional.
2. Identificar secoes fracas, repetitivas ou genericas.
3. Atribuir nota de 0 a 25.
4. Bloquear fonte sem densidade minima para harmonizacao direta.

## Saida Esperada
- `source_quality_score`
- evidencias fortes
- secoes fracas
- recomendacao inicial

