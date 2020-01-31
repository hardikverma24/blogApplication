const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/blog',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
























/* const me = new User({
    name: 'Hardik',
    email: 'hardikverma.verma@gmail.com',
    password: 'hyhardik',
    age: 21
})

me.save().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
}) */