export default `
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
  type Request {
    _id: ID!
    senderUser: User
    group: Group
    event: Event
    receiverUser: User
    url: String
    created_at: Date
    updated_at: Date    
  }
  input RequestInput {
    senderUser: String
    group: String
    event: String
    receiverUser: String
    url: String
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
  type Like{
    _id: String
    like: String
  }
  
  type Photo{
    _id: String
    url: String
    user: User
    event: Event
    likes: [Like]
    comments: [Comment]
  }
  
  type Status {
    message: String!
  }

  type Query {
    getEvents: [Event]
    getRequests: [Request]
    getRequest(_id: ID!): Request
    getGroups: [Group]
    getGroup(_id: ID!): Group
    getComments: [Comment]
    getEvent(_id: ID!): Event
    getProfile(_id: ID!): Profile
    userSearch(params: String!): [User]
    me: Me
   
    getPhotos: [Photo]
    getPhoto(_id: ID!): Photo     

  }
  type Mutation {
    addGroup(title: String!, description: String): Group
    
    
    addRequest(input: RequestInput): Boolean

    addEvent(title: String!, description: String,  group: ID, status: Int): Event
    addComment(text:String!, postId: Int): Comment
    updateEvent(_id: ID!, name: String): Event
    deleteEvent(_id: ID!): Status

    addProfile(country: String, state: String): Profile
    updateProfile(first_name:String!, last_name:String!, country: String!, state: String!, image_path:String): Profile

    signup(email: String!, password: String!, username: String): Auth
    login(email: String!, password: String!): Auth

    addPhoto(url:String!, user: ID, event: ID, likes: ID, comments: ID): Photo
    updatePhoto(url:String!, user: ID, event: ID, likes: ID, comments: ID): Photo
    deletePhoto(_id: ID!): Status

  }

  schema {
    query: Query
    mutation: Mutation
  }
`;