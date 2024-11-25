import { useEffect } from "react";
import Card from 'react-bootstrap/Card'; // Import the Card component
import { Link } from 'react-router-dom';  
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './movieitem.css'; // Import custom CSS file

const MovieItem = (props) => { // Change this line to a function component
 
  const handleDelete = (e) => { // Add this function to handle the delete button click
    e.preventDefault(); // Prevent the default form behavior
    console.log('Delete clicked'); // Log a message to the console

    axios.delete('http://localhost:4000/api/movies/' + props.mymovie._id) // Send a DELETE request
      .then((res) => { console.log(res.data) }) // Log the response
      .catch(); // Catch any errors
  } // Close the handleDelete function
 
  useEffect(() => { // Add this effect to log the movie item
    console.log("Movie Item:", props.mymovie); // Log the movie item
  }, [props.mymovie]); // Add props.mymovie to the dependency array

  return ( // Update the JSX to include the delete button
    <div className="movie-item">
      <Card className="movie-card">   
        <Card.Header className="movie-title">{props.mymovie.title}</Card.Header> 
        <Card.Body> 
          <blockquote className="blockquote mb-0">
            <img src={props.mymovie.poster} alt={props.mymovie.title} className="movie-poster" />  
            <footer className="movie-year">{props.mymovie.year}</footer>
          </blockquote>
        </Card.Body>
        <div className="movie-actions">
          <Link to={"/edit/" + props.mymovie._id} className="btn btn-primary movie-edit-btn">Edit</Link>
          <Button className="btn btn-danger movie-delete-btn" onClick={handleDelete}>Delete</Button> 
        </div> 
      </Card>
    </div>
  );
}

export default MovieItem; // Export the MovieItem component