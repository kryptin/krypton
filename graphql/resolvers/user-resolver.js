import User from '../../models/user';
import {requireAuth} from '../../services/auth';
import Event from "../../models/event";

export default {
    signup: async (_, args) => {
        try {
            const user = await User.create(args);
            console.log('user: ', user);
            return {
                token: user.createToken(),
            };
        } catch (error) {
            throw error;
        }
    },

    userSearch: async (_, args) => {
        try {
            //const query = await User.find();
            return await User.find().or([{ username: args.params }, { email: args.params }]).sort({ createdAt: -1 });
        } catch (error) {
            throw error;
        }
    },

    login: async (_, {email, password}) => {
        try {
            const user = await User.findOne({email});

            if (!user) {
                throw new Error('User not exist!');
            }

            if (!user.authenticateUser(password)) {
                throw new Error('Password not match!');
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