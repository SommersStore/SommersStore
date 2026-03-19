# Protocolo de Handover (Passagem de Bastão)

Regras para sincronizar o trabalho entre os agentes (Orion, Morgan, River, Dex, Quinn).

## 1. Fluxo de Trabalho Padrão
1. **PM (Morgan)** cria o PRD.
2. **Architect (Aria)** cria a Spec Técnica.
3. **Dev (Dex)** implementa seguindo a Story.
4. **QA (Quinn)** revisa e aprova.

## 2. Requisitos para Passagem (Handover)
Para mover uma tarefa para o próximo agente, o atual deve:
- Atualizar o `task.md`.
- Garantir que todos os testes unitários passaram.
- Comentar qualquer decisão fora do comum na seção "Dev Notes" da Story.

## 3. Definition of Done (DOD) - Geral
- Código limpo e comentado.
- Documentação sincronizada.
- Aprovação visual pelo @ux-design-expert (Uma).
