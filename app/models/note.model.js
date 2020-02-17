const mongoose = require('../../common/services/mongoos.service').mongoose;
const Schema = mongoose.Schema;
const fs = require('fs');
const fileUrl = new URL('file:///tmp/hello.ts');
var util = require('util');
const NoteSchema = new Schema({
    title: String,
    content: String,
    CreatedBy:String
});

// const NoteSchema = new Schema(
//     { title: [Function: String], content: [Function: String] }
// );

NoteSchema.virtual('id').get(function () {
    return this._id.toHexString();
});



// Ensure virtual fields are serialised.
NoteSchema.set('toJSON', {
    virtuals: true
});

NoteSchema.findById = function (cb) {
    return this.model('Note').find({ id: this.id }, cb);
};

const Note = mongoose.model('Note', NoteSchema);

exports.findByTitle = (title) => {
    return Note.find({ title: title }, title);
};

exports.createNote = (noteData) => {
    const note = new Note(noteData);
    //mongoose.listCollections().toArray(function (err, collInfos) {
        // collInfos is an array of collection info objects that look like:
        // { name: 'test', options: {} }
    //   console.log(mongoose.modelSchemas);
    // console.log('statring model schema ----');    
    //   //console.log(mongoose.models);
    // // 
    //  console.log(mongoose.modelSchemas['Note'].obj);
    //  console.log('end model schema ----'); 
    console.log('statring model name ----');  
      console.log(Object.keys(mongoose.modelSchemas));
      console.log('end model name ----');  
      //var collectionNames= Object.keys(mongoose.modelSchemas);
      var collectionNames= Object.keys(mongoose.modelSchemas);
      
      for (i = 0; i < collectionNames.length ; i++) {
          console.log('start ' +collectionNames[i] +' schema')
        console.log(mongoose.modelSchemas[collectionNames[i]].obj);
        console.log(Object.getOwnPropertyNames( mongoose.modelSchemas[collectionNames[i]].obj));
        console.log(JSON.stringify(mongoose.modelSchemas[collectionNames[i]].obj))
        console.log('end ' +collectionNames[i] +' schema')
      }
   // });
    return note.save();
};

exports.list = (perPage, page) => {
    //mongoose.listCollections().toArray(function(err, collInfos) {
    // collInfos is an array of collection info objects that look like:
    // { name: 'test', options: {} }

    //});
    console.log('statring model name ----');  
      console.log(Object.keys(mongoose.modelSchemas));
      console.log('end model name ----');  
      //var collectionNames= Object.keys(mongoose.modelSchemas);
      var collectionNames= Object.keys(mongoose.modelSchemas);
     
      for (i = 0; i < collectionNames.length ; i++) {
           var createStream = fs.createWriteStream(collectionNames[i]+".ts");
           //var data = JSON.stringify(mongoose.modelSchemas[collectionNames[i]].paths)
        //    mongoose.modelSchemas.find().lean().exec(function (err, obj1){
        //        JSON,stringify(obj1);
        //    })
           //console.log(data)
          // createStream.write(mongoose.modelSchemas[collectionNames[i]].obj);
           createStream.end();
          console.log('start ' +collectionNames[i] +' schema')
        // console.log(mongoose.modelSchemas[collectionNames[i]].obj);
        // console.log(Object.getOwnPropertyNames( mongoose.modelSchemas[collectionNames[i]].obj));
        // console.log(mongoose.modelSchemas[collectionNames[i]].paths)
         console.log(Object.keys(mongoose.modelSchemas[collectionNames[i]].paths))
         var path = mongoose.modelSchemas[collectionNames[i]].paths['firstName']
         console.log( JSON.stringify(path))
         //console.log(JSON.parse(path))
         //console.log(Object.keys( mongoose.modelSchemas[collectionNames[i]].paths['firstName']))
        //console.log( mongoose.modelSchemas[collectionNames[i]].paths)
        // console.log( JSON.stringify( mongoose.modelSchemas[collectionNames[i]]))
        // console.log( JSON.stringify( mongoose.modelSchemas))
        console.log('end ' +collectionNames[i] +' schema')
      }
    return new Promise((resolve, reject) => {
        Note.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.patchNote = (id, noteData) => {
    return new Promise((resolve, reject) => {
        Note.findById(id, function (err, note) {
            if (err) reject(err);
            for (let i in noteData) {
                note[i] = noteData[i];
            }
            note.save(function (err, updatedNote) {
                if (err) return reject(err);
                resolve(updatedNote);
            });
        });
    })

};
exports.Schema = ()=>{
    return mongoose.modelSchemas;
}
// exports.removeById = (noteId) => {
//     return new Promise((resolve, reject) => {
//         Note.remove({_id: noteId}, (err) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(err);
//             }
//         });
//     });
// };

//module.exports = mongoose.model('Note', NoteSchema);