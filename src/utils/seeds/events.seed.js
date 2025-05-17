require('dotenv').config();
const mongoose = require('mongoose');
const events = require('../../data/events');
const Event = require('../../api/models/events');

const launchSeed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    await Event.collection.drop();
    console.log('Eventos eliminados');

    await Event.insertMany(events);
    console.log('Eventos introducidos');

    await mongoose.disconnect();
    console.log('Desconectamos de la BBDD');
  } catch (error) {
    console.log('Hubo un error en el lanzamiento de la semilla');
  }
};

launchSeed();
