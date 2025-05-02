require('dotenv').config();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const forgotPassword = {
  async sendMail(req, res) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({ message: 'El mail es requerido' });
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(403).send({ message: 'No existe ese email' });
      }

      const token = jwt.sign({ id: user._id }, process.env.TOKEN_REC_PASS, {
        expiresIn: '1h'
      });

      user.tokenResetPassword = token;
      user.tokenResetExpires = Date.now() + 3600000;
      await user.save();

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`
        }
      });

      const emailPort = process.env.EMAIL_PORT || 3000;

      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: `${user.email}`,
        subject: 'Recuperación de contraseña - La boutique del Cangrejo',
        text: `
        Hola ${user.nameUser || ''},

        Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en La boutique del Cangrejo.

        Por favor, haz click en el siguiente enlace para establecer una nueva contraseña:
        ${emailPort}/resetpassword/${user.id}/${token}

        Este enlace es válido por 1 hora.

        Si no solicitaste este cambio, puedes ignorar este mensaje.
        
        Saludos cordiales,
        El equipo de la boutique del Cangrejo
        `.trim()
      };

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error('Ha ocurrido un error:', err);
        } else {
          console.log('Respuesta:', response);
          res.status(200).json('El email para la recuperacion ha sido enviado');
        }
      });
    } catch (error) {
      res.status(500).send({
        message: 'Ha ocurrido un error',
        error
      });
    }
  }
};

module.exports = { forgotPassword };
