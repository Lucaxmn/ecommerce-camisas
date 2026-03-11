const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./ecommerce.db")

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            brand TEXT NOT NULL,
            category TEXT,
            price REAL NOT NULL,
            image TEXT,
            description TEXT,
            attributes TEXT
        )
    `)
})

function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err)
            else resolve({
                lastID: this.lastID,
                changes: this.changes
            })
        })
    })
}

function get(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err)
            else resolve(row)
        })
    })
}

function all(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err)
            else resolve(rows)
        })
    })
}

module.exports = { run, get, all }