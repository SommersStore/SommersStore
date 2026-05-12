# Funil Operacional - Projeto Imposto de Renda

Inspiracao: aba Funil do AIOX Master, transformada de funil de vendas para funil de conformidade tributaria.

## Visao do fluxo

1. Intake Documental
   - Entrada: informes de rendimento, extratos, recibos, contratos, documentos de bens.
   - Saida: inventario completo de documentos por categoria.

2. Classificacao de Rendimentos
   - Entrada: todos os informes de rendimento reunidos.
   - Saida: rendimentos classificados por natureza (tributaveis, isentos, exclusivos na fonte, recebidos acumuladamente).

3. Inventario de Bens e Direitos
   - Entrada: documentos de propriedade, extratos de investimentos, saldos bancarios.
   - Saida: posicao patrimonial em 31/12/2024 e 31/12/2025.

4. Mapeamento de Dividas e Onus
   - Entrada: contratos de divida, saldos devedores, dados do projeto Financas.
   - Saida: dividas declaraveis com saldo em 31/12 de cada ano.

5. Levantamento de Deducoes
   - Entrada: recibos de saude, educacao, previdencia, pensao alimenticia, dependentes.
   - Saida: total de deducoes aplicaveis com comprovante.

6. Simulacao de Regime
   - Entrada: rendimentos tributaveis, deducoes legais.
   - Saida: comparativo simplificado vs completo, imposto devido, restituicao ou saldo a pagar.

7. Preenchimento da Declaracao
   - Entrada: dados classificados, regime escolhido.
   - Saida: declaracao preenchida no PGD/online da Receita Federal.

8. Revisao e Validacao
   - Entrada: declaracao preenchida.
   - Saida: checklist de consistencia, pendencias do programa, revisao por profissional.

9. Transmissao e Comprovante
   - Entrada: declaracao validada.
   - Saida: recibo de entrega, numero do recibo, DARF se houver saldo a pagar.

10. Acompanhamento Pos-Entrega
    - Entrada: recibo de entrega, e-CAC.
    - Saida: status do processamento, lotes de restituicao, retificacao se necessario.

## Principios de decisao

- Nao enviar declaracao sem conferir cruzamento de informes com fontes pagadoras.
- Nao escolher regime sem simular ambos os cenarios.
- Nao omitir rendimentos, bens ou dividas para evitar malha fina.
- Nao declarar deducao sem comprovante rastreavel.
- Toda classificacao duvidosa precisa de fonte legal e/ou consulta profissional.
- Cruzar bens e dividas com o projeto Financas para evitar inconsistencias.

## Indicadores

- Documentos reunidos vs pendentes.
- Rendimentos tributaveis totais.
- Deducoes legais totais.
- Imposto retido na fonte.
- Imposto devido calculado.
- Restituicao ou saldo a pagar estimado.
- Status da declaracao (rascunho, preenchida, transmitida, processada).
- Dias restantes para o prazo final.
