const mongoose = require('mongoose');
const { events } = require('./users');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    img: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    participants: [{ type: mongoose.Types.ObjectId, ref: 'users' }]
  },
  {
    timestamps: true,
    collection: 'events'
  }
);

const Event = mongoose.model('events', eventSchema, 'events');
module.exports = Event;
