const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = mongoose.ObjectID;
const user = new Schema({
       name: String,
       age: Number,
       email: String,
       occupation: String 
})

const Todo = new Schema({
    task: String,
    task_status: Boolean,
    userId :ObjectID
})