import GraphQLDate from 'graphql-date';
import GroupResolvers from './group-resolver';
import EventResolvers from './event-resolver';
import CommentResolvers from './comment-resolver';
import UserResolvers from './user-resolver';
import User from '../../models/user';

export default {
    Date: GraphQLDate,
    Group: {
        user: ({user}) => User.findById(user),
    },
    Query: {
        getGroups: GroupResolvers.getGroups,
        getEvents: EventResolvers.getEvents,
        getComments: CommentResolvers.getComments,
        me: UserResolvers.me,
    },
    Mutation: {
        addGroup: GroupResolvers.addGroup,
        addEvent: EventResolvers.addEvent,
        addComment: CommentResolvers.addComment,
        signup: UserResolvers.signup,
        login: UserResolvers.login,

    }
}