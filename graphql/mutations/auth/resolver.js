import { GraphQLSchema,  } from 'graphql';
import { Registry } from 'graphql-helpers';
// See an implementation of compose https://gist.github.com/mlp5ab/f5cdee0fe7d5ed4e6a2be348b81eac12
import { compose } from './compose';

const registry = new Registry();

/**
 * The authenticated function checks for a user and calls the next function in the composition if
 * one exists. If no user exists in the context then an error is thrown.
 */
const authenticated =
    (fn: GraphQLFieldResolver) =>
        (parent, args, context, info) => {
            if (context.user) {
                return fn(parent, args, context, info);
            }
            throw new Error('User is not authenticated');
        };

/*
* getLoggedInUser returns the logged in user from the context.
*/
const getLoggedInUser = (parent, args, context, info) => context.user;

registry.createType(`
  type User {
    id: ID!
    username: String!
  }
`;

registry.createType(`
  type Query {
    me: User
  }
`, {
    me: compose(authenticated)(getLoggedInUser)
};

const schema = new GraphQLSchema({
    query: registry.getType('Query'),
});