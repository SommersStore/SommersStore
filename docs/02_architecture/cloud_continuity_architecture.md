# Arquitetura de continuidade AIOX em nuvem

**Status:** decisao aprovada para implementacao
**Data:** 2026-09-08
**Escopo:** SommersStore, Protheus, memoria/contexto do Codex e estado portavel do Antigravity

## Decisao

A continuidade passa a usar somente duas nuvens, com papeis diferentes e sem transformar a pasta de trabalho ativa em uma pasta sincronizada:

- **GitHub:** codigo, documentacao, memoria governada e historico Git. O projeto Protheus deve ter repositorio privado proprio. O repositorio SommersStore atual permanece preservado; nenhuma exclusao sera feita nesta etapa.
- **Google Drive:** repositorio de snapshots criptografados e incrementais de todo conteudo insubstituivel, inclusive arquivos privados/ignorados, trabalho ainda nao commitado, sessoes do Codex, conversas do Antigravity e pacotes Git de recuperacao.

Firebase continua sendo destino de publicacao de aplicacoes, nunca uma copia de seguranca.

## Correcao da estrategia anterior

Um espelho simples nao e backup suficiente. Exclusao acidental, corrupcao ou ransomware podem ser propagados para a copia sincronizada. A nova camada no Drive usa snapshots versionados, criptografados, deduplicados e verificaveis. A pasta ativa continua local e o Google Drive recebe somente o repositorio gerenciado de backup.

Tambem nao e tecnicamente correto prometer igualdade continua byte a byte entre PC e nuvem. A garantia operacional sera observavel:

- durante o trabalho, o ponto de recuperacao pode ter no maximo 2 horas;
- no fechamento de uma sessao, um backup deve ser executado imediatamente;
- um backup so recebe estado `success` depois de criar o snapshot local, copiar o repositorio para a unidade do Google Drive Desktop e abrir essa copia com o Restic;
- qualquer fonte obrigatoria ausente, credencial indevidamente selecionada ou nuvem indisponivel produz estado `error`, nunca uma confirmacao positiva enganosa.

## Fronteira de escopo

| Conteudo | GitHub | Google Drive criptografado | Restauracao |
| --- | --- | --- | --- |
| SommersStore: codigo e documentos seguros | Sim | Sim | Clone + overlay do snapshot |
| SommersStore: privados, ignorados e nao commitados | Nao | Sim | Seletiva |
| Protheus: projeto canonico, inclusive fontes `.mq4`, `.mq5`, `.cs` e `.java` | Repositorio privado | Sim | Projeto completo |
| Memoria governada em `docs/memory` e `docs/control` | Sim quando apropriado | Sim | Automatica com o workspace |
| Sessoes/indice/configuracao portavel do Codex | Nao por padrao | Sim | Seletiva; autenticacao refeita |
| Conversas, brain, implicit e conhecimento do Antigravity | Nao | Sim | Seletiva |
| Preferencias e historico local do IDE | Nao | Sim | Revisao antes de aplicar |
| `auth.json`, tokens, identificadores de instalacao e caches | Nunca | Nunca | Login novo |
| Plataformas de investimento: instaladores e caches reconstruiveis | Nao | Nao | Reinstalacao oficial |
| Plataformas de investimento: configuracoes e artefatos portaveis | Nao | Sim, por staging controlado | Restauracao seletiva e login novo |

Os diretorios `platforms/` ou `projects/forex/tools/` que estejam dentro do projeto Protheus/SommersStore sao codigo-fonte autoral e continuam incluidos. As raizes operacionais instaladas continuam proibidas como fontes diretas: um coletor somente leitura seleciona os artefatos portaveis, remove caches/credenciais conhecidas, grava uma captura local atomica e somente essa captura entra no Restic.

## Plataformas de investimento

A cobertura inicial inclui MetaTrader 4/5, NinjaTrader 8, JForex 4, ProfitPro, BlackArrow, cTrader, Trader Workstation/IBKR e Tradovate. Novas plataformas detectadas entram no inventario como `perfil_pendente`, sem copia ampla por suposicao.

Cada perfil define caminhos candidatos portaveis, processos associados, diretorios relevantes e exclusoes. O coletor nunca abre, fecha ou configura uma plataforma. Se o processo estiver ativo, arquivos de estado sujeitos a lock ou gravacao continua nao sao tratados como captura completa; o relatorio exige uma nova captura apos o fechamento.

O staging fica fora dos diretorios ativos, sob `%LOCALAPPDATA%\AIOX\Continuity\platforms`. A troca de `current` ocorre por rename somente depois de a captura e o manifesto terminarem. O Restic fornece versoes, criptografia e retencao. Uma pasta legivel no Drive recebe somente catalogos, instrucoes e relatorios sem segredo; ela nao e um espelho do runtime.

## Organizacao do Google Drive

A conta oficial de continuidade e `sommersstoreltda@gmail.com`. A raiz tecnica existente `SommersStore - Backup PC` e preservada para evitar quebrar configuracoes e passa a conter:

- `00-Recovery-Kit`;
- `10-Backups-Criptografados`;
- `20-Relatorios-de-Integridade`;
- `30-Plataformas-de-Investimento`;
- `90-Migracoes-Legadas`.

O antigo `Trading_Backups`, criado por uma rotina Gemini de copia direta, deve ser movido para `90-Migracoes-Legadas` e renomeado, preservando o ID do Drive e sem excluir arquivos. Midias e documentos pessoais ficam fora do repositorio tecnico, em pastas simples da raiz (`Documentos`, `Midia/Fotos`, `Midia/Videos`, `Midia/Audio`, `WhatsApp` e `A-Revisar`). Movimentacoes usam IDs, manifesto anterior/posterior e leitura de confirmacao; nenhum duplicado e apagado automaticamente.

A origem `Outros computadores/Meu computador/Documents` e incompatível com a operacao do NinjaTrader porque propaga a criacao e remocao de arquivos temporarios. A agenda de continuidade permanece bloqueada ate o usuario desativar o backup direto de `Documents` na interface do Google Drive Desktop e a remocao dessa origem ser confirmada. O conteudo remoto preexistente permanece preservado durante a transicao.

## Desktop e Downloads

A Area de Trabalho real e resolvida por candidatos portaveis, priorizando `AIOX_DESKTOP_ROOT`, `D:\Desktop` e o Desktop do perfil. Downloads usa `AIOX_DOWNLOADS_ROOT` ou a pasta do perfil. As duas origens entram no snapshot criptografado; em Downloads, documentos, midias, fontes e pacotes permanecem, enquanto instaladores (`exe`, `msi`, `msix`, `appx`, `iso`) e transferencias incompletas sao reconstruiveis e ficam excluidos. Os originais locais nao sao movidos.

A sincronizacao direta dessas duas pastas no Google Drive Desktop so deve ser retirada depois de um snapshot confirmado localmente e na nuvem. As copias historicas em `Outros computadores` permanecem preservadas ate uma restauracao isolada aprovada.

## Topologia

1. A maquina primaria grava o trabalho em disco local.
2. Antes do backup, a rotina gera inventario da maquina e bundles dos repositorios Git para preservar branches e commits ainda nao publicados.
3. Restic cria um snapshot criptografado no repositorio local gerenciado em `C:\AIOX\Continuity\Repository`.
4. A rotina replica aditivamente o repositorio para `G:\Meu Drive\SommersStore - Backup PC\10-Backups-Criptografados\Restic-AIOX`, unidade ja autenticada pelo Google Drive Desktop.
5. A copia na unidade sincronizada e aberta pelo proprio Restic para confirmar que o snapshot ficou legivel. A conclusao do envio aos servidores Google continua observavel no estado de sincronizacao do Google Drive Desktop e e auditada externamente no primeiro backup e nas verificacoes periodicas.
6. Um relatorio sem segredos e gravado em `20-Relatorios-de-Integridade`.

O repositorio local acelera os backups e oferece uma copia adicional. O repositorio no Drive e a copia para desastre total da maquina.

## Escritor unico

Somente o PC promovido como primario pode executar a rotina agendada. Um marcador no destino de nuvem identifica a maquina autorizada. Outra maquina pode consultar ou restaurar, mas nao publicar snapshots periodicos ate assumir formalmente o papel de primaria.

O notebook podera produzir um snapshot unico de resgate para entregar o Protheus ausente, sem instalar uma agenda permanente. Depois da adocao pelo PC novo, a agenda do notebook deve permanecer desativada.

## Criptografia e credenciais

- O repositorio Restic e criptografado antes de qualquer bloco chegar ao Drive.
- A senha de recuperacao e escolhida pelo usuario e precisa ser guardada fora do PC e fora do mesmo Google Drive, preferencialmente em um gerenciador de senhas e em uma copia fisica lacrada.
- Para execucao automatica, a senha local e protegida pelo DPAPI do Windows e so pode ser aberta pelo mesmo usuario naquela maquina.
- A senha em texto claro nao entra em arquivo, log, argumento de processo, GitHub ou relatorio.
- Credenciais do Codex, Google, GitHub, Firebase e corretoras devem ser autenticadas novamente em uma maquina nova.

Sem a senha de recuperacao, os snapshots sao irrecuperaveis. Ter duas copias independentes dessa senha e requisito de continuidade.

## Fontes portaveis

A configuracao resolve caminhos por variaveis e candidatos, evitando gravar o nome de usuario antigo como verdade global:

- workspace SommersStore;
- workspace Protheus;
- sessoes, sessoes arquivadas, memorias, anexos, skills, indice e configuracao portavel do Codex;
- conversas, brain, implicit, knowledge e artefatos HTML do Antigravity;
- `settings.json`, snippets, History e estados de workspace do IDE;
- inventario de ferramentas e bundles Git gerados pela propria rotina.

Fontes obrigatorias ausentes bloqueiam o backup. Fontes opcionais ausentes sao registradas como aviso.

## Retencao e verificacao

- 24 snapshots horarios;
- 14 snapshots diarios;
- 8 snapshots semanais;
- 12 snapshots mensais;
- verificacao estrutural depois de cada replica para a unidade sincronizada;
- leitura amostral de dados semanal;
- verificacao integral mensal, conforme capacidade de banda;
- teste de restauracao isolado mensal em `C:\AIOX\RestoreTest`, sem sobrescrever o workspace ativo.

A limpeza destrutiva do repositorio de nuvem nao faz parte do backup diario. Prune e espelhamento com remocao somente podem ocorrer em manutencao explicita, depois de verificacao de integridade.

## GitHub

O GitHub nao deve receber commits automaticos de todos os arquivos. Isso poderia publicar dados privados, commits quebrados ou ruido de runtime. O snapshot do Drive protege imediatamente o trabalho nao commitado; commits e pushes continuam deliberados e passam pelos gates.

O repositorio SommersStore foi identificado como publico. Essa visibilidade nao sera alterada silenciosamente. O Protheus deve nascer como repositorio **privado**, depois de auditoria de segredos. Ate a autenticacao do GitHub ser corrigida, o snapshot criptografado no Drive e o bundle Git local sao a protecao primaria do Protheus.

## Recuperacao em um PC vazio

1. Instalar Git, Node.js, Antigravity/Codex, Google Drive Desktop e Restic pelo kit de recuperacao.
2. Entrar novamente nas contas Google e GitHub.
3. Clonar os repositorios versionados em `C:\AIOX\Workspace`.
4. Copiar/adotar o repositorio criptografado do Drive para o cache local.
5. Informar a senha de recuperacao e executar restauracao primeiro em diretorio isolado.
6. Aplicar o overlay privado e os historicos portaveis apos revisar conflitos e caminhos da maquina.
7. Reautenticar Codex, Firebase e demais servicos.
8. Reinstalar as plataformas por fontes oficiais e restaurar seletivamente os artefatos portaveis a partir do snapshot, mantendo logins e automacoes desativados ate a validacao manual.
9. Rodar lint, typecheck, testes, validacao de memoria e relatorio de integridade.
10. Somente entao reivindicar o papel de maquina primaria e instalar a agenda.

## Criterio de promocao definitiva

O PC novo estara plenamente independente do notebook quando:

- o Protheus existir localmente e em repositorio GitHub privado ou, provisoriamente, estiver coberto por snapshot validado no Drive;
- houver pelo menos um snapshot de nuvem validado contendo SommersStore, Protheus e os historicos portaveis;
- uma restauracao isolada recuperar arquivos representativos de cada fonte;
- o relatorio mostrar RPO dentro de 2 horas e zero fontes obrigatorias ausentes;
- o PC novo estiver registrado como unico escritor agendado;
- a senha de recuperacao tiver duas copias independentes confirmadas pelo usuario.

## Referencias tecnicas

- Restic: preparacao de repositorios: <https://restic.readthedocs.io/en/stable/030_preparing_a_new_repo.html>
- Restic: backup e exclusoes: <https://restic.readthedocs.io/en/latest/040_backup.html>
- Restic: restauracao: <https://restic.readthedocs.io/en/stable/050_restore.html>
- Restic: retencao: <https://restic.readthedocs.io/en/latest/060_forget.html>
- Restic: verificacao: <https://restic.readthedocs.io/en/stable/077_troubleshooting.html>
- Google Drive para computador, streaming e espelhamento: <https://support.google.com/drive/answer/13401938?hl=pt-BR>
