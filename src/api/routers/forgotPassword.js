const { forgotPassword } = require('../controllers/forgotPasswordController');
const { resetPassword } = require('../controllers/resetPasswordControler');

const forgotPasswordRouter = require('express').Router();

forgotPasswordRouter.post('/forgot-password', forgotPassword.sendMail);
forgotPasswordRouter.post('/reset-password/:token', resetPassword);

module.exports = forgotPasswordRouter;
