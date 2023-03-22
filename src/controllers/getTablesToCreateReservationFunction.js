const { Booking, Table } = require("../db.js");



const getTablesToCreateReservationFunction = async (body) => {
    const { fecha_inicio, hora_inicio, cantidad_comensales } = body;
    const allTables = await Table.findAll();
    //se recorre allTables para setear primeramente el estado de todas las mesas en true,
    //lineas mas abajo si hay alguna posible colision se setea en false para evitarla.
    for (let u = 0; u < allTables.length; u++) {
        allTables[u].availability = true;
    }
    //descartamos las mesas que no tienen la capacidad para la cantidad de comensales.
    const tablesSuitableForCapacity = allTables.filter(tab => tab.capacity >= cantidad_comensales);
    if (tablesSuitableForCapacity.length > 0) {
        //si encontramos mesas con capacidad para nuestros comensales traemos todas las reservas existentes
        //para evitar posibles colisiones, tomamos con startTimeHour la hora de la reserva que se desea crear
        //y con startTimeMinutes los minutos de inicio de la reserva y los sumamos como integros para poder 
        //calcular hora y fecha del fin de la reserva y evitar colisiones.
        const allBookings = await Booking.findAll();
        let startTimeHour = hora_inicio[0] + hora_inicio[1];
        startTimeHour = parseInt(startTimeHour);
        startTimeHour = startTimeHour * 60;
        let startTimeMinute = hora_inicio[3] + hora_inicio[4];
        startTimeMinute = parseInt(startTimeMinute)

        const STARTMINUTES = startTimeHour + startTimeMinute;
        for (let i = 0; i < allBookings.length; i++) {
            //el if de la siguiente linea nos permite saber si tendremos que buscar posibles colisiones con
            //reservas que hayan comenzado el dia anterior despues de las 22:00 y que terminaran el dia de hoy
            //y podrian por ende colisionar con nuestra nueva reserva si esta comienza antes de las 02:00.
            if (STARTMINUTES < 120) {
                if (allBookings[i].date_end === fecha_inicio) {
                    //si hay reservas que comenzaron ayer y terminaran hoy entramos en el caso 
                    //de este if donde tomamos la hora y minutos del fin de la reserva que podria colisionar para
                    //calcular la colision, la cual evaluamos en el siguiente if tomando en cuenta que habra
                    //colision si la nueva reserva comienza antes de que finalice la reserva anterior y que la 
                    //reserva anterior y verificamos que la reserva existente finalice antes de las 02:00.
                    let endTimeHour = allBookings[i].time_end[0] + allBookings[i].time_end[1];
                    endTimeHour = parseInt(endTimeHour);
                    endTimeHour = endTimeHour * 60;
                    let endTimeMinute = allBookings[i].time_end[3] + allBookings[i].time_end[4];
                    endTimeMinute = parseInt(endTimeMinute)
                    endTimeHour = endTimeHour + endTimeMinute;
                    if (STARTMINUTES < endTimeHour && endTimeHour < 120) {
                        let TableOfThisBooking = tablesSuitableForCapacity.find(table => table.id === allBookings[i].tableId);
                        TableOfThisBooking.availability = false;
                    }
                }
            }
            if (allBookings[i].date_start === fecha_inicio) {
                //ahora evaluamos las reservas en el mismo dia de nuestra nueva reserva para evitar colisiones
                //con ellas, sumando sus horas y minutos de inicio para corroborar si existira una colision
                //en caso de que nuestra nueva reserva comienze 119 minutos antes de que comience la existente 
                //o entre 119 minutos despues de que comienza la existente habra colision por lo que seteamos false.
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
        }
        //retonarmos un array de mesas con su respectiva propiedad avialability seteada en true o false.
        return tablesSuitableForCapacity;
    } else {
        throw new Error("We do not have tables with the indicated capacity");
    }
}

module.exports = getTablesToCreateReservationFunction;
