# Brief Inicial - Rodovia Segura Operacional

## Origem

Solicitacao direta do usuario em 2026-07-08, com reforco do arquivo externo `C:\Users\ADMIN\Downloads\projeto_app_controle_seguranca_rodovia.md`.

## Pedido central

Construir um aplicativo de celular para controlar uma estrutura de seguranca operacional em rodovia, com 12 postos, escalas 12x36, registro de entrada e saida, evidencias fotograficas, videos, ocorrencias, supervisao por hierarquia e relatorios.

## Premissa de nomenclatura

O texto falado menciona "norte e sul" em um trecho final, mas todo o desenho anterior e o arquivo base adotam Norte e Leste. Para evitar divergencia, este pacote assume como fonte canonica:

- Regiao Norte.
- Regiao Leste.

Se o contrato real usar Norte/Sul, basta renomear a regiao no seed sem alterar a arquitetura.

## Estrutura operacional

### Postos

- 12 postos.
- Cada posto pertence a uma unica regiao.
- Cada posto possui 8 profissionais fixos:
  - 4 vigilantes.
  - 4 segurancas armados.
- Em cada turno ativo por posto:
  - 1 vigilante.
  - 1 seguranca armado.

### Supervisao

- 4 supervisores lideres:
  - Cobrem Norte e Leste.
  - Dia atual, dia seguinte, noite atual, noite seguinte.
- 8 supervisores regionais:
  - 4 na regiao Norte.
  - 4 na regiao Leste.
  - Cobertura 12x36 em dia/noite.
- 8 supervisores de apoio:
  - 4 na regiao Norte.
  - 4 na regiao Leste.
  - Cobertura 12x36 em dia/noite.

### Efetivo

- Profissionais de posto: 96.
- Supervisao: 20.
- Total geral previsto: 116 pessoas.
- Total por turno ativo: 29 pessoas.

## Equipes iniciais

| Equipe | Turno | Ciclo | Abrangencia |
| --- | --- | --- | --- |
| Alfa | Dia | Dia atual | Norte e Leste |
| Bravo | Dia | Dia seguinte | Norte e Leste |
| Charlie | Noite | Noite atual | Norte e Leste |
| Delta | Noite | Noite seguinte | Norte e Leste |

## Necessidades extraidas

- Login individual.
- Perfil com cargo, regiao, posto e equipe.
- Registro de chegada com horario do servidor.
- Registro de saida com horario do servidor.
- Captura obrigatoria de 2 ou 3 fotos no check-in.
- Anexo opcional de videos curtos.
- Registro de novidades/ocorrencias do posto.
- Permissao limitada por cargo.
- Painel para supervisor regional/apoio por regiao.
- Painel para supervisor lider com visao geral.
- Layout amigavel, minimalista e rapido.
- Relatorio diario por posto, regiao, equipe e turno.
- Trilha de auditoria.

## Fora do MVP

- Reconhecimento facial automatico.
- Biometria obrigatoria.
- Roteirizacao avancada de ronda.
- Integracao com camera fixa/CFTV.
- IA para classificar imagens.
- Aplicativo offline completo sem sincronizacao posterior.

## Perguntas de intake para antes do piloto

- Os 12 postos ja possuem nomes oficiais, codigos e coordenadas?
- O contrato exige 2 ou 3 fotos obrigatorias por entrada?
- O video sera permitido sempre ou somente em ocorrencias?
- Qual sera o prazo de retencao das imagens?
- O cliente/auditor externo tera acesso no MVP ou so na fase 2?
- Quem podera corrigir um check-in errado?
- Havera tolerancia de atraso por turno?
- As escalas serao importadas de planilha ou cadastradas manualmente?

