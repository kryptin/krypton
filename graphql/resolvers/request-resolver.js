import Request from '../../models/request';
import {requireAuth} from '../../services/auth';

export default {

    getRequests: async (_, args, {user}) => {
        try {
            await requireAuth(user);
            return Request.find({receiverUser:user}).sort({createdAt: -1})
        } catch (error) {
            throw error;
        }
    },
    // getRequest: async (_, {_id}, {user}) => {
    //     try {
    //         await requireAuth(user);
    //         return Request.findById(_id);
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    addRequest: async (_, args, {user}) => {
        try {
            await requireAuth(user);
            const duserid = user ? user._id : user;
            let checkRequest = await Request.findOne({receiverUser:args.receiverUser, senderUser:duserid,
                                                     group:args.group, event:args.event}).sort({created_at: -1});
            if(!checkRequest){
                let requestObj = {...args, senderUser: duserid};
                return Request.create(requestObj);
            }else{
                if(checkRequest.status == "Rejected"){
                    let requestObj = {...args, senderUser: duserid};
                    return Request.create(requestObj);
                }

                var result = {'_id':checkRequest._id,'status':"Already invited"}
                return result;
            }

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