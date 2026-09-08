const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares para parsing de JSON e arquivos estáticos da pasta 'public'
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Coleção inicial em memória (5 produtos)
const produtos = [
  {
    id: 1,
    descricao: "Teclado Mecânico RGB",
    preco: 249.9,
    categoria: "Periféricos",
    estoque: 15,
  },
  {
    id: 2,
    descricao: "Mouse Gamer sem Fio",
    preco: 129.5,
    categoria: "Periféricos",
    estoque: 30,
  },
  {
    id: 3,
    descricao: "Monitor UltraWide 29 polegadas",
    preco: 1399.0,
    categoria: "Monitores",
    estoque: 8,
  },
  {
    id: 4,
    descricao: "Cadeira Ergonômica de Escritório",
    preco: 850.0,
    categoria: "Mobiliário",
    estoque: 5,
  },
  {
    id: 5,
    descricao: "Headset Gamer Surround 7.1",
    preco: 299.99,
    categoria: "Áudio",
    estoque: 22,
  },
  {
    id: 6,
    descricao: "Notebook Gamer 16GB RAM",
    preco: 4899.0,
    categoria: "Computadores",
    estoque: 4,
  },
  {
    id: 7,
    descricao: "SSD NVMe M.2 1TB",
    preco: 450.0,
    categoria: "Armazenamento",
    estoque: 40,
  },
  {
    id: 8,
    descricao: "Placa de Vídeo RTX 4060",
    preco: 2199.9,
    categoria: "Hardware",
    estoque: 10,
  },
  {
    id: 9,
    descricao: "Processador Ryzen 7 5700X",
    preco: 1150.0,
    categoria: "Hardware",
    estoque: 12,
  },
  {
    id: 10,
    descricao: "Memória RAM 16GB DDR4",
    preco: 280.0,
    categoria: "Hardware",
    estoque: 35,
  },
  {
    id: 11,
    descricao: "Webcam Full HD 1080p",
    preco: 199.9,
    categoria: "Periféricos",
    estoque: 18,
  },
  {
    id: 12,
    descricao: "Caixa de Som Bluetooth",
    preco: 159.0,
    categoria: "Áudio",
    estoque: 25,
  },
  {
    id: 13,
    descricao: "Roteador Wi-Fi 6 Gigabit",
    preco: 420.0,
    categoria: "Redes",
    estoque: 14,
  },
  {
    id: 14,
    descricao: "Impressora Multifuncional Tank",
    preco: 980.0,
    categoria: "Impressão",
    estoque: 7,
  },
  {
    id: 15,
    descricao: "Tablet 10.4 polegadas 64GB",
    preco: 1299.0,
    categoria: "Tablets",
    estoque: 9,
  },
  {
    id: 16,
    descricao: "Smartphone 128GB Câmera Dupla",
    preco: 1899.0,
    categoria: "Smartphones",
    estoque: 11,
  },
  {
    id: 17,
    descricao: "Suporte Articulado para Monitor",
    preco: 189.9,
    categoria: "Acessórios",
    estoque: 20,
  },
  {
    id: 18,
    descricao: "Hub USB-C 7 em 1",
    preco: 149.5,
    categoria: "Acessórios",
    estoque: 28,
  },
  {
    id: 19,
    descricao: "Mousepad Grande Speed",
    preco: 69.9,
    categoria: "Periféricos",
    estoque: 50,
  },
  {
    id: 20,
    descricao: "Microfone Condensador USB",
    preco: 349.0,
    categoria: "Áudio",
    estoque: 16,
  },
];

let idCounter = 6;

// ENDPOINT DA API REST

// 1. GET /produtos - Listar todos os produtos
app.get("/produtos", (req, res) => {
  res.status(200).json(produtos);
});

// 2. GET /produtos/:id - Consultar produto por ID
app.get("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find((p) => p.id === id);
  if (!produto) {
    return res.status(404).json({ mensagem: "Produto não encontrado." });
  }
  res.status(200).json(produto);
});

// 3. POST /produtos - Cadastrar novo produto
app.post("/produtos", (req, res) => {
  const { descricao, preco, categoria, estoque } = req.body;

  if (
    !descricao ||
    preco === undefined ||
    !categoria ||
    estoque === undefined
  ) {
    return res.status(400).json({
      mensagem:
        "Todos os campos (descricao, preco, categoria, estoque) são obrigatórios.",
    });
  }

  const novoProduto = {
    id: idCounter++,
    descricao: String(descricao).trim(),
    preco: parseFloat(preco),
    categoria: String(categoria).trim(),
    estoque: parseInt(estoque),
  };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

// 4. PUT /produtos/:id - Alterar produto existente
app.put("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex((p) => p.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ mensagem: "Produto não encontrado para alteração." });
  }

  const { descricao, preco, categoria, estoque } = req.body;

  if (
    !descricao ||
    preco === undefined ||
    !categoria ||
    estoque === undefined
  ) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios para atualização." });
  }

  produtos[index] = {
    id: id,
    descricao: String(descricao).trim(),
    preco: parseFloat(preco),
    categoria: String(categoria).trim(),
    estoque: parseInt(estoque),
  };

  res.status(200).json(produtos[index]);
});

// 5. DELETE /produtos/:id - Excluir produto
app.delete("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex((p) => p.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ mensagem: "Produto não encontrado para exclusão." });
  }

  produtos.splice(index, 1);
  res.status(204).send();
});

// Rota fallback: entrega o index.html do frontend para qualquer outra requisição GET não-API
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
