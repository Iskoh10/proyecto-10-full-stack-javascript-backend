require('dotenv').config();
const express = require('express');
const { connectDB } = require('./src/config/db');
const eventsRouter = require('./src/api/routers/events');
const usersRouter = require('./src/api/routers/users');
const cloudinary = require('cloudinary').v2;

const app = express();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

//! IMPLEMENTAR QUE SI HAY CAMBIOS DE EVENTOS SE AVISE AL USUARIO AL ENTRAR EN SU PERFIL.

connectDB();

app.use(express.json());

app.use('/api/v1/events', eventsRouter);
app.use('/api/v1/users', usersRouter);

app.use((req, res, next) => {
  return res.status(404).json('Route not found');
});

app.listen(3000, () => {
  console.log('Servidor levantado en: http://localhost:3000');
});
