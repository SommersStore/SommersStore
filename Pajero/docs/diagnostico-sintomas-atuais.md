# Diagnostico dos Sintomas Atuais

Este arquivo e o ponto de entrada para os clones tecnicos antes de qualquer recomendacao de peca, fluido ou procedimento.

## Sintomas declarados

| Sintoma | Sistema provavel | Prioridade | Status |
|---|---|---|---|
| Marcha lenta instavel | Motor, admissao, injecao, ignicao, sensores | Critico | Pendente de scanner e dados ao vivo |
| Consumo aproximado de 4 km/l | Motor, mistura, sondas, escapamento, catalisador ausente | Critico | Pendente de STFT/LTFT |
| Trancos nas trocas | Motor, coxins, cardans, diferenciais, TCU, V5A51 | Critico | Pendente de DTCs TCU e teste controlado |
| Direcao hidraulica dura | Direcao, bomba, fluido, mangueiras, caixa, geometria, pneus | Alto | Pendente de inspeção visual |
| Catalisador ausente | Escapamento, sondas lambda, mistura, emissao | Critico | Pendente de fotos e leitura de sondas |

## Dados obrigatorios antes de conclusao

- Scanner ECU, TCU e ABS.
- DTCs presentes e historicos.
- Freeze frame quando existir.
- Dados ao vivo em marcha lenta e em rodagem controlada.
- STFT e LTFT em lenta, 2.500 rpm e rodagem.
- Temperatura real do motor.
- Temperatura do ATF se disponivel.
- Fotos do cofre, escapamento, sondas, cambio, suspensao, freios e direcao.

## Hipoteses iniciais permitidas

As hipoteses abaixo sao apenas provaveis. Nao devem virar compra de peca sem evidencia.

- Entrada falsa de ar, TBI sujo, MAF/MAP/TPS fora de faixa, sonda lambda ou escapamento alterado podem explicar lenta e consumo.
- Falha de ignicao, velas, bobinas ou compressao baixa podem explicar lenta irregular.
- Motor instavel, coxins ou folgas de transmissao podem simular tranco de cambio.
- ATF degradado, nivel incorreto, solenoides, corpo de valvulas ou sensores do V5A51 podem participar dos trancos.
- Fluido degradado, bomba cansada, mangueiras restritas, caixa de direcao ou geometria/pneus podem explicar direcao dura.

## Proibicoes

- Nao recomendar flush de cambio sem avaliar ATF, carter e limalha.
- Nao condenar cambio antes de avaliar motor, coxins e folgas de drivetrain.
- Nao recomendar compra de pecas antes do diagnostico inicial.
- Nao assumir torque, fluido, capacidade ou codigo de peca sem fonte.
