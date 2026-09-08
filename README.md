<h1 align="center">
  📦 Gerenciador de Produtos
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
</p>

<p align="center">
  Aplicação Web (Cliente/Servidor) para gerenciamento de produtos, consumindo uma API REST própria.
</p>

---

## 🎯 Sobre o Projeto

Este projeto demonstra a construção de uma arquitetura cliente-servidor completa em JavaScript. O backend, construído com Node.js e Express, expõe uma **API RESTful** para operações de CRUD (Create, Read, Update, Delete) e serve os arquivos estáticos do frontend de forma integrada. A interface de usuário, desenvolvida em Vanilla JS, consome essa API assincronamente através da `Fetch API` nativa.

Link do Render: https://api-restful-com-node-js-u6uf.onrender.com

## 🚀 Tecnologias e Ferramentas

### Backend (Servidor & API)
* **Node.js** — Ambiente de execução.
* **Express.js** — Roteamento da API, manipulação de JSON e middleware para servir arquivos estáticos.

### Frontend (Interface Web)
* **HTML5 & CSS3** — Estrutura semântica e design responsivo (sem uso de frameworks externos).
* **JavaScript (Vanilla)** — Manipulação do DOM, eventos de formulário e comunicação HTTP.

### Infraestrutura & Qualidade
* **Render** — Hospedagem em nuvem (PaaS).
* **Postman** — Plano de testes automatizados com asserções em JavaScript para validação de endpoints.

## ⚙️ Funcionalidades (CRUD)

- [x] **C**reate: Cadastrar novos produtos pelo formulário.
- [x] **R**ead: Listar todos os produtos dinamicamente em uma tabela.
- [x] **U**pdate: Carregar dados de um item existente e salvar alterações.
- [x] **D**elete: Excluir produtos do catálogo com confirmação de segurança.

## 📡 Endpoints da API

A interface se comunica com o backend através das seguintes rotas:

| Método | Rota             | Ação / Descrição                            |
|--------|------------------|---------------------------------------------|
| `GET`  | `/produtos`      | Retorna um array com todos os produtos.     |
| `GET`  | `/produtos/:id`  | Retorna os detalhes de um produto específico|
| `POST` | `/produtos`      | Registra um novo produto.                   |
| `PUT`  | `/produtos/:id`  | Atualiza os atributos de um produto.        |
| `DELETE`| `/produtos/:id` | Remove permanentemente um produto pelo ID.  |

## 🗂️ EstrEstrutura do Repositório

```text
Server.Js/
├── package.json           # Configurações do Node.js e dependências
├── server.js              # Inicialização do servidor e lógica da API
└── public/                # Diretório base do frontend
    ├── index.html         # Marcação da interface
    ├── css/
    │   └── style.css      # Folha de estilos
    └── js/
        └── app.js         # Lógica de interface e requisições Fetch
