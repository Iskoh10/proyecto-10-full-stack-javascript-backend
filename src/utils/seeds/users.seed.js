require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../api/models/users');
const users = require('../../data/users');

const launchSeed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    const usersHashed = () => {
      return users.map((user) => {
        const hashedPassword = bcrypt.hashSync(user.password, 10);
        return {
          ...user,
          password: hashedPassword
        };
      });
    };
    // const result = usersHashed();
    // console.log(result);
    await User.insertMany(usersHashed());
    console.log('Usuarios introducidos en la bbdd');

    await mongoose.disconnect();
    console.log('Desconectamos de la BBDD');
  } catch (error) {
    console.error('Hubo un error en el lanzamiento de la semilla', error);
  }
};

launchSeed();
