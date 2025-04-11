const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    nameUser: { type: String, required: true },
    img: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, default: 'user', enum: ['admin', 'user'] }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model('users', userSchema, 'users');

module.exports = User;
