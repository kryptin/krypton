export default {

    //PORT: process.env.PORT || 4000,
    // development
    //DB_URL: 'mongodb://localhost/krypton_db',
    //DB_URL: "mongodb://seunope:GrouPay2020@127.0.0.1:27017/pixfam",

    //production
    //DB_URL: process.env.MONGODB_URI || 'mongodb://krypton:buldozed@ds131329.mlab.com:31329/heroku_1kwwffk8',
    DB_URL: process.env.MONGODB_URI || 'mongodb+srv://pixfam:pixfam2020@pixfam.t2efg.mongodb.net/geneva?retryWrites=true&w=majority',

    GRAPHQL_PATH: '/graphql',
    JWT_SECRET: 'sjhf887sdfhjsd8778'
};


//mongodb+srv://pixfam:pixfam2020@pixfam.t2efg.mongodb.net/pixfam?authSource=admin&replicaSet=atlas-bwcfds-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true
//mongodb+srv://pixfam:pixfam2020@pixfam.t2efg.mongodb.net/pixfam?retryWrites=true&w=majority
//mongodb://seunope:GrouPay2020@localhost:27017/?authSource=groupay&readPreference=primary&appname=MongoDB%20Compass&ssl=false
//    //"mongodb": "mongodb://seunope:GrouPay2020@127.0.0.1:27017/groupay"

