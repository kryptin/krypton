import {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt
} from 'graphql';

export default new GraphQLInputObjectType({
    name: 'EventInput',
    fields: {
        _id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLInt}
    }
});
