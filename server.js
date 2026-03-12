const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API do e-commerce de produtos para academia funcionando!");
});

app.get("/produtos", (req, res) => {
  db.all("SELECT * FROM produtos", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    res.json(rows);
  });
});

app.get("/produtos/:id", (req, res) => {
  const { id } = req.params;

  db.get("SELECT * FROM produtos WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    if (!row) {
      return res.status(404).json({ erro: "Produto não encontrado." });
    }

    res.json(row);
  });
});

app.post("/produtos", (req, res) => {
  const { nome, categoria, descricao, preco, estoque, imagem } = req.body;

  if (!nome || !categoria || !descricao || preco == null || estoque == null || !imagem) {
    return res.status(400).json({ erro: "Preencha todos os campos." });
  }

  const sql = `
    INSERT INTO produtos (nome, categoria, descricao, preco, estoque, imagem)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [nome, categoria, descricao, preco, estoque, imagem], function (err) {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    res.status(201).json({
      mensagem: "Produto cadastrado com sucesso.",
      id: this.lastID
    });
  });
});

app.put("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const { nome, categoria, descricao, preco, estoque, imagem } = req.body;

  if (!nome || !categoria || !descricao || preco == null || estoque == null || !imagem) {
    return res.status(400).json({ erro: "Preencha todos os campos." });
  }

  const sql = `
    UPDATE produtos
    SET nome = ?, categoria = ?, descricao = ?, preco = ?, estoque = ?, imagem = ?
    WHERE id = ?
  `;

  db.run(sql, [nome, categoria, descricao, preco, estoque, imagem, id], function (err) {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ erro: "Produto não encontrado." });
    }

    res.json({ mensagem: "Produto atualizado com sucesso." });
  });
});

app.delete("/produtos/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM produtos WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ erro: "Produto não encontrado." });
    }

    res.json({ mensagem: "Produto removido com sucesso." });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});