var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)

mongoose
    .connect(
        process.env.MONGODB_URI, 
        // "mongodb+srv://hahuy:Hahuy2796@cluster0-ezjsy.mongodb.net/test?retryWrites=true&w=majority",
        {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('connection succesful'))
    .catch(err => console.log(err.errors))

module.exports = { mongoose }
