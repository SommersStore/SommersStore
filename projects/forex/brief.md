# Brief - IBKR Manual Desk

## Origem

Fontes primarias:

- `C:\Users\ADMIN\Downloads\Eu tenho uma estrategia 2.md`
- `C:\Users\ADMIN\Downloads\Forex 1.md`
- `C:\Users\ADMIN\Downloads\Genspark.md`

## Pedido central

Reformular a aba Forex para uma rotina manual com foco na Interactive Brokers:

- campanha 3x1 com risco de 1%, 2% e 4% em três níveis e alvo fixo de 1:1,5;
- reset da campanha em qualquer perda e nova oportunidade em cada nível;
- posição patrimonial em ações com estudo visual separado de protective put;
- simuladores explícitos para uma conta inicial de US$ 500, sem conexão com corretora nem envio de ordens;
- Dukascopy preservada como alternativa/laboratório, não como jornada prioritária.

## Decisão de escopo

As estratégias serão exibidas e treinadas separadamente no início:

1. A campanha 3x1 usa stop técnico e alvo 1,5R, sem usar uma opção para justificar uma entrada fraca.
2. A proteção por opções parte de uma posição em ação que o usuário deseja possuir; o painel compara a queda sem hedge e com put ao vencimento.
3. Uma combinação só será estudada depois que prêmio, strike, vencimento, liquidez e multiplicador estiverem claros. Nesse caso, o risco deve considerar a perda máxima após o hedge e o prêmio pago.

## Premissas operacionais

- Uma campanha por vez; nível 2 ou 3 não é obrigação nem deve ser forçado.
- Capital inicial de referência: US$ 500, usado para visualizar restrições de tamanho e de contratos.
- IBKR Desktop inicia a rotina; TWS entra depois para cadeia/combinação de opções; Mobile serve para acompanhamento.
- Dados, permissões, custos e tributação devem ser confirmados na corretora e com profissional habilitado antes da conta real.

## Necessidades futuras

- Enriquecer agentes especializados de estrategia, risco, plataforma e auditoria.
- Criar skills profundas para Elliott H4/H1, figuras H1/M15/M5, risco 1-2-4, templates MT4/MT5/JForex, MyFXBook e diario de campanha.
- Criar clones/personas com memoria tecnica da estrategia.
- Evoluir para scripts/indicadores quando a estatistica estiver validada.
