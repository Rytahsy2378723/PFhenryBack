const {Router} = require("express");

const offerRoutes = Router();

const {
    getOfferByIdHandler, 
    getAllOfferHandler,
    createOfferHandler,
    editOfferHandler,
    deleteOfferhandler
} = require("../handlers/offerHandler");

offerRoutes.get("/", getAllOfferHandler);
offerRoutes.get("/:id", getOfferByIdHandler);
offerRoutes.put("/:id", editOfferHandler);
offerRoutes.post("/", createOfferHandler);
offerRoutes.delete("/:id", deleteOfferhandler);

module.exports = offerRoutes;