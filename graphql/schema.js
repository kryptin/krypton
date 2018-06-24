export default`
  scalar Date
  type User {
    _id: ID!
    username: String
    email: String!
    image_path: String!
    group: Group
    profile: Profile
    created_at: Date
    updated_at: Date 
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
    photo: Photo
    receiverUser: User
    url: String
    status: String
    requestType: String
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
    created_at: Date
    updated_at: Date 
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
    createdAt: String
    view: String
    user: User
    event: Event
    photoComment: [PhotoComment]
    photoLike: [PhotoLike]

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
    getPublicProfile(user: ID!): Profile
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

    sendGroupInvite(receiverUser:String!, group:String!, status: String!, requestType: String!): Request
    sendEventInvite(receiverUser:String!, event:String!, status: String!, requestType: String!): Request
    sendJoinEventRequest(receiverUser:String!, event:String, status: String, url: String, requestType: String!): Request
    respond2JoinEventRequest(_id: ID!, response_type:String!): Request
    respond2Invite(_id: ID!, response_type:String!): Request
    clearCommentNotification(_id: ID!): Request
    
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
    updatePhotoView( photo: ID!): Photo
    deletePhoto(_id: ID!): Status 
    deletePhotoComment(_id: ID!): PhotoComment
    addPhotoComment(comment:String!, photo: ID!, photoCreator:ID!): PhotoComment
    addPhotoLike( photo: ID!): PhotoLike
    
  }


  schema {
    query: Query
    mutation: Mutation
  }
`;