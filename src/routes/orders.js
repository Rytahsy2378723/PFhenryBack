const {Router} = require("express");

const orderRoutes = Router();

const {
    getOrderByIdHandler, 
    getAllOrdersHandler,
    createOrderHandler,
    editOrderHandler
} = require("../handlers/ordersHandler");

orderRoutes.get("/", getAllOrdersHandler);
orderRoutes.get("/:id", getOrderByIdHandler);
orderRoutes.put("/:id", editOrderHandler);
orderRoutes.post("/", createOrderHandler);

module.exports = orderRoutes;