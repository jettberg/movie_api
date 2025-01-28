const mongoose = require('mongoose');


let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String
    },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean
});

let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'
    }]
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

let genreSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Descritpion: {type: String, required: true}
});

let directorSchema= mongoose.Schema({
    Name: {type: String, required: true},
    Bio: {type: String, required: true},
    Birthday: Date
});

let Genre = mongoose.model('Genre', genreSchema);
let Director = mongoose.model('Director', directorSchema);


module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;