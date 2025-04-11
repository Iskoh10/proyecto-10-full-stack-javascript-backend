const upload = require('../../middlewares/file');
const { isAdmin } = require('../../middlewares/isAdmin');
const { isAuth } = require('../../middlewares/isAuth');
const {
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  postEvent
} = require('../controllers/events');

const eventsRouter = require('express').Router();

eventsRouter.get('/', getAllEvents);
eventsRouter.get('/:id', [isAuth], getEventById);
eventsRouter.post('/', [isAuth, upload.single('img')], postEvent);
eventsRouter.put('/:id', [isAdmin, upload.single('img')], updateEvent);
eventsRouter.delete('/:id', [isAdmin, upload.single('img')], deleteEvent);

module.exports = eventsRouter;
