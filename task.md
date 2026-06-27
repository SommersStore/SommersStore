# Task Board (Canonical)

## Current Focus
- [x] Validar e operar a nova memoria em camadas no fluxo diario
- [x] Corrigir fragilidades do painel que afetam continuidade (editor/memory wiring)
- [x] Rodar validacao operacional real do ciclo startup/shutdown no painel
- [x] Auditoria tecnica completa do painel AIOX (server, frontend, registry, memoria)
- [x] Implementar correcoes P0 da auditoria (KPIs nulos, project_id em logs)
- [x] Implementar correcoes P1 (cores squads, handles AGENTS.md, rotacao JSONs)
- [x] Criar projeto Financas inicial inspirado na aba Funil do AIOX Master
- [x] Corrigir retomada de projetos dinamicos do AIOX Master, incluindo Pajero
- [x] Criar aba lateral Pajero Full com controle visual e espaco para evidencias
- [x] Conferir VIN/motor Pajero e registrar pesquisa internet de fontes, manuais e imagens
- [x] Criar teste visual inicial do escapamento Pajero, dos coletores ate a ponteira
- [x] Criar painel interativo Pajero por blocos tecnicos abaixo de Financas
- [x] Ampliar blocos tecnicos Pajero com abertura em visao expandida
- [x] Criar governanca e auditoria conservadora para reconstrucao do Control Hub
- [x] Documentar proposta de consolidacao da navegacao do Control Hub
- [x] Aplicar primeira consolidacao visual da sidebar do Control Hub
- [x] Embutir o Mapa visual dentro de Construcao no Master
- [x] Padronizar a instancia local atual do dashboard na porta 4000
- [x] Migrar filtros e status do Mapa para Construcao no Master
- [x] Criar modo edicao protegido no Mapa embutido em Construcao
- [x] Criar AIOX Master Next isolado com canvas full-screen node-based
- [x] Evoluir AIOX Master Next com templates, undo/redo e conexao guiada
- [x] Ajustar AIOX Master Next para produto guiado sequencial da esquerda para a direita
- [x] Expor squads, agentes, skills, clones e briefing de producao no AIOX Master Next
- [x] Melhorar recomendacoes de squads, skills e clones no AIOX Master Next
- [x] Remover subabas `Imp. de Renda` e `Mapa` de Financas para focar refinamento em `Planilha`
- [x] Acrescentar suporte mensal a holerite PM na `Planilha` de Financas
- [x] Automatizar extracao do holerite PM mensal e remover botao global redundante de `Planilha`
- [x] Bloquear totais PM calculados e padronizar formatacao monetaria da `Planilha`
- [x] Remover prefixo visual das sublinhas expandidas do holerite PM
- [x] Padronizar escrita das sublinhas PM expandidas sem caixa alta
- [x] Adicionar ponto de milhar nos inputs e drag-and-drop de linhas na `Planilha`
- [x] Fazer celulas numericas vazias copiarem a celula anterior de fevereiro a dezembro
- [x] Auditar e reforcar formulas da `Planilha` de Financas para copia mensal, strings pt-BR e totais
- [x] Corrigir zeros legados que impediam copia mensal na `Planilha` de Financas
- [x] Aplicar formula direta: janeiro como base e fevereiro-dezembro copiando a celula anterior
- [x] Ajustar cores dos totalizadores e renomear a linha final para `Fluxo de Caixa`
- [x] Compactar totalizadores da `Planilha`, padronizar `$` e isolar holerite PM por mes
- [x] Sincronizar `Dividas` da Planilha com `Dividas/Acordos` e ativar heranca nas sublinhas PM
- [x] Remover simbolo de moeda do painel mantendo formatacao pt-BR
- [x] Tirar descontos bancarios do holerite da soma de `Despesas PM`
- [x] Copiar automaticamente dividas bancarias do holerite PM para `Dividas`
- [x] Fixar cabecalho mensal da `Planilha` e remover rolagem horizontal em PC
- [x] Adicionar exclusao mensal de holerite PM e botao verde em `Despesas PM`
- [x] Destacar em vermelho as dividas copiadas do holerite PM
- [x] Restaurar fundo cinza padrao nas dividas copiadas do holerite PM
- [x] Adicionar linhas compactas para recolher/expandir dividas do holerite em `Despesas PM` e `Dividas`
- [x] Reverter recolhimento geral de `Despesas PM`, mantendo Mercado/Celular/Luz visiveis
- [x] Verificar botoes do cabecalho e corrigir Flash de contexto antigo
- [x] Adicionar dois botoes sutis por celula em `Despesas`, `Dividas` e sublinhas de `Despesas PM`
- [x] Destacar `Dividas Antigas` em amarelo e remover a copia calculada da Planilha para `2017`
- [x] Refinar botoes sutis por celula, adicionar controles em `Receitas` e criar grupo `Dividas Atuais`
- [x] Exibir celulas da Planilha sem centavos e adicionar linha `Despesas + Dividas` acima de `Fluxo de Caixa`
- [x] Adicionar botao `+` na linha compacta `Dividas Atuais`
- [x] Refinar `Dividas/Acordos` com status restrito, anexos multiplos, parcelas independentes e holerite prevalecendo
- [x] Adicionar botoes sutis nas linhas compactas `Dividas do Holerite`, `Dividas Antigas` e `Dividas Atuais`
- [x] Adicionar totais mensais e total anual nas tres linhas compactas de `Dividas`
- [x] Colorir/alinhar subtotais de `Dividas` e ordenar `Dividas/Acordos` pela ordem visual da `Planilha`
- [x] Centralizar valores da linha `Fluxo de Caixa` na `Planilha`
- [x] Corrigir extracao de contratos em `Dividas/Acordos`, incluindo Bradesco 469,15 com 96 parcelas, 20 pagas e antecipacao correta
- [x] Restaurar abertura padrao de `Financas` em `Planilha`, preservando `Dividas/Acordos` por clique/atalho
- [x] Consolidar o workspace Antigravity, removendo a copia antiga `antigravity\scratch\SommersStore`
- [x] Auditar e restaurar Master > Clones do Pajero, incluindo criacao contextual e upload/transcricao de arquivos
- [x] Corrigir alternancia `Mostrar Todos` / `Filtrar Projeto` em Master > Clones apos selecionar um clone
- [x] Corrigir falso vazio inicial em `Master > Pajero AI > Clones` enquanto registry/persona assets carregam
- [x] Criar aba lateral `Forex` com painel da Campanha 3 por 1, templates MT4/MT5/JForex e mapa inicial de agentes/skills/personas
- [x] Reformular Forex com Elliott H4/H1 primeiro, figuras H1/M15/M5 depois, abas internas e MyFXBook expandivel
- [x] Enriquecer Forex com visual MT4 real, visibilidade Elliott/Dow por timeframe e estudo/probe do indicador Peak
- [x] Instalar templates e scripts AIOX nos terminais Dukascopy MT4/MT5 ativos
- [x] Instalar scripts de criacao de desenhos Elliott/Dow nos terminais Dukascopy MT4/MT5 ativos
- [x] Criar e compilar EA AIOX Trader On Chart para MT4/MT5 com risco, pendentes, straddle, BE e trailing
- [x] Atualizar AIOX Trader On Chart v1.20 com tema claro 115%, MT5 filling/retcodes, timer e instalacao Dukascopy
- [x] Atualizar AIOX Trader On Chart v1.30 com painel claro 130%, barra Market/Profit/Loss/Pending, modos de pendente, Two Way, OCO e Smart BE em MT4/MT5 Dukascopy
- [x] Atualizar AIOX Trader On Chart v1.31 com layout compacto estilo TOC, simbolo no topo, campos tabulares, Buy verde/Sell vermelho e compilacao Dukascopy
- [x] Atualizar AIOX Trader On Chart v1.32 com pip automatico para BTC/CFDs, painel ampliado e alerta de spread explicativo
- [x] Enriquecer Forex com skills/agentes MQL5, portabilidade MT4 -> MT5/JForex/ProfitPro e template inicial ProfitPro
- [x] Criar corpus Rimantas/EA Coder para persona e skills operacionais MetaTrader
- [x] Reformular Forex como `IBKR Manual Desk`, com campanha 3x1 em 1,5R, simulador de protective put e Dukascopy como laboratório secundário
- [x] Adicionar inteligência local IBKR em modo paper-only: status de conector, triagem explicável de puts e rascunhos locais sem transmissão de ordens
- [x] Corrigir `Salvar Tudo`: distinguir checkpoint local de cloud, validar identidade Git antes do stage e preservar dados sensíveis fora do Git
- [x] Organizar o stage legado em commits locais por domínio, sem push, PR, tag ou novo deploy
- [x] Publicar os seis commits organizados em `origin/master` após autorização explícita; remoto confirmado em `0d4df42`
- [x] Criar espelho local completo do Antigravity em `D:\Antigravity-SommersStore`, com atualização pós-GitHub/Firebase, hook pós-push e salvaguarda agendada
- [x] Auditar e reforcar persistencia/autosalvamento da aba Financas apos alerta de perda de contexto
- [x] Corrigir expansao das dividas do holerite e conexao automatica de pasta em Financas
- [x] Reclassificar intervalo de `M.C. Nu PJ` ate `Cabos e Soldados` como `Dividas Antigas`
- [x] Criar subgrupo `Despesas` dentro da secao `Despesas` da Planilha
- [x] Corrigir subgrupos de `Despesas` para `Despesas EX` e `Gasolina` vazios, preservando despesas comuns fora deles
- [x] Reorganizar `Despesas` com subabas `Despesas PM`, `Gasolina`, `Despesas X` e `Mercado`, e adicionar controles em lote nos totalizadores mensais
- [x] Refinar `Despesas PM` com visual igual as subabas e permitir arrastar `Gasolina`, `Despesas X` e `Mercado`
- [x] Adicionar botoes sutis mensais nos subtotais das subabas de `Despesas` e `Dividas`
- [x] Corrigir botao inferior esquerdo para abater de `Receitas` sem zerar subtotais/celulas locais
- [x] Simplificar controles da Planilha de Financas para uma faixa unica vertical por celula, subtotal e linha gerenciavel
- [x] Alinhar verticalmente os precos da Planilha e transformar botoes de holerite PM em faixas laterais direitas
- [x] Remover botao redundante de holerite em Despesas PM, mantendo anexo unico em Pagamento PM
- [x] Padronizar `Item`, tornar nomes editaveis, criar subabas vazias e ampliar arrastar/soltar na Planilha de Financas
- [x] Corrigir renomeacao e autosave das subabas editaveis da Planilha de Financas
- [x] Remover `Dividas OL` de Despesas PM, preservando copia unica em Dividas e sincronismo com Dividas/Acordos
- [x] Separar totais brutos fixos de totais ajustados esmaecidos na Planilha de Financas
- [x] Criar aba Investimentos com Dukascopy/MetaTrader 5, alocacao, aportes e projecoes persistentes
- [ ] Selecionar parceiro autorizado e definir jornada de consentimento para futura integracao Open Finance
- [x] Inverter a linha ajustada de Receitas para iniciar zerada e somar apenas celulas selecionadas
- [x] Corrigir alinhamento da primeira coluna e arrastar/soltar de secoes, subabas vazias e subgrupos de Financas
- [x] Uniformizar colunas extremas e permitir ordem livre de Pagamento PM, Despesas PM, subabas e grupos de Dividas
- [x] Fazer quitacoes de Despesas e Dividas abaterem simultaneamente a Receita ajustada

## Pending Work
- [x] Handoff UX Master > Clones: remover gaveta lateral grande/flutuante e restaurar abertura dos clones dentro do `Inspector` compacto existente.
- [x] Consolidar eventos automaticos de memoria (execution + checkpoint + mutation)
- [x] Popular KPIs com valores reais em registry.json (P0 auditoria)
- [x] Garantir project_id em todos os log entries (P0 auditoria)
- [x] Diferenciar cores SQD-CORE vs SQD-MEM (P1 auditoria)
- [x] Mapear handles de agentes no AGENTS.md (P1 auditoria)
- [x] Proteger gravacoes do painel antigo com escrita atomica e validacao JSON (P1 auditoria)
- [x] Restaurar navegacao lateral completa do painel antigo e proteger sub-abas do Ops Desk/Clones
- [x] Reverter refinamento rejeitado do Master > Squads e estabilizar inspector lateral
- [/] Avancar para conteudo (ebooks) com checkpoints ativos
- [ ] Preparar trilha de integracao de checkout
- [ ] Criar primeira visao do Control Hub Comercial com Produtos Digitais, Electro Commerce e Financeiro & IR
- [x] Aplicar consolidacao visual: sidebar Master/E-books/Site Produtos/Financas e mover Mapa para Construcao
- [x] Embutir canvas real do Mapa dentro da aba Construcao
- [x] Resolver conflito operacional entre dashboard antigo em 4000 e workspace atual em 4001
- [x] Adicionar filtros, salvamento e status protegido ao Mapa embutido em Construcao
- [x] Adicionar modo protegido para criar, duplicar e excluir nos simples no Mapa embutido
- [x] Construir novo painel paralelo sem substituir `docs/aiox_dashboard.html`
- [x] Adicionar templates, undo/redo e conexao guiada ao `AIOX Master Next`
- [x] Criar fluxo `Produto guiado` com principal, 2 frees, 2 order bumps e avanco automatico de etapa
- [x] Melhorar atribuicao e visibilidade dos squads no `AIOX Master Next`
- [x] Produzir primeiros entregaveis reais do produto `Velas Aromaticas` pelo `AIOX Master Next`
- [x] Melhorar recomendacoes do inspector do `AIOX Master Next` para squads, skills e clones
- [x] Retomar drag-and-drop de squads (agente, skill, persona/clone)
- [x] Evoluir aba Financas para painel interativo com entrada de dados
- [x] Refinar aba Financas com mapa operacional no modelo da aba Mapa
- [ ] Evoluir projeto Financas com pesquisa juridica, simulacoes e intake real das dividas
- [/] Alimentar o painel Financas com credores, gastos reais, propostas e documentos
- [ ] Modularizar HTML do painel (P2 auditoria)
- [x] Criar base `docs/00_governance` e `docs/01_audit` antes de refatorar o painel
- [x] Anexar fichas tecnicas do projeto Pajero aos clones corretos
- [x] Permitir que o ciclo de sessao/memoria aceite `project_id` do Pajero via `project_flows.json`
- [x] Criar aba lateral `Pajero Full` abaixo de `Saude` e renomear projeto para `Pajero AI`
- [x] Conferir VIN/motor Pajero e registrar fontes de internet com bloqueios de confianca
- [x] Criar mapa visual inicial do escapamento com slots de fotos reais
- [x] Restaurar fluxo Pajero Master > Clones para exibir squads/clones existentes, criar clone novo e alimentar clones com arquivos
- [x] Enriquecer agentes, skills e clones/personas do projeto Forex com MyFXBook, ordem Elliott-first, configuracoes MT4/MT5/JForex e Visual MT4/Peak
- [x] Criar EA AIOX Trader On Chart para MT4/MT5 inspirado em funcionalidades publicas de chart trading, sem copiar codigo proprietario
- [x] Melhorar layout claro do EA AIOX Trader On Chart e corrigir rota de execucao MT5 nos terminais Dukascopy
- [x] Aproximar EA AIOX Trader On Chart v1.30 dos recursos publicos do Trader On Chart original, com painel 30% maior, OCO, Two Way, fechamento por lucro/prejuizo e pendentes por modo/distancia
- [x] Refinar EA AIOX Trader On Chart v1.31 a partir dos prints do usuario e do manual local, com UI compacta mais parecida com TOC sem copiar codigo/assets proprietarios
- [x] Corrigir EA AIOX Trader On Chart v1.32 para BTCUSD/CFDs, evitando leitura exagerada de spread e ampliando o painel
- [x] Criar trilha inicial MQL5/JForex/ProfitPro com fontes oficiais, skills, personas e template ProfitPro
- [x] Mapear canal Rimantas/EA Coder e configurar persona/skills de operacao MetaTrader no painel Forex
- [ ] Alimentar Forex com exemplos reais de setups, prints, backtests por campanha e metricas extraidas do MyFXBook/diario
- [x] Criar projeto Imposto de Renda inicial com brief, funil, estado e checklist
- [ ] Alimentar projeto IR com informes de rendimento e documentos reais
- [ ] Integrar aba IR no painel AIOX Dashboard
- [x] Corrigir travamento das subabas de Financas (Planilha, Dividas, Imp. de Renda e Mapa)
- [x] Refinar visual da subaba Imp. de Renda em duas/tres colunas
- [x] Corrigir botoes da subaba Imp. de Renda preservando a ficha fiscal ativa
- [x] Corrigir botoes externos e abertura de arquivos da subaba Imp. de Renda
- [x] Reformular visual da subaba Imp. de Renda para reduzir espacos vazios
- [x] Remover as subabas `Imp. de Renda` e `Mapa` da navegacao interna de Financas
- [x] Criar fluxo mensal de holerite PM com creditos em `Pagamento PM`, descontos em `Despesas PM` e anexos por mes
- [x] Extrair automaticamente creditos/descontos do holerite PM por mes e manter anexo mensal compacto
- [x] Tornar `Pagamento PM` e `Despesas PM` linhas-mae calculadas, sem edicao manual nas celulas mensais
- [x] Deixar sublinhas expandidas de `Pagamento PM` e `Despesas PM` somente com o campo editavel do item
- [x] Normalizar nomes dos itens expandidos do holerite PM em escrita tipo `Despesas`
- [x] Permitir reordenar linhas principais por arrastar e soltar dentro de cada grupo da `Planilha`
- [x] Aplicar heranca mensal em celulas vazias sem afetar totais e labels
- [x] Validar formulas da `Planilha` com Puppeteer e marcar celulas herdadas de forma sutil
- [x] Normalizar zeros legados de receitas/despesas para heranca, preservando zeros historicos de dividas
- [x] Substituir abordagem de zeros legados pela regra simples `null = formula`, `numero = substituicao`
- [x] Aplicar cores por grupo em `TOTAL RECEITAS`, `TOTAL DESPESAS`, `TOTAL DIVIDAS` e fluxo final
- [x] Mover totalizadores para os cabecalhos `Receitas`, `Despesas` e `Dividas`, com botoes circulares de adicionar
- [x] Fazer sublinhas expandidas de `Pagamento PM` e `Despesas PM` copiarem a celula anterior
- [x] Sincronizar alteracoes de `Planilha > Dividas` com `Dividas/Acordos`, preservando valores extraidos de contratos
- [x] Remover `$` e `R$` da exibicao do painel sem alterar calculos
- [x] Marcar descontos bancarios em `Despesas PM` como dividas visuais, sem duplicar na soma de despesas
- [x] Copiar automaticamente emprestimos bancarios do holerite PM para `Planilha > Dividas`
- [x] Manter a linha dos meses fixa na rolagem vertical e compactar colunas da `Planilha`
- [x] Permitir excluir o holerite apenas do mes selecionado no modal PM
- [x] Diferenciar o botao de holerite da linha `Despesas PM` em verde
- [x] Marcar visualmente em `Dividas` e `Dividas/Acordos` os valores vindos do holerite PM
- [x] Manter fundo cinza/escuro padrao nas celulas de `Dividas` vindas do holerite PM
- [x] Permitir ocultar/mostrar linhas vermelhas do holerite em `Despesas PM` e `Dividas` por linhas compactas de grupo
- [x] Manter a seta de `Despesas PM` restrita as sublinhas do holerite e a linha compacta `Dividas do Holerite` restrita as dividas bancarias
- [x] Fazer o botao `Flash` copiar sempre o contexto atual em vez de reutilizar `session_flash.txt` antigo
- [x] Fixar `Dividas do Holerite` como primeiro bloco da secao `Dividas`, mantendo novas dividas comuns abaixo
- [x] Criar `Dividas Antigas` com recolher/expandir e botao por linha para entrar/sair da somatoria de `Dividas`
- [x] Corrigir `Dividas Antigas` para iniciar vazia e receber apenas dividas adicionadas ou arrastadas manualmente
- [x] Posicionar `Dividas Antigas` logo abaixo do bloco `Dividas do Holerite`
- [x] Adicionar controles sutis em `Despesas` e `Dividas` para tirar linhas da somatoria local ou abater tambem de `Receitas`
- [x] Corrigir leitura de contratos em `Dividas/Acordos` preservando campos editaveis e holerite como fonte mensal nas dividas originadas dele
- [x] Corrigir regressao visual que fazia `Financas` abrir direto em `Dividas/Acordos` em vez de `Planilha`

## Done in this session
- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0754

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0745

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0729

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0725

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0722

- [x] Story 2.107 concluida/atualizada: os dois botoes sutis da Planilha de Financas foram substituidos por uma faixa unica vertical no canto esquerdo das celulas, subtotais e linhas gerenciaveis. A faixa preenchida retira o valor do calculo do proprio grupo (`Receitas`, `Despesas` ou `Dividas`); a faixa contornada reinclui. O abatimento separado de `Receitas` foi neutralizado e `exclude_receitas` agora normaliza para `exclude`. `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer passaram.
- [x] Complemento da Story 2.107: valores/precos da Planilha alinhados com largura fixa de 62px e `vertical-align: middle`; botoes de holerite em `Pagamento PM` e `Despesas PM` convertidos para faixa vertical do lado direito da celula, preservando a faixa de calculo do lado esquerdo.
- [x] Complemento da Story 2.107: confirmado que o holerite anexado em `Pagamento PM` alimenta tambem `Despesas PM`; o botao redundante de `Despesas PM` foi removido, preservando totais/descontos e validando 12 botoes em `Pagamento PM` e 0 em `Despesas PM`.

- [x] Story 2.101 concluida: o botao inferior esquerdo (`receitas`) deixou de zerar subtotais e celulas locais; ele agora apenas abate de `Receitas`/saldo geral e mantem o valor visivel na subaba/celula. Puppeteer validou `Mercado` com subtotal `100` e `Dividas atua` com subtotal `200` preservados, enquanto `Fluxo de Caixa` diminuiu; gates passaram.

- [x] Story 2.100 concluida: os subtotais mensais de `Gasolina`, `Despesas X`, `Mercado`, `Dividas holê`, `Dividas anti` e `Dividas atua` ganharam os mesmos dois botoes sutis das celulas totalizadoras, aplicando exclusao/abatimento em lote somente nas linhas da subaba naquele mes. Puppeteer validou os seis scopes com autosave desligado; gates passaram.

- [x] Story 2.99 concluida: em `Financas > Planilha > Despesas`, `Despesas PM` ficou com a mesma fonte/cor compacta verde das subabas, mesmo com controles de totalizacao; `Gasolina`, `Despesas X` e `Mercado` ganharam alca discreta de arrastar e a ordem escolhida passa a persistir em `sheet.expenseGroupOrder`. Puppeteer validou visual e reordenacao simulada; gates passaram.

- [x] Story 2.98 concluida: em `Financas > Planilha > Despesas`, `Despesas PM` ganhou destaque de subaba; a ordem visual ficou `Despesas PM`, `Gasolina`, `Despesas X`, `Mercado` e depois as despesas comuns; `Mercado 1` passou para o grupo `Mercado`; as celulas mensais totalizadoras das categorias ganharam botoes sutis em lote para aplicar a exclusao/abatimento a todos os itens da coluna. Puppeteer confirmou a ordem, o grupo Mercado e os controles em lote; gates passaram.

- [x] Story 2.97 concluida e depois substituida pela Story 2.98: a configuracao de `Despesas EX` e `Gasolina` vazias nao e mais a vigente.

- [x] Story 2.96 concluida e depois substituida pela Story 2.97: a primeira tentativa criou um subgrupo `Despesas` com as despesas comuns agrupadas, mas essa configuracao nao e mais a vigente.

- [x] Story 2.95 concluida: em `Financas > Planilha > Dividas`, as 10 linhas de `M.C. Nu PJ` ate `Cabos e Soldados At` foram marcadas como `oldDebt:true`, passando para `Dividas anti`; `Dividas atua` ficou com 8 linhas e as 9 dividas do holerite foram preservadas. Validado em Puppeteer e gates aprovados.

- [x] Story 2.94 concluida: as 9 dividas do holerite foram confirmadas no arquivo atual e no backup; a linha compacta de dividas do holerite, antigas e atuais agora expande/recolhe pelo clique na linha; `Conectar Pasta` passou a conectar automaticamente ao workspace local via `/api/runtime/info`, sem seletor de pasta quando o servidor local esta disponivel; gates e Puppeteer aprovados.

- [x] Story 2.93 concluida: Financas auditada apos alerta de regressao; heranca mensal `null = copiar mes anterior` confirmada no navegador, autosave reforcado com backup imediato em `localStorage`, fallback servidor quando `Conectar Pasta` falha, `Salvar Tudo` bloqueado se Financas nao salvar primeiro, backups locais sensiveis ignorados por git, e gates `npm run lint`, `npm run typecheck`, `npm test` aprovados.

- [x] Story 2.92 concluida: canal Rimantas/EA Coder mapeado em 138 videos publicos, 127 transcricoes analisadas via configuracao do painel/youtube-transcript, resumo combinado criado, contexto operacional, persona EA Coder Ops Mentor, skills `metatrader-ea-coder-operations` e `metatrader-trade-copier-ops`, painel/configuracoes Forex atualizados e gates `npm run lint`, `npm run typecheck`, `npm test` aprovados.

- [x] Story 2.91 concluida: `AIOX_Trader_On_Chart` atualizado para v1.32 com painel efetivo cerca de 20% maior, pip automatico para BTC/CFDs, `PipSizeOverride`, alerta de spread mais claro e compilacao Dukascopy MT4/MT5 com 0 errors/0 warnings.

- [x] Story 2.86 concluida: Forex ganhou camada `Visual MT4` baseada no template local `Final_Completo_3.tpl`.
- [x] Regra visual implementada em artefatos: Elliott apenas H4/H1; Dow H1 em H1/M15/M5; Dow M15 em M15/M5; Dow M5 somente M5.
- [x] Criados `timeframe-visibility-map.md`, analise MT4, estudo Peak, skill/persona Visual Template Analyst e scripts MQL4/MQL5 de visibilidade.
- [x] Criado EA MT4 `AIOX_Peak_Buffer_Probe.mq4` para registrar buffers do `Peak.ex4` e detectar repaint em candles fechados.
- [x] Painel Forex agora mostra 10 blocos, aba interna `Visual MT4`, 15 cards de arquivos e mapa de agentes com 6 agentes e 5 clones.
- [x] Validacao concluida: JSON parse, `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer desktop/mobile; Browser interno seguiu indisponivel (`agent.browsers.list()` retornou `[]`).
- [x] Instalados `AIOX_Campanha_3por1_MT4.tpl` no Dukascopy MT4 e `AIOX_Campanha_3por1_MT5.tpl` no Dukascopy MT5; scripts MQL4/MQL5 compilados com 0 erros e 0 warnings.
- [x] Instalados `AIOX_Forex_Create_Strategy_Drawings.ex4/.ex5` para criar linhas/figuras editaveis com prefixos e visibilidade Elliott/Dow.
- [x] Story 2.88 concluida: `AIOX_Trader_On_Chart` atualizado para v1.20 com fundo claro/bege, painel 15% maior, timer no painel, melhorias de ordem MT4 e MT5 com filling mode/retcodes.
- [x] Criadas pesquisa, skills e personas para MQL5 EA engineering e portabilidade MT4 -> MT5/JForex/ProfitPro, alem de template inicial ProfitPro/NTSL.
- [x] Instalados e compilados nos terminais Dukascopy MT4/MT5 os EAs v1.20 com 0 errors/0 warnings.
- [x] Story 2.89 concluida: `AIOX_Trader_On_Chart` atualizado para v1.30 com painel 130%, layout mais proximo do Trader On Chart publico, modos de pendente, Two Way, OCO, Smart BE, fechamento por mercado/lucro/prejuizo/pendentes e compilacao Dukascopy MT4/MT5 com 0 errors/0 warnings.
- [x] Story 2.90 concluida: `AIOX_Trader_On_Chart` atualizado para v1.31 com layout compacto estilo TOC, cabecalho por simbolo, linha Close orders, campos tabulares, Buy verde/Sell vermelho; manual local analisado e compilacao Dukascopy MT4/MT5 com 0 errors/0 warnings.

- [x] Story 2.85 concluida: painel Forex corrigido para `Elliott H4/H1 -> Figuras H1/M15/M5 -> Risco 1-2-4`.
- [x] Layout Forex reorganizado em abas internas `Sequencia`, `Fluxo`, `Arquivos` e `MyFXBook`, evitando corte do fluxo visual e dos cards de template no desktop.
- [x] Criados/enriquecidos artefatos MyFXBook: pesquisa oficial, skill `myfxbook-account-verification`, persona `forex-myfxbook-tracker` e clone slot proprio.
- [x] Painel agora mostra 9 blocos, 8 cards de arquivos e accordions MyFXBook para conexao MT4/MT5, Track Record, Trading Privileges e permissoes publicas.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer desktop/mobile; Browser interno seguiu indisponivel (`agent.browsers.list()` retornou `[]`).

- [x] Story 2.84 concluida: aba `Forex` criada na sidebar principal com painel interativo da Campanha 3 por 1.
- [x] O painel Forex renderiza 7 blocos: H4 Dow, H1 Elliott, M15 Figura, M5 Entrada, Risco 1-2-4, MT4/MT5/JForex e Agentes/Skills.
- [x] Criados artefatos editaveis em `projects/forex`: brief, playbook, templates MT4/MT5/JForex, mapa de agentes/skills/personas, personas e skills seed.
- [x] Projeto `forex` registrado no Master/project flows e no fallback interno do dashboard.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer desktop/mobile; Browser interno indisponivel (`iab unavailable`), sem relacao comprovada com creditos.

- [x] Story 2.83 concluida: Master > Clones agora mantem o alternador `Mostrar Todos` / `Filtrar Projeto` tambem dentro do inspector de clone selecionado.
- [x] O modo global/projeto passou a persistir em `aiox.master.ui.v2` como `catalogShowAll`.
- [x] O canvas de clones agora mostra carregamento ate `registry` e `persona assets` estarem prontos, evitando `Catalogo antes dos filtros: 0` falso.
- [x] Puppeteer confirmou Pajero com 12 clones filtrados, 30 clones globais, clone selecionado e retorno para 12 pelo botao `Filtrar Projeto`.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.81 concluida: consolidado o workspace canonico em `C:\Users\ADMIN\.gemini\antigravity-ide\scratch\SommersStore`.
- [x] Sincronizadas para o `.env` atual as configuracoes nao vazias da copia antiga, incluindo Anthropic, OpenAI, Gemini Credits e Vertex, sem expor valores.
- [x] Removida a entrada antiga de `C:\Users\ADMIN\.codex\config.toml` para `C:\Users\ADMIN\.gemini\antigravity\scratch\SommersStore`.
- [x] Excluida a copia antiga `C:\Users\ADMIN\.gemini\antigravity\scratch\SommersStore` e removidos os pais vazios `scratch` e `antigravity`.
- [x] Reiniciado `localhost:4000`; `/api/runtime/info` confirmou `root_dir` na workspace `antigravity-ide`, PID `5692`.
- [x] Validacao concluida: Gemini API status 200, `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.74 concluida: blocos tecnicos Pajero agora abrem em uma visao expandida ampla dentro da aba.
- [x] Cards do grid Pajero foram aumentados para leitura mais confortavel.
- [x] Overlay expandido mostra resumo, acoes, entrega ligada, evidencias e atalhos para checklist, Master e manifesto.
- [x] Fechamento validado por Escape, mantendo a selecao atual do bloco.
- [x] Puppeteer confirmou abertura expandida em desktop/mobile e ausencia de overflow horizontal; scripts de qualidade passaram via runtime Node interno.

- [x] Story 2.73 concluida: aba `Pajero` adicionada na sidebar principal imediatamente abaixo de `Financas`.
- [x] Painel Pajero dividido em blocos tecnicos interativos: Injecao, Correias, Cambio, Suspensao, Sistema de Tracao, Amortecedores/Molas e Eletrica.
- [x] Cada bloco mostra prioridade, estado, resumo, acoes, evidencias relacionadas e atalho para checklist/artefato.
- [x] Selecao de bloco atualiza o detalhe lateral e mantem o fluxo PJ/PO e evidencias existentes em areas preservadas.
- [x] Validacao concluida via scripts de qualidade no runtime Node interno e Puppeteer em desktop/mobile; `npm` nao esta disponivel no PATH do terminal.

- [x] Story 2.72 concluida: `Despesas` e `Dividas` ganharam dois botoes sutis por linha principal.
- [x] Botao esquerdo remove/restaura a linha da somatoria do proprio grupo; botao direito remove a linha do grupo e abate o mesmo valor de `Receitas`.
- [x] O controle antigo de `Dividas Antigas` agora usa a mesma regra centralizada, preservando compatibilidade com `excludeFromDebtTotals`.
- [x] Puppeteer validou `Mercado` e `M.C. Nu PJ`: totais de grupo, `Receitas` e `Fluxo de Caixa` mudam conforme a regra; a planilha permaneceu sem overflow horizontal.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.71 concluida: `Dividas Antigas` foi reposicionada para ficar imediatamente apos o bloco `Dividas do Holerite`.
- [x] A ordem da secao `Dividas` agora e: `Dividas do Holerite`, suas 9 linhas, `Dividas Antigas`, linhas antigas escolhidas manualmente, e depois as dividas normais.
- [x] Puppeteer confirmou `Dividas Antigas` com `0 linhas` no indice 10 da secao, antes de `M.C. Nu PJ`; ao adicionar uma divida antiga, ela entrou antes das dividas normais.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.70 concluida: `Dividas Antigas` agora inicia com `0 linhas` e nao captura automaticamente as 18 dividas normais.
- [x] As dividas normais voltaram a aparecer fora de `Dividas Antigas`, abaixo de `Dividas do Holerite`, sem botao de somatoria.
- [x] `Dividas Antigas` ganhou `+` discreto para adicionar nova divida diretamente no grupo.
- [x] Drag-and-drop agora permite soltar uma divida normal sobre `Dividas Antigas` para marca-la como antiga, e soltar uma antiga sobre uma divida normal para tira-la do grupo.
- [x] Puppeteer confirmou: 9 dividas do holerite, 18 dividas normais fora do grupo, `Dividas Antigas` com `0 linhas` inicial e botoes de somatoria apenas nas linhas antigas.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.69 concluida: `Dividas Antigas` criada dentro de `Planilha > Dividas`, logo abaixo do bloco `Dividas do Holerite`.
- [x] Cada divida antiga ganhou botao sutil para alternar `excludeFromDebtTotals`, mantendo o valor visivel/editavel.
- [x] Totais de `Dividas` e `Fluxo de Caixa` passaram a usar `fin2SheetCellTotalValue`, excluindo somente dividas antigas desligadas.
- [x] Puppeteer confirmou recolhimento independente: 18 dividas antigas ocultadas sem afetar 9 linhas do holerite, e alternancia de `M.C. Nu PJ` removendo/restaurando `122,35` em junho.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.68 concluida: `Dividas do Holerite` ficou fixado como primeiro bloco logo abaixo do cabecalho `Dividas`.
- [x] A renderizacao da secao `Dividas` agora mostra primeiro as linhas originadas do holerite e depois as dividas comuns, sem migracao pesada dos dados.
- [x] O botao de recolher/expandir continua ocultando apenas as dividas do holerite; Puppeteer confirmou 9 linhas recolhidas e 18 dividas comuns ainda visiveis.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.67 concluida: botoes `Flash`, `Salvar Tudo`, `Conectar Pasta` e `IDE:4000` foram verificados no painel local.
- [x] `Flash` deixou de copiar primeiro `docs/control/session_flash.txt` antigo e passou a gerar o contexto atual com `buildSessionFlash()`.
- [x] Criado `persistSessionFlash` e reutilizado no `Salvar Tudo` para manter o arquivo atualizado.
- [x] Puppeteer confirmou clipboard/alerta do `Flash`, payload de `Salvar Tudo`, feedback de `Conectar Pasta` sem File System Access API e alerta de `IDE:4000`.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.66 refeita: `Despesas PM` e `Dividas` ganharam linhas compactas de grupo para recolher/expandir linhas vermelhas vindas do holerite.
- [x] A regra de recolher todo o conteudo de `Despesas PM` foi desconsiderada; Mercado, Celular PJ/PF, Luz + Gas e demais despesas permanecem visiveis.
- [x] A seta da linha `Despesas PM` voltou a recolher/expandir somente as sublinhas do holerite PM.
- [x] A linha compacta interna `Dividas do Holerite` recolhe apenas os 9 descontos bancarios vermelhos e mantem as demais despesas visiveis.
- [x] `Dividas` recolhe apenas as 9 linhas copiadas do holerite e mantem as demais dividas visiveis.
- [x] Os totais continuam calculados independentemente do estado visual dos botoes.
- [x] A primeira versao com botoes extras no pai/cabecalho foi descartada; Puppeteer confirmou 2 linhas compactas e recolhimento interno de bancos.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.65 concluida: dividas vindas do holerite mantem texto vermelho, mas voltam ao fundo cinza/escuro padrao.
- [x] Inputs da `Planilha > Dividas` voltaram ao fundo `#141829`.
- [x] Cards em `Dividas/Acordos` voltaram ao fundo padrao, mantendo borda/texto vermelho e etiqueta `Holerite`.
- [x] Puppeteer confirmou fundo padrao nas celulas e cards, com marcacao vermelha preservada.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.64 concluida: linhas de `Planilha > Dividas` originadas do holerite PM agora ficam vermelhas.
- [x] Cards correspondentes em `Dividas/Acordos` tambem ficam vermelhos e mostram etiqueta `Holerite`.
- [x] A marcacao usa `source: payslipDebt`/`payslipDebtKey`, entao acompanha novos bancos extraidos do holerite.
- [x] Puppeteer confirmou 9 linhas vermelhas em `Dividas`, incluindo BMG `74,97`, e 9 cards destacados em `Dividas/Acordos`.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.63 concluida: modal de holerite PM ganhou o botao `Excluir holerite deste mes`.
- [x] Exclusao mensal limpa arquivo, creditos, descontos e extracao somente do mes aberto.
- [x] Valores PM e dividas bancarias automaticas do holerite recalculam apos a exclusao mensal, preservando contratos.
- [x] Botao de holerite da linha `Despesas PM` ficou verde; `Pagamento PM` permanece azul.
- [x] Puppeteer validou o modal e simulou a exclusao de maio com autosave desligado, sem alterar `projects/financas/data/fin2_data.json`.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.62 concluida: linha dos meses da `Planilha` agora fica fixa durante a rolagem vertical.
- [x] Colunas e inputs foram compactados sutilmente para a tela de PC nao exigir rolagem horizontal.
- [x] Puppeteer validou viewports 1440x900 e 1366x768 sem overflow horizontal no documento, painel e pane.
- [x] Puppeteer confirmou cabecalho sticky com distancia `0` apos rolagem vertical.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.61 concluida: emprestimos bancarios descontados no holerite PM agora alimentam automaticamente `Planilha > Dividas`.
- [x] Novas linhas vindas do holerite sao criadas com origem `payslipDebt`; linhas/credores existentes sao reaproveitados por chave, nome canonico e valor mensal.
- [x] `Dividas/Acordos` segue sincronizado e valores extraidos de contrato continuam prevalecendo sobre os valores vindos do holerite.
- [x] Puppeteer confirmou 9 linhas bancarias do holerite em `Dividas`, incluindo BMG `74,97`, com `Despesas PM` de maio mantida em `2.661`.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.60 concluida: descontos bancarios do holerite PM permanecem visiveis em `Despesas PM`, mas saem da soma de despesas.
- [x] Bradesco, Santander, Daycoval, BMG, Safra e Eagle ficam marcados em vermelho nas sublinhas expandidas.
- [x] `Despesas PM` passa a somar somente descontos nao bancarios; maio validado no navegador com `2.661`.
- [x] Puppeteer confirmou 9 sublinhas bancarias vermelhas, incluindo Eagle.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.59 concluida: painel passou a exibir valores monetarios sem `$` ou `R$`.
- [x] `fin2MoneyCell` e `financeMoney` agora retornam apenas numeros em formato pt-BR.
- [x] `Dividas/Acordos` removeu simbolo de saldo, parcela, amortizacao e oferta.
- [x] Textos fixos do painel com precos antigos perderam `R$`.
- [x] Puppeteer confirmou Financas/Planilha sem `R$` e sem `$ ` visiveis.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.58 concluida: sublinhas expandidas de `Pagamento PM` e `Despesas PM` agora renderizam 12 inputs e copiam o mes anterior.
- [x] Totais das linhas-mae PM passam a refletir os valores efetivos das sublinhas herdadas.
- [x] `Planilha > Dividas` sincroniza nome e parcela mensal com `Dividas/Acordos`.
- [x] Upload/extracao de contrato em `Dividas/Acordos` marca os valores como prioritarios e prevalece sobre edicoes posteriores da Planilha.
- [x] Servidor agora tenta extrair parcela, saldo e quantidade de parcelas de PDFs de contrato no upload.
- [x] Texto auxiliar `Edite os valores diretamente...` removido do painel.
- [x] Puppeteer confirmou heranca PM, sincronismo de nome/parcela, contrato prevalecendo e ausencia de overflow horizontal.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.57 concluida: cabecalhos `Receitas`, `Despesas` e `Dividas` agora tambem sao os totalizadores do grupo.
- [x] Linhas separadas `TOTAL RECEITAS`, `TOTAL DESPESAS` e `TOTAL DIVIDAS` removidas.
- [x] Botoes `+ Adicionar ...` substituidos por bolinhas `+` antes dos nomes dos grupos.
- [x] Moeda da Planilha padronizada para `$ `, inclusive nos inputs editaveis.
- [x] `Pagamento PM` e `Despesas PM` nao herdam mes anterior; maio/2026 vem do holerite anexado e os demais meses ficam zerados ate novo holerite.
- [x] Puppeteer confirmou ausencia de `R$`, ausencia de overflow horizontal em 1440px, 3 botoes circulares e PM apenas em maio.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.56 concluida: valores totalizados de receitas, despesas e dividas agora usam a mesma cor do titulo da linha.
- [x] Linha separadora vazia `FLUXO DE CAIXA` removida.
- [x] Linha final renomeada para `FLUXO DE CAIXA`, em lilas; saldos negativos continuam vermelhos.
- [x] Puppeteer confirmou as cores computadas e os quality gates passaram.

- [x] Story 2.55 concluida: coluna de janeiro virou base e fevereiro-dezembro iniciam como formulas de copiar a celula anterior.
- [x] Dados atuais migrados: linhas numericas usam janeiro como valor-base e `null` de fevereiro a dezembro, exceto holerite PM ja extraido em maio.
- [x] `Rodoanel 1` validado: fevereiro copia janeiro, marco copia fevereiro e, apos digitar `7.000` em marco, abril-dezembro copiam marco.
- [x] Totais de linha, grupo e fluxo de caixa fecharam sem divergencias.

- [x] Story 2.54 concluida e supersedida pela 2.55: a abordagem de zeros legados foi abandonada.
- [x] `Rodoanel 2` agora copia fevereiro para marco/abril a partir de fevereiro, e julho a partir de julho para agosto a dezembro.
- [x] `Outros / Bonus` agora copia maio para junho-dezembro.
- [x] Regra final: `null` e formula de copia; qualquer numero digitado, inclusive `0`, substitui a formula.
- [x] Validacao no navegador e quality gates confirmaram totais de linha, coluna, grupo e fluxo de caixa.

- [x] Story 2.53 concluida: formulas da `Planilha` auditadas para linha, coluna, grupos e fluxo de caixa.
- [x] `fin2SheetNumber` agora normaliza strings monetarias pt-BR persistidas e espacos vazios antes das formulas.
- [x] Celulas herdadas do mes anterior recebem `data-fin2-inherited="true"` e classe `fin2-input-inherited`, diferenciando copia automatica de zero digitado.
- [x] Puppeteer confirmou copia mensal com linha temporaria (`1.000` e `1.234,56`) e total `R$13.876,48`; diferencas PM restantes sao apenas centavos ocultos na exibicao das linhas PM.

- [x] Story 2.52 concluida: celulas numericas vazias de fevereiro a dezembro copiam o valor efetivo do mes anterior.
- [x] Janeiro vazio permanece como zero; `null` representa celula vazia e `0` continua sendo valor real.
- [x] Valores digitados e holerites anexados substituem a copia herdada.
- [x] Junho-dezembro de `Pagamento PM` e `Despesas PM` foram deixados vazios internamente para copiarem maio ate novos holerites.

- [x] Story 2.51 concluida: inputs editaveis da `Planilha` agora exibem ponto de milhar em formato pt-BR.
- [x] Criado parser `fin2ParseMoneyInput` para aceitar `1.000`, `1.000,50` e entradas equivalentes.
- [x] Linhas principais de receitas, despesas e dividas receberam alca de arrastar e soltar dentro do mesmo grupo.
- [x] Ordem de credores em dividas e autosave permanecem alinhados apos reordenacao.

- [x] Story 2.50 concluida: itens expandidos de `Pagamento PM` e `Despesas PM` agora usam escrita sem caixa alta.
- [x] Criado helper `fin2PayslipLabelCase` para normalizar dados extraidos, renderizados e editados manualmente.
- [x] Holerite de maio/2026 atualizado para labels como `Salario base (padrao)` e `Imposto de renda`.

- [x] Story 2.49 concluida: removido o texto `Credito PM · Mes` / `Desconto PM · Mes` das sublinhas expandidas.
- [x] Sublinas PM agora exibem somente o input editavel do item do holerite.
- [x] Edicao e exclusao dos itens expandidos permanecem preservadas.

- [x] Story 2.48 concluida: celulas mensais de `Pagamento PM` e `Despesas PM` viraram totais bloqueados.
- [x] Centavos ocultos somente nas celulas calculadas das linhas PM; valores internos continuam com centavos para a totalizacao.
- [x] Calculos da `Planilha` passaram a usar formatacao pt-BR com ponto de milhar.
- [x] `fin2UpdateCell` agora bloqueia alteracao direta nas linhas-mae do holerite.

- [x] Story 2.47 concluida: holerite PM agora e extraido automaticamente apos upload.
- [x] Botao global antes de `Planilha` removido; o anexo ficou apenas nos meses correspondentes.
- [x] Controle mensal de anexo compactado para preservar as 12 colunas de meses na tela do PC.
- [x] Endpoint `/api/financas/payslip/extract` criado para separar creditos e descontos do PDF.
- [x] `Holerite maio 2026.pdf` foi usado como referencia, copiado para `docs/uploads/Holerite_maio_2026.pdf` e vinculado a maio/2026.
- [x] Maio/2026 ficou com R$9.260,17 em `Pagamento PM` e R$6.080,63 em `Despesas PM`, com 7 creditos e 14 descontos.

- [x] Story 2.46 concluida: `Planilha` recebeu botao pequeno para holerite mensal da PM.
- [x] `Pagamento PM` virou linha-mae expansivel para creditos do holerite.
- [x] `Despesas PM` foi adicionada como primeira linha de `Despesas Fixas` e virou linha-mae expansivel para descontos.
- [x] Holerites agora possuem estrutura mensal com arquivo anexado, creditos e descontos em `projects/financas/data/fin2_data.json`.
- [x] Modal mensal permite anexar arquivo e adicionar lancamentos, sincronizando totais das linhas-mae.

- [x] Story 2.45 concluida: Financas agora mostra apenas `Planilha` e `Dividas/Acordos` na navegacao interna.
- [x] Removidos os panes internos `fin2-pane-ir` e `fin2-pane-mapa` de `docs/aiox_dashboard.html`.
- [x] `fin2Switch` restringido para `planilha` e `dividas`, com fallback para `planilha`.
- [x] Teste de qualidade atualizado para exigir ausencia das abas `Imp. de Renda` e `Mapa` em Financas.

- [x] Story 2.44 concluida: inspector do `AIOX Master Next` agora recomenda agentes, skills e clones por relevancia contextual.
- [x] Auditado registry: 21 squads, 41 agentes, 72 skills, 30 clones, 109 links skill-agente e 53 links clone-agente.
- [x] Skills agora sao ranqueadas por squad, agentes vinculados, tipo do no, offerType, texto do no e criticidade.
- [x] Clones agora sao ranqueados por agentes vinculados, tipo do no, offerType e contexto textual.
- [x] Biblioteca lateral ganhou metadados uteis para agentes, skills e clones.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.43 concluida: produto `Velas Aromaticas` criado em `projects/velas-aromaticas/` com brief, manifesto e manifest.json.
- [x] Gerado e-book principal `Velas Aromaticas do Zero - Master Edition` em HTML imprimivel com 9 paginas A4, inspirado no modelo `O Cofre das Botanicas Secretas`.
- [x] Gerados 2 entregaveis free: `Checklist de Materiais e Fornecedores` e `Mini Guia de Aromas e Combinacoes`.
- [x] Gerados 2 order bumps: `Calculadora de Preco e Lucro` interativa e `Pack de Etiquetas e Cartoes` imprimivel.
- [x] `docs/control/aiox_master_next_state.json` atualizado com o projeto ativo `velas-aromaticas`, 6 nos sequenciais, 5 arestas e arquivos anexados a cada etapa.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer/file URL dos 5 HTMLs gerados.

- [x] Story 2.42 concluida: `AIOX Master Next` agora mostra `Squad executor`, missao, agentes, skills, clones e perguntas de briefing no inspector.
- [x] Auditado `docs/control/registry.json`: 21 squads, 41 agentes, 30 personas, 11 grupos de skills e 72 skills.
- [x] A atribuicao automatica deixou de depender apenas dos primeiros agentes/tokens e passou a usar links reais skill-agente/persona-agente do registry.
- [x] Validacao Puppeteer criou produto de teste, abriu primeiro no com SQD-CORE, 4 agentes, 5 skills, 5 clones, perguntas de briefing e restaurou o estado.

- [x] Story 2.41 concluida: `AIOX Master Next` ganhou fluxo `Produto guiado` sequencial.
- [x] Produto guiado cria esteira com estrategia, entregavel principal, 2 entregaveis free e 2 order bumps.
- [x] Nos guiados nascem numerados, em ordem crescente da esquerda para a direita, com o primeiro no selecionado automaticamente.
- [x] Botao `Start/Avancar` inicia a etapa; quando a etapa em curso e concluida, o proximo no abre automaticamente.
- [x] Validacao Puppeteer criou `Velas Aromaticas Teste`, confirmou 6 nos, 5 arestas, ordem crescente, start no primeiro, avanco para o segundo e restauracao do estado.

- [x] Story 2.40 concluida: `AIOX Master Next` ganhou biblioteca de templates, undo/redo e conexao guiada.
- [x] Topbar recebeu `Templates`, `Desfazer` e `Refazer`; atalhos `Ctrl+Z` e `Ctrl+Y` foram ligados ao historico do canvas.
- [x] Biblioteca cria nos prontos com tipo, squad, resumo, checklist, agentes, skills, clones e conexao automatica ao no selecionado.
- [x] Handles dos nos iniciam conexao guiada e o canvas mostra feedback da origem ate a escolha do destino.
- [x] Validacao Puppeteer confirmou 29 nos e 28 arestas no estado inicial/final, 10 templates, criacao/undo/redo, conexao guiada e zero erros/404.

- [x] Story 2.39 concluida: criado `AIOX Master Next` em `docs/aiox_master_next.html`.
- [x] Novo painel usa rail lateral, topbar compacta e canvas full-screen com pan, zoom, drag, selecao e conexao visual de nos.
- [x] Seed inicial usa SAIS de `docs/control/map_state.json` e enriquece nos com agentes, skills, clones, checklist e arquivos.
- [x] Persistencia isolada criada em `/api/aiox-master-next/load` e `/api/aiox-master-next/save`, salvando `docs/control/aiox_master_next_state.json`.
- [x] Inspector de no permite editar dados, checklist, agentes, skills, clones, upload de arquivos, executar, duplicar e excluir.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer em `http://localhost:4000/aiox_master_next.html` confirmando 29 nos, drawer funcional, no temporario criado/removido, save e zero erros/404.

- [x] Story 2.38 concluida: `Construcao` ganhou `Modo edicao` protegido no mapa embutido.
- [x] `MASTER_MAP_EDIT_MODE` foi persistido no estado do Master.
- [x] O botao `Novo no` aparece apenas com edicao ativa; inspector libera `Duplicar` e `Excluir` apenas no modo protegido.
- [x] Exclusao rapida preserva nos de pipeline e exige confirmacao para nos simples.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer em `http://localhost:4000/` criando/removendo `master-u-01`, retornando para 29 nos e sem erros de console.

- [x] Story 2.37 concluida: `Construcao` ganhou filtros nativos do mapa embutido, salvamento e status protegido no inspector.
- [x] Filtros `Todos`, `Ativos`, `Em curso`, `Bloqueios` e `Rascunho` usam `MASTER_MAP_FILTER` persistido no estado do Master.
- [x] Inspector do no permite marcar `Concluido`, `Em Curso`, `Bloqueado` ou `Rascunho` sem abrir o pane `Mapa`.
- [x] `saveMasterEmbeddedMap` persiste em `/api/map/save`; salvamento legado do Mapa passou a incluir todos os projetos de `MAP_DATA`, inclusive `saude`.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer em `http://localhost:4000/` confirmando Sais com 29 nos, filtro `Bloqueios` com 2 nos, status actions e sem erros de console.

- [x] Story 2.36 concluida: workspace atual `.gemini/antigravity-ide/scratch/SommersStore` assumiu `http://localhost:4000/`.
- [x] Adicionado `/api/runtime/info` no servidor com porta, raiz do workspace, dashboard, cwd, PID e flag `antigravity-ide`.
- [x] Header do dashboard ganhou selo compacto de instancia; Puppeteer confirmou `IDE:4000`, sidebar consolidada e mapa embutido sem erros de console.
- [x] Instancia antiga na porta `4000` e instancia temporaria em `4001` foram encerradas; `4001` nao tem mais servidor em escuta.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test`, `/api/runtime/info` e Puppeteer em `http://localhost:4000/`.

- [x] Story 2.35 concluida: `Construcao` agora renderiza o fluxograma de `MAP_DATA` dentro do Master para projetos com mapa existente.
- [x] Canvas embutido usa nos, arestas, coordenadas, status e labels do Mapa legado.
- [x] Clique em no do mapa abre detalhes no inspector compacto do Master com tipo, grupo, squad, entrega, metrica e bloqueios.
- [x] Botao `Editor` preserva o pane `Mapa` antigo para edicao completa/fallback.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer em `http://localhost:4001/` confirmando Sais, Electro, inspector e editor legado sem erros de console.

- [x] Story 2.34 concluida: sidebar visual consolidada para `Master`, `E-books`, `Site` e `Financas`.
- [x] `E-books` agora abre o Master em `Sais > Construcao`; `Site` abre `Electro > Construcao`.
- [x] Memory, Funil, Projeto, Mapa, Pajero Full, Saude e Ops Desk foram preservados como atalhos do Master/compatibilidade, sem apagar panes antigas.
- [x] `Mapa` ganhou atalho dentro de `Construcao` como passo inicial para virar canvas tipo N8N.
- [x] `Salvar Tudo` e `Conectar Pasta` foram preservados no header; testes passaram a cobrir esses botoes.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer em `http://localhost:4001/`.
- [x] Observacao operacional resolvida na Story 2.36: `http://localhost:4000/` agora serve a workspace atual em `.gemini/antigravity-ide/scratch`.

- [x] Story 2.33 concluida: proposta de sidebar simplificada documentada com `Master`, `E-books`, `Site / Produtos` e `Financas`.
- [x] Recomendado absorver a aba `Mapa` em `Construcao` como canvas tipo N8N, sem remover ainda o HTML atual.
- [x] Recomendado preservar Memory, Salvar Tudo, Pasta Conectada, Squads e Clones em area tecnica/sistema, nao excluir.

- [x] Story 2.32 concluida: criada governanca Antigravity + Codex, auditoria da estrutura atual e estrategia de migracao conservadora do Control Hub.
- [x] Registrada decisao de nao reconstruir do zero cegamente, nao usar GenSpark e bloquear `git add .` ate triagem do worktree sujo.
- [x] Classificados os dominios Produtos Digitais, Electro Commerce, Finance & Tax e projetos adjacentes como Pajero/Saude.

- [x] Story 2.31 concluida: criado mapa visual inicial do escapamento Pajero V77W 6G75, dos coletores ate a ponteira.
- [x] Criados `Pajero/assets/diagramas/escapamento-v77w-6g75-fluxo.svg`, `Pajero/ui/escapamento-visual.html` e `Pajero/docs/escapamento-mapa-visual.md`.
- [x] Manifesto de imagens recebeu slots para coletor esquerdo/direito, front pipes, catalisador ausente/sondas, linha intermediaria e silencioso/ponteira.
- [x] Validacao concluida: JSONs, `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer desktop/mobile da pagina visual.

- [x] Story 2.30 concluida: VIN `JMYLYV77W5JA00169` e motor `6G75RN6738` reconfirmados no perfil Pajero.
- [x] Consulta NHTSA/vPIC registrada com `ErrorCode` 1,7,400 como limitacao de base EUA, sem invalidar o veiculo informado.
- [x] Pesquisa internet documentada com Mitsubishi Techinfo, Mitsubishi Newsroom, Manualzz, Pajero4x4.ru, EPC Data, Nengun, TINKR e Wikimedia Commons, mantendo bloqueios para torques/fluidos/pecas.

- [x] Story 2.29 concluida: aba lateral `Pajero Full` criada abaixo de `Saude`, com canvas visual tipo n8n, KPIs, bloqueios e slots de imagens/evidencias.
- [x] Coluna `Projetos` renomeou `Pajero` para `Pajero AI` e `docs/control/project_flows.json` foi sincronizado.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer em `http://localhost:4000/` confirmando 12 nos, 6 slots de imagem e sem erros de console.

- [x] Story 2.28 concluida: backend do painel agora aceita `project_id` dinamico vindo de `docs/control/project_flows.json`.
- [x] Retomada do projeto Pajero validada na instancia corrigida em `http://localhost:4100/`, criando `SES-20260522-0001` com `project_id: "pajero"`.
- [x] Adicionados aliases de inferencia para Pajero (`PAJERO`, `V77W`, `V5A51`) e cobertura no teste de qualidade.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.27 concluida: painel raiz auditado em 21 abas/panes e area de membros restaurada/refinada a partir da base de 11/05/2026.
- [x] Corrigido erro de runtime `REGISTRY is not defined` no painel, assets quebrados da aba Saude, favicon ausente e faixa `ir-det-summary` da subaba IR.
- [x] Catalogo do hub restaurado do checkpoint `3722728`, removendo placeholders `Novo Item` e corrigindo entregaveis com PDFs/viewers existentes.
- [x] Area de membros ganhou visual premium colorido com hero, estatisticas, sidebar, prateleiras horizontais, cards responsivos e fallback de capas.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test`, Puppeteer no painel e hub, `npm run typecheck` do app, ESLint focado em `app/hub/HubClient.tsx` e JSON do catalogo.
- [x] Observacao: `cd projects/loja-digital; npm run lint` completo excedeu 120s ao varrer o projeto inteiro; o arquivo alterado passou no lint focado.
- [x] `out_deploy` regenerado com `npm run build` e publicado no Firebase Hosting; `/hub` publico validado com a nova area de membros.
- [x] Fluxo `Salvar Tudo` executado manualmente pelo Codex enquanto o botao do painel fica em quarentena de confianca.
- [x] Sessao encerrada pelo usuario em 2026-05-19T02:24:59-03:00.
- [x] Resumo: Story 2.27 concluida, Firebase Hosting publicado e GitHub push `fb31d1f` concluido; botao `Salvar Tudo` permanece em quarentena.
- [x] Proxima acao: Refinar area de membros com novos detalhes do usuario e auditar/testar o botao `Salvar Tudo` antes de voltar a usa-lo.
- [x] Checkpoint: CHK-HUB-0230

- [x] Story 2.26 concluida: subaba `Imp. de Renda` reformulada visualmente para ocupar melhor o painel.
- [x] Grid desktop do detalhe IR agora preenche a altura util, com colunas de arquivos, resultado e fichas mais proporcionais.
- [x] Adicionados contadores de arquivos, trilha visual de progresso e bloco hero do resultado estimado com barras fiscais.
- [x] Breakpoints validados em 1440x900, 1000x800, 760x800 e 390x760.

- [x] Story 2.25 concluida: botoes `RODAR ECAC AGENT`, `PREENCHER IRPF2025` e arquivos da declaracao respondem ao clique.
- [x] Corrigido mismatch de IDs entre HTML e handlers `ecacRunAgent`/`ecacPreencherIRPF`.
- [x] Linhas de arquivos do IR viraram botoes com `data-ir-path` e handler `irOpenArquivo`.
- [x] Adicionado endpoint `/api/ir/open` com allowlist de pastas IR/e-CAC e validacao 403/404.
- [x] Validacao concluida em Puppeteer com chamadas externas interceptadas, alem de `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.24 concluida: botoes `+ Adicionar` do IR preservam a ficha ativa apos re-render.
- [x] Reproduzido em Puppeteer: `+ Adicionar Deducao` adicionava linha, mas voltava para `Rendimentos`, parecendo nao responder.
- [x] Adicionado estado `fin2IrActiveFicha`, `data-ir-ficha` nos botoes e restauracao da ficha ativa apos `fin2RenderIR`.

- [x] Story 2.23 concluida: subaba `Imp. de Renda` reorganizada em layout visual responsivo.
- [x] IR agora separa arquivos, resultado/acoes e fichas fiscais em colunas, com resumo compacto.
- [x] Assertions adicionadas para preservar layout IR em colunas.

- [x] Story 2.22 concluida: navegacao interna de Financas destravada.
- [x] Corrigido fechamento de `ecacOpenModal` em `docs/aiox_dashboard.html`, permitindo registrar `fin2Switch`.
- [x] Teste de qualidade atualizado para validar parse dos scripts inline e wiring dos botoes `fin2-btn-*`.
- [x] Validacao concluida: Puppeteer em `http://localhost:4000/`, `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0526

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0525

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0493

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0492

- [x] Story 2.21 concluida: projeto Imposto de Renda criado com todos os artefatos iniciais.
- [x] Criados `projects/imposto-de-renda/`: README, brief, funil operacional (10 etapas), estado JSON e checklist de documentos.
- [x] Registrado projeto `imposto-de-renda` em `docs/control/project_flows.json` com 6 fases de construcao e 3 de operacao.
- [x] Story 2.21 aberta em `docs/stories/2.21.story.md`.

- [x] Story 2.20 concluida: fichas tecnicas Pajero criadas e anexadas aos 12 clones corretos.
- [x] Criadas 8 fichas em `Pajero/manuals/fichas-tecnicas/` com fonte, status, aplicabilidade e clones consumidores.
- [x] Atualizados `docs/control/persona_materials.json`, `Pajero/data/squad-roster.json` e `Pajero/squad/data/reference-matrices.json`.
- [x] Fontes pendentes da Pajero reconciliadas sem liberar torque, fluido, capacidade, peca ou procedimento sem validacao oficial.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0400

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0397

- [x] Projeto Financas criado com brief, funil operacional, templates de dados e registro no Master Hub/Funil.
- [x] Story 2.14 aberta para rastrear o projeto Financas inicial.
- [x] Fontes oficiais iniciais mapeadas para superendividamento, cidadania financeira, CVM e Tesouro Direto.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.
- [x] UX ajustada: Financas saiu do submenu Funil e virou aba lateral abaixo de Projeto.
- [x] Painel Financas aprimorado com abas internas, KPIs, formularios, tabelas editaveis, metas, plano operacional e persistencia em `projects/financas/data/finance_state.json`.
- [x] Teste visual via Puppeteer confirmou aba ativa, KPIs, abas internas e formulario de dividas.
- [x] Story 2.16 concluida: aba Financas agora segue o modelo da aba Mapa com toolbar refinada, filtros, legenda, canvas operacional, nos conectados e detalhe lateral.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer em `http://localhost:4000/` confirmando 7 KPIs, 12 nos, 12 conexoes, detalhe lateral e filtro `Pressao`.
- [x] Story 2.17 concluida: planilha `Financeiro 2026.xlsx` analisada e integrada a aba Financas.
- [x] Snapshot importado: receita R$ 15.507,03, despesas R$ 1.870, divida total R$ 178.744, parcelas mensais R$ 5.815,44 e reserva R$ 50.
- [x] Dividas individualizadas por credor/linha a partir da aba `PESSOAL`, mantendo totais iguais aos da planilha.
- [x] Subaba `Planilha` adicionada em Financas com origem, abas lidas, alertas de qualidade, workflow e sugestoes de melhoria.
- [x] Artefatos criados: `projects/financas/data/financeiro_2026_import.json` e `projects/financas/financeiro_2026_review.md`.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer em `http://localhost:4000/` confirmando subaba `Planilha`, 7 KPIs e 13 nos no mapa.
- [x] Story 2.18 concluida: Financas rebaseada na aba `SsS Ltda 2025`.
- [x] Snapshot operacional de maio/2026 importado: receita R$ 11.257, despesas R$ 2.792, dividas mensais R$ 11.654, saldo mensal -R$ 3.189 e acumulado -R$ 14.261.
- [x] Forecast mensal de novembro/2025 a dezembro/2026 exposto na subaba `Planilha`.
- [x] Artefatos criados: `projects/financas/data/financeiro_2026_sss_ltda_2025_import.json` e `projects/financas/financeiro_2026_sss_ltda_2025_review.md`.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer em `http://localhost:4000/` confirmando 14 linhas de forecast.

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0306

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0305

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0303

- [x] Reparo do painel: sidebar completa restaurada (Status, Control/Ops Desk, Memory, Squads, Agents, Skills, Personas) e `Clones` voltou a carregar assets enriquecidos via `/api/personas/assets`.
- [x] Varredura do painel: endpoints GET do dashboard responderam 200, todas as abas laterais/sub-abas do Ops Desk abriram e Master > Sais > Clones renderizou 6 clones com arquivos presentes.
- [x] Validacao do painel: `npm run lint`, `npm run typecheck`, `npm test` e sweep via Puppeteer em `http://localhost:4000/`.
- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0265

- [x] Estabilização do Dashboard (Rotação de logs implementada).
- [x] Restauração do Clone Inspector (Gaveta removida).
- [x] Limpeza de arquivos de memória (project_memory.md e task.md).
- [x] Diagnóstico de hardware do usuário (C: com 26GB livres).
- [x] Geração do PDF Editorial: "O Cofre das Botânicas Secretas" (28 páginas).
- [x] Draft do Volume I de "THE BLACK PROTOCOL" (Manifesto e Guia).

## Risks
- Automacao implantada precisa de validacao operacional recorrente para detectar regressao cedo.
- Se `task.md` nao for mantido, o protocolo Oracle/Scribe perde eficacia.

## Last updated
- updated_at: 2026-06-27T18:16:23-03:00
