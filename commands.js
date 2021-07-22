const mongo = require('mongoose');

let cmdSchema = new mongo.Schema({
    name: String,
    title: String,
    type: String,
    reply: String
})

module.exports = mongo.model('cmds', cmdSchema);