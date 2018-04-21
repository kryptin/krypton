import GraphQLDate from 'graphql-date';
import GroupResolvers from './group-resolver';
import EventResolvers from './event-resolver';
import CommentResolvers from './comment-resolver';
import UserResolvers from './user-resolver';
import ProfileResolvers from './profile-resolver';
import User from '../../models/user';
import Group from '../../models/group';
import Event from '../../models/event';


export default {
    Date: GraphQLDate,
    Group: {
        user: ({user}) => User.findById(user),
        event: ({event}) => Event.findById(event),
    },
    User: {
        group: ({group}) => Group.findById(group),
    },
    Profile: {
        user: ({user}) => User.findById(user),
        //group: ({group}) => Group.findById(group),
    },
    Query: {
        getGroups: GroupResolvers.getGroups,
        getGroup: GroupResolvers.getGroup,
        getGroupByUser: GroupResolvers.getGroupByUser,
        getEvents: EventResolvers.getEvents,
        getEvent: EventResolvers.getEvent,
        getEventByGroup: EventResolvers.getEventByGroup,
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