const config = require('./utils/config')
const app = require('./app')
const { ApolloServer, gql } = require('apollo-server-express')
const { createServer } = require('http');
const DataLoader = require('dataloader')
const {batchNotes}=require('./utils/dataloaderBatches')
const mongoose = require('mongoose')
const Note=require('./models/note')
const resolvers= require('./schema/resolvers')
const typeDefs=require('./schema/typedefs')
const {ComplexityLimitRule,depthLimiter,rateLimitDirective} =require('./utils/security')


const mongooseUrl = config.dburl
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(mongooseUrl)
    .then(() => {
        console.log('connected to MongoDB')
    }).catch((error: any) => {
        console.log('error connection to MongoDB:', error.message)
    })

const server = new ApolloServer({
    schemaDirectives: {
        rateLimit: rateLimitDirective,
      },
    typeDefs,
    resolvers,
    validationRules: [depthLimiter,ComplexityLimitRule], 

    context: async ({ req, res }: any) => {
        const noteLoader=new DataLoader((keys: any[]) => batchNotes(keys, Note))
        return { req, res,noteLoader }
    }
});

server.applyMiddleware({ app, cors: false }); //set false, app cors already enabled
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);
const PORT = config.PORT
httpServer.listen(PORT, () => {
    console.log(`Server ready at: ${PORT}${server.graphqlPath}`);
})