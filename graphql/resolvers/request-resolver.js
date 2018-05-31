import Request from '../../models/request';
import {requireAuth} from '../../services/auth';
import Event from '../../models/event';
import EventMember from '../../models/event-member';
import GroupMember from '../../models/group-member';

export default {

    getRequests: async (_, args, {user}) => {
        try {
            await requireAuth(user);
            return Request.find({receiverUser:user, status:"Pending"}).sort({createdAt: -1})
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

    acceptRequest: async (_, args, {user}) => {
        try {
            await requireAuth(user);
            const duserid = user ? user._id : user;
            var request = await Request.findById( args._id);

            if(request.status == "Pending"){
                request = await Request.findByIdAndUpdate( args._id , {status:"Accepted"}, {new: true});
               var groupMember = await GroupMember.create({ group: request.group, user: duserid, user_type:"Member" });

                var  groupEvents = await Event.find({group:request.group })
                groupEvents.forEach ( event => {
                    EventMember.create({ event: event._id, user: duserid, user_type:"Member" });
                });
            }

            return request;

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