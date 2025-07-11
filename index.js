require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const cors = require('cors');
let allowedOrigins = ['http://localhost:1234', 'http://localhost:8080', 
  'https://movies-my-flix-application-7f3ae970a7e3.herokuapp.com/', 'https://myflixapibase.netlify.app',
 ];
const {check, validationResult} = require('express-validator');
const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;


mongoose.connect(process.env.CONNECTION_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

  app.use(cors());
//cant get the following code to run properly so i am still testing this out to get the wrinkles out
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
//       let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
//       return callback(new Error(message), false);
//     }
//     return callback(null, true);
//   }
// }));


app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('dev'));

require('./auth')(app);
const passport = require('passport');
require('./passport');


app.get('/', (req, res) => {
  res.status(200).send('Welcome to my myFlix!');
});
app.get('/documentation', (req, res) => {
  res.status(200).sendFile('documentation.html', { root: __dirname + '/public' });
});




//READ commands


//OLD:
// app.get('/movies', (req, res) => {
//   res.status(200).json(movies);
// });
app.get('/movies', passport.authenticate('jwt', {session: false}), async (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});


app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ title: req.params.title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) =>{
      console.error(err);
      res.status(500).send("Error " + err);
    });
});




app.get('/movies/genre/:genreName', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find(movie => movie.Genre.Name.toLowerCase() === genreName.toLowerCase()).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('no such genre')
  }
});
app.get('/movies/director/:directorName', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(movie => movie.Director.Name.toLowerCase() === directorName.toLowerCase()).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('no such director')
  }
});


app.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Getting a SINGLE user by their username:
app.get('/users/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});










//CREATE commands

app.post('/users', 
  
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
    check('Birthday', 'Birthday is required').not().isEmpty()
  ],

  async (req, res) => {
    console.log("POST /users route hit");
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array() });
    }

  let hashedPassword = Users.hashPassword(req.body.Password);

  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
            isAdmin: false,
          })
          .then((user) => { res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});





//UPDATE commands
app.put('/users/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  let user = users.find(user => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('user not found')
  }
});


app.put('/users/:Username', passport.authenticate('jwt', {session: false}), async (req, res) => {
  if(req.user.Username !== req.params.Username) {
    return res.status(400).send('Permission denied');
  }
  
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
    $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
    { new: true }) // This line makes sure that the updated doFcument is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    })

});



app.post('/directors', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { Name, Bio, Birthday } = req.body;

  try {
    const existingDirector = await Director.findOne({ Name });
    if (existingDirector) {
      return res.status(400).send('Director already exists');
    }

    const newDirector = new Director({
      Name,
      Bio,
      Birthday,
    });

    await newDirector.save();
    return res.status(201).json(newDirector);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});


// app.post('/login', async (req, res) => {
//   const { Username, Password } = req.body;

//   try {
//     // Find the user by username
//     const user = await Users.findOne({ Username });
//     if (!user) {
//       return res.status(401).send('Invalid credentials');
//     }

//     // Check if the password is correct (compare with hashed password in the DB)
//     const isMatch = await user.validatePassword(Password);
//     if (!isMatch) {
//       return res.status(401).send('Invalid credentials');
//     }

//     const token = generateJWTToken(user);

//     res.status(200).json({
//       token,
//       user: {
//         _id: user._id,
//         Username: user.Username,
//         Email: user.Email,
//         FavoriteMovies: user.FavoriteMovies,
//         isAdmin: user.isAdmin,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

//The following adds a specific movie to a users list of favorite movies:
app.post('/users/:username/movies/:movieId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MovieId }
  },
    { new: true })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error ' + err);
    });
});
// Remove movie from favorites
// app.delete('/users/:username/movies/:movieId', passport.authenticate('jwt', { session: false }), (req, res) => {
//   Users.findOneAndUpdate(
//     { Username: req.params.username },
//     { $pull: { FavoriteMovies: req.params.movieId } },
//     { new: true }
//   )
//     .then((updatedUser) => res.json(updatedUser))
//     .catch((err) => res.status(500).send(err));
// });
app.delete('/users/:username/movies/:movieId', passport.authenticate('jwt', { session: false }), (req, res) => {
  const movieObjectId = new mongoose.Types.ObjectId(req.params.movieId);

  Users.findOneAndUpdate(
    { Username: req.params.username },
    { $pull: { FavoriteMovies: movieObjectId } },
    { new: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) return res.status(404).send('User not found');
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// DELETE user by ID
app.delete('/users/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    users = users.filter(user => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send('user not found');
  }
});


app.put('/users/:id'), (req, res) => {
  const { username, email, birthday, password } = req.body;
  User.findByIdAndUpdate(req.params.id, { username, email, birthday, password })
      .then((updatedUser) => res.json(updatedUser))
      .catch((error) => res.status(500).json({ error: error.message }));
};

app.delete('/users/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "User deregistered successfully" }))
    .catch((error) => res.status(500).json({ error: error.message }));
});


//The following is used to delete a user by its username:
app.delete('/users/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndRemove({ Username: req.params.username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});






app.use(express.static('public'));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops! Something went wrong!');
});


const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
  console.log('Listening on port ' + port);
});