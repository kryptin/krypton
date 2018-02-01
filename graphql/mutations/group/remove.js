import {
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import groupType from '../../types/group/group';
import getProjection from '../../get-projection';
import GroupModel from '../../../models/group';

export default {
    type: groupType,
    args: {
        _id: {
            name: '_id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    async resolve(root, params, options) {
        const projection = getProjection(options.fieldASTs[0]);
        const removedGroup = await GroupModel
            .findByIdAndRemove(params._id, {
                select: projection
            })
            .exec();

        if (!removedGroup) {
            throw new Error('Error removing blog group');
        }

        return removedGroup;
    }
};
