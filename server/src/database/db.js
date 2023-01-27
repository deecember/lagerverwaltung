const sqlite3 = require("sqlite3");

// Create a connection to the database
const db = new sqlite3.Database("./src/database/stock_management.sqlite", (err) =>{
  if(err){
    console.error("Error opening database: " + err.message);
    return;
  }
  db.run('DROP TABLE stocks');

  db.run('CREATE TABLE IF NOT EXISTS stocks( \
    article_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
    name NVARCHAR(50)  NOT NULL,\
    stock_level INTEGER,\
    storage NVARCHAR(20),\
    storage_place NVARCHAR(20)\
)', (err) => {
    if (err) {
        console.log("Error creating table: " + err.message);
    }
    let insert = 'INSERT INTO stocks (name, stock_level, storage, storage_place) VALUES (?,?,?,?)';
    db.run(insert, ["Eichenholzbretter", 64, "Plattling_L01", "1-1"]);
    db.run(insert, ["Fichtenholzbretter", 128, "Plattling_L01", "1-2"]);
    db.run(insert, ["Birkenholzbretter", 32, "Plattling_L01", "1-3"]);
});
});

module.exports = db;