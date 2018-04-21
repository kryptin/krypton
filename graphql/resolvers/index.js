import GraphQLDate from 'graphql-date';
import GroupResolvers from './group-resolver';
import EventResolvers from './event-resolver';
import CommentResolvers from './comment-resolver';
import UserResolvers from './user-resolver';
import ProfileResolvers from './profile-resolver';
import RequestResolvers from './request-resolver';
import User from '../../models/user';
import Group from '../../models/group';
import Event from '../../models/event';
import PhotoResolvers from './photo-resolver';
import Photo from '../../models/photo';

export default {
    Date: GraphQLDate,
    Group: {
        user: ({user}) => User.findById(user),
    },
    Request: {
        senderUser: ({user}) => User.findById(user),
        group: ({group}) => Group.findById(group),
        event: ({event}) => Event.findById(event),
    },
    Query: {
        getGroups: GroupResolvers.getGroups,
        getGroup: GroupResolvers.getGroup,

        getRequests: RequestResolvers.getRequests,
        getRequest: RequestResolvers.getRequest,


        getEvents: EventResolvers.getEvents,
        getEvent: EventResolvers.getEvent,
        getComments: CommentResolvers.getComments,
        getProfile: ProfileResolvers.getProfile,
        me: UserResolvers.me,
        //for photo
        getPhotos: PhotoResolvers.getPhotos,
        getPhoto: PhotoResolvers.getPhoto,     
    },
    Mutation: {
        addGroup: GroupResolvers.addGroup,

        addRequest: RequestResolvers.addRequest,


        addEvent: EventResolvers.addEvent,
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

    Event: {
        group: ({ group }) => Group.findById(group),
      },
    
}