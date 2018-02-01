import {
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} from 'graphql';
import {Types} from 'mongoose';

import groupType from '../../types/group/group';
import getProjection from '../../get-projection';
import GroupModel from '../../../models/group';

export default {
    type: groupType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, params, context, options) {
        const projection = getProjection(options);

        return GroupModel
            .findById(params.id)
            .select(projection)
            .exec();
    }
};
