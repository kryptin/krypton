import GraphQLDate from 'graphql-date';
import GroupResolvers from './group-resolver';
import GroupMemberResolvers from './group-member-resolver';
import EventResolvers from './event-resolver';
import EventMemberResolvers from './event-member-resolver';
import EventCommentResolvers from './event-comment-resolver';
import UserResolvers from './user-resolver';
import ProfileResolvers from './profile-resolver';
import RequestResolvers from './request-resolver';
import PhotoCommentResolvers from './photo-comment-resolver';
import PhotoLikeResolvers from './photo-like-resolver';

import User from '../../models/user';
import Group from '../../models/group';
import GroupMember from '../../models/group-member';
import Event from '../../models/event';
import EventMember from '../../models/event-member';
import Profile from '../../models/profile';
import PhotoResolvers from './photo-resolver';
import Photo from '../../models/photo';
import PhotoComment from '../../models/photo-comment';



export default {
    Date: GraphQLDate,
    Group: {
        user: ({ user }) => User.findById(user),
        event: ({ _id }) => Event.find({ group: _id }),
    },
    GroupMember: {
        user: ({ user }) => User.findById(user),
        group: ({ group }) => Group.findById(group),
        member: ({ group }) => GroupMember.find({ group: group }),
    },
    Event: {
        group: ({ group }) => Group.findById(group),
        eventMember: ({ _id }) => EventMember.find({ event: _id }),
        photo: ({ _id }) => Photo.find({ event: _id }),
    },
    EventMember: {
        user: ({ user }) => User.findById(user),
        event: ({ event }) => Event.findById(event),
        photo: ({ user, event }) => Photo.find({user: user, event:event }),
    },
    User: {
        group: ({ group }) => Group.findById(group),
        profile: ({ _id }) => Profile.findOne({ user: _id }),
    },
    Profile: {
        user: ({ user }) => User.findById(user),
        groupMember: ({ user }) => GroupMember.find({ user: user }),
        eventMember: ({ user }) => EventMember.find({ user: user }),
    },
    Photo: {
        user: ({ user }) => User.findById(user),
    },
    PhotoComment: {
        photo: ({ photo }) => photo.findById(photo),
        user: ({ user }) => User.findById(user),
    },
    Request: {
        senderUser: ({ senderUser }) => User.findById(senderUser),
        receiverUser: ({ receiverUser }) => User.findById(receiverUser),
        group: ({ group }) => Group.findById(group),
        event: ({ event }) => Event.findById(event),

    },
    Query: {

        getGroups: GroupResolvers.getGroups,
        getGroup: GroupResolvers.getGroup,
        getUserGroups: GroupMemberResolvers.getUserGroups,

        getRequests: RequestResolvers.getRequests,
       // getRequest: RequestResolvers.getRequest,

        getEvents: EventResolvers.getEvents,
        getEvent: EventResolvers.getEvent,
        getEventByGroup: EventResolvers.getEventByGroup,
        getPopularEvents: EventResolvers.getPopularEvents,

        getEventMembers: EventMemberResolvers.getEventMembers,
        getEventComments: EventCommentResolvers.getEventComments,

        getProfile: ProfileResolvers.getProfile,

        me: UserResolvers.me,
        userSearch: UserResolvers.userSearch,
        //for photo
        getPhotos: PhotoResolvers.getPhotos,
        getUserPhotos: PhotoResolvers.getUserPhotos,
        getPhotoComments: PhotoCommentResolvers.getPhotoComments,
        getPhotoLikes: PhotoLikeResolvers.getPhotoLikes,


    },
    Mutation: {
        addGroup: GroupResolvers.addGroup,
        addGroupMember: GroupMemberResolvers.addGroupMember,

        sendRequest: RequestResolvers.sendRequest,
        acceptRequest: RequestResolvers.acceptRequest,
        rejectRequest: RequestResolvers.rejectRequest,

        addEvent: EventResolvers.addEvent,
        addEventMember: EventMemberResolvers.addEventMember,
        addEventComment: EventCommentResolvers.addEventComment,

        addProfile: ProfileResolvers.addProfile,
        updateProfile: ProfileResolvers.updateProfile,

        signup: UserResolvers.signup,
        login: UserResolvers.login,

        //for photo
        addPhoto: PhotoResolvers.addPhoto,
        updatePhoto: PhotoResolvers.updatePhoto,
        deletePhoto: PhotoResolvers.deletePhoto,

        deletePhotoComment: PhotoCommentResolvers.deletePhotoComment,
        addPhotoComment: PhotoCommentResolvers.addPhotoComment,
        addPhotoLike: PhotoLikeResolvers.addPhotoLike,



    },
    //so as to populate Event with Group
    // I must use dataloader on this later

}