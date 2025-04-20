const upload = require('../../middlewares/file');
const { isAdmin } = require('../../middlewares/isAdmin');
const { isAuth } = require('../../middlewares/isAuth');
const {
  isCurrentUserOrAdmin
} = require('../../middlewares/isCurrentUserOrAdmin');
const {
  deleteUser,
  updateUser,
  loginUser,
  registerUser,
  getUserById,
  getAllUsers
} = require('../controllers/users');

const usersRouter = require('express').Router();

usersRouter.get('/', [isAdmin], getAllUsers);
usersRouter.get('/:id', [isAuth], getUserById);
usersRouter.post('/register', upload.single('img'), registerUser);
usersRouter.post('/login', loginUser);
usersRouter.put(
  '/:id',
  [isAuth, isCurrentUserOrAdmin, upload.single('img')],
  updateUser
);
usersRouter.delete(
  '/:id',
  [isAuth, isCurrentUserOrAdmin, upload.single('img')],
  deleteUser
);

module.exports = usersRouter;
