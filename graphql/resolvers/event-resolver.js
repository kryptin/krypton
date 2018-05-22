import Event from '../../models/event';
import EventMember from '../../models/event-member';
import { requireAuth } from '../../services/auth';

export default {

  getEvents: async (_, args, { user }) => {
    console.log('user context in event: ',user)

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

  getEventByGroup: async (_, {group}, { user }) => {
    try {
      await requireAuth(user);
      return Event.findOne({group })
    } catch (error) {
      throw error;
    }
  },

  addEvent: async (_, args, { user }) => {
    try {
     await requireAuth(user);
      const duserid = user? user._id: user;
      var event = new Event({ ...args, user: duserid});
      event.save(function (err) {
        if (err) return handleError(err);
        // saved!
      });
      EventMember.create({ event: event._id, user: duserid, user_type:"Admin" });
      return event;

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