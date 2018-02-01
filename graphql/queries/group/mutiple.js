import {
  GraphQLList
} from 'graphql';

import groupType from '../../types/group/group';
import getProjection from '../../get-projection';
import GroupModel from '../../../models/group';

export default {
  type: new GraphQLList(groupType),
  args: {},
  resolve (root, params, context, options) {
    const projection = getProjection(options);

    return GroupModel
      .find()
      .select(projection)
      .exec();
  }
};
