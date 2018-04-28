import Event from '../../models/event';
import EventMember from '../../models/event-member';
import { requireAuth } from '../../services/auth';

export default {

  addEventMember: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return EventMember.create({ ...args });
    } catch (error) {
      throw error;
    }
  },

};