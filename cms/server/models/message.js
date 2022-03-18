const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    id: { type: String, required: true },
    subject: { type: String },
    msgText: { type: String, required: true },
    //sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}       
    sender: {type: mongoose.Schema.Types.String, ref: 'Contact'}
});

//checks if the message model exists and if it does use it
// https://stackoverflow.com/questions/45150075/cannot-overwrite-users-model-once-compiled-node-js
module.exports = mongoose.models.Message || mongoose.model('Message', messageSchema);