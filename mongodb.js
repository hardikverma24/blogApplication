//CRUD

const { MongoClient, ObjectID } = require('mongodb')
//const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useUnifiedTopology: true , useNewUrlParser: true}, (error, client) => {
    if(error)
    {
        return console.log('unable to connect to database !')
    }

    const db = client.db(databaseName)
    
    /* db.collection('users').insertOne({
        name: 'Hardik',
        age: 21
    }, (error,result) => {
        if(error)
        {
            return console.log("unable to insert user !")
        }
        console.log(result.ops)
    }
    ) */

    /* db.collection('users').insertMany([
        {
            name: 'Kartik',
            age:12
        },
        {
            name: 'Hardik',
            age: 21
        }
    ], (error,result) =>{
        if(error)
        {
            return console.log("unable to insert user")
        }
        
        return console.log(result.ops)
    }
    ) */

    /* db.collection('users').findOne({  age: 21 }, (error,user) => {
        if(error)
        {
            return console.log("unable to find user")
        }

        console.log(user)
    }) */

  /*   db.collection('users').updateOne({
        _id: new ObjectID("5dbe8ff0869f082534d20dc5")    
    },{
        $set: {
            name: 'Hardik',
            age: 21
        }
    }).then((result) => {
        console.log(result)
    
    }).catch((error) => {
        console.log(error)
    })
*/
    db.collection('users').deleteOne({
        name:'Hardik'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
}) 


