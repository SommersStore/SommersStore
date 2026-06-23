# Pesquisa Internet - Fontes Pajero - 2026-05-22

## Objetivo

Registrar a rodada de conferencia feita apos o usuario informar novamente:

- Chassi/VIN: `JMYLYV77W5JA00169`
- Numero do motor: `6G75RN6738`

Esta pesquisa complementa a base do projeto, mas nao libera compra de pecas, torque, fluido, capacidade ou procedimento sem validacao por fonte oficial/OEM e conferencia fisica.

## Resultado executivo

- O VIN e o numero do motor ja constavam no projeto e foram reconfirmados pelo usuario em 2026-05-22.
- A consulta NHTSA/vPIC nao decodificou o VIN como mercado EUA. O retorno foi registrado como limitacao da base norte-americana, nao como invalidacao do veiculo.
- Foram encontradas fontes que sustentam a familia tecnica V77W/6G75/V5A51 como referencia de escopo.
- Manuais e PDFs publicos encontrados devem ser tratados como espelhos/candidatos ate confronto com Mitsubishi Techinfo, EPC/OEM, plaquetas e documentacao do veiculo.
- Ha imagens publicas licenciadas da Pajero 3a geracao para referencia visual, mas elas nao substituem fotos reais do veiculo do usuario.

## Conferencia do VIN

Consulta executada:

- Fonte: NHTSA/vPIC DecodeVinValues
- URL: `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/JMYLYV77W5JA00169?format=json`
- Data: 2026-05-22
- VIN retornado: `JMYLYV77W5JA00169`
- VehicleDescriptor: `JMYLYV77*5J`
- ErrorCode: `1,7,400`
- AdditionalErrorText: `Invalid character(s): 9:W.`

Interpretacao:

- A posicao 9 do VIN e tratada pela NHTSA como digito verificador norte-americano, e a base retornou erro.
- A propria resposta tambem indica que o fabricante nao esta registrado ali para venda/importacao nos EUA.
- Conclusao operacional: manter o dado como informado/reconfirmado pelo usuario e exigir conferencia por plaqueta, gravacao, documento e EPC/OEM antes de BOM ou procedimentos.

## Fontes encontradas

| ID | Fonte | URL | O que acrescenta | Status |
| --- | --- | --- | --- | --- |
| `mmna-techinfo` | Mitsubishi Motors North America Service Information Retrieval | https://www.mitsubishitechinfo.com/epacarb/svcoverview.jsp | Portal oficial com manuais, TSBs, campanhas, diagnostico de transmissao, emissao, MUT-II e OBD-II para veiculos vendidos nos EUA | Oficial por assinatura; prioridade de validacao, mas aplicabilidade ao mercado brasileiro deve ser checada |
| `mmna-2004-montero-highlights` | Mitsubishi Cars Newsroom - 2004 Montero Technical Highlights | https://media.mitsubishicars.com/en-US/releases/release-c36e252c038ba2ca88e72b784b06fbf3-2004-mitsubishi-montero-technical-highlights | Referencia oficial publica para Montero 3.8 V6, automatico 5 marchas, ActiveTrac/4WD, suspensao e freios | Oficial auxiliar; nao usar sozinho para valores de manutencao |
| `nhtsa-vpic` | NHTSA Vehicle API / vPIC | https://vpic.nhtsa.dot.gov/api/ | Confirma que a base NHTSA decodifica VINs a partir de dados enviados por fabricantes e documenta os endpoints usados | Oficial governamental; consulta ao VIN retornou erro/limitacao |
| `manualzz-v77w` | Manualzz - Mitsubishi Montero V77W service manual mirror | https://manualzz.com/doc/6353578/mitsubishi-montero-v77wlyhvl2m-3m--v77wlyxvl2m-3m-vehicle... | Indica manual Montero V77W com topicos de 6G75, V5A51, identificacao, manutencao e torques gerais | Espelho publico; pendente de validacao |
| `pajero4x4-gr00` | Pajero4x4.ru - PDF Group 00 V77W | https://pajero4x4.ru/piii/GR00001000-00.pdf | Mostra identificacao V77W, motor 6G75, transmissao V5A51, local de plaquetas e especificacoes gerais | Espelho publico; usar apenas como candidato |
| `epc-data-pajero` | EPC Data - Mitsubishi Pajero parts catalog | https://mitsubishi.epc-data.com/pajero/ | Permite procurar por frame number e inclui V77W na arvore do Pajero | Catalogo publico; pendente de busca pelo frame correto |
| `nengun-v77w` | Nengun - Pajero V77W OEM part catalogs | https://www.nengun.com/oem/mitsubishi/pajero-v77w | Lista Pajero V77W, producao 1999-2006, motor 6G75 e categorias de pecas OEM | Catalogo comercial; bom para triagem, nao substitui EPC oficial |
| `tinkr-lyv77w` | TINKR - fitment LYV77W/V77W | https://tinkr.co.nz/products/pajero-v75w-rear-hub-ab6484 | Evidencia auxiliar de fitment LYV77W/V77W 3.8L 6G75, 5sp Auto, 4WD | Aftermarket; nao usar como OEM |
| `wikimedia-pajero-np` | Wikimedia Commons - 2006 Mitsubishi Pajero (NP) VR-X wagon | https://commons.wikimedia.org/wiki/File:2006_Mitsubishi_Pajero_(NP)_VR-X_wagon_01.jpg | Imagem publica da Pajero NP/3a geracao para referencia visual/licenciada | Public domain; apenas referencia visual generica |

## Dados que podemos complementar agora

- Escopo tecnico do projeto segue coerente como Pajero/Montero familia V77W, motor base 6G75, transmissao automatica V5A51.
- Registrar `LYV77W` como termo de busca util em catalogos e fitment, sem substituir o codigo principal `V77W`.
- Registrar que NHTSA/vPIC nao e fonte adequada para validar limpo este VIN importado/fora do mercado EUA.
- Adicionar imagem publica licenciada como referencia visual generica, mantendo fotos reais como pendencia obrigatoria.

## Dados ainda bloqueados

- Codigos OEM de pecas por VIN/frame.
- Capacidade e especificacao final de ATF, oleos de diferenciais, transferencia, arrefecimento, freio e direcao.
- Torques especificos por sistema.
- Procedimentos internos de V5A51.
- Diagramas eletricos de ECU, TCU, ABS e sondas.
- Diagnostico de causa-raiz de consumo, marcha lenta e trancos.

## Proxima acao recomendada

Executar a conferencia fisica e documental:

- Foto da plaqueta VIN.
- Foto da gravacao do chassi.
- Foto da numeracao do motor `6G75RN6738`.
- Foto da plaqueta/etiqueta do cambio e transferencia.
- Foto do codigo de cor A19.
- Busca EPC/OEM por frame/VIN depois dessas fotos.
- Scanner ECU/TCU/ABS com DTCs, freeze frame e dados ao vivo antes de qualquer compra.
