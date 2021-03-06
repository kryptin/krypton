import User from '../../models/user';
import {requireAuth} from '../../services/auth';
import Profile from "../../models/profile";
import Group from "../../models/group";
import GroupMember from "../../models/group-member";
import Event from "../../models/event";
import EventMember from "../../models/event-member";


export default {
    signup: async (_, args) => {
        try {
            const user = await User.create(args);
            const duserid = user? user._id: user;

            Profile.create({ user: duserid, country:"Nigeria", state:"Lagos" });
            const group = await Group.create({ title: "Default Group", description:"Keep family events organised here", user: duserid, user_type:"Admin" });
            const groupMember = await GroupMember.create({ group: group._id, user: duserid, user_type:"Admin" });

            const event = await Event.create({ group: group._id,  title: args.username+"'s Birthday", description:"Celebrating Life", user: duserid, user_type:"Admin", e_type:"Private" });
            const eventMember = await EventMember.create({ event: event._id, user: duserid, user_type:"Admin" });

            return {
                token: user.createToken(),
            };
        } catch (error) {

            throw error;

        }
    },

    userSearch: async (_, args, {user}) => {
        try {
            var getUser = await requireAuth(user);
            var foundUser = await User.findOne().or([{ username: args.params }, { email: args.params }]).sort({ createdAt: -1 });

            if(getUser._id.toString() != foundUser._id.toString()){
                return foundUser
            }
            return null;
        } catch (error) {
            //throw error;
        }
    },

    login: async (_, {email, password, onesignal_playerId}) => {
        try {
            const user = await User.findOne({email});

            if (!user) {
                throw new Error('User does not exist!');
            }

            if (!user.authenticateUser(password)) {
                throw new Error('Password not correct!');
            }

            if (user){
                await User.findByIdAndUpdate( user._id , { onesignal_playerId:onesignal_playerId });
            }

            return {
                token: user.createToken()
            };
        } catch (error) {
            throw error;
        }
    },

    me: async (_, args, {user}) => {
        try {
            const me = await requireAuth(user);

            return me;
        } catch (error) {
            throw error;
        }
    },
};