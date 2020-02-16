export{}
const mongoose = require('mongoose')
const noteSchema=mongoose.Schema({
    content:String,
})
noteSchema.set('toJSON', {
    transform: (document:any, returnedObject:any) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
})
module.exports =mongoose.model('Note', noteSchema)