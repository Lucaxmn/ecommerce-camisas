const listaProdutos = document.getElementById("lista-produtos");

async function carregarProdutos() {
  try {
    const resposta = await fetch("http://localhost:3000/produtos");
    const produtos = await resposta.json();

    listaProdutos.innerHTML = "";

    produtos.forEach((produto) => {
      const card = document.createElement("div");
      card.classList.add("card-produto");

      card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <div class="info-produto">
          <h3>${produto.nome}</h3>
          <span class="categoria">${produto.categoria}</span>
          <p class="descricao">${produto.descricao}</p>
          <p class="preco">R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>
          <p class="estoque">Estoque: ${produto.estoque} unidades</p>
        </div>
      `;

      listaProdutos.appendChild(card);
    });
  } catch (erro) {
    listaProdutos.innerHTML = "<p>Erro ao carregar produtos.</p>";
    console.error("Erro:", erro);
  }
}

carregarProdutos();


