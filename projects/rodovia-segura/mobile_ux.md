# UX Mobile - Rodovia Segura Operacional

## Direcao visual

O app deve parecer uma ferramenta operacional de campo:

- Minimalista.
- Alto contraste.
- Pouco texto por tela.
- Botoes grandes.
- Estados evidentes.
- Navegacao por cargo.
- Sem layout decorativo.

## Tokens iniciais

| Token | Valor | Uso |
| --- | --- | --- |
| `color.background` | `#0f172a` | Fundo principal escuro. |
| `color.surface` | `#111827` | Cartoes e blocos. |
| `color.primary` | `#2563eb` | Acoes principais. |
| `color.success` | `#16a34a` | Entrada confirmada, posto coberto. |
| `color.warning` | `#f59e0b` | Atraso, pendencia. |
| `color.danger` | `#dc2626` | Ocorrencia critica, ausencia. |
| `color.text` | `#f8fafc` | Texto principal. |
| `color.muted` | `#94a3b8` | Texto secundario. |
| `radius.card` | `8px` | Cartoes. |
| `radius.button` | `8px` | Botoes. |

## Telas por perfil

### Profissional de posto

Primeira tela:

- Status do turno no topo.
- Card do posto.
- Botao principal: `Registrar entrada` ou `Registrar saida`.
- Botao secundario: `Nova ocorrencia`.
- Link discreto: `Historico do posto`.

Fluxo de entrada:

1. Confirmar posto e turno.
2. Tirar foto 1.
3. Tirar foto 2.
4. Adicionar observacao opcional.
5. Enviar.

Fluxo de saida:

1. Confirmar encerramento.
2. Registrar observacao final.
3. Anexar foto se exigido.
4. Enviar.

### Supervisor regional / apoio

Primeira tela:

- Resumo da regiao.
- Postos cobertos.
- Entradas pendentes.
- Atrasos.
- Ocorrencias abertas.
- Lista dos 6 postos da regiao.

Tela de posto:

- Equipe atual.
- Vigilante status.
- Seguranca armado status.
- Ultimas fotos.
- Ocorrencias abertas.
- Historico do turno.

### Supervisor lider

Primeira tela:

- Visao Norte + Leste.
- 12 postos.
- Semaforo por posto.
- Ocorrencias criticas no topo.
- Filtro por turno/equipe/regiao.

### Admin

Primeira tela:

- Usuarios.
- Postos.
- Regioes.
- Equipes.
- Turnos.
- Regras.
- Auditoria.

## Componentes

- `StatusBadge`
- `ShiftCard`
- `PostCoverageCard`
- `PrimaryActionButton`
- `MediaCaptureStep`
- `OccurrenceForm`
- `SupervisorPostList`
- `RegionSummary`
- `AuditTimeline`

## Estados operacionais

| Estado | Visual |
| --- | --- |
| Aguardando entrada | Azul. |
| Em servico | Verde. |
| Saida pendente | Amarelo. |
| Turno encerrado | Cinza. |
| Ocorrencia critica | Vermelho. |
| Sincronizacao pendente | Amarelo com icone discreto. |

## Regras de usabilidade

- Nenhuma tela de campo deve depender de tabela larga.
- Formularios devem ser curtos e divididos por etapas.
- Fotos devem mostrar miniatura antes do envio.
- Erro de permissao deve explicar o motivo: posto errado, regiao errada, usuario inativo ou turno fora de janela.
- O app deve deixar claro quando o registro ainda nao sincronizou.

