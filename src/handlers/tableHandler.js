const { Router } = require("express");
const tables = Router();
const { createTable, getTables, getAllBookingInThisTable, getTablesToCreateReservation, deleteTable, putTable } = require("../controllers/tableController.js");

const postTableHandler = async (req, res) => {
    try {
        const newTable = await createTable(req.body.capacidad);
        res.status(201).json({ message: newTable });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllTablesHandler = async (req, res) => {
    try {
        const allTables = await getTables();
        res.status(200).json(allTables);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllBookingInThisTableHandler = async (req, res) => {
    try {
        const bookings = await getAllBookingInThisTable(req.params.id);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getTablesToCreateReservationHandler = async (req, res) => {
    try {
        const tables = await getTablesToCreateReservation(req.body);
        res.status(200).json(tables);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteTableHandler = async (req, res) => {
    try {
        const deleteT = await deleteTable(req.params.idTable);
        res.status(200).json(deleteT);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const putTableHandler = async (req, res) => {
    try {
        const update = await putTable(req.body);
        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { postTableHandler, getAllTablesHandler, getAllBookingInThisTableHandler, getTablesToCreateReservationHandler, deleteTableHandler, putTableHandler };