import GraphQLDate from 'graphql-date';
import GroupResolvers from './group-resolver';
import GroupMemberResolvers from './group-member-resolver';
import EventResolvers from './event-resolver';
import EventMemberResolvers from './event-member-resolver';
import CommentResolvers from './comment-resolver';
import UserResolvers from './user-resolver';
import ProfileResolvers from './profile-resolver';
import RequestResolvers from './request-resolver';
import User from '../../models/user';
import Group from '../../models/group';
import GroupMember from '../../models/group-member';
import Event from '../../models/event';
import EventMember from '../../models/event-member';
import PhotoResolvers from './photo-resolver';
import Photo from '../../models/photo';
import PhotoComment from '../../models/comment-on-photo';
import PhotoCommentResolvers from './comment-on-photo-resolver';

export default {
    Date: GraphQLDate,
    Group: {
        user: ({user}) => User.findById(user),
        event: ({event}) => Event.findById(event),
        // eventInGroup: ({group}) => Event.find({group:"5ae4e9d4e08d44277015f14d"}),
    },
    GroupMember: {
        user: ({user}) => User.findById(user),
        group: ({group}) => Group.findById(group),
    },
    Event: {
        group: ({group}) => Group.findById(group),
    },
    EventMember: {
        user: ({user}) => User.findById(user),
        event: ({event}) => Event.findById(event),
    },
    User: {
        group: ({group}) => Group.findById(group),
    },
    Profile: {
        user: ({user}) => User.findById(user),
        groupMember: ({user}) => GroupMember.find({user}),
        eventMember: ({user}) => EventMember.find({user}),
    },
    PhotoComment: {
        photo: ({photo}) => photo.findById(photo),
    },
    Request: {
        senderUser: ({user}) => User.findById(user),
        receiverUser: ({user}) => User.findById(user),
        group: ({group}) => Group.findById(group),
        event: ({event}) => Event.findById(event),
    },
    Query: {
        getPhotoComments: PhotoCommentResolvers.getPhotoComments,

        getGroups: GroupResolvers.getGroups,
        getGroup: GroupResolvers.getGroup,
        getGroupByUser: GroupResolvers.getGroupByUser,

        getRequests: RequestResolvers.getRequests,
        getRequest: RequestResolvers.getRequest,


        getEvents: EventResolvers.getEvents,
        getEvent: EventResolvers.getEvent,
        getEventByGroup: EventResolvers.getEventByGroup,
        getComments: CommentResolvers.getComments,
        getProfile: ProfileResolvers.getProfile,

        me: UserResolvers.me,
        userSearch: UserResolvers.userSearch,
        //for photo
        getPhotos: PhotoResolvers.getPhotos,
        getPhoto: PhotoResolvers.getPhoto,
    },
    Mutation: {
        deletePhotoComment: PhotoCommentResolvers.deletePhotoComment,
        addPhotoComment: PhotoCommentResolvers.addPhotoComment,
        
        addGroup: GroupResolvers.addGroup,
        addGroupMember: GroupMemberResolvers.addGroupMember,


        addRequest: RequestResolvers.addRequest,

        addEvent: EventResolvers.addEvent,
        addEventMember: EventMemberResolvers.addEventMember,

        addComment: CommentResolvers.addComment,
        addProfile: ProfileResolvers.addProfile,
        updateProfile: ProfileResolvers.updateProfile,
        signup: UserResolvers.signup,
        login: UserResolvers.login,
        //for photo
        addPhoto: PhotoResolvers.addPhoto,
        updatePhoto: PhotoResolvers.updatePhoto,
        deletePhoto: PhotoResolvers.deletePhoto,
    },
    //so as to populate Event with Group
    // I must use dataloader on this later

}