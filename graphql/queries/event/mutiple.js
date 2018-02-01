import {
    GraphQLList,
    GraphQLString
} from 'graphql';

import eventType from '../../types/event/event';
import getProjection from '../../get-projection';
import EventModel from '../../../models/event';
import log4js from "../../../shared/logger";

var logger = log4js.getLogger();

export default {
    type: new GraphQLList(eventType),
    args: {},
    resolve(root, params, context, options) {
        const projection = getProjection(options);
        return EventModel
            .find()
            .select(projection)
            .exec();

    }
};
