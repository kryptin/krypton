import Comment from '../../models/comment';
import { requireAuth } from '../../services/auth';

export default {

  getComments: async (_, args, { user }) => {
    try {
      //await requireAuth(user);
      return Comment.find({}).sort({ createdAt: -1 })
    } catch (error) {
      throw error;
    }
  },
  
  addComment: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return Comment.create({ ...args, user: user._id });
    } catch (error) {
      throw error;
    }
  },
 
  deleteComment: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const comment = await Comment.findOne({ _id, user: user._id });

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