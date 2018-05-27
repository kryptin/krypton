import Request from '../../models/request';
import {requireAuth} from '../../services/auth';

export default {

    getRequests: async (_, args, {user}) => {
        try {
            await requireAuth(user);
            return Request.find({}).sort({createdAt: -1})
        } catch (error) {
            throw error;
        }
    },
    getRequest: async (_, {_id}, {user}) => {
        try {
            await requireAuth(user);
            return Request.findById(_id);
        } catch (error) {
            throw error;
        }
    },

    addRequest: async (_, args, {user}) => {
        try {
            //await requireAuth(user);
            console.log(user);
            const duserid = user ? user._id : user;
            let requestObj = {...args, senderUser: duserid};
            return Request.create(requestObj);
        } catch (error) {
            throw error;
        }
    },

    deleteRequest: async (_, {_id}, {user}) => {
        try {
            await requireAuth(user);
            const group = await Request.findOne({_id, user: user._id});

            if (!group) {
                throw new Error('Not found!');
            }
            await group.remove();
            return {
                message: 'Delete Success!'
            }
        } catch (error) {
            throw error;
        }
    }
};