# NailsHub

## Objetivo

O NailsHub é um sistema desenvolvido para auxiliar no gerenciamento de serviços de uma profissional da área de unhas.

O projeto possui funcionalidades relacionadas ao cadastro e consulta de serviços, clientes, avaliações, agendamentos e registros de auditoria.

Além da implementação das funcionalidades, o projeto foi utilizado para desenvolver uma estratégia de testes unitários automatizados, incluindo validações, regras de negócio, tratamento de entradas inválidas, exceções, valores limite, isolamento de dependências, TDD e testes de regressão.

## Tecnologias utilizadas

- Node.js
- JavaScript
- npm
- Jest
- Express

## Requisitos

Para executar o projeto é necessário possuir:

- Node.js
- npm

Versão do Node.js utilizada durante o desenvolvimento e execução dos testes:

```text
v24.18.0
```

## Instalação

Após extrair o projeto, acesse a pasta `backend` pelo terminal:

```bash
cd backend
```

Instale as dependências do projeto:

```bash
npm install
```

O diretório `node_modules` não precisa estar incluído no arquivo de entrega, pois será criado automaticamente pelo npm durante a instalação.

## Como executar o projeto

Dentro da pasta `backend`, execute:

```bash
npm run dev
```

O servidor será iniciado utilizando o Nodemon.

Por padrão, a aplicação utiliza a porta:

```text
3000
```

## Como executar os testes

Dentro da pasta `backend`, execute:

```bash
npm test
```

O Jest executará automaticamente os testes presentes no diretório `test`.

Na versão final do projeto, a suíte possui 61 testes automatizados distribuídos entre 7 arquivos de teste.

## Framework de testes

O framework utilizado para os testes unitários automatizados é o Jest.

Os testes utilizam recursos como:

- `describe`;
- `test`;
- `expect`;
- `beforeEach`;
- `jest.fn()`;
- verificação de exceções com `toThrow`;
- comparação de objetos e arrays;
- isolamento de dependências.

## Estrutura de pastas

```text
NailsHub/
│
├── backend/
│   ├── src/
│   │   ├── agendamentos.js
│   │   ├── app.js
│   │   ├── auditoria.js
│   │   ├── avaliacoes.js
│   │   ├── clientes.js
│   │   ├── ids.js
│   │   ├── servicos.js
│   │   └── validacoes.js
│   │
│   ├── test/
│   │   ├── agendamentos.test.js
│   │   ├── auditoria.test.js
│   │   ├── avaliacoes.test.js
│   │   ├── clientes.test.js
│   │   ├── ids.test.js
│   │   ├── servicos.test.js
│   │   └── validacoes.test.js
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── .gitignore
└── README.md
```

## Módulos testados

A suíte de testes automatizados cobre os seguintes módulos:

- `ids.js` — geração de identificadores;
- `validacoes.js` — validação dos dados dos serviços;
- `servicos.js` — criação e consulta de serviços;
- `clientes.js` — criação e consulta de clientes;
- `avaliacoes.js` — criação e cálculo de avaliações;
- `agendamentos.js` — criação de agendamentos e notificações;
- `auditoria.js` — criação e registro de auditoria.

## Resultado esperado

Após executar:

```bash
npm test
```
a suíte completa deve finalizar sem falhas, apresentando 7 suítes de teste e 61 testes aprovados.