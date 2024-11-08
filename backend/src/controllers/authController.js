import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/mysqlConnection';
import { SECRET_JWT_KEY } from '../../config';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, password, role = 'empleado', email } = req.body;

  if(!username || !password || !email) {
    return res.status(400).json({
      error: 'El nombre del usuario, la contraseña y el correo son obligatorios',
    });
  } else if (password.length < 6) {
    return res.status(401).json({
      error: 'La contraseña tiene que ser de más de 6 caracteres'
    });
  }

  try {
    const [verifyCredentials] = await db.execute('SELECT * FROM user WHERE email = ? OR username = ?', [email, username]);
    if (verifyCredentials.length > 0) {
      if (verifyCredentials[0].email === email) {
        return res.status(409).json({ error : 'El correo ya esta en uso' })
      } else {
        return res.status(409).json({ error: 'El nombre de usuario ya esta en uso' })
      }
    }

    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO user (id, username, password, role, email) VALUES (?, ?, ?, ?, ?)',
      [id, username, hashedPassword, role, email],
    );

    res.status(201).json({ message: 'El usuario se ha registrado con éxito' });
     
  } catch(error) {
    console.error(error);
    return res.status(500).json({error: 'Error al insertar el usuario en la base de datos' })
  }
}

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: 'El nombre del usuario y la contraseña son obligatorios'
    });
  }

  try {
    const [result] = await db.execute('SELECT * FROM user WHERE username = ?', [username]);

    if (!Array.isArray(result) || result.length === 0) {
      return res.status(400).json({ error: 'El nombre de usuario o la contraseña son incorrectos' });
    }

    const user = result[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos' });
    } else if (!SECRET_JWT_KEY) {
      return res.status(404).json({ error: 'No se ha establecido el "SECRET_JWT_KEY" en las variables de entorno' })
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_JWT_KEY, {
      expiresIn: '1h',
    });

    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60,
      })
      .json({ message: 'Inicio de sesión exitoso', role: user.role});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
}