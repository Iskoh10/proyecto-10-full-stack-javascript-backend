require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../api/models/users');
const users = require('../../data/users');

const launchSeed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    for (const user of users) {
      const existingUser = await User.findOne({ email: user.email });

      if (existingUser) {
        console.log(`El usuario con email ${user.email} ya existe.`);
        continue;
      }

      const newUser = new User(user);

      await newUser.save();
      console.log(`Usuario ${user.email} añadido`);
    }

    await mongoose.disconnect();
    console.log('Desconectamos de la BBDD');
  } catch (error) {
    console.error('Hubo un error en el lanzamiento de la semilla', error);
  }
};

launchSeed();
