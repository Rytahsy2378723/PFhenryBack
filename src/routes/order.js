const {Router} = require("express");

const orderRoutes = Router();

const {
    getOrderByIdHandler, 
    getAllOrdersHandler,
    createOrderHandler,
    editOrderHandler,
    deleteOrderByIdHandler,
    getAllOrderByUserIdHandler
} = require("../handlers/orderHandler");

orderRoutes.get("/", getAllOrdersHandler);
orderRoutes.get("/:id", getOrderByIdHandler);
orderRoutes.put("/:id", editOrderHandler);
orderRoutes.post("/", createOrderHandler);
orderRoutes.delete("/:id", deleteOrderByIdHandler);
orderRoutes.get("/user/:userId", getAllOrderByUserIdHandler);

module.exports = orderRoutes;