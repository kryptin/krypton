import {
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInputObjectType,
} from 'graphql';

import {requireAuth} from '../../../services/auth';
import loginInputType from '../../types/user/user-input';
import UserModel from '../../../models/user';
import log4js from '../../../shared/logger';

var logger = log4js.getLogger();



const loginQuery = new GraphQLObjectType({
    name: 'loginQuery',
    fields: {
        user: {
            type: GraphQLBoolean,
            args: {
                data: {
                    name: 'data',
                    type: new GraphQLNonNull(loginInputType)
                }
            },
            async resolve(parent, args, context, info) { // move the resolve function to here
                const user = await context.db.query.user({where: {email: args.email}});
                if (!user) {
                    throw new Error(`Could not find user with email: ${args.email}`)
                }

                // const valid = await bcrypt.compare(args.password, user.password);
                // if (!valid) {
                //     throw new Error('Invalid password')
                // }

                const token = user.createToken();

                return {
                    token,
                    user,
                }
            }
        },

    }
});


export default {
    loginQuery
};



