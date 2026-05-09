# Workflow - Imagens e Diagramas

## Objetivo

Alimentar o painel com fotos reais, diagramas, vistas explodidas e metadados.

## Agentes

- Visual Teardown Mapper
- OEM Technical Librarian
- especialistas por sistema

## Passos

1. Receber foto ou diagrama.
2. Registrar origem, modulo, sistema, peca, localizacao e lado.
3. Classificar tipo: foto real, ilustracao, diagrama ou vista explodida.
4. Criar legenda tecnica.
5. Atualizar `data/image-manifest.json`.
6. Vincular imagem ao modulo em `data/revision-modules.json` se necessario.

## Saida

Atlas visual atualizado e rastreavel.

