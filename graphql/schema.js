

export default`
  scalar Date
  type User {
    _id: ID!
    username: String
    email: String!
  }
  type Auth {
    token: String!
  }
  type Me {
    _id: ID!
    username: String
    email: String!
  }
  type Group {
    _id: ID!
    title: String
    user: User
    description: String
    created_at: Date
    updated_at: Date    
  }
  type Event {
    _id: ID!
    title: String
    group: Group
    description: String
    status: Int
    created_at: Date
    updated_at: Date
  }
  type Comment {
    _id: String
    name: String
    type: String
  }
  type Status {
    message: String!
  }

  type Query {
    getEvents: [Event]
    getGroups: [Group]
    getGroup(_id: ID!): Group
    getComments: [Comment]
    getEvent(_id: ID!): Event
    me: Me
  }
  type Mutation {
    addEvent(title: String!, description: String, group: ID, status: Int): Event
    addGroup(title: String!, description: String): Group
    addComment(text:String!, postId: Int): Comment
    updateEvent(_id: ID!, name: String): Event
    deleteEvent(_id: ID!): Status

    signup(email: String!, password: String!, username: String): Auth
    login(email: String!, password: String!): Auth
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;