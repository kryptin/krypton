import {
    GraphQLNonNull,
    GraphQLBoolean
} from 'graphql';

import eventInputType from '../../types/event/event-input';
import EventModel from '../../../models/event';

export default {
    type: GraphQLBoolean,
    args: {
        data: {
            name: 'data',
            type: new GraphQLNonNull(eventInputType)
        }
    },
    async resolve(root, params, options) {
        const eventModel = new EventModel(params.data);
        const newEventPost = await eventModel.save();

        if (!newEventPost) {
            throw new Error('Error adding new event');
        }
        return true;
    }
};
