import GroupMember from '../../models/group-member';
import { requireAuth } from '../../services/auth';

export default {

    addGroupMember: async (_, args, { user }) => {
        try {
          await requireAuth(user);
          return GroupMember.create({ ...args });
        } catch (error) {
          throw error;
        }
      },

    getGroupMembers: async (_, { _id }, { user }) => {
        try {
            await requireAuth(user);
            return GroupMember.find({group:_id});
        } catch (error) {
            throw error;
        }
    },

    makeGroupAdmin: async (_, args, {user}) =>{
        try {
            await requireAuth(user);
            return await GroupMember.findByIdAndUpdate( args._id , {user_type:"Admin"}, {new: true});
        } catch (error) {
            throw error;
        }
    },

    getUserGroups: async (_, { _id }, { user }) => {
        try {
            await requireAuth(user);
            //const duserid = user? user._id: user;
            return GroupMember.find({user});
        } catch (error) {
            throw error;
        }
    },
 
};