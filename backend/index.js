import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';

import { authRoutes, meetingRoomRoutes, reservationRoutes } from "./src/routes/barrelRoutes";
import { PORT, SECRET_JWT_KEY } from "./config";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  const token = req.cookies.access_token;
  
  if(!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, SECRET_JWT_KEY);
    req.user = decoded;
  } catch(error) {
    req.user = null
  }

  res.locals.user = req.user;

  next();
});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

app.use("/api/auth", authRoutes);
app.use("/api/rooms", meetingRoomRoutes);
app.use('/api/reservation', reservationRoutes)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto: ${PORT}`);
});
