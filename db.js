const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId; 
//schema - what will be the structure of our databse

const user = new Schema({
       name: String,
       age: Number,
       email: String,
       password: String,
       occupation: String 
})

const Todo = new Schema({
    task: String,
    task_status: Boolean,
    userId: ObjectId
    
})

const UserModel = mongoose.model("users", user);
const TodoModel= mongoose.model("todos",Todo);

module.exports= {
    UserModel,
    TodoModel
}