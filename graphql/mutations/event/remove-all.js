import {
    GraphQLBoolean
} from 'graphql';

import EventModel from '../../../models/event';

export default {
    type: GraphQLBoolean,
    resolve(root, params, options) {
        return EventModel
            .remove({})
            .exec();
    }
};
