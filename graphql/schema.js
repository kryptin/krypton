

export default`
  scalar Date
  type User {
    _id: ID!
    username: String
    email: String!
    group: Group
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
    event: [Event]
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
    group: Group
    state: String
    location: String
    image_path: String
  }
  
  type Status {
    message: String!
  }
  type Query {
    getEvents: [Event]
    getGroups: [Group]
    getGroup(_id: ID!): Group
    getGroupByUser: Group,

    getComments: [Comment]

    getEvent(_id: ID!): Event
    getEventByGroup(group: ID!): Event
    getProfile: Profile
    me: Me
  }


  input EventInput {
    title: String
    group: String
    description: String
    status: Int
  }
  input ProfileInput{
    first_name: String
    last_name: String
    country: String
    user: String
    state: String
    location: String
    image_path: String
  }

  type Mutation {
    addGroup(title: String!, description: String): Group

    addEvent(input: EventInput): Event
    addComment(text:String!, postId: Int): Comment
    updateEvent(_id: ID!, name: String): Event
    deleteEvent(_id: ID!): Status

    addProfile(input: ProfileInput): Profile
    updateProfile(first_name:String!, last_name:String!, country: String!, state: String!, image_path:String): Profile

    signup(email: String!, password: String!, username: String): Auth
    login(email: String!, password: String!): Auth
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;