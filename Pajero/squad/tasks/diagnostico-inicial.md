---
task: Diagnostico Inicial
responsavel: "@pajero-chief-diagnostician"
responsavel_type: agent
atomic_layer: task
Entrada: |
  vehicle-profile, checklist inicial, scanner ECU/TCU/ABS, fotos base e relato de sintomas.
Saida: |
  linha de base, bloqueios, status de seguranca e proximas fases.
Checklist:
  - "[ ] Conferir VIN, plaquetas e motor"
  - "[ ] Registrar scanner ECU/TCU/ABS"
  - "[ ] Registrar fotos base"
  - "[ ] Classificar sintomas"
  - "[ ] Passar pelo gate diagnostico inicial"
---

# Diagnostico Inicial

Executa o workflow `workflow-diagnostico-inicial.md`.

