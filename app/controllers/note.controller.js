const noteModel = require('../models/note.model');
const crypto = require('crypto');
const mongoose = require('../../common/services/mongoos.service').mongoose;
// Create and Save a new Note
exports.insert = (req, res) => {
    // let salt = crypto.randomBytes(16).toString('base64');
    // let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
   
    noteModel.createNote(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};
exports.insertCity = (req, res) => {
    // let salt = crypto.randomBytes(16).toString('base64');
    // let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
   
    noteModel.createCity(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

// exports.create = (req, res) => {
//     // Validate request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "Note content can not be empty"
//         });
//     }

//     // Create a Note
//     const note = new Note({
//         title: req.body.title || "Untitled Note", 
//         content: req.body.content
//     });

//     // Save Note in the database
//     note.save()
//     .then(data => {
//         res.send(data);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while creating the Note."
//         });
//     });
// };

// Retrieve and return all notes from the database.
exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    noteModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.collections= (req, res)=>{
    noteModel.list().then((result)=>{
        res.status(200).send(result);
        //console.log(result);
    })
};

exports.schema= (res)=>{
    
        noteModel.Schema().then((result)=>{
            res.status(200).send(result)
        })
        //console.log(result);
    
};
// exports.findAll = (req, res) => {
//     Note.find()
//     .then(notes => {
//         res.send(notes);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving notes."
//         });
//     });
// };

// Find a single note with a noteId
exports.getByTitle = (req, res) => {
    noteModel.findByTitle(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};
// exports.findOne = (req, res) => {
//     Note.findById(req.params.noteId)
//     .then(note => {
//         if(!note) {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.noteId
//             });            
//         }
//         res.send(note);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.noteId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error retrieving note with id " + req.params.noteId
//         });
//     });
// };

// Update a note identified by the noteId in the request
// exports.patchById = (req, res) => {
//     noteModel.patchNote(req.params.userId, req.body)
//         .then((result) => {
//             res.status(204).send({});
//         });

// };
// exports.update = (req, res) => {
//     // Validate Request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "Note content can not be empty"
//         });
//     }

    // Find note and update it with the request body
//     Note.findByIdAndUpdate(req.params.noteId, {
//         title: req.body.title || "Untitled Note",
//         content: req.body.content
//     }, {new: true})
//     .then(note => {
//         if(!note) {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.noteId
//             });
//         }
//         res.send(note);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.noteId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error updating note with id " + req.params.noteId
//         });
//     });
// //};

// Delete a note with the specified noteId in the request
// exports.delete = (req, res) => {
//     Note.findByIdAndRemove(req.params.noteId)
//     .then(note => {
//         if(!note) {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.noteId
//             });
//         }
//         res.send({message: "Note deleted successfully!"});
//     }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.noteId
//             });                
//         }
//         return res.status(500).send({
//             message: "Could not delete note with id " + req.params.noteId
//         });
//     });
// };