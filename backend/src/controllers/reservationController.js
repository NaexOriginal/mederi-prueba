import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/mysqlConnection';

export const createReservation = async (req, res) => {
  const { userId, meetingRoomId, reservationDate, startTime, endTime } = req.body;
  const id = uuidv4();

  try {
    const [conflict] = await db.execute(
      'SELECT * FROM Reservation WHERE meetingRoomId = ? AND reservationDate = ? AND ((startTime <= ? AND endTime > ?) OR (startTime < ? AND endTime >= ?))',
      [meetingRoomId, reservationDate, startTime, startTime, endTime, endTime]
    );

    if (conflict.length > 0) {
      return res.status(409).json({ error: 'Conflicto de horario con otra reserva' });
    }

    await db.query(
      'INSERT INTO Reservation (id, userId, meetingRoomId, reservationDate, startTime, endTime) VALUES (?, ?, ?, ?, ?, ?)',
      [id, userId, meetingRoomId, reservationDate, startTime, endTime]
    );
    res.status(201).json({ message: 'Reserva creada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
};

export const getReservations = async (req, res) => {
  try {
    const [reservations] = await db.execute('SELECT * FROM Reservation');
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las reservas' });
  }
};

export const cancelReservation = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('UPDATE Reservation SET status = "cancelado" WHERE id = ?', [id]);
    res.json({ message: 'Reserva cancelada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cancelar la reserva' });
  }
};
