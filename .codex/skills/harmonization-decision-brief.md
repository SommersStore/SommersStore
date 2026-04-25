# HarmonizationDecisionBrief

## Purpose
Produce the final audit report for a clone source before harmonization.

## Required Decision Values
- `APROVAR`
- `REVISAR`
- `REJEITAR`
- `ANEXAR_APENAS`

## Required Report Format
```md
# Parecer de Nectar

## Decisao
APROVAR | REVISAR | REJEITAR | ANEXAR_APENAS

## Nota Geral
0-100

## Risco de Diluicao
Baixo | Medio | Alto | Critico

## Evidencias
- ...

## O Que Pode Entrar
- ...

## O Que Deve Ficar Fora
- ...

## Conflitos com a Base Atual
- ...

## Recomendacao Final
...
```

## Rule
If the report is not specific enough for a human to understand what will change in the clone, the report fails.

