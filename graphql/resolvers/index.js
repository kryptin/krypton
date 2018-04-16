import GraphQLDate from 'graphql-date';
import GroupResolvers from './group-resolver';
import EventResolvers from './event-resolver';
import CommentResolvers from './comment-resolver';
import UserResolvers from './user-resolver';
import ProfileResolvers from './profile-resolver';
import User from '../../models/user';

export default {
    Date: GraphQLDate,
    Group: {
        user: ({user}) => User.findById(user),
    },
    Query: {
        getGroups: GroupResolvers.getGroups,
        getGroup: GroupResolvers.getGroup,
        getEvents: EventResolvers.getEvents,
        getEvent: EventResolvers.getEvent,
        getComments: CommentResolvers.getComments,
        getProfile: ProfileResolvers.getProfile,
        me: UserResolvers.me,
    },
    Mutation: {
        addGroup: GroupResolvers.addGroup,
        addEvent: EventResolvers.addEvent,
        addComment: CommentResolvers.addComment,
        addProfile: ProfileResolvers.addProfile,
        updateProfile: ProfileResolvers.updateProfile,
        signup: UserResolvers.signup,
        login: UserResolvers.login,
    }
}