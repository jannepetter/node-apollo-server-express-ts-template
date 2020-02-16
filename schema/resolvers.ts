export{}
const Note=require('../models/note')

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        findAllNotes:async (root: any, args:any, context: any) => {
            try {
                const notes =await Note.find({})
                return notes
            } catch (error) {
                console.log(error.message)
            }
        },
        findNote:async (root: any, args: { id: string }, context: any) => {
            try {
               const note=await context.noteLoader.load(args.id) 
               return note
            } catch (error) {
                console.log(error.message)
            }
        }
    },
};
module.exports=resolvers