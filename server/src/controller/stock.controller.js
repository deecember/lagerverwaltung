const db = require("../database/db.js");

exports.create = (req, res) => {
    db.run("INSERT INTO stocks (name, stock_level, storage, storage_place) VALUES (?,?,?,?)",
    [req.body.name, req.body.stockLevel, req.body.storage, req.body.storagePlace],
    (err) => {
        if(err){
            res.status(400).json({"error": err.message});
            return;
        }
        res.status(201);
    });
}

exports.findAll = (req, res) => {
    db.all("SELECT * FROM stocks", [], (err, rows) => {
        if(err){
            res.status(400).json({"error": err.message});
            return;
        }
        res.status(200).json(rows);
    })
}

exports.findOne = (req, res) => {
    db.get("SELECT * FROM stocks WHERE article_id = ?", [req.params.articleId], (err, row) => {
        if(err){
            res.status(400).json({"error": err.message});
            return;
        }
        if(row){
            res.status(200).json(row)
            return;
        }
        res.status(404).json();
    })
};

exports.update = (req, res) => {
    db.run("UPDATE stocks SET name = ?, stock_level = ?, storage = ?, storage_place = ? WHERE article_id = ?", [req.body.name,req.body.stockLevel, req.body.storage, req.body.storagePlace, req.params.articleId], (err) => {
        if(err){
            res.status(400).json({"error": err.message});
            return;
        }
        res.status(200).json();
    })
};

exports.delete = (req, res) => {
    db.run("DELETE FROM stocks WHERE article_id = ?", [req.params.articleId], (err) => {
        if(err){
            res.status(400).json({"error": err.message});
            return;
        }
        res.status(200).json();
    })
};

exports.deleteAll = (req, res) => {
    db.run("DELETE FROM stocks", [], (err) => {
        if(err){
            res.status(400).json({"error": err.message});
            return;
        }
        res.status(200).json();
    })
};