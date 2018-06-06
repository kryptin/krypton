import EventMember from '../../models/event-member';
import { requireAuth } from '../../services/auth';

export default {

  // addEventMember: async (_, args, { user }) => {
  //   try {
  //     await requireAuth(user);
  //     return EventMember.create({ ...args });
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  getEventMembers: async (_, { event }, { user }) => {
        try {
            await requireAuth(user);
            return EventMember.find({event:event});
        } catch (error) {
            throw error;
        }
  },


  getUserEvents: async (_, args, { user }) => {
      try {
          await requireAuth(user);
          const duserid = user? user._id: user;
          return EventMember.find({user: duserid}).sort({ createdAt: -1 })
      } catch (error) {
          throw error;
      }
  },

};