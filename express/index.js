const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');



app.use(morgan('dev'));

app.get('/movies', (req, res) => {
    const favMovies = [
        { title: 'Inception', director: 'Christopher Nolan' },
        { title: 'The Lord of the Rings: The Fellowship of the Ring (2001) ', director: 'Peter Jackson' },
        { title: 'The Lord of the Rings: The Two Towers (2002)', director: 'Peter Jackson' },
        { title: 'The Lord of the Rings: The Return of the King', director: 'Peter Jackson' },
        { title: 'The Hobbit: An Unexpected Journey (2012)', director: 'Peter Jackson' },
        { title: 'The Hobbit: The Desolation of Smaug (2013)', director: 'Peter Jackson' },
        { title: 'The Hobbit: The Battle of the Five Armies (2014)', director: 'Peter Jackson' },
        { title: 'Spaceman', director: 'Johan Renck' },
        { title: 'The Martian', director: 'Ridley Scott' },
        { title: 'Shutter Island', director: 'Martin Scorsese' },
    ];

    res.json(favMovies);
});

app.get('/', (req, res) => {
    res.send('Welcome to my movie collection! I didnt put in a ton of thought, but I really like these 10 movies!');
});
app.get('/movies', (req, res) => {
    res.json(favMovies);
});
app.get('/documentation', (req, res) => {
    res.sendFile('documentation.html', { root: __dirname + '/public' });
  });




app.use(express.static('public'));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oops! Something went wrong!');
  });






app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});