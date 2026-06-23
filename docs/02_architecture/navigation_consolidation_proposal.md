# Navigation Consolidation Proposal

**Data:** 2026-05-22  
**Status:** proposta arquitetural; ainda nao aplicada no HTML.

## Diagnostico

O painel tem duplicidade de caminhos:

- `Financas` existe como aba lateral e tambem como projeto no Master.
- `Pajero Full` existe como aba lateral e `Pajero AI` como projeto.
- `Saude` existe como aba lateral e como projeto.
- `Mapa` tem fluxogramas que deveriam viver dentro do contexto do projeto, principalmente em `Construcao`.
- `Memory`, `Salvar Tudo` e `Conectar Pasta` sao importantes, mas ocupam espaco mental de operacao diaria.

O problema nao e falta de informacao. E excesso de pontos de entrada para a mesma coisa.

## Recomendacao franca

Adotar uma sidebar primaria minima:

```text
Master
E-books
Site / Produtos
Financas
```

Tudo que nao for uma dessas quatro entradas deve virar:

- subarea do Master;
- grupo dentro da coluna Projetos;
- drawer/configuracao;
- ou projeto adjacente acessivel, mas nao dominante.

## Sidebar proposta

| Ordem | Aba | Conteudo |
| --- | --- | --- |
| 1 | Master | Visao geral, memoria operacional, atalhos, projetos adjacentes, squads/clones |
| 2 | E-books | Produtos digitais: Sais, Velas, e-books, PDFs, landing, VSL, area de membros |
| 3 | Site / Produtos | Electro Commerce: catalogo, produto fisico, estoque, marketplace, pedidos |
| 4 | Financas | Finance & Tax: CNPJ, PF, IR, documentos, relatorios |

## O que mesclar

| Item atual | Destino recomendado | Observacao |
| --- | --- | --- |
| `Funil` | `E-books` | O funil vira parte do modulo de e-books |
| `Mapa` | `Construcao` dentro de cada modulo | O canvas tipo N8N deve viver no projeto ativo |
| `Projeto` | `Master` | Vira detalhe/inspector do projeto ativo |
| `Financas` aba + `Financas` projeto | `Financas` unico | Usar uma unica fonte visual |
| `Imposto de Renda` projeto | Subarea de `Financas` | IR nao precisa ser projeto solto no hub principal |
| `Saude` aba + projeto | Projeto adjacente no Master | Preservar, mas retirar da sidebar primaria |
| `Pajero Full` aba + `Pajero AI` projeto | Projeto adjacente no Master | Preservar o command room, mas acessar por Pajero AI |
| `Ops Desk` | Drawer/aba tecnica dentro do Master | Operacao, nao nave principal |
| `Memory` | Painel fixo/compacto dentro do Master | Nao remover; apenas reduzir proeminencia |

## Aba `Construcao` como canvas N8N

Concordo com a sugestao de substituir o conteudo de `Construcao` por um fluxo visual.

Regra proposta:

- `Construcao` = canvas operacional tipo N8N do projeto ativo.
- `Vendas` = canvas comercial/funil, apenas para E-books e Site/Produtos.
- `Squads`, `Agentes`, `Skills`, `Clones` = subabas tecnicas, agrupadas como `Equipe IA`.

Isso elimina a aba `Mapa` como destino solto. O mapa deve ser a forma de visualizar a construcao do projeto, nao outro lugar para procurar informacao.

## Squads e clones

Nao recomendo simplificar agressivamente os squads/clones agora.

Motivo:

- eles ja tem testes cobrindo configuracao, drag-and-drop, presets, inspector e vinculo com personas;
- eles sao infraestrutura AIOX, nao conteudo comum;
- se forem escondidos errado, o painel perde o diferencial operacional.

Recomendacao:

```text
Master
  Projetos
  Equipe IA
    Squads
    Agentes
    Skills
    Clones
  Memoria & Sistema
```

Ou seja: reduzir exposicao, nao remover.

## Memoria, Salvar Tudo e Pasta Conectada

Nao recomendo excluir esses recursos.

Mas recomendo mudar a hierarquia:

| Recurso | Decisao recomendada |
| --- | --- |
| Memory | Manter como infraestrutura obrigatoria, dentro de `Master > Memoria & Sistema` |
| Salvar Tudo | Manter, mas com modo seguro/checkpoint e resumo antes de executar |
| Conectar Pasta | Manter, mas como configuracao do sistema, nao como botao principal sempre visivel |

`Salvar Tudo` ja foi historicamente tratado com cautela. Portanto, antes de virar botao confiavel novamente, precisa de uma validacao explicita:

- listar o que sera salvo;
- diferenciar memoria, codigo, build e deploy;
- bloquear commit/push automatico amplo;
- registrar mutacao em `docs/control/memory_mutations.json`;
- mostrar sucesso/falha de cada etapa.

## Projetos canonicos propostos

| Dominio | Projetos/subprojetos |
| --- | --- |
| E-books | Sais, Velas, ebook-generator, the-black-protocol |
| Site / Produtos | Electro, electro-store |
| Financas | CNPJ, PF, IR, documentos, relatorios |
| Adjacent | Pajero AI, Saude |

## Implementacao recomendada

Nao aplicar tudo em uma unica edicao.

1. Criar um modo de navegacao simplificada em documento/teste.
2. Consolidar `Financas` + `Imposto de Renda` como uma unica experiencia.
3. Colocar o canvas de `Mapa` dentro de `Construcao`.
4. Transformar `Pajero Full` e `Saude` em projetos adjacentes no Master.
5. So depois ocultar/remover abas laterais antigas.

## Criterio de aceite futuro

O usuario deve abrir o painel e ver apenas:

```text
Master
E-books
Site / Produtos
Financas
```

E ainda assim conseguir acessar:

- memoria;
- salvar tudo/checkpoint;
- pasta conectada;
- squads;
- clones;
- Pajero;
- Saude;
- IR.

Sem duplicidade visual e sem perder funcionalidades.
