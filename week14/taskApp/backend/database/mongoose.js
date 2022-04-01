const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://hbowlby1:0oPd459Op7ewOxAm@udemycourse.mz8gq.mongodb.net/tasks', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Connected"))
.catch((error) => console.log(error));

module.exports = mongoose;