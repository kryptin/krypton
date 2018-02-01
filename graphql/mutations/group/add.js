import {
    GraphQLNonNull,
    GraphQLBoolean
} from 'graphql';

import groupInputType from '../../types/group/group-input';
import GroupModel from '../../../models/group';

export default {
    type: GraphQLBoolean,
    args: {
        data: {
            name: 'data',
            type: new GraphQLNonNull(groupInputType)
        }
    },
    async resolve(root, params, options) {
        const groupModel = new GroupModel(params.data);
        const newGroup = await groupModel.save();

        if (!newGroup) {
            throw new Error('Error adding new group');
        }
        return true;
    }
};
