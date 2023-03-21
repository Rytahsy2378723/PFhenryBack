const { Booking, Table } = require("../db.js");



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
    const { fecha_inicio, hora_inicio, cantidad_comensales } = body;
    const allTables = await Table.findAll();
    for (let u = 0; u < allTables.length; u++) {
        allTables[u].availability = true;
    }
    const tablesSuitableForCapacity = allTables.filter(tab => tab.capacity >= cantidad_comensales);
    if (tablesSuitableForCapacity.length > 0) {
        const allBookings = await Booking.findAll();
        let startTimeHour = hora_inicio[0] + hora_inicio[1];
        startTimeHour = parseInt(startTimeHour);
        startTimeHour = startTimeHour * 60;
        let startTimeMinute = hora_inicio[3] + hora_inicio[4];
        startTimeMinute = parseInt(startTimeMinute)

        const STARTMINUTES = startTimeHour + startTimeMinute;
        for (let i = 0; i < allBookings.length; i++) {
            if (allBookings[i].date_start === fecha_inicio) {
                let startTimeHour = allBookings[i].time_start[0] + allBookings[i].time_start[1];
                startTimeHour = parseInt(startTimeHour);
                startTimeHour = startTimeHour * 60;
                let startTimeMinute = allBookings[i].time_start[3] + allBookings[i].time_start[4];
                startTimeMinute = parseInt(startTimeMinute)
                startTimeHour = startTimeHour + startTimeMinute;
                const FINISHBOOKING = startTimeHour + 119;
                startTimeHour = startTimeHour - 119;
                if (STARTMINUTES >= startTimeHour && STARTMINUTES <= FINISHBOOKING) {
                    let TableOfThisBooking = tablesSuitableForCapacity.find(table => table.id === allBookings[i].tableId);
                    TableOfThisBooking.availability = false;
                }
            }

            if (STARTMINUTES < 120) {
                if (allBookings[i].date_end === fecha_inicio) {
                    let endTimeHour = allBookings[i].time_end[0] + allBookings[i].time_end[1];
                    endTimeHour = parseInt(endTimeHour);
                    endTimeHour = endTimeHour * 60;
                    let endTimeMinute = allBookings[i].time_end[3] + allBookings[i].time_end[4];
                    endTimeMinute = parseInt(endTimeMinute)
                    endTimeHour = endTimeHour + endTimeMinute;
                    if (STARTMINUTES < endTimeHour) {
                        let TableOfThisBooking = tablesSuitableForCapacity.find(table => table.id === allBookings[i].tableId);
                        TableOfThisBooking.availability = false;
                    }
                }
            }
        }

        return tablesSuitableForCapacity;
    } else {
        throw new Error("We do not have tables with the indicated capacity");
    }
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