---
task: Freios Seguranca
responsavel: "@brake-road-safety-inspector"
responsavel_type: agent
atomic_layer: task
Entrada: |
  fotos de freios, pneus, rodas, rolamentos, DTCs ABS e estado do fluido.
Saida: |
  decisao de seguranca para rodagem.
Checklist:
  - "[ ] Avaliar discos, pastilhas e pincas"
  - "[ ] Avaliar pneus e rolamentos"
  - "[ ] Ler ABS"
  - "[ ] Definir liberado/restrito/bloqueado"
  - "[ ] Registrar teste de frenagem"
---

# Freios e Seguranca

Executa o workflow `workflow-freios-seguranca.md`.

