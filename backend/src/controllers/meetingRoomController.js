import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/mysqlConnection';

export const createRoom = async (req, res) => {
  const { nameRoom, capacity, availableResources, location } = req.body;
  const id = uuidv4();

  try {
    await db.query(
      'INSERT INTO MeetingRoom (id, nameRoom, capacity, availableResources, location) VALUES (?, ?, ?, ?, ?)',
      [id, nameRoom, capacity, JSON.stringify(availableResources), location]
    );
    res.status(201).json({ message: 'Sala creada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la sala' });
  }
};

export const getRooms = async (req, res) => {
  try {
    const [rooms] = await db.execute('SELECT * FROM MeetingRoom');
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las salas' });
  }
};

export const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { nameRoom, capacity, availableResources, location, status } = req.body;

  try {
    await db.query(
      'UPDATE MeetingRoom SET nameRoom = ?, capacity = ?, availableResources = ?, location = ?, status = ? WHERE id = ?',
      [nameRoom, capacity, JSON.stringify(availableResources), location, status, id]
    );
    res.json({ message: 'Sala actualizada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la sala' });
  }
};

export const deleteRoom = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM MeetingRoom WHERE id = ?', [id]);
    res.json({ message: 'Sala eliminada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la sala' });
  }
};
