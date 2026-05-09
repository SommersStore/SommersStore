---
task: Motor Consumo Lenta
responsavel: "@combustion-fuel-trim-engineer"
responsavel_type: agent
atomic_layer: task
Entrada: |
  DTCs ECU, freeze frame, STFT/LTFT, fotos de admissao/escapamento e checklist do motor.
Saida: |
  mapa de causa-raiz para marcha lenta instavel e consumo elevado.
Checklist:
  - "[ ] Coletar dados ao vivo"
  - "[ ] Avaliar sondas e catalisador ausente"
  - "[ ] Avaliar TBI, MAF/MAP, TPS e ECT"
  - "[ ] Verificar ignicao e entrada falsa"
  - "[ ] Submeter ao auditor"
---

# Motor, Consumo e Marcha Lenta

Executa o workflow `workflow-motor-consumo-lenta.md`.

