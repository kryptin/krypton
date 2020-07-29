import EventComment from '../../models/event-comment';
import { requireAuth } from '../../services/auth';

export default {

  getEventComments: async (_, args, { user }) => {
    try {
      //await requireAuth(user);
      return EventComment.find({}).sort({ createdAt: -1 })
    } catch (error) {
      throw error;
    }
  },
  
  addEventComment: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return EventComment.create({ ...args, user: user._id });
    } catch (error) {
      throw error;
    }
  },
 
  deleteEventComment: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const comment = await EventComment.findOne({ _id, user: user._id });

      if (!comment) {
        throw new Error('Not found!');
      }
      await comment.remove();
      return {
        message: 'Delete Success!'
      }
    } catch (error) {
      throw error;
    }
  }
};