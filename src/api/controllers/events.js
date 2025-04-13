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
    const { participants, leave, ...otherfield } = req.body;
    let updateData = {};

    if (req.user.rol === 'admin') {
      updateData = { ...otherfield };
    }

    if (req.file) {
      if (req.user.rol !== 'admin') {
        return res
          .status(403)
          .json('Sólo los admin pueden actualizar la imagen del evento');
      }

      const eventToUpdate = await Event.findById(id);
      if (!eventToUpdate) {
        return res.status(404).json('Evento no encontrado');
      }

      if (eventToUpdate.img) {
        deleteFile(eventToUpdate.img);
      }
      updateData.img = req.file.path;
    }

    let eventUpdated;

    if (participants) {
      if (participants !== req.user.id && req.user.rol !== 'admin') {
        return res
          .status(403)
          .json(
            'No puedes modificar la asistencia de otro usuario salvo que seas admin'
          );
      }

      await Event.findByIdAndUpdate(id, updateData);

      if (leave) {
        eventUpdated = await Event.findByIdAndUpdate(
          id,
          { $pull: { participants: participants } },
          { new: true }
        );
      } else {
        eventUpdated = await Event.findByIdAndUpdate(
          id,
          { $addToSet: { participants: participants } },
          { new: true }
        );
      }
    } else {
      if (req.user.rol !== 'admin') {
        return res
          .status(403)
          .json('No tienes permiso para modificar este evento');
      }

      eventUpdated = await Event.findByIdAndUpdate(id, updateData, {
        new: true
      });
    }

    return res.status(200).json(eventUpdated);
  } catch (error) {
    return res.status(400).json('Error en actualizar el evento');
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
