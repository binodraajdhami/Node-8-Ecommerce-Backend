var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({

});

var StudentModel = mongoose.model('student', studentSchema);
module.exports = StudentModel;