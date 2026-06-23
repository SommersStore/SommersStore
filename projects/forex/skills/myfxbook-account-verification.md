# Skill - MyFXBook Account Verification

## Objetivo

Gerar checklists seguros para conectar contas MT4/MT5 ao MyFXBook, verificar `Track Record`, verificar `Trading Privileges` e preparar a conta para apresentacao publica.

## Fontes

- `projects/forex/research/myfxbook-metatrader-verification.md`
- MyFXBook Help: `How to add my Trading account?`
- MyFXBook Help: `MetaTrader 4 connection methods`
- MyFXBook Help: `MetaTrader 5 connection methods`
- MyFXBook Help: `Verification`

## Entrada esperada

- plataforma: MT4 ou MT5;
- metodo desejado: Auto Update, Live Update ou EA Publisher;
- broker e servidor;
- se a conta e demo ou real;
- status atual de Track Record;
- status atual de Trading Privileges;
- se a conta sera publica ou privada.

## Saida esperada

- checklist de conexao;
- checklist de verificacao de Track Record;
- checklist de verificacao de Trading Privileges;
- riscos/alertas de credenciais;
- proxima acao segura.

## Guardrails

- Nunca pedir senha master em texto para o painel ou para IA.
- Preferir investor/read-only password quando a conexao permitir.
- Se usar o metodo de ordem pendente, orientar preco distante do mercado e cancelamento apos verificacao.
- EA Publisher exige instalar EA/DLL; so orientar se o usuario aceitar esse caminho conscientemente.
- JForex nao deve ser prometido como integracao MyFXBook se nao houver suporte oficial confirmado.
