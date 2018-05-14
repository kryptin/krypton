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
    groupMember :[GroupMember]
    description: String
    created_at: Date
    updated_at: Date    
  }
  type GroupMember {
    _id: ID!
    user: User
    group: Group
    member: [Group]
    user_type:String
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
 
  type Event {
    _id: ID!
    title: String
    group: Group
    description: String
    status: Int
    created_at: Date
    updated_at: Date
  }
  type EventMember {
    _id: ID!
    user: User
    event: Event
    user_type:String
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
    bio: String
    sex: String
    date_of_birth: String
    country: String
    user: User
    groupMember: [GroupMember] 
    eventMember: [EventMember]
    group: [Group] 
    event: Event
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
  type PhotoComment {
    _id: String
    name: String
    type: String
    photo: Photo
  }

  type Query {
    getPhotoComments: [PhotoComment]
    getEvents: [Event]
    getRequests: [Request]
    getRequest(_id: ID!): Request
    getGroups: [Group]
    getGroup(_id: ID!): Group
    getGroupByUser: Group,

    getComments: [Comment]

    getEvent(_id: ID!): Event
    getEventByGroup(group: ID!): Event
    getProfile: Profile
    userSearch(params: String!): [User]
    me: Me
   
    getPhotos: [Photo]
    getPhoto(_id: ID!): Photo     

  }

  input RequestInput {
    senderUser: String
    group: String
    event: String
    receiverUser: String
    url: String
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
    deletePhotoComment(_id: ID!): PhotoComment
    addPhotoComment(name:String!, photo: String): PhotoComment
    addGroup(title: String!, description: String): Group
    addGroupMember(group: String!, user: String!): GroupMember
    
    addRequest(input: RequestInput): Boolean

    addEvent(group: String!, title: String!, description: String): Event
    addEventMember(event: String!, user: String!): EventMember

    addComment(text:String!, postId: Int): Comment
    updateEvent(_id: ID!, name: String): Event
    deleteEvent(_id: ID!): Status

    addProfile(input: ProfileInput): Profile
    updateProfile(first_name:String!, last_name:String!, country: String, state: String, sex:String!, bio:String!, date_of_birth:String!, image_path:String): Profile

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