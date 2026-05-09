# Fluxograma Macro de Diagnostico

Imagem base fornecida pelo usuario:

![Fluxograma macro](../assets/diagramas/fluxograma-diagnostico-mermaid.png)

## Mermaid

```mermaid
flowchart TD
    A["Pajero V77W 6G75<br/>200.000 km sem historico"] --> B["Diagnostico inicial"]
    B --> C["Scanner ECU / TCU / ABS"]
    C --> D["Motor: marcha lenta e consumo"]
    D --> E["Admissao, ignicao e injecao"]
    D --> F["Escapamento sem catalisador e sondas lambda"]
    E --> G{"Motor estabilizado?"}
    G -- "Nao" --> D
    G -- "Sim" --> H["Cambio V5A51"]
    H --> I["ATF, carter, filtro/tela, solenoides"]
    I --> J{"Trancos resolvidos?"}
    J -- "Nao" --> K["Diagnostico avancado de transmissao"]
    J -- "Sim" --> L["Transferencia e diferenciais"]
    L --> M["Suspensao e direcao"]
    M --> N["Freios, rodas e rolamentos"]
    N --> O["Teste final e revisao pos-500 km"]
```

## Regra de leitura

Se o motor nao estiver estabilizado, nao concluir falha interna de cambio apenas pelo tranco. Marcha lenta irregular, mistura incorreta, coxins, folgas em cardas/diferenciais e ATF degradado podem se somar.
