const db = require("../database/db.js");

export class StockController {

    /**
     * Creates stock.
     *
     * @param {*} req
     * @param {*} res
     * @memberof StockController
     */
    public createStock(req: any, res: any): void{
        db.run("INSERT INTO stocks (name, stock_level, storage, storage_place) VALUES (?,?,?,?)",
        [req.body.name, req.body.stockLevel, req.body.storage, req.body.storagePlace],
        (err: any) => {
            if(err){
                res.status(400).json({"error": err.message});
                return;
            }
            res.status(201);
        });
    }

    /**
     * Retrieves all stocks.
     *
     * @param {*} req
     * @param {*} res
     * @memberof StockController
     */
    public getAllStocks(req: any, res: any){
        db.all("SELECT * FROM stocks", [], (err: any, rows: any) => {
            if(err){
                res.status(400).json({"error": err.message});
                return;
            }
            res.status(200).json(rows);
        })
    }

    /**
     * Retrieves specific stock by article_id
     *
     * @param {*} req
     * @param {*} res
     * @memberof StockController
     */
    public getStock(req: any, res: any){
        db.get("SELECT * FROM stocks WHERE article_id = ?", [req.params.articleId], (err: any, row: any) => {
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
    }

    /**
     * Updates specific stock by article_id
     *
     * @param {*} req
     * @param {*} res
     * @memberof StockController
     */
    public updateStock(req: any, res: any){
        db.run("UPDATE stocks SET name = ?, stock_level = ?, storage = ?, storage_place = ? WHERE article_id = ?", 
        [req.body.name,req.body.stockLevel, req.body.storage, req.body.storagePlace, req.params.articleId], 
        (err: any) => {
            if(err){
                res.status(400).json({"error": err.message});
                return;
            }
            res.status(200).json();
        })
    }

    /**
     * Deletes specific stock by article_id
     *
     * @param {*} req
     * @param {*} res
     * @memberof StockController
     */
    public deleteStock(req: any, res: any){
        db.run("DELETE FROM stocks WHERE article_id = ?", [req.params.articleId], (err: any) => {
            if(err){
                res.status(400).json({"error": err.message});
                return;
            }
            res.status(200).json();
        })
    }

    /**
     * Deletes all stocks.
     *
     * @param {*} req
     * @param {*} res
     * @memberof StockController
     */
    public deleteAllStocks(req: any, res: any){
        db.run("DELETE FROM stocks", [], (err: any) => {
            if(err){
                res.status(400).json({"error": err.message});
                return;
            }
            res.status(200).json();
        })
    }
}