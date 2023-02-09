import { StockController } from "../controller/stock.controller";

module.exports = (app: any) => {

    const stockController = new StockController();
  
    // Create a new Stock
    app.post("/stocks", (req: any, res: any) => stockController.createStock(req, res));
  
    // Retrieve all Stocks
    app.get("/stocks", (req: any, res: any) => stockController.getAllStocks(req, res));
  
    // Retrieve a single Stock by articleId
    app.get("/stocks/:articleId", (req: any, res: any) => stockController.getStock(req, res));
  
    // Update a Stock by articleId
    app.put("/stocks/:articleId", (req: any, res: any) => stockController.updateStock(req, res));
  
    // Delete a Stock by articleId
    app.delete("/stocks/:articleId", (req: any, res: any) => stockController.deleteStock(req, res));
  
    // Delete all Stocks
    app.delete("/stocks", (req: any, res: any) => stockController.deleteAllStocks(req, res));
};