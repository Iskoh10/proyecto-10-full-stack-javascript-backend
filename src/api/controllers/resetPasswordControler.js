const User = require('../models/users');

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      tokenResetPassword: token,
      tokenResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    user.password = password;

    user.tokenResetPassword = undefined;
    user.tokenResetExpires = undefined;

    await user.save();

    return res
      .status(200)
      .json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al resetear contraseña:', error);
    return res.status(500).json({ message: 'Error al resetear la contraseña' });
  }
};

module.exports = { resetPassword };

//! Se vaya al events y limpie la url
/*
let regExPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/;

const resetPassword = {
  async reset(req, res) {
    if (!regExPassword.test(req.body.password)) {
      res.send({
        message:
          'La contraseña debe tener al menos 8-16 caracteres, un numero, una letra minuscula, una letra mayuscula y un caracter especial'
      });
      return;
    }

    try {
      req.body.password = await bcrypt.hashSync(req.body.password, 10);
      const resetPassword = await User.updateMany(req.body, {
        where: {
          id: req.params.id,
          tokenresetpassword: req.params.tokenresetpassword
        }
      });
      res.status(201).send({
        message: 'Contraseña cambiada con éxito'
      });
    } catch (error) {
      res.status(500).send({ message: 'este error', error });
    }
  }
};
*/
