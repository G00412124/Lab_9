import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Edit() {
  const { id } = useParams();  // Get the movie ID from the URL
  const [title, setTitle] = useState("");  // State for movie title
  const [year, setYear] = useState("");  // State for movie year
  const [poster, setPoster] = useState("");  // State for movie poster URL
  const navigate = useNavigate();  // Hook to navigate after successful update

  // Fetch the movie data when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:4000/api/movie/${id}`)
      .then((response) => {
        setTitle(response.data.title);  // Set the title
        setYear(response.data.year);    // Set the year
        setPoster(response.data.poster);  // Set the poster URL
      })
      .catch((error) => {
        console.log('Error fetching movie:', error);
      });
  }, [id]);  // Dependency array ensures this only runs when the movie ID changes

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();  // Prevent default form submission behavior

    // Create an object with the updated movie data
    const updatedMovie = { title, year, poster };

    // Send PUT request to update the movie
    axios.put(`http://localhost:4000/api/movies/${id}`, updatedMovie)
      .then((response) => {
        console.log('Movie updated:', response.data);  // Log the updated movie
        navigate('/read');  // Redirect to the read page (or any page you'd like)
      })
      .catch((error) => {
        console.error('Error updating movie:', error);  // Handle any errors
      });
  };

  return (
    <div>
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Edit Movie Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}  // Update state on change
          />
        </div>
        <div className="form-group">
          <label>Edit Release Year:</label>
          <input
            type="text"
            className="form-control"
            value={year}
            onChange={(e) => setYear(e.target.value)}  // Update state on change
          />
        </div>
        <div className="form-group">
          <label>Edit Poster URL:</label>
          <input
            type="text"
            className="form-control"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}  // Update state on change
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Edit Movie"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
