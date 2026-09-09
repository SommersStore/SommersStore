# Continuidade das plataformas de investimento

## O que esta protegido

A rotina cobre MetaTrader 4/5, NinjaTrader 8, JForex 4, ProfitPro, BlackArrow, cTrader, Trader Workstation/IBKR e Tradovate. Ela preserva configuracoes, perfis, templates, workspaces, indicadores, EAs e estrategias portaveis. Instaladores, caches, historico de mercado reconstruivel, logs, temporarios e credenciais conhecidas ficam de fora.

Os arquivos ativos nunca sao sincronizados diretamente com o Google Drive. A sequencia segura e:

1. origem local da plataforma;
2. captura somente leitura em `%LOCALAPPDATA%\AIOX\Continuity\platforms\current`;
3. snapshot criptografado Restic;
4. copia do repositorio Restic para o Google Drive;
5. catalogo legivel em `SommersStore - Backup PC/30-Plataformas-de-Investimento/00 - Catalogos e instrucoes`.

## Comandos no workspace

Execute sempre na pasta raiz do SommersStore:

```powershell
npm run platforms:inventory
npm run platforms:capture
npm run platforms:status
npm run continuity:preflight
npm run continuity:backup
```

`platforms:capture` nao abre nem fecha programas. Se algum estiver aberto, o catalogo marca `partial_platform_open`. Para a primeira captura completa, feche manualmente todas as plataformas e execute o comando novamente.

## Remover a duplicidade do Google Drive Desktop

Enquanto esta etapa nao for concluida, mantenha o Google Drive pausado:

1. abra o icone do Google Drive proximo ao relogio do Windows;
2. clique na engrenagem e em `Preferencias`;
3. em `Meu computador`, selecione a pasta `Documents`/`Documentos`;
4. desmarque `Sincronizar com o Google Drive` ou use `Parar sincronizacao`;
5. confirme mantendo os arquivos que ja estao na nuvem;
6. nao selecione a opcao de excluir arquivos da nuvem.

Depois da confirmacao visual, execute:

```powershell
npm run platforms:ack-drive-safe
```

Esse comando nao altera o Google Drive. Ele apenas registra que a confirmacao humana foi feita e libera o preflight/agendamento. Em seguida, retome o Google Drive e espere o estado `Tudo atualizado` antes do primeiro backup completo.

## PC novo

No PC novo, primeiro atualize o workspace pelo GitHub, instale Restic/Google Drive Desktop, restaure em diretorio isolado e reinstale as plataformas por fontes oficiais. Somente depois aplique os artefatos de cada plataforma seletivamente. Logins, contas e automacoes devem permanecer desativados ate o smoke test manual em ambiente demo.

A agenda de duas horas deve existir em uma unica maquina. Quando o PC novo assumir o papel de primario, o notebook permanece apenas como maquina de consulta/restauracao.

## Recuperacao e reversao

- O backup Gemini de 2026-09-08 foi preservado em `90-Migracoes-Legadas/Backup-Plataformas-Legado-Gemini-2026-09-08`.
- Nenhum duplicado e apagado automaticamente.
- A captura anterior local permanece em `platforms\previous` depois de uma nova troca atomica.
- Uma restauracao sempre deve ocorrer primeiro fora das pastas ativas das plataformas.
