const isCurrentUserOrAdmin = (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id.toString();
    const userRol = req.user.rol;

    if (userRol === 'admin') {
      return next();
    }

    if (id !== userId) {
      return res.status(403).json('No tienes permiso para esto');
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .json(
        'No estás autorizado para esta acción, no eres admin ni eres el propio usuario'
      );
  }
};

module.exports = { isCurrentUserOrAdmin };
