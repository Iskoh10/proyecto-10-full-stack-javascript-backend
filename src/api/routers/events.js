const upload = require('../../middlewares/file');
const { isAdmin } = require('../../middlewares/isAdmin');
const { isAuth } = require('../../middlewares/isAuth');
const {
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  postEvent,
  getUserAttendingEvents,
  sortEvents
} = require('../controllers/events');

const eventsRouter = require('express').Router();

eventsRouter.get('/', getAllEvents);
eventsRouter.get('/sorted', [isAuth], sortEvents);
eventsRouter.get('/user/:userId', [isAuth], getUserAttendingEvents);
eventsRouter.get('/:id', [isAuth], getEventById);
eventsRouter.post('/', [isAuth, upload.single('img')], postEvent);
eventsRouter.put('/:id', [isAuth, upload.single('img')], updateEvent);
eventsRouter.delete('/:id', [isAdmin, upload.single('img')], deleteEvent);

module.exports = eventsRouter;
