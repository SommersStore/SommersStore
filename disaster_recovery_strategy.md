# Guia de Sobrevivência: Estratégia de Recuperação e Resiliência

Este guia contém instruções passo a passo para você manter, proteger e recuperar seu projeto **SommersStore**, mesmo que eu (Antigravity) não esteja acessível.

## 🛡️ Prevenção (Como evitar novos travamentos)

### 1. Regra de Ouro: Perfis de Navegador
Para evitar conflitos de tokens e contas:
- **NÃO troque de conta do Google no mesmo perfil de navegador.**
- Crie um Perfil de Usuário no Chrome/Edge chamado "SommersStore".
- Mantenha apenas o login da conta principal (`sommersstoreltda@gmail.com`) nesse perfil.
- Use outros perfis para outras contas. Isso isola completamente os cookies e chaves.

### 2. Higiene de Contexto
- **Sessões Curtas**: Evite conversas com mais de 50-100 mensagens.
- **Novas Conversas**: Quando terminar uma funcionalidade, comece uma nova conversa. Diga: "Resuma nosso estado atual para que eu possa levar para um novo chat".

---

## 🆘 Plano de Emergência (Manual)

Se o sistema travar e eu não responder, siga estes passos para recuperar o controle.

### Passo 1: Localizar o Código
Seu código sempre estará em:  
`C:\Users\ADMIN\.gemini\antigravity\scratch\SommersStore`  
*(Crie um atalho na Área de Trabalho para esta pasta agora!)*

### Passo 2: Recuperação via Git (Desfazer Erros)
Se eu fizer algo que quebre o código e eu sumir:
1. Abra o PowerShell na pasta do projeto.
2. Digite: `git status` (para ver o que mudou).
3. Digite: `git checkout .` (para desfazer todas as mudanças locais e voltar ao último commit seguro).
4. Digite: `git pull origin master` (para garantir que você tem a versão mais recente do GitHub).

### Passo 3: Recuperação via Firebase (Reverter Deploy)
Se um deploy der errado:
1. Digite: `firebase hosting:rollback`
2. Isso voltará o site para a versão anterior imediatamente no ar.

### Passo 4: Sincronização Manual com Backup
Se o computador pifar e você tiver apenas a pasta de backup e o GitHub:
1. **Clone**: `git clone https://github.com/SommersStore/SommersStore.git`
2. **Restaurar .env**: Copie o arquivo `.env` da sua pasta de backup para a nova pasta clonada.
3. **Instalar**: Execute `npm install`.

---

## 📂 Estrutura de Pastas Explicada

- **`C:\Users\ADMIN\SommersStore - Copia`**: Seu backup físico. Mantenha-o sempre atualizado.
- **`C:\Users\ADMIN\.gemini\antigravity\scratch\SommersStore`**: Onde a mágica acontece. É aqui que o código "vivo" reside.

> [!TIP]
> **Backup Automático**: Tente fazer o `git commit` e `git push origin master` ao final de cada dia de trabalho. O GitHub é o seu cofre mais seguro.

---

*Documento gerado em 08/04/2026 para Sergio (SommersStore).*
