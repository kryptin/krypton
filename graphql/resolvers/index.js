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
import PhotoComment from '../../models/comment-on-photo';
import PhotoCommentResolvers from './comment-on-photo-resolver';

export default {
    Date: GraphQLDate,
    Group: {
        user: ({user}) => User.findById(user),
    },
<<<<<<< HEAD
    PhotoComment: {
        photo: ({photo}) => photo.findById(photo),
=======
    Request: {
        senderUser: ({user}) => User.findById(user),
        receiverUser: ({user}) => User.findById(user),
        group: ({group}) => Group.findById(group),
        event: ({event}) => Event.findById(event),
>>>>>>> a05b7f3b4e3371f8cf91e68b2e845820cd32984a
    },
    Query: {
        getPhotoComments: PhotoCommentResolvers.getPhotoComments,
        getGroups: GroupResolvers.getGroups,
        getGroup: GroupResolvers.getGroup,

        getRequests: RequestResolvers.getRequests,
        getRequest: RequestResolvers.getRequest,


        getEvents: EventResolvers.getEvents,
        getEvent: EventResolvers.getEvent,
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
        group: ({group}) => Group.findById(group),
    },

}