# Relatorio de instalacao - Gamma Black MT4 no MT5

Data: 2026-09-01

## Resultado

Os templates abaixo foram instalados sem substituir seus nomes ou sua configuracao original:

- `Gamma Black MT4.tpl`: mantem o `GammaLevels_Server_EA_Exness` como EA do grafico.
- `Gamma Black MT4_EA Risco.tpl`: mantem os mesmos sete indicadores visuais e usa o `AIOX_Trader_On_Chart` v1.50 como EA do grafico.

O MT5 aceita apenas um Expert Advisor anexado por grafico. Por isso, os dois EAs foram preservados em templates separados. Para usar simultaneamente o servidor Gamma e o gerenciador AIOX no mesmo ativo, devem ser abertas duas janelas do mesmo simbolo, uma com cada template.

## Terminais atendidos

| Terminal | Hash da pasta de dados | Estado |
| --- | --- | --- |
| ActivTrades | `FE0E65DDB0B7B40DE125080872C34D61` | Instalado e validado |
| ActivTrades - Teste TPL | `ABF1944EF182FAAF2C912C5759E1DF11` | Instalado e validado |
| FTMO Free | `0CCB7139C645BE124D9433CE903C758F` | Instalado e validado |
| FTMO | `81A933A9AFC5DE3C23B15CAB19C63850` | Instalado e validado |

Em cada terminal, os templates estao em `MQL5/Profiles/Templates` e os componentes foram mantidos nos caminhos internos esperados pelo arquivo `.tpl`.

## Dependencias do template

| Componente | SHA-256 da entrega |
| --- | --- |
| `Indicators/Market/Top Clock MT5.ex5` | `D18930F403B0C42EB1F131838E2B9F5D096BAC975995C023BC2779EA58FC0A11` |
| `Indicators/SOMMA/SOMMA_Multimarket_Desk.ex5` | `00651FA6AC3B7F23E6BCCD099BBA63421C23FFBDBA2853D5A81C27731FA837D0` |
| `Indicators/Protheus/MT4_Ports/4-CONJUNTO-DE-VELAS-MT5-CORRIGIDO.ex5` | `9BC8064A3BFBBCD8753757D45237E7F68D0C1D7FD45542E4CD26FDB885524484` |
| `Indicators/00_FAVORITOS/Fractals_Original_MT5.ex5` | `91E473BE8A62C1D232536197F71167F7806A18080CA896093A785445EB2C6BE0` |
| `Indicators/AIOX/AIOX_Peak_SDA_MT5.ex5` | `7E1898917DF4C28F6AA6F555D662E12BB2F82C0E10356EACF72FD0CFEA49277F` |
| `Indicators/SOMMA/SOMMA_FP_Force_Displacement_Resizable.ex5` | `15896734CC1F68E725C6EFD307E213B7D32EFBF3077E444A449A4D3E4229374E` |
| `Indicators/Protheus/MT4_Ports/smFisherTransform3.ex5` | `4F77ECB5CB7EA7288BBD2E277C498F45634488A09D3D231EA57D80B49249BACE` |
| `Files/SOMMA/Niveis_Opcoes_Tradingview_2026-07-18.txt` | `E93F3F19B673E988EE4ADD1926108445B62D0EC46E04925B5BA73BBB6D6FAD9A` |
| `Experts/GammaLevels_Server_EA_Exness.ex5` | `C9B76CDD8922942B54351CCD3A4C33BD7ABE04B3D253CE2BB3930D89316D83CD` |

Os dois templates possuem os mesmos hashes em todos os terminais:

- `Gamma Black MT4.tpl`: `0DAB05FCB5B0CD9545D48F3B45EC20149F47A1C96C7B7D59C0DE8E18829E8577`.
- `Gamma Black MT4_EA Risco.tpl`: `0B650B1E979FB2BE2404DA75BF824C7812E8A853EE30788434AC96750CAB1278`.

## AIOX Trader On Chart MT5 v1.50

O fonte v1.50 foi sincronizado nos quatro terminais com SHA-256 `D7CCDEDD557EFC13775595A180FD1EB5C8CA5D51378A0579BBFFDF3BE48F6D7C`. O binario foi recompilado separadamente em cada MetaEditor e os quatro logs terminaram com `0 errors, 0 warnings`:

- `compile-logs/activtrades-aiox-trader-on-chart-v150-gamma-black.log`
- `compile-logs/activtrades_test-aiox-trader-on-chart-v150-gamma-black.log`
- `compile-logs/ftmo_free-aiox-trader-on-chart-v150-gamma-black.log`
- `compile-logs/ftmo-aiox-trader-on-chart-v150-gamma-black.log`

## Verificacao e seguranca

- Foram validados 13 componentes por terminal, totalizando 52 verificacoes sem divergencia.
- O manifesto da copia esta em `install-manifest-20260901-gamma-black-mt5.csv`.
- A verificacao final esta em `install-verification-20260901-gamma-black-mt5.csv`.
- Arquivos preexistentes foram copiados para `D:/Desktop/MT5_Corrigidos_2026-09-01/backups/Gamma_Black_MT4_20260901-005711` antes da sincronizacao.
- Nenhuma credencial, permissao de negociacao ou ordem foi alterada ou enviada.
- O binario do servidor Gamma foi instalado, mas a atualizacao externa de niveis continua dependente da licenca do fornecedor e da autorizacao para cada conta/terminal. A presenca visual de linhas gravadas no template nao comprova que o feed esteja atualizado.
