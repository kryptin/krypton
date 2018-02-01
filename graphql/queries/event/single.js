import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';
import {Types} from 'mongoose';

import eventType from '../../types/event/event';
import getProjection from '../../get-projection';
import EventModel from '../../../models/event';

export default {
  type: eventType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve (root, params, context, options) {
    const projection = getProjection(options);

    return EventModel
      .findById(params.id)
      .select(projection)
      .exec();
  }
};
