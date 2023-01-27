module.exports = app => {
    const stocks = require("../controller/stock.controller.js");
  
    // Create a new Stock
    app.post("/stocks", stocks.create);
  
    // Retrieve all Stocks
    app.get("/stocks", stocks.findAll);
  
    // Retrieve a single Stock with articleId
    app.get("/stocks/:articleId", stocks.findOne);
  
    // Update a Stock with articleId
    app.put("/stocks/:articleId", stocks.update);
  
    // Delete a Stock with articleId
    app.delete("/stocks/:articleId", stocks.delete);
  
    // Delete all Stocks
    app.delete("/stocks", stocks.deleteAll);
};