var mongoose = require('mongoose');
//mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://teamhasnoname:popo1234@ds161008.mlab.com:61008/csci5117test1');

var movieSchema = new mongoose.Schema({
    name: String,
    description: String,
    rating: Number,
    actors: [String],
    release: Date
});

mongoose.model('Movie', movieSchema);
