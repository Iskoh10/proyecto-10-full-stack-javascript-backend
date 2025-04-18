const { deleteFile } = require('../../utils/deleteFiles');
const { crearToken, generateSign } = require('../../utils/jwt');
const User = require('../models/users');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json('error en recuperar todos los usuarios');
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json('error en recuperar este usuario');
  }
};

const registerUser = async (req, res, next) => {
  try {
    const user = new User(req.body);

    if (req.file) {
      user.img = req.file.path;
    }

    if (req.body.rol === 'admin') {
      return res
        .status(400)
        .json(
          'Está prohibido crear el rol admin, sólo un admin puede otorgar ese rol'
        );
    }

    const userDuplicated = await User.findOne({
      email: req.body.email
    });

    if (userDuplicated) {
      return res.status(400).json('Este usuario ya existe');
    }

    const userSaved = await user.save();
    return res.status(201).json(userSaved);
  } catch (error) {
    return res.status(400).json('error al registrarte');
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json('Usuario o contraseña incorrectos');
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ token, user });
    } else {
      return res.status(400).json('Usuario o contraseña incorrectos');
    }
  } catch (error) {
    return res.status(400).json('error al loguearte');
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id, rol } = req.params;
    const newUser = new User(req.body);

    if (req.file) {
      const userToUpdate = await User.findById(id);
      if (userToUpdate) {
        if (userToUpdate.img) {
          deleteFile(userToUpdate.img);
          newUser.img = req.file.path;
        } else {
          newUser.img = req.file.path;
        }
      } else {
        return res.status(404).json('Usuario no encontrado');
      }
    }
    newUser._id = id;
    newUser.rol = rol;

    const userUpdated = await User.findByIdAndUpdate(id, newUser, {
      new: true
    });
    return res.status(200).json(userUpdated);
  } catch (error) {
    console.log(error);
    return res.status(400).json('error al actualizar este usuario');
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userDeleted = await User.findByIdAndDelete(id);
    if (userDeleted) {
      deleteFile(userDeleted.img);
      return res
        .status(200)
        .json({ message: 'Usuario eliminado:', userDeleted });
    } else {
      return res.status(404).json('Usuario no encontrado');
    }
  } catch (error) {
    return res.status(400).json('error al eliminar este usuario');
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser
};
