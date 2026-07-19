# PRD - Rodovia Segura Operacional

## Status

Draft inicial pronto para construcao no Antigravity.

## Objetivo

Criar um aplicativo mobile para registrar presenca, evidencias, ocorrencias e supervisao operacional de uma estrutura de seguranca em rodovia, garantindo controle por posto, regiao, equipe, turno e cargo.

## Usuarios

| Usuario | Necessidade principal |
| --- | --- |
| Vigilante de posto | Registrar entrada, fotos, ocorrencias e saida do proprio posto. |
| Seguranca armado | Registrar entrada, fotos, ocorrencias e saida do proprio posto. |
| Supervisor regional | Acompanhar postos e pendencias da sua regiao. |
| Supervisor de apoio | Apoiar a regiao com acesso semelhante ao regional. |
| Supervisor lider | Ver operacao completa das duas regioes. |
| Admin/Gestor | Configurar usuarios, postos, escalas, equipes, relatorios e auditoria. |
| Auditor/Cliente | Consultar relatorios e evidencias autorizadas. Fase 2. |

## MVP

### FR-001 Login e perfil

O app deve autenticar o usuario e carregar cargo, regiao, posto, equipe e status operacional.

### FR-002 Home do profissional de posto

O app deve mostrar somente o essencial:

- Nome.
- Cargo.
- Posto.
- Regiao.
- Turno atual.
- Status: aguardando entrada, em servico, saida pendente ou turno encerrado.
- Acoes: registrar entrada, registrar ocorrencia, registrar saida, historico do posto.

### FR-003 Check-in

O usuario de posto deve registrar entrada com:

- Data/hora local.
- Data/hora confirmada no servidor.
- Posto.
- Turno.
- Equipe.
- GPS, quando disponivel.
- Minimo de 2 fotos obrigatorias.
- Observacao inicial opcional.

### FR-004 Check-out

O usuario de posto deve registrar saida com:

- Data/hora local.
- Data/hora confirmada no servidor.
- Observacao final.
- Fotos finais opcionais ou obrigatorias por configuracao.
- Pendencias do turno.

### FR-005 Ocorrencias

O app deve permitir registrar ocorrencias com:

- Tipo.
- Gravidade.
- Descricao.
- Posto/regiao.
- Fotos e videos.
- Status: aberta, em acompanhamento, resolvida, cancelada.
- Responsavel e historico.

### FR-006 Supervisao regional e apoio

Supervisores regionais e de apoio devem enxergar:

- Somente postos da propria regiao.
- Check-ins pendentes.
- Atrasos.
- Ocorrencias abertas.
- Midias da regiao.
- Relatorio por turno da regiao.

### FR-007 Supervisao lider

Supervisor lider deve enxergar:

- Norte e Leste.
- Resumo geral dos 12 postos.
- Pendencias criticas.
- Ocorrencias por gravidade.
- Relatorio diario completo.

### FR-008 Admin

Admin deve configurar:

- Usuarios.
- Cargos.
- Regioes.
- Postos.
- Equipes.
- Escalas.
- Turnos.
- Regras de fotos obrigatorias.
- Permissoes e auditoria.

### FR-009 Relatorios

O app deve gerar relatorios por:

- Turno.
- Posto.
- Regiao.
- Equipe.
- Profissional.
- Periodo.

### FR-010 Auditoria

O app deve registrar:

- Criacao e alteracao de check-ins.
- Upload de midias.
- Abertura/alteracao/fechamento de ocorrencias.
- Visualizacao de evidencias sensiveis.
- Acoes administrativas.

## Requisitos nao funcionais

### NFR-001 Simplicidade em campo

As telas de posto devem exigir poucos toques e texto minimo.

### NFR-002 Seguranca por escopo

Nenhum usuario deve ler dados fora do cargo, regiao ou posto permitido.

### NFR-003 Evidencia confiavel

Fotos e videos devem preservar data, autor, posto, turno e caminho de armazenamento.

### NFR-004 Operacao em rede instavel

O MVP deve permitir rascunho local temporario quando houver oscilacao, mas o registro so fica valido apos sincronizacao com servidor.

### NFR-005 LGPD

Dados pessoais e imagens devem ter finalidade operacional, controle de acesso, retencao definida e auditoria.

## Priorizacao MVP

| Prioridade | Item |
| --- | --- |
| P0 | Login, perfis, permissoes, seed de 12 postos. |
| P0 | Check-in com fotos obrigatorias. |
| P0 | Check-out. |
| P0 | Ocorrencias com fotos. |
| P1 | Dashboard regional/lider. |
| P1 | Relatorio diario. |
| P1 | Videos curtos. |
| P2 | Auditor/cliente somente leitura. |
| P2 | Alertas push. |
| P2 | Exportacao PDF/CSV. |

## Fases

### Fase 0 - Preparacao operacional

- Confirmar nomes/codigos dos 12 postos.
- Confirmar coordenadas.
- Confirmar cargos e usuarios reais.
- Validar se sao 2 ou 3 fotos obrigatorias.

### Fase 1 - MVP mobile

- App Expo.
- Firebase Auth.
- Firestore seed.
- Navegacao por cargo.
- Check-in/check-out.
- Ocorrencias com foto.

### Fase 2 - Supervisao e relatorios

- Painel regional.
- Painel lider.
- Relatorio diario.
- Auditoria consultavel.

### Fase 3 - Operacao avancada

- Videos.
- Alertas push.
- Exportacao PDF/CSV.
- Modo auditor/cliente.

### Fase 4 - Inteligencia operacional

- Indicadores de atraso, reincidencia e risco.
- Validacao de geofence por posto.
- Analise de ocorrencias recorrentes.

## Criterios de aceite do MVP

- Um vigilante consegue entrar, registrar 2 fotos e concluir check-in.
- Um seguranca armado consegue registrar ocorrencia com foto no proprio posto.
- Um profissional de posto nao consegue ver outro posto.
- Um supervisor regional ve todos os postos da sua regiao e nenhum da outra.
- Um supervisor lider ve as duas regioes.
- Admin consegue cadastrar usuario, posto, equipe e turno.
- Relatorio diario mostra cobertura dos 12 postos por turno.
- Todas as midias ficam vinculadas a usuario, posto, turno e registro.

