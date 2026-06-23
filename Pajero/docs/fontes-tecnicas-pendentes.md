# Fontes Tecnicas Pendentes

Este arquivo lista as fontes que precisam ser adicionadas antes de transformar o projeto em referencia tecnica operacional.

## Prioridade critica

- Manual de servico aplicavel ao Pajero V77W com motor 6G75 gasolina.
- Informacoes tecnicas do cambio automatico V5A51 aplicavel ao veiculo.
- Tabela oficial de fluidos e capacidades.
- Tabela oficial de torques por sistema.
- Diagramas eletricos de ECU, TCU, ABS e sondas lambda.
- Procedimento de verificacao do ATF do V5A51.
- Procedimento de correia dentada do 6G75.
- Diagramas do Super Select e caixa de transferencia.

## Prioridade alta

- Manual do proprietario do veiculo.
- Catalogo de pecas por VIN ou EPC confiavel.
- Diagramas de suspensao dianteira e traseira.
- Diagramas de freios, rolamentos e ABS.
- Informacoes de alinhamento, cambagem e caster.
- Diagramas de direcao hidraulica.

## Registro de fonte

Cada fonte adicionada deve registrar:

- Nome da fonte.
- Origem.
- Versao/ano.
- Aplicabilidade ao V77W, 6G75 e V5A51.
- Sistemas cobertos.
- Status: confirmado, provavel ou pendente de validacao.
- Caminho do arquivo dentro de `Pajero/manuals/`.

## Pastas esperadas

- [Manual do proprietario](../manuals/manual-proprietario/README.md)
- [Manual de servico](../manuals/manual-servico/README.md)
- [Manual do cambio V5A51](../manuals/manual-cambio-v5a51/README.md)
- [Diagramas de suspensao](../manuals/diagramas-suspensao/README.md)
- [Tabelas de fluidos e torques](../manuals/tabelas-fluidos-torques/README.md)

## Fontes candidatas anexadas em 2026-05-11

As fichas abaixo foram anexadas aos clones corretos em `docs/control/persona_materials.json` e `Pajero/data/squad-roster.json`.

| Ficha | Status | Uso |
| --- | --- | --- |
| `Pajero/manuals/fichas-tecnicas/ficha-00-fonte-oficial-mmna-techinfo.md` | fonte oficial, conteudo por assinatura | Ponto de validacao primaria para manual, TSB, OBD-II, MUT-II e documentos tecnicos |
| `Pajero/manuals/fichas-tecnicas/ficha-01-v77w-identificacao-especificacoes-base.md` | oficial auxiliar + espelho pendente | Identificacao V77W/6G75/V5A51 e coerencia de escopo |
| `Pajero/manuals/fichas-tecnicas/ficha-02-6g75-motor-manutencao.md` | provavel / pendente | Motor 6G75, lenta, consumo, manutencao e diagnostico |
| `Pajero/manuals/fichas-tecnicas/ficha-03-v5a51-transmissao-transfer.md` | provavel / pendente | Cambio V5A51, transfer, arquitetura e diagnostico |
| `Pajero/manuals/fichas-tecnicas/ficha-04-atf-nivel-v5a51.md` | pendente de validacao oficial | Checklist de nivel/temperatura/estado do ATF |
| `Pajero/manuals/fichas-tecnicas/ficha-05-super-select-active-trac.md` | oficial auxiliar / pendente mercado | Modos 4x4, transfer, drivetrain e rodagem |
| `Pajero/manuals/fichas-tecnicas/ficha-06-fluidos-arrefecimento-freios.md` | pendente de validacao oficial | Arrefecimento, freios e bloqueios de seguranca |
| `Pajero/manuals/fichas-tecnicas/ficha-07-vin-nhtsa-limitacao.md` | consulta oficial com limitacao | Registro de que NHTSA nao valida este VIN como mercado EUA |

## Pendencia apos anexos

- Confirmar manual oficial do mercado correto do veiculo.
- Confirmar se o Montero 2004/2005 EUA e equivalente ao Pajero HPE brasileiro em cada sistema antes de aplicar valores.
- Validar submodelo exato do V5A51 por plaqueta/documentacao antes de usar torques ou procedimentos internos.
- Trazer EPC/catalogo de pecas confiavel por VIN antes de liberar BOM.

## Pesquisa internet 2026-05-22

Resultado da rodada feita apos o usuario reconfirmar o chassi/VIN `JMYLYV77W5JA00169` e o numero do motor `6G75RN6738`.

| Fonte | Nivel | Uso permitido agora | Status |
| --- | --- | --- | --- |
| Mitsubishi Techinfo / MMNA | Oficial por assinatura | Prioridade maxima para manual, TSB, OBD-II, MUT-II e documentos tecnicos de modelos vendidos nos EUA | Acesso por assinatura; ainda nao libera valores aplicaveis ao mercado brasileiro |
| Mitsubishi Cars Newsroom - 2004 Montero Technical Highlights | Oficial publica auxiliar | Referencia de arquitetura Montero/V77W: 3.8 V6, 5AT, ActiveTrac/Super Select, suspensao e freios | Aplicabilidade por mercado ainda pendente |
| NHTSA/vPIC | Governamental EUA | Registrar limitacao de decodificacao do VIN em base norte-americana | Consulta retornou `ErrorCode` 1,7,400; nao usar para invalidar o veiculo |
| Manualzz - Montero V77W service manual mirror | Espelho publico | Triagem de secoes V77W/6G75/V5A51 e localizacao de topicos | Pendente de validacao de origem e mercado |
| Pajero4x4.ru - PDF Group 00 V77W | Espelho publico de PDF tecnico | Conferencia auxiliar de identificacao V77W/6G75/V5A51 e localizacao de plaquetas | Pendente de validacao contra fonte oficial |
| EPC Data - Mitsubishi Pajero catalog | Catalogo publico de pecas | Busca por frame/modelo e navegacao V77W antes de BOM | Pendente de validacao por VIN/frame completo |
| Nengun - Pajero V77W OEM parts catalog | Catalogo comercial OEM | Apoio de categorias OEM e coerencia V77W/6G75 | Candidato, nao substitui EPC oficial |
| TINKR fitment LYV77W/V77W | Aftermarket | Evidencia auxiliar de fitment LYV77W/V77W 3.8 6G75 5AT 4WD | Candidato, nao usar como fonte OEM |
| Wikimedia Commons - Pajero 3rd generation | Imagem publica | Referencia visual generica/licenciada para dashboard | Nao substitui fotos reais do veiculo |

Detalhamento registrado em [`pesquisa-internet-fontes-2026-05-22.md`](pesquisa-internet-fontes-2026-05-22.md).
