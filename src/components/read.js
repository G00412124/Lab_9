import Movies from "./movies"; // Import the Movies component
import { useEffect, useState } from "react"; // Import the useEffect and useState hooks from react
import axios from "axios"; // Import axios

const Read = () => {

  const [movies, setMovies] = useState([]); // Create a movies state variable

  useEffect(() => { // Use an effect hook to make a get request to the movies endpoint
    
    axios.get('http://localhost:4000/api/movies') // Make a get request to the movies endpoint
      .then((response) => {
        console.log(response.data);   
        setMovies(response.data.movies); // Set the movies state to the movies array from the response
      })
      .catch((error) => { // Log any errors to the console
        console.log(error); 
      });
  });

  return (
    <div>
      <h3>Hello from read component!</h3>   
      <Movies myMovies={movies} /> 
    </div>
  );
}

export default Read; // Export the Read component