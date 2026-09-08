const API_URL = "/produtos";

// Elementos do DOM
const productForm = document.getElementById("product-form");
const productIdInput = document.getElementById("product-id");
const descricaoInput = document.getElementById("descricao");
const precoInput = document.getElementById("preco");
const categoriaInput = document.getElementById("categoria");
const estoqueInput = document.getElementById("estoque");

const formTitle = document.getElementById("form-title");
const btnSave = document.getElementById("btn-save");
const btnCancel = document.getElementById("btn-cancel");
const productsBody = document.getElementById("products-body");

// Inicialização
document.addEventListener("DOMContentLoaded", fetchProducts);
productForm.addEventListener("submit", handleFormSubmit);
btnCancel.addEventListener("click", resetForm);

// --- 1. LISTAR PRODUTOS (GET) ---
async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Erro ao carregar lista de produtos.");

    const produtos = await response.json();
    renderProductsTable(produtos);
  } catch (error) {
    console.error("GET Error:", error);
    alert("Erro ao buscar produtos no servidor.");
  }
}

function renderProductsTable(produtos) {
  productsBody.innerHTML = "";

  if (produtos.length === 0) {
    productsBody.innerHTML = `<tr><td colspan="6" class="text-center">Nenhum produto cadastrado.</td></tr>`;
    return;
  }

  produtos.forEach((produto) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${produto.id}</td>
      <td>${escapeHtml(produto.descricao)}</td>
      <td>R$ ${parseFloat(produto.preco).toFixed(2)}</td>
      <td>${escapeHtml(produto.categoria)}</td>
      <td>${produto.estoque}</td>
      <td>
        <button class="btn btn-edit" onclick="prepareEditProduct(${produto.id})">Editar</button>
        <button class="btn btn-delete" onclick="deleteProduct(${produto.id})">Excluir</button>
      </td>
    `;
    productsBody.appendChild(tr);
  });
}

// --- 2. CADASTRAR OU ALTERAR (POST / PUT) ---
async function handleFormSubmit(e) {
  e.preventDefault();

  const id = productIdInput.value;
  const produtoData = {
    descricao: descricaoInput.value,
    preco: parseFloat(precoInput.value),
    categoria: categoriaInput.value,
    estoque: parseInt(estoqueInput.value),
  };

  try {
    let response;
    if (id) {
      // Alteração: PUT /produtos/:id
      response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produtoData),
      });
    } else {
      // Cadastro: POST /produtos
      response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produtoData),
      });
    }

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.mensagem || "Falha ao salvar produto.");
    }

    resetForm();
    await fetchProducts(); // Atualiza listagem imediatamente
  } catch (error) {
    console.error("Save Error:", error);
    alert(`Erro ao salvar produto: ${error.message}`);
  }
}

// --- 3. CONSULTAR E PREPARAR EDIÇÃO (GET por ID) ---
async function prepareEditProduct(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Produto não encontrado.");

    const produto = await response.json();

    productIdInput.value = produto.id;
    descricaoInput.value = produto.descricao;
    precoInput.value = produto.preco;
    categoriaInput.value = produto.categoria;
    estoqueInput.value = produto.estoque;

    formTitle.innerText = `Editar Produto #${produto.id}`;
    btnSave.innerText = "Atualizar Produto";
    btnCancel.style.display = "inline-block";

    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    console.error("Fetch ID Error:", error);
    alert("Erro ao buscar dados do produto.");
  }
}

// --- 4. EXCLUIR PRODUTO (DELETE) ---
async function deleteProduct(id) {
  if (!confirm(`Deseja realmente excluir o produto #${id}?`)) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Erro ao excluir produto.");

    if (productIdInput.value == id) {
      resetForm();
    }

    await fetchProducts(); // Atualiza listagem imediatamente
  } catch (error) {
    console.error("DELETE Error:", error);
    alert("Erro ao excluir produto.");
  }
}

function resetForm() {
  productForm.reset();
  productIdInput.value = "";
  formTitle.innerText = "Cadastrar Novo Produto";
  btnSave.innerText = "Salvar Produto";
  btnCancel.style.display = "none";
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}
