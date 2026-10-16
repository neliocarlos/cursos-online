# Cursos Digitais

Aplicação web em Next.js para divulgar cursos e receber inscrições. Visitantes consultam o catálogo, filtram por nome e categoria e se inscrevem em um curso. Um administrador consulta as inscrições recebidas em uma área protegida por senha.

## Funcionalidades

- Catálogo de cursos com busca por nome, filtro por categoria e paginação (6 cursos por página)
- Página de detalhes do curso com formulário de inscrição (nome, e-mail, telefone e cidade)
- Máscara automática para telefone fixo e celular
- Validação dos dados no servidor
- Área administrativa protegida para visualizar as inscrições de cada curso

## Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) 20.9 ou superior
- [Git](https://git-scm.com/)

### Passo a passo

1. Baixe o repositório:

   ```bash
   git clone <url-do-repositorio>
   cd <pasta-do-projeto>
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie o arquivo `.env.local` na raiz do projeto (ao lado do `package.json`) com as credenciais da área administrativa:

   ```env
   ADMIN_USER=admin
   ADMIN_PASSWORD=senha123
   ```

   Esse arquivo não vai para o repositório, então ele precisa ser criado em cada máquina.

4. Inicie o servidor de desenvolvimento no **Git Bash** ou no **CMD**:

   ```bash
   npm run dev
   ```

5. Abra [http://localhost:3000](http://localhost:3000) no navegador.

> Se alterar o `.env.local` com o servidor rodando, pare o servidor (`Ctrl + C`) e inicie de novo com `npm run dev`.

## Acesso à área administrativa

Para entrar na parte administrativa, clique no **botão do lado direito do header**. O navegador abrirá uma janela pedindo usuário e senha:

| Campo   | Valor      |
| ------- | ---------- |
| Usuário | `admin`    |
| Senha   | `senha123` |

Depois de autenticado, o navegador guarda as credenciais até ser fechado. Para entrar com outra conta ou testar o login de novo, feche o navegador ou use uma janela anônima.

> Essas credenciais são apenas para demonstração e desenvolvimento. Em produção, troque os valores no `.env.local` por uma senha forte e use HTTPS.

## Fluxo do administrador

O administrador chega à lista de candidatos em duas telas:

```
Header (botão direito)  →  /admin  →  /admin/[cursoId]
```

1. **Login:** ao clicar no botão do lado direito do header, o navegador pede usuário e senha (veja a tabela acima).
2. **`/admin`: lista de cursos.** Mostra todos os cursos em cards paginados, cada um com a quantidade de inscrições recebidas. Cursos sem inscrição aparecem com 0.
3. **`/admin/[cursoId]`: candidatos do curso.** Ao clicar em um curso, abre a lista de pessoas que se inscreveram nele, com data da inscrição, nome, e-mail, telefone e cidade. Em telas pequenas a tabela vira uma lista de cards. O link "Voltar para os cursos" retorna para `/admin`.

## Como funciona a proteção da área admin

- O arquivo `proxy.ts` roda antes de qualquer página que comece com `/admin`. Se a requisição não trouxer usuário e senha corretos, ele responde `401` e o navegador abre a janela de login.
- As páginas do admin também confirmam as credenciais antes de ler o banco de dados, como segunda camada de proteção.
- O usuário e a senha ficam em variáveis de ambiente (`ADMIN_USER` e `ADMIN_PASSWORD`), fora do código.

## Fluxo de inscrição

1. A pessoa escolhe um curso e abre a página de detalhes.
2. Preenche o formulário e clica em **Cadastrar**.
3. Uma Server Action valida os dados no servidor e grava a inscrição no banco.
4. Erros de validação aparecem abaixo de cada campo. Em caso de sucesso, uma mensagem de confirmação é exibida.

Uma mesma pessoa (mesmo e-mail) não pode se inscrever duas vezes no mesmo curso.

## Estrutura resumida

```
app/
├── cursos/                  # catálogo de cursos (com filtragem)
|   └── [cursoId]/page.tsx   # detalhes do curso (com formulário)
└── admin/
    ├── page.tsx             # lista de cursos com contagem de inscrições
    └── [cursoId]/page.tsx   # candidatos inscritos no curso
components/                  # cards, paginação, header
mocks/                       # cursos e categorias de exemplo
proxy.ts                     # proteção das rotas /admin
```

## Tecnologias

- [Next.js](https://nextjs.org/) (App Router, Server Components e Server Actions)
- [React](https://react.dev/) e [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/) para validação
- [SQLite](https://www.sqlite.org/) com `better-sqlite3` para armazenar as inscrições

## Observações

- O banco de dados é um arquivo local, criado automaticamente na pasta `data/` na primeira execução. Essa pasta não deve ser versionada, pois contém dados pessoais dos inscritos.
- Os cursos vêm de dados de exemplo (`mocks/cursos`).
- Para publicar em produção é necessário um ambiente com disco persistente. Em hospedagens serverless, os arquivos gravados em disco são perdidos.
