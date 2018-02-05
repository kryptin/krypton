import {
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInputObjectType,
} from 'graphql';

import {requireAuth} from '../../../services/auth';
import userInputType from '../../types/user/user-input';
import UserModel from '../../../models/user';
import log4js from '../../../shared/logger';

var logger = log4js.getLogger();

const loginInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
        password: {type: GraphQLString},
        email: {type: GraphQLString}
    }
});



export default {
    loginInputType
};



