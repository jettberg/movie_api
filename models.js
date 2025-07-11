const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


let movieSchema = mongoose.Schema({
    title: { type: String, required: true },

    year: { type: Number, required: true },

    genre: [String],

    director: { type: String, required: true },

    cast: [String],

    runtime: { type: Number, required: true },

    rating: { type: Number, required: true },

    imagePath: String,
    featured: Boolean
});


let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}],

    isAdmin: { type: Boolean, default: false}
});
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
};

let Movie = mongoose.model('Movie', movieSchema, 'movies');
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