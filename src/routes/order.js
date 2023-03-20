const {Router} = require("express");

const orderRoutes = Router();

const {
    getOrderByIdHandler, 
    getAllOrdersHandler,
    createOrderHandler,
    editOrderHandler,
    deleteOrderByIdHandler,
    getOrderByUserIdHandler
} = require("../handlers/orderHandler");

orderRoutes.get("/", getAllOrdersHandler);
orderRoutes.get("/:id", getOrderByIdHandler);
orderRoutes.put("/:id", editOrderHandler);
orderRoutes.post("/", createOrderHandler);
orderRoutes.delete("/:id", deleteOrderByIdHandler);
orderRoutes.get("/:userId", getOrderByUserIdHandler);

module.exports = orderRoutes;