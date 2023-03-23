const { Booking, Table } = require("../db.js");
const getTablesToCreateReservationFunction = require("./CREATE BOOKING LOGIC FUNCTIONS/getTablesToCreateReservationFunction.js");



const createTable = async (capacity) => {
    await Table.create({
        capacity: capacity
    })
    return "Table created successfully";
}

const getTables = async () => {
    const allTables = await Table.findAll();
    return allTables;
}

const getAllBookingInThisTable = async (tableId) => {
    const table = await Table.findByPk(tableId);
    const bookingsOfThisTable = await table.getBookings();
    return bookingsOfThisTable;
}

const getTablesToCreateReservation = async (body) => {
    const tables = await getTablesToCreateReservationFunction(body);
    return tables;
}

const deleteTable = async (tableId) => {
    await Table.destroy({
        where: { id: tableId }
    });
    return "Successfully deleted"
}

const putTable = async (body) => {
    const { idTable, capacity } = body;
    Table.update(
        { capacity: capacity },
        { where: { id: idTable } }
    );
    return "Successfully updated";
}

module.exports = { createTable, getTables, getAllBookingInThisTable, getTablesToCreateReservation, deleteTable, putTable };