const express = require('express');
const app = express();
const port = 4000; // Port 4000 is a common choice for local development

// CORS Middleware
const cors = require('cors'); // Cross-Origin Resource Sharing
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Add methods you need
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Add headers you need
  next();
});

// Body parser middleware 
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json());

// MongoDB Connection
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@matthewservices.7cywq.mongodb.net/yourDatabaseName') // Replace with your connection string
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err)); // Log any errors

// Movie Schema & Model
const movieSchema = new mongoose.Schema({ // Define a movie schema
  title: String,
  year: String, // Change to Number if you want to sort by year
  poster: String
});

const movieModel = mongoose.model('myMovies', movieSchema); // Create a movie model

// GET All Movies 
app.get('/api/movies', async (req, res) => { // Define a route to get all movies
  try {
    const movies = await movieModel.find({}); // Fetch all movies from the database
    res.status(200).json({ movies }); // Respond with the movies in JSON
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' }); // Handle server errors
  }
});

// POST a new Movie
app.post('/api/movies', (req, res) => { // Define a route to add a new movie
  console.log(req.body); // Log request body for debugging
  const { title, year, poster } = req.body;

  const newMovie = new movieModel({ title, year, poster }); // Create a new movie document
  newMovie.save()
    .then(() => res.status(201).send('Movie Added!')) // Respond with a message if successful
    .catch((error) => {
      console.error('Error adding movie:', error); // Log any errors
      res.status(500).send('Failed to add movie'); // Respond with an error message
    });
});

// GET Movie by ID
app.get('/api/movie/:id', async (req, res) => { // Define a route to get a movie by ID
  try {
    const movie = await movieModel.findById(req.params.id); // Fetch a movie by ID
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' }); // Respond with an error if movie not found
    }
    res.status(200).json(movie); // Respond with the movie in JSON
  } catch (error) { // Handle server errors
    res.status(500).json({ error: 'Failed to fetch movie' }); // Respond with an error message
  }
});

// PUT (Update) Movie by ID
app.put('/api/movies/:id', async (req, res) => { // Define a route to update a movie by ID
  try {
    const { title, year, poster } = req.body; // Destructure title, year, and poster from the request body

    const updatedMovie = await movieModel.findByIdAndUpdate( // Find a movie by ID and update it
      req.params.id,
      { title, year, poster }, // Update the title, year, and poster
      { new: true }
    );

    if (!updatedMovie) { // Handle case where movie is not found
      return res.status(404).json({ error: 'Movie not found' }); // Respond with an error if movie not found
    }

    res.status(200).json(updatedMovie);
  } catch (error) { // Handle server errors
    console.error('Error updating movie:', error); // Log any errors
    res.status(500).json({ error: 'Failed to update movie' }) ;   
  }
});

// DELETE Movie by ID
app.delete('/api/movies/:id', async (req, res) => {
  try {
    const deletedMovie = await movieModel.findByIdAndDelete(req.params.id); // Find a movie by ID and delete it
    if (!deletedMovie) {
      return res.status(404).json({ error: 'Movie not found' }); // Respond with an error if movie not found
    }
    res.status(200).json({ message: 'Movie deleted successfully' }); // Respond with a message if successful
  } catch (error) { // Handle server
    console.error('Error deleting movie:', error); // Log any errors
    res.status(500).json({ error: 'Failed to delete movie' }); // Respond with an error message
  }
});

// Start server
app.listen(port, () => { // Listen on port 4000
  console.log(`Server is running on http://localhost:${port}`); // Log a message to the console
});
