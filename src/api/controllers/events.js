const { deleteFile } = require('../../utils/deleteFiles');
const Event = require('../models/events');

const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate('participants', 'nameUser');
    return res.status(200).json(events);
  } catch (error) {
    return res.status(400).json('error en recuperar todos los eventos');
  }
};

const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    return res.status(200).json(event);
  } catch (error) {
    return res.status(400).json('error en recuperar ese evento');
  }
};

const postEvent = async (req, res, next) => {
  try {
    const event = new Event(req.body);

    if (req.file) {
      event.img = req.file.path;
    }

    const eventDuplicated = await Event.findOne({
      title: req.body.title
    });

    if (eventDuplicated) {
      return res.status(400).json('Ese evento ya existe');
    }

    const eventSaved = await event.save();
    return res.status(201).json(eventSaved);
  } catch (error) {
    return res.status(400).json('error en publicar el evento');
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newEvent = new Event(req.body);
    if (req.file) {
      const eventToUpdate = await Event.findById(id);
      if (eventToUpdate) {
        if (eventToUpdate.img) {
          deleteFile(eventToUpdate.img);
          newEvent.img = req.file.path;
        } else {
          newEvent.img = req.file.path;
        }
      } else {
        return res.status(404).json('Evento no encontrado');
      }
    }
    newEvent._id = id;

    const eventUpdated = await Event.findByIdAndUpdate(id, newEvent, {
      new: true
    });
    return res.status(200).json(eventUpdated);
  } catch (error) {
    return res.status(400).json('error en actualizar el evento');
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const eventDeleted = await Event.findByIdAndDelete(id);

    if (eventDeleted) {
      deleteFile(eventDeleted.img);
      return res
        .status(200)
        .json({ message: 'Este evento fue eliminado:', eventDeleted });
    } else {
      return res.status(404).json('Evento no encontrado');
    }
  } catch (error) {
    return res.status(400).json('error en eliminar ese evento');
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  postEvent,
  updateEvent,
  deleteEvent
};
