const User = require('../api/models/users');
const { verifyJwt } = require('../utils/jwt');

const isAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json('No se proporcionó un token');
    }

    const [, token] = req.headers.authorization.split(' ');

    const { id } = verifyJwt(token);

    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json('Usuario no encontrado');
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json('No estás autorizado');
  }
};

module.exports = { isAuth };
