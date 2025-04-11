const User = require('../api/models/users');
const { verifyJwt } = require('../utils/jwt');

const isAdmin = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ');

    const { id } = verifyJwt(token);

    const user = await User.findById(id).select('-password');

    if (user.rol !== 'admin') {
      return res.status(403).json('No está autorizado, no es Admin');
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json('No eres Admin, no estás autorizado');
  }
};

module.exports = { isAdmin };
