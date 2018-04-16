import Event from '../../models/event';
import { requireAuth } from '../../services/auth';

export default {

  getEvents: async (_, args, { user }) => {
    try {
      //await requireAuth(user);
      return Event.find({}).sort({ createdAt: -1 })
    } catch (error) {
      throw error;
    }
  },
  getEvent: async (_, { _id }, { user }) => {
    try {
     // await requireAuth(user);
      return Event.findById(_id);
    } catch (error) {
      throw error;
    }
  },
  addEvent: async (_, args, { user }) => {
    try {
      console.log(args);
      //await requireAuth(user);
      return Event.create({ ...args/*, user: user._id*/ });
    } catch (error) {
      throw error;
    }
  },
 
  deleteEvent: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const event = await Event.findOne({ _id, user: user._id });

      if (!event) {
        throw new Error('Not found!');
      }
      await event.remove();
      return {
        message: 'Delete Success!'
      }
    } catch (error) {
      throw error;
    }
  }
};