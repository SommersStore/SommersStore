---
task: QA Final
responsavel: "@evidence-anti-hallucination-auditor"
responsavel_type: agent
atomic_layer: task
Entrada: |
  diagnosticos, fontes, fotos, DTCs antes/depois, OS e teste final.
Saida: |
  status validado, reprovado ou reinspecionar.
Checklist:
  - "[ ] Conferir fontes"
  - "[ ] Conferir torques/fluidos"
  - "[ ] Conferir fotos"
  - "[ ] Conferir seguranca"
  - "[ ] Emitir decisao final"
---

# QA Final

Executa o workflow `workflow-qa-final.md`.

