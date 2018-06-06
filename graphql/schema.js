export default`
  scalar Date
  type User {
    _id: ID!
    username: String
    email: String!
    image_path: String!
    group: Group
    profile: Profile
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
    groupEvent :[Event]
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
    status: String
    created_at: Date
    updated_at: Date    
  }
 
  type Event {
    _id: ID!
    title: String
    group: Group
    eventMember: [EventMember]
    photo : [Photo]
    description: String
    status: Int
    e_type: String
    created_at: Date
    updated_at: Date
  }
  type EventMember {
    _id: ID!
    user: User
    event: Event
    photo: [Photo]
    user_type:String
    created_at: Date
    updated_at: Date    
  }
 
  type EventComment {
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
  type PhotoLike{
    _id: String
    like: String
    user: User
    photo: Photo
  }
  
  type Photo{
    _id: String
    image_url: String
    description: String
    user: User
    event: Event
  }
  
  type Status {
    message: String!
  }
  type PhotoComment {
    _id: String
    comment: String
    user: User
    photo: Photo
  }
  
  type PhotoNotification{
    _id:String
    user: User 
    photo_comment: PhotoComment
    status: String
  }

  type Query {
  
    getEvents: [Event]
    getRequests: [Request]
    
    getGroups: [Group]
    getGroup(_id: ID!): Group
    getUserGroups: [GroupMember]
    getGroupMembers(_id: ID!): [GroupMember]

    
    getEvent(_id: ID!): Event
    getUserEvents: [EventMember]
    getEventByGroup(group: ID!): Event
    getPopularEvents: [Event]
    getEventMembers(event: ID!): [EventMember]
    getEventComments: [EventComment]

    getProfile: Profile
    userSearch(params: String!): User
    me: Me
   
    getPhotos: [Photo]
    getUserPhotos(user: ID!, event: ID!): [Photo]   
    getPhotoComments(photo: ID!): [PhotoComment]
    getPhotoLikes(photo: ID!): [PhotoLike]

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
   
    addGroup(title: String!, description: String): Group
    makeGroupAdmin(_id: ID!): GroupMember

    sendRequest(receiverUser:String!, group:String, event:String, status: String, url: String): Request
    respond2Request(_id: ID!, response_type:String!): Request

    addEvent(group: String!, title: String!, description: String,e_type: String!): Event    

    addEventComment(text:String!, postId: Int): EventComment
    updateEvent(_id: ID!, name: String): Event
    deleteEvent(_id: ID!): Status

    addProfile(input: ProfileInput): Profile
    updateProfile(first_name:String!, last_name:String!, country: String, state: String, sex:String!, bio:String!, date_of_birth:String!, image_path:String): Profile

    signup(email: String!, password: String!, image_path:String!, username: String): Auth
    login(email: String!, password: String!): Auth

    addPhoto(image_url:String!, event:String!, description: String): Photo
    updatePhoto(url:String!, user: ID, event: ID, likes: ID, comments: ID): Photo
    deletePhoto(_id: ID!): Status 
    deletePhotoComment(_id: ID!): PhotoComment
    addPhotoComment(comment:String!, photo: String!): PhotoComment
    addPhotoLike( photo: String!): PhotoLike
    
  }


  schema {
    query: Query
    mutation: Mutation
  }
`;