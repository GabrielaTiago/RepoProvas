<p align="center"><img src="https://images.emojiterra.com/twitter/v13.1/512px/1f4dd.png" height="80px" alt="notes emoji"/></p>

# <p align="center">RepoProvas</p>

### <p align="center">API para compartilhamento de provas</p>

<div align="center">
   <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" height="30px"/>
   <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="node.js" height="30px"/>
   <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="express.js" height="30px"/>
   <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="jwt" height="30px">
   <img src="https://img.shields.io/badge/bcrypt-000000?style=for-the-badge&logo=bcrypt&logoColor=white" alt="bcrypt" height="30px">
   <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="postgresql" height="30px">
   <img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="prisma" height="30px">
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="docker" height="30px">
    <img src="https://img.shields.io/badge/Docker%20Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="docker-compose" alt="docker-compose" height="30px" />
   <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm" height="30px">
   <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white" alt="swagger" height="30px">
   <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="vitest" height="30px">
   <img src="https://img.shields.io/badge/Supertest-000000?style=for-the-badge&logo=supertest&logoColor=white" alt="supertest" height="30px">
   <img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" alt="eslint" height="30px">
   <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" alt="prettier" height="30px">
</div>

## :clipboard: Descrição

O **RepoProvas** é uma plataforma de compartilhamento de provas que permite aos alunos compartilhar e acessar provas anteriores de suas disciplinas e professores. O sistema facilita a colaboração acadêmica fornecendo um repositório centralizado de provas passadas organizadas por disciplinas, períodos e professores.

## :bookmark_tabs: **Características do Projeto**

-   **🔐 Autenticação**: Sistema de autenticação via JWT para proteção de rotas
-   **📝 Gestão de Provas**: Criação, visualização de provas
-   **🛡️ Segurança**: Criptografia de todas as senhas.
-   **📱 Interface**: Documentação completa via Swagger UI
- **🧪 Testes**: Cobertura completa com testes unitários e integração

## :rocket: Inicializando este projeto

Primeiro de tudo, clone este projeto ou faça o download do ZIP.

Para realizar o clone, no terminal de sua máquina, utilize o [git](https://git-scm.com/) e insira o seguinte comando:

```bash
   git clone https://github.com/GabrielaTiago/DrivenPass.git
```

Entre na pasta do projeto:

```bash
    cd DrivenPass
```

Crie o arquivo de variáveis de ambiente `.env` na raíz do projeto, copiando o arquivo de exemplo:

```bash
    cp .env.example .env
```

O arquivo `.env` já contém as variáveis necessárias para o funcionamento da aplicação. Você precisará editá-lo dependendo se for rodar o projeto localmente ou com Docker.

:warning: Há dois modos de rodar a aplicação: localmente ou utilizando o Docker.

-   **Localmente**: você precisará ter o Node.js e o PostgreSQL instalados na sua máquina.
-   **Com Docker**: você não precisa instalar nada além do Docker, pois tudo será gerenciado por contêineres.

## :computer: Rodando a Aplicação Localmente

Para executar esse projeto localmente é necessário que você possua o [Node.js](https://nodejs.org/en/download) (v18+) e [npm](https://www.npmjs.com/) instalados em sua máquina. Você também precisará do [PostgreSQL](https://www.postgresql.org/download/).

No arquivo `.env`, modifique as variáveis de ambiente para corresponder às suas configurações locais do PostgreSQL:

```env
    POSTGRES_USER=seu_usuario       # geralmente é postgres
    POSTGRES_PASSWORD=sua_senha
    POSTGRES_HOST=localhost         # para rodar localmente
```

Para alterar as variáveis de ambiente, execute:

```bash
    # Este comando não funciona no Windows, atualize manualmente
    sed -i '' "s/^POSTGRES_USER=.*/POSTGRES_USER=seu_usuario/" .env
    sed -i '' "s/^POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=sua_senha/" .env
    sed -i '' "s/^POSTGRES_HOST=.*/POSTGRES_HOST=localhost/" .env
```

Execute o seguinte comando para instalar as dependências do projeto.

```bash
    npm install
```

### :floppy_disk: Configurando o Banco de Dados

Para inicializar e criar o banco de dados com Prisma, execute:

```bash
    # Gerar o cliente Prisma e executar as migrações
    npm run prisma

    # (Opcional) Para visualizar o banco de dados no Prisma Studio
    npx prisma studio
```

### :arrow_forward: Iniciando a Aplicação

Para iniciar o servidor em modo de desenvolvimento (com hot-reload), execute:

```bash
    npm run dev
```

Para iniciar o servidor em modo de produção, primeiro compile o projeto e depois execute:

```bash
    npm run build
    npm start
```

## 🐳 Rodando a Aplicação com Docker

Para rodar a aplicação utilizando o Docker, você precisa ter o [Docker](https://docs.docker.com/engine/install/) e [Docker Compose](https://docs.docker.com/compose/install/) instalados.

No arquivo `.env`, garanta que a variável `POSTGRES_HOST` corresponda ao nome do serviço do banco no `docker-compose.yml`:

```env
    POSTGRES_HOST=repoprovas-db
    POSTGRES_DB=repoprovas
```

Execute o seguinte comando para construir as imagens e iniciar os contêineres da API e do banco de dados:

```bash
    npm run docker:dev
```

_(O banco de dados será criado e populado automaticamente na primeira vez que você executar este comando)._

Para parar e remover os contêineres, execute:

```bash
    npm run docker:down
```

## :test_tube: Testes

Configuração dos testes, crie o arquivo **.env.test** na raíz do projeto, copiando o arquivo de exemplo:

```bash
    cp .env.example .env.test
```

Localmente, você precisará configurar as variáveis de ambiente para corresponder às suas configurações locais do PostgreSQL:

```env
    POSTGRES_USER=seu_usuario       # geralmente é postgres
    POSTGRES_PASSWORD=sua_senha
    POSTGRES_HOST=localhost         # para rodar localmente

    DATABASE_URL="postgresql://username:password@localhost:5432/repoprovas_test"
```

Para rodar com Docker, você precisará configurar as variáveis de ambiente para corresponder ao nome do serviço do banco no `docker-compose.yml`:

```env
    POSTGRES_HOST=repoprovas-db-test
    POSTGRES_DB=repoprovas-test

    DATABASE_URL="postgresql://username:password@repoprovas-db-test:5432/repoprovas_test"
```

O projeto é configurado com dois tipos de testes:

**Testes Rápidos (Unitários e Integração):** Verificam a lógica de negócio de forma isolada e rápida.

```bash
    npm test
```

Para rodar os testes dentro de um ambiente Docker controlado, execute:

```bash
    npm run docker:test
```

## :books: API Documentation

A documentação da API, implementada com **Swagger**, pode ser acessada na rota: [**/documentation**](http://localhost:4000/documentation)

![routes](assets/routes.png)

## :bulb: Reconhecimentos

-   [Badges para Github](https://github.com/alexandresanlim/Badges4-README.md-Profile#-database-)
-   [Inspiração de README](https://gist.github.com/luanalessa/7f98467a5ed62d00dcbde67d4556a1e4#file-readme-md)
-   [Driven Education](https://www.driven.com.br)

## 👩🏽‍💻 Autora

Gabriela Tiago de Araújo

-   email: <gabrielatiagodearaujo@outlook.com>
-   linkedin: <https://www.linkedin.com/in/gabrielatiago/>
-   portfolio: <https://gabrielatiago.vercel.app>

[🔝 Voltar ao topo](#repoprovas)
