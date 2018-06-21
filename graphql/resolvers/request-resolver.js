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

    sendGroupInvite: async (_, args, {user}) => {
        try {
            await requireAuth(user);
            const duserid = user ? user._id : user;
            var checkRequest = await Request.findOne({receiverUser:args.receiverUser, senderUser:duserid,
                                                      group:args.group}).sort({created_at: -1});
            //reserve search can only happen in a scenario that
            //an admin try to invite another user that is also admin of the same group
            if(!checkRequest){
                checkRequest = await Request.findOne({receiverUser:duserid, senderUser:args.receiverUser,
                                     group:args.group}).sort({created_at: -1});
            }

            if(!checkRequest){
                //request has never been made, create one
                let requestObj = {...args, senderUser: duserid};
                return Request.create(requestObj);
            }else{
                if(checkRequest.status == "Rejected"){
                    //request was made but rejected, create fresh request
                    let requestObj = {...args, senderUser: duserid};
                    return Request.create(requestObj);
                }

                //a pending request exist
                var result = {'_id':checkRequest._id,'status':"Already invited"}
                return result;
            }

        } catch (error) {
            throw error;
        }
    },

    sendEventInvite: async (_, args, {user}) => {
        try {
            await requireAuth(user);
            const duserid = user ? user._id : user;

            var checkRequest = await Request.findOne({receiverUser:args.receiverUser, senderUser:duserid,
                                                      event:args.event}).sort({created_at: -1});
            //reserve search can only happen in a scenario that
            //an admin try to invite another user that is also admin of the same event
            if(!checkRequest){
                checkRequest = await Request.findOne({receiverUser:duserid, senderUser:args.receiverUser,
                    event:args.event}).sort({created_at: -1});
            }

            if(!checkRequest){
                //request has never been made, create one
                let requestObj = {...args, senderUser: duserid};
                return Request.create(requestObj);
            }else{
                if(checkRequest.status == "Rejected"){
                    //request was made but rejected, create fresh request
                    let requestObj = {...args, senderUser: duserid};
                    return Request.create(requestObj);
                }

                //a pending request exist
                var result = {'_id':checkRequest._id,'status':"Already invited"}
                return result;
            }

        } catch (error) {
            throw error;
        }
    },

    respond2Invite: async (_, args, {user}) => {
        try {
            await requireAuth(user);
            const duserid = user ? user._id : user;
            var request = null;

            if( args.response_type == "Accept"){
                request = await Request.findByIdAndUpdate( args._id , {status:"Accepted"}, {new: true});

                if(request.group){
                    var groupMember = await GroupMember.create({ group: request.group, user: duserid, user_type:"Member" });
                    var  groupEvents = await Event.find({group:request.group })
                    if( groupEvents){
                        for (let index = 0; index <  groupEvents.length; index++) {
                            var event =  groupEvents[index];
                            var result = await EventMember.findOne({ event: event._id, user: duserid, user_type:"Member" });
                            if(!result){
                                await EventMember.create({  event: event._id, user: duserid, user_type:"Member" });
                            }
                        }
                    }
                }else if (request.event){

                    var result = await EventMember.findOne({ event: request.event, user: duserid, user_type:"Member" });
                    if(!result){
                        EventMember.create({ event: request.event, user: duserid, user_type:"Member" });
                    }
                }

            }else if( args.response_type == "Reject"){
                request = await Request.findByIdAndUpdate( args._id , {status:"Rejected"}, {new: true});
            }

            return request;

        } catch (error) {
            throw error;
        }
    },

    respond2JoinEventRequest: async (_, args, {user}) => {
        try {
            await requireAuth(user);
            const duserid = user ? user._id : user;
            var request = null;

            if( args.response_type == "Accept"){
                request = await Request.findByIdAndUpdate( args._id , {status:"Accepted"}, {new: true});

                var result = await EventMember.findOne({ event: request.event, user: request.senderUser, user_type:"Member" });
                if(!result){
                    EventMember.create({ event: request.event, user: request.senderUser, user_type:"Member" });
                }

            }else if( args.response_type == "Reject"){
                request = await Request.findByIdAndUpdate( args._id , {status:"Rejected"}, {new: true});
            }

            return request;

        } catch (error) {
            throw error;
        }
    },
    
    sendJoinEventRequest: async (_, args, {user}) => {
        try {
            await requireAuth(user);
            const duserid = user ? user._id : user;
            var checkRequest = null;

            checkRequest = await Request.findOne({receiverUser:args.receiverUser, senderUser:duserid,
                                                 event:args.event}).sort({created_at: -1});
            //reserve search can only happen in a scenario that
            //an admin have already invited user and user yet to respond
            if(!checkRequest){
                checkRequest = await Request.findOne({receiverUser:duserid, senderUser:args.receiverUser,
                                                       event:args.event}).sort({created_at: -1});
            }

            if(!checkRequest){
                let requestObj = {...args, senderUser: duserid};
                return Request.create(requestObj);
            }else{
                if(checkRequest.status == "Rejected"){
                    let requestObj = {...args, senderUser: duserid};
                    return Request.create(requestObj);
                }

                var result = {'_id':checkRequest._id,'status':"Already invited, check notification"}
                return result;
            }

        } catch (error) {
            throw error;
        }
    },

    clearCommentNotification: async (_, args, {user}) => {
        try {
            await requireAuth(user);
            return await Request.findByIdAndUpdate( args._id , {status:"Cleared"}, {new: true});

        } catch (error) {
            throw error;
        }
    },

};