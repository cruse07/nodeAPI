const mongoose = require('mongoose');
const constr  = require('../../config/database.config.js');
let count = 0;

const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};

const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    mongoose.connect(constr.url, options).then(()=>{
       // getListOfCollection()
    //    mongoose.listCollections().toArray(function(err, collInfos) {
    //     // collInfos is an array of collection info objects that look like:
    //     // { name: 'test', options: {} }
    //     console.log(collInfos);
    // });

    }).catch(err=>{
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
        setTimeout(connectWithRetry, 5000)
    })
};

// const getListOfCollection = ()=>
// {
//     mongoose.listCollections().toArray(function(err, collInfos) {
//         // collInfos is an array of collection info objects that look like:
//         // { name: 'test', options: {} }
//         console.log(collInfos.collection);
//     });
// }
connectWithRetry();

exports.mongoose = mongoose;