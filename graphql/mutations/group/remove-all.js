import {
  GraphQLBoolean
} from 'graphql';

import GroupModel from '../../../models/group';

export default {
  type: GraphQLBoolean,
  resolve (root, params, options) {
    return GroupModel
      .remove({})
      .exec();
  }
};
