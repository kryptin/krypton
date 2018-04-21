import GraphQLDate from 'graphql-date';
import GroupResolvers from './group-resolver';
import EventResolvers from './event-resolver';
import CommentResolvers from './comment-resolver';
import UserResolvers from './user-resolver';
import ProfileResolvers from './profile-resolver';
import User from '../../models/user';
import PhotoCommentResolvers from './comment-on-photo-resolver';

export default {
    Date: GraphQLDate,
    Group: {
        user: ({user}) => User.findById(user),
    },
    Query: {
        getPhotoComments: PhotoCommentResolvers.getPhotoComments,
        getGroups: GroupResolvers.getGroups,
        getGroup: GroupResolvers.getGroup,
        getEvents: EventResolvers.getEvents,
        getEvent: EventResolvers.getEvent,
        getComments: CommentResolvers.getComments,
        getProfile: ProfileResolvers.getProfile,
        me: UserResolvers.me,
    },
    Mutation: {
        //addPhotoComment: PhotoCommentResolvers.addPhotoComment,
        addGroup: GroupResolvers.addGroup,
        addEvent: EventResolvers.addEvent,
        addComment: CommentResolvers.addComment,
        addProfile: ProfileResolvers.addProfile,
        updateProfile: ProfileResolvers.updateProfile,
        signup: UserResolvers.signup,
        login: UserResolvers.login,
    }
}