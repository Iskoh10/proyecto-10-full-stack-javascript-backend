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
