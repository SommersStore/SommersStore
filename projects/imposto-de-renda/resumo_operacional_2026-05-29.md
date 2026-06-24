# Resumo Operacional IRPF 2026

Data de preparo: 2026-05-29

## Objetivo urgente

Entregar a Declaracao de Ajuste Anual IRPF 2026, ano-calendario 2025, antes do fim do prazo oficial de 29/05/2026. A estrategia solicitada pelo usuario e preparar uma declaracao suficiente para transmissao e, se necessario, retificar depois com calma. O envio final deve ser feito manualmente pelo usuario.

## Fonte oficial de prazo

- Receita Federal: prazo IRPF 2026 de 23/03/2026 a 29/05/2026.
- Noticia oficial da Receita: o prazo termina em 29/05/2026.

## Estado do painel/projeto

- Projeto `projects/imposto-de-renda` existe com brief, funil, estado JSON e checklist.
- Subaba `Financas > Imp. de Renda` existe no painel e ja teve layout e botoes corrigidos.
- Botao `RODAR ECAC AGENT` aciona `/api/ecac/run-agent`.
- Botao `PREENCHER IRPF2025` aciona automacao local, mas ela e voltada a retificacao do exercicio 2025/ano-calendario 2024, nao a entrega IRPF2026.
- `IRPF2026` esta instalado em `C:\Arquivos de Programas RFB\IRPF2026`.
- Nao foi encontrada declaracao IRPF2026 gravada/transmitida no diretorio local do programa ate esta verificacao.

## Historico fiscal ja mapeado

- Declarante: dados cadastrais extraidos da declaracao anterior.
- Declaracao 2025/ano-calendario 2024 localizada em XML/DEC/REC no IRPF2025.
- Rendimento principal anterior: Sao Paulo Previdencia.
- Dependente anterior: Gabriel Vieira Sommerlatte.
- Alimentanda/pensao anterior: Isaura Suleide Vieira Meira, com processo judicial registrado.
- Pagamentos anteriores: CBPM/plano de saude, pensao alimenticia, e TMB Educacao.
- A declaracao 2025 esta marcada no relatorio local como em malha por deducao educacional TMB, com retificacao recomendada separada.

## Pendencias criticas para IRPF2026

- Informe de rendimentos 2025 da SPPREV/Sao Paulo Previdencia.
- Informes bancarios e financeiros 2025: Bradesco, Santander, Nubank, BTG e outros bancos/corretoras aplicaveis.
- Saldos de contas, investimentos, bens e dividas em 31/12/2024 e 31/12/2025.
- Comprovantes de saude, pensao alimenticia, educacao valida e previdencia.
- Confirmar se houve Uber, PJ/MEI, Somos Story, alugueis, venda de bens, ganho de capital ou operacoes em bolsa no ano-calendario 2025.
- Preferencialmente acessar a declaracao pre-preenchida via gov.br para importar dados oficiais.

## Caminho recomendado para entrega hoje

1. Abrir IRPF2026.
2. Iniciar declaracao pre-preenchida com login gov.br do usuario, se possivel.
3. Conferir/importar declaracao anterior para dados cadastrais, dependentes e alimentandos.
4. Preencher rendimentos e deducoes apenas com informes/documentos recebidos ou pre-preenchidos.
5. Declarar bens/dividas com saldos documentados; se faltar documento, priorizar o que estiver na pre-preenchida e deixar anotacao para retificacao.
6. Rodar verificacao de pendencias do programa.
7. Mostrar resumo: rendimentos, deducoes, bens/dividas, imposto a pagar/restituir e pendencias.
8. Usuario decide e clica em enviar.

## Bloqueio atual

O agente e-CAC foi iniciado em 2026-05-29, mas encerrou por timeout antes de login gov.br. Para prosseguir com coleta automatica ou pre-preenchida, o usuario precisa autenticar quando a janela gov.br abrir ou fornecer os informes/documentos para leitura local.
