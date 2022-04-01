const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

// models
const List = require('./database/models/list');
const Task = require('./database/models/task');
app.use(express.json());

//adding CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//start of CRUD for lists
//get all list
app.get('/lists', (req, res) => {
    List.find({})
        .then(lists => res.send(lists))
        .catch((error) => {
            console.log(error);
        })
});
// create a list
app.post('/', (req, res) => {
    (new List({ 'title': req.body.title }))
        .save()
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
});
// find one list
app.get('/lists/:listId', (req, res) => {
    List.find({ _id: req.params.listId })
        .then((list) => res.send(list))
        .catch((error) => console.log(error))
});

//update one list
app.patch('/lists/:listId', (req, res) => {
    List.findByIdAndUpdate({ '_id': req.params.listId }, { $set: req.body })
        .then((list) => res.send(list))
        .catch((error) => console.log(error))
});

//delete a list
app.delete('/lists/:listId', (req, res) => {
    //delete all tasks if the list is deleted
    const deleteTasks = (lists) => {
        Task.deleteMany({ _listId: list._id })
            .then(() => list)
            .catch((error) => console.log(error));
    }
    const list = List.findByIdAndDelete(req.params.listId)
        .then((list) => deleteTasks(list))
        .catch((error) => console.log(error))
    res.status(200).send(list);
});

//start of crud for tasks
//get list of task
app.get('/lists/:listId/tasks', (req, res) => {
    Task.find({ _listId: req.params.listId })
        .then((tasks) => res.send(list))
        .catch((error) => console.log(error))
});

//create a task
app.post('/lists/:listId/tasks', (req, res) => {
    (new Task({ '_listId': req.params.listId, 'title': req.body.title }))
        .save()
        .then((task) => res.send(task))
        .catch((error) => console.log(error))
});
//get one task
app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOne({ _listId: req.params.listId, _id: req.params.taskId })
        .then((task) => res.send(list))
        .catch((error) => console.log(error))
});
//update one task
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({ _listId: req.params.listId, _id: req.params.taskId }, { $set: req.body })
        .then((task) => res.send(list))
        .catch((error) => console.log(error))
});
// delete one task
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndDelete({ _listId: req.params.listId, _id: req.params.taskId })
        .then((task) => res.send(list))
        .catch((error) => console.log(error))
});

app.listen(3000, () => console.log("Server connected on port 3000"));