# Contrato da ponte local IBKR

## Objetivo e limite

Esta ponte é uma camada local, opcional e de leitura para o `IBKR Manual Desk`. Ela permite trazer uma cotação, notícias e contratos de opções para o painel quando o próprio operador já tiver autenticado uma ferramenta IBKR no computador. A ponte não recebe, armazena ou solicita senha, 2FA, cookie, token de sessão ou número de conta.

O painel começa com a ponte desligada e em modo `paper_only`. Não existe rota de envio de ordem real.

## Endereçamento permitido

O dashboard aceita somente uma ponte HTTP em loopback:

- `http://127.0.0.1:<porta>`
- `http://localhost:<porta>`
- `http://[::1]:<porta>`

URLs públicas, IPs de rede, HTTPS arbitrário, credenciais na URL e caminhos com `..` são recusados. O timeout padrão é 2,5 segundos.

## Endpoints esperados no adaptador local

### `GET /health`

Resposta mínima:

```json
{
  "ok": true,
  "mode": "paper",
  "authenticated": true,
  "source": "TWS adapter"
}
```

`mode` diferente de `paper` não habilita operações nem troca o modo do painel; serve apenas para informar um estado incompatível.

### `GET /v1/intelligence?symbol=SPY`

Resposta ilustrativa:

```json
{
  "as_of": "2026-06-22T14:30:00Z",
  "source": "TWS adapter",
  "quote": {
    "symbol": "SPY",
    "last": 600.12,
    "bid": 600.1,
    "ask": 600.14,
    "currency": "USD",
    "delayed": false
  },
  "news": [
    {
      "headline": "Título vindo do provedor autorizado",
      "source": "Provedor",
      "url": "https://exemplo.invalid/noticia",
      "published_at": "2026-06-22T14:00:00Z"
    }
  ],
  "options": [
    {
      "conid": "12345",
      "right": "P",
      "strike": 580,
      "expiry": "2026-08-21",
      "bid": 8.1,
      "ask": 8.5,
      "last": 8.3,
      "underlying_price": 600.12,
      "open_interest": 1500,
      "volume": 230
    }
  ]
}
```

Os dados externos são normalizados no servidor. Uma resposta vazia, inválida ou indisponível não é convertida em preço hipotético. O ranking calcula uma triagem explicável para puts, considerando prazo, spread e prêmio relativo; não é recomendação de investimento nem garantia de execução.

## API interna do painel

- `GET /api/ibkr/status`: estado da configuração e health local, sem segredos.
- `GET /api/ibkr/intelligence?symbol=SPY`: chama a ponte apenas se habilitada.
- `GET /api/ibkr/paper-tickets`: lista rascunhos locais.
- `POST /api/ibkr/paper-tickets`: cria rascunho `draft_local_only` depois de reconhecimento paper explícito.
- `DELETE /api/ibkr/paper-tickets/:id`: exclui o rascunho local.

Não há `POST /api/ibkr/orders`. A confirmação e o clique de qualquer operação continuam sendo do usuário, dentro da conta paper ou real da IBKR, fora deste painel.
