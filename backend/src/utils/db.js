const mongoose = require('mongoose');
async function Connect(){
    await mongoose.connect('mongodb://127.0.0.1:27017/graceful', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
}

module.exports = {Connect}