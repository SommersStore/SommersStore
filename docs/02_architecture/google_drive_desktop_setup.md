# Google Drive Desktop para a continuidade AIOX

O transporte padrao usa o Google Drive para computador ja autenticado. Nao e necessario criar, publicar ou verificar um aplicativo OAuth proprio.

## Requisitos

1. O Google Drive Desktop deve estar aberto e autenticado na conta que contem `SommersStore - Backup PC`.
2. A unidade deve aparecer como `G:\Meu Drive`.
3. A pasta `SommersStore - Backup PC\10-Backups-Criptografados` deve estar acessivel.
4. O icone do Google Drive deve indicar sincronizacao concluida depois de cada backup.

## Validacao

O preflight confirma a unidade, as fontes obrigatorias, as exclusoes e o Restic:

```powershell
npm run continuity:preflight
```

Depois do backup, a rotina abre a copia em `G:` com o Restic e compara o identificador do snapshot com a copia local. A primeira execucao e as auditorias periodicas tambem devem confirmar pelo Drive web/conector que os relatorios e o repositorio chegaram a nuvem.

## Novo computador

1. Instale o Google Drive Desktop e entre novamente na conta.
2. Aguarde `Meu Drive` ficar disponivel.
3. Execute o bootstrap do kit de recuperacao.
4. Informe a mesma senha do repositorio criptografado.
5. Restaure primeiro em diretorio isolado e somente depois promova a maquina.

Tokens e arquivos internos do Google Drive Desktop nunca sao copiados entre computadores.
