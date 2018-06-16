export default {
    //PORT: process.env.PORT || 4000,
    // development
    //DB_URL: 'mongodb://localhost/krypton_db',
    //production
    DB_URL: process.env.MONGODB_URI || 'mongodb://krypton:buldozed@ds131329.mlab.com:31329/heroku_1kwwffk8',
    GRAPHQL_PATH: '/graphql',
    JWT_SECRET: 'sjhf887sdfhjsd8778'
}