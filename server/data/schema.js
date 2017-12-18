/* eslint-disable no-unused-vars, no-use-before-define */
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  cursorForObjectInConnection
} from 'graphql-relay';

import {
  User,
  Entry,
  getUser,
  getEntry,
  addEntry,
  getEntries,
  removeEntry,
  modifyEntry
} from './database';


/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    console.log('globalId', globalId);
    const { type, id } = fromGlobalId(globalId);
    if (type === 'User') {
      return getUser(Number(id));
    } else if (type === 'Entry') {
      return getEntry(Number(id));
    }
    return null;
  },
  (obj) => {
    if (obj instanceof User) {
      return userType;
    } else if (obj instanceof Entry) {
      return entryType;
    }
    return null;
  }
);

/**
 * Define your own types here
 */

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
    entries: {
      type: entryConnection,
      description: 'Entries that I have',
      args: connectionArgs,
      resolve: (user, args) => connectionFromPromisedArray(getEntries(user.id), args)
    },
    username: {
      type: GraphQLString,
      description: 'Users\'s username'
    },
    firstName: {
      type: GraphQLString,
      description: 'Users\'s first name'
    },
    lastName: {
      type: GraphQLString,
      description: 'Users\'s last name'
    },
    email: {
      type: GraphQLString,
      description: 'User\'s email'
    }
  }),
  interfaces: [nodeInterface]
});

const entryType = new GraphQLObjectType({
  name: 'Entry',
  description: 'Entries',
  fields: () => ({
    id: globalIdField('Entry'),
    userId: {
      type: GraphQLID,
      description: 'User of the Entry'
    },
    text: {
      type: GraphQLString,
      description: 'text of the Entry'
    },
    timestamp: {
      type: GraphQLFloat,
      description: 'timestamp of the Entry'
    }
  }),
  interfaces: [nodeInterface]
});

/**
 * Define your own connection types here
 */
const { connectionType: entryConnection, edgeType: entryEdge } = connectionDefinitions({ name: 'Entry', nodeType: entryType });

/**
 * Create Entry example
 */

const addEntryMutation = mutationWithClientMutationId({
  name: 'addEntry',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: new GraphQLNonNull(GraphQLString) }
  },

  outputFields: {
    entryEdge: {
      type: entryEdge,
      resolve: (obj) => {
        const cursorId = cursorForObjectInConnection(getEntries(obj.userId), obj);
        return { node: obj, cursor: cursorId };
      }
    },
    viewer: {
      type: userType,
      resolve: ({ userId }) => getUser(userId)
    }
  },

  mutateAndGetPayload: ({ userId, text }) => addEntry(userId, text)
});

const modifyEntryMutation = mutationWithClientMutationId({
  name: 'modifyEntry',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: new GraphQLNonNull(GraphQLString) }
  },

  outputFields: {
    entryEdge: {
      type: entryEdge,
      resolve: (obj) => {
        const cursorId = cursorForObjectInConnection(getEntries(obj.userId), obj);
        return { node: obj, cursor: cursorId };
      }
    },
    viewer: {
      type: userType,
      resolve: ({ userId }) => getUser(userId)
    }
  },

  mutateAndGetPayload: ({ id, text }) => modifyEntry(fromGlobalId(id).id, text)
});

const removeEntryMutation = mutationWithClientMutationId({
  name: 'removeEntry',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },

  outputFields: {
    viewer: {
      type: userType,
      resolve: results => getUser(results[0].userId)
    }
  },

  mutateAndGetPayload: ({ id, text }) => removeEntry(fromGlobalId(id).id, text)
});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    viewer: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (_, { id }) => getUser(id)
    }
  })
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addEntry: addEntryMutation,
    modifyEntry: modifyEntryMutation,
    removeEntry: removeEntryMutation
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
