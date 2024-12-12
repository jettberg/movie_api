const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

//to start up nodemon the command is: ./node_modules/.bin/nodemon index.js

app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('dev'));
    let users = [
      {
        id:1,
        name: "Kim",
        favoriteMovies: []
      },
      {
        id:2, 
        name: "Joe",
        favoriteMovies: ["Inception"]
      },

    ];
    const movies = [
      {
        "Title": "Inception",
        "Description": "A skilled thief who steals corporate secrets through the use of dream-sharing technology is given the chance to have his criminal record erased if he can successfully perform an inception.",
        "Genre": {
          "Name": "Science Fiction, Action, Thriller",
          "Description": "In film and television, Science Fiction is a genre that uses speculative, futuristic, or imaginative concepts to explore possible futures, other worlds, or advanced technology."
        },
        "Director": {
          "Name": "Christopher Nolan",
          "Bio": "Christopher Nolan is a British-American filmmaker known for his complex narratives and visual storytelling. He has directed iconic films like The Dark Knight trilogy and Inception.",
          "Birth": "July 30, 1970"
        },
        "Featured": false
      },
      {
        "Title": "The Lord of the Rings: The Fellowship of the Ring",
        "Description": "A young hobbit, Frodo Baggins, is tasked with the responsibility of destroying the powerful One Ring in the fires of Mount Doom, accompanied by a group of companions.",
        "Genre": {
          "Name": "Fantasy, Adventure",
          "Description": "Fantasy is a genre of speculative fiction involving magical elements, mythical creatures, and supernatural occurrences, while Adventure stories focus on the pursuit of exciting and often dangerous quests."
        },
        "Director": {
          "Name": "Peter Jackson",
          "Bio": "Peter Jackson is a New Zealand filmmaker best known for directing The Lord of the Rings trilogy and The Hobbit series, both adapted from J.R.R. Tolkien's novels.",
          "Birth": "October 31, 1961"
        },
        "Featured": true
      },
      {
        "Title": "The Lord of the Rings: The Two Towers",
        "Description": "Frodo and Sam continue their perilous journey to Mount Doom, while the remaining members of the Fellowship prepare for war against the forces of Sauron.",
        "Genre": {
          "Name": "Fantasy, Adventure",
          "Description": "Fantasy is a genre of speculative fiction involving magical elements, mythical creatures, and supernatural occurrences, while Adventure stories focus on the pursuit of exciting and often dangerous quests."
        },
        "Director": {
          "Name": "Peter Jackson",
          "Bio": "Peter Jackson is a New Zealand filmmaker best known for directing The Lord of the Rings trilogy and The Hobbit series, both adapted from J.R.R. Tolkien's novels.",
          "Birth": "October 31, 1961"
        },
        "Featured": true
      },
      {
        "Title": "The Lord of the Rings: The Return of the King",
        "Description": "The final battle to destroy the One Ring takes place as Frodo struggles to reach Mount Doom while the armies of Middle-Earth fight to hold off Sauron's forces.",
        "Genre": {
          "Name": "Fantasy, Adventure",
          "Description": "Fantasy is a genre of speculative fiction involving magical elements, mythical creatures, and supernatural occurrences, while Adventure stories focus on the pursuit of exciting and often dangerous quests."
        },
        "Director": {
          "Name": "Peter Jackson",
          "Bio": "Peter Jackson is a New Zealand filmmaker best known for directing The Lord of the Rings trilogy and The Hobbit series, both adapted from J.R.R. Tolkien's novels.",
          "Birth": "October 31, 1961"
        },
        "Featured": true
      },
      {
        "Title": "The Hobbit: An Unexpected Journey",
        "Description": "Bilbo Baggins, a hobbit, embarks on a journey with a group of dwarves to reclaim a stolen treasure from the dragon Smaug.",
        "Genre": {
          "Name": "Fantasy, Adventure",
          "Description": "Fantasy is a genre of speculative fiction involving magical elements, mythical creatures, and supernatural occurrences, while Adventure stories focus on the pursuit of exciting and often dangerous quests."
        },
        "Director": {
          "Name": "Peter Jackson",
          "Bio": "Peter Jackson is a New Zealand filmmaker best known for directing The Lord of the Rings trilogy and The Hobbit series, both adapted from J.R.R. Tolkien's novels.",
          "Birth": "October 31, 1961"
        },
        "Featured": false
      },
      {
        "Title": "The Hobbit: The Desolation of Smaug",
        "Description": "Bilbo Baggins and the dwarves continue their journey to reclaim the treasure of the Lonely Mountain, encountering danger and the dragon Smaug.",
        "Genre": {
          "Name": "Fantasy",
          "Description": "Fantasy is a genre of speculative fiction involving magical elements, mythical creatures, and supernatural occurrences, while Adventure stories focus on the pursuit of exciting and often dangerous quests."
        },
        "Director": {
          "Name": "Peter Jackson",
          "Bio": "Peter Jackson is a New Zealand filmmaker best known for directing The Lord of the Rings trilogy and The Hobbit series, both adapted from J.R.R. Tolkien's novels.",
          "Birth": "October 31, 1961"
        },
        "Featured": false
      },
      {
        "Title": "The Hobbit: The Battle of the Five Armies",
        "Description": "The final chapter of the Hobbit trilogy, where Bilbo Baggins and his companions must face the repercussions of their actions as the forces of good and evil converge for the Battle of the Five Armies.",
        "Genre": {
          "Name": "Fantasy, Adventure",
          "Description": "Fantasy is a genre of speculative fiction involving magical elements, mythical creatures, and supernatural occurrences, while Adventure stories focus on the pursuit of exciting and often dangerous quests."
        },
        "Director": {
          "Name": "Peter Jackson",
          "Bio": "Peter Jackson is a New Zealand filmmaker best known for directing The Lord of the Rings trilogy and The Hobbit series, both adapted from J.R.R. Tolkien's novels.",
          "Birth": "October 31, 1961"
        },
        "Featured": false
      },
      {
        "Title": "Spaceman",
        "Description": "A space explorer must navigate life in an isolated mission on a distant planet, facing both external dangers and his internal battles. Adam Sandler plays a comedic yet emotional lead role.",
        "Genre": {
          "Name": "Comedy, Sci-Fi, Drama",
          "Description": "Comedy is a genre of film designed to entertain and make the audience laugh, Sci-Fi involves speculative futuristic concepts, and Drama explores emotional themes with a focus on character development."
        },
        "Director": {
          "Name": "Jonah Hill",
          "Bio": "Jonah Hill is an American actor, director, producer, and writer, known for his roles in films like Superbad, 21 Jump Street, and his directorial debut, Mid90s.",
          "Birth": "December 20, 1983"
        },
        "Featured": false
      },
      {
        "Title": "The Martian",
        "Description": "Astronaut Mark Watney becomes stranded on Mars and must figure out how to survive while awaiting rescue. A gripping survival story of ingenuity and hope.",
        "Genre": {
          "Name": "Science Fiction, Drama",
          "Description": "Science Fiction involves imaginative future scenarios often dealing with advanced technologies or alien life, while Drama focuses on realistic storytelling and emotional conflict."
        },
        "Director": {
          "Name": "Ridley Scott",
          "Bio": "Ridley Scott is an English director, producer, and screenwriter, known for his work on films such as Alien, Gladiator, and The Martian.",
          "Birth": "November 30, 1937"
        },
        "Featured": false
      },
      {
        "Title": "Shutter Island",
        "Description": "A U.S. Marshal investigates the disappearance of a patient from a mental hospital located on an isolated island, only to uncover disturbing truths about the island's secrets.",
        "Genre": {
          "Name": "Mystery, Thriller",
          "Description": "Mystery is a genre involving a crime or puzzle to be solved, and Thriller is focused on intense excitement and suspense, often with psychological elements."
        },
        "Director": {
          "Name": "Martin Scorsese",
          "Bio": "Martin Scorsese is an American film director, producer, screenwriter, and actor, widely regarded as one of the greatest directors in the history of cinema.",
          "Birth": "November 17, 1942"
        },
        "Featured": false
      }
    ];
    
    


app.get('/', (req, res) => {
    res.status(200).send('Welcome to my movie collection!');
});
app.get('/documentation', (req, res) => {
    res.status(200).sendFile('documentation.html', { root: __dirname + '/public' });
  });




//READ commands
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.filter(movie => movie.title.toLowerCase() === title.toLowerCase());

    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(400).send('no such movie')
    }
});
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find(movie => movie.Genre.Name.toLowerCase() === genreName.toLowerCase()).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('no such genre')
  }
});
app.get('/movies/director/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(movie => movie.Director.Name.toLowerCase() === directorName.toLowerCase()).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('no such director')
  }
});




//CREATE commands
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send('We need a name!')
  }
});




//UPDATE commands
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  let user = users.find( user => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('user not found')
  }
});
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to ${id}'s array`);
  } else {
    res.status(400).send('user not found')
  }
});




//DELETE commands
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from ${id}'s array`);
  } else {
    res.status(400).send('user not found')
  }
});
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find( user => user.id == id);

  if (user) {
    users = users.filter(user => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send('user not found')
  }
});






app.use(express.static('public'));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oops! Something went wrong!');
  });






app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});