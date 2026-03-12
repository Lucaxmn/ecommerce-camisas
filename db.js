const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./ecommerce.db", (err) => {
  if (err) {
    console.error("Erro ao conectar no banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco SQLite.");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      categoria TEXT NOT NULL,
      descricao TEXT NOT NULL,
      preco REAL NOT NULL,
      estoque INTEGER NOT NULL,
      imagem TEXT NOT NULL
    )
  `);

  db.get("SELECT COUNT(*) AS total FROM produtos", (err, row) => {
    if (err) {
      console.error("Erro ao verificar produtos:", err.message);
      return;
    }

    if (row.total === 0) {
      const stmt = db.prepare(`
        INSERT INTO produtos (nome, categoria, descricao, preco, estoque, imagem)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      const produtos = [
        [
          "Halter 10kg",
          "Pesos",
          "Halter ideal para treinos de força e resistência muscular.",
          89.90,
          15,
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"
        ],
        [
          "Corda de Pular Pro",
          "Cardio",
          "Corda leve e resistente para exercícios aeróbicos.",
          29.90,
          30,
          "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
        ],
        [
          "Luva para Musculação",
          "Acessórios",
          "Luva confortável com proteção para as mãos durante o treino.",
          39.90,
          25,
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80"
        ],
        [
          "Faixa Elástica",
          "Funcional",
          "Faixa elástica para fortalecimento, mobilidade e alongamento.",
          24.90,
          40,
          "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80"
        ],
        [
          "Garrafa Squeeze 1L",
          "Acessórios",
          "Garrafa prática e resistente para hidratação durante os treinos.",
          19.90,
          50,
          "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80"
        ],
        [
          "Colchonete Fitness",
          "Yoga e Solo",
          "Colchonete confortável para exercícios no solo e alongamentos.",
          59.90,
          20,
          "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
        ]
      ];

      produtos.forEach((produto) => stmt.run(produto));
      stmt.finalize();

      console.log("Produtos iniciais cadastrados com sucesso.");
    }
  });
});

module.exports = db;