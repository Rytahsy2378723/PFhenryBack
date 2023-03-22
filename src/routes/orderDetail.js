const {Router} = require("express");

const orderDetailRoutes = Router();

const {
    deleteOrderDetailHandler, 
    getOrderDetailByIdHandler,
    getAllOrderDetailHandler,
    editOrderDetailHandler,
    createOrderDetailHandler
} = require("../handlers/orderDetailHandler");

    
orderDetailRoutes.get("/", getAllOrderDetailHandler);
orderDetailRoutes.get("/:id", getOrderDetailByIdHandler);
orderDetailRoutes.put("/:id", editOrderDetailHandler);
orderDetailRoutes.post("/", createOrderDetailHandler);
orderDetailRoutes.delete("/:id", deleteOrderDetailHandler);

module.exports = orderDetailRoutes;
