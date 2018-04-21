

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
  type Profile{
    _id: String
    first_name: String
    last_name: String
    country: String
    user: User
    state: String
    location: String
    image_path: String
  }
  type Status {
    message: String!
  }
  type PhotoComment {
    _id: String
    name: String
    type: String
  }

  type Query {
    getPhotoComments: [PhotoComment]
    getEvents: [Event]
    getGroups: [Group]
    getGroup(_id: ID!): Group
    getComments: [Comment]
    getEvent(_id: ID!): Event
    getProfile(_id: ID!): Profile
    me: Me
  }
  type Mutation {
    addGroup(title: String!, description: String): Group

    addEvent(title: String!, description: String,  group: ID, status: Int): Event
    addComment(text:String!, postId: Int): Comment
    updateEvent(_id: ID!, name: String): Event
    deleteEvent(_id: ID!): Status

    addProfile(country: String, state: String): Profile
    updateProfile(first_name:String!, last_name:String!, country: String!, state: String!, image_path:String): Profile

    signup(email: String!, password: String!, username: String): Auth
    login(email: String!, password: String!): Auth
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;