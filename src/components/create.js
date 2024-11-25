import axios from "axios"; // Import axios
import { useState } from "react"; // Import the useState hook from react

const Create = () => {

    const [title, setTitle] = useState(''); // Create a title state variable
    const [year, setYear] = useState(''); // Create a year state variable
    const [poster, setPoster] = useState(''); // Create a poster state variable

    const handleSubmit = (e) => { // Create a function called handleSubmit that takes an event as an argument
        e.preventDefault(); // Prevent the default form submission behavior
        const movie = {title,year,poster}; // Create a movie object with the title, year, and poster
        console.log(movie);     
 
        axios.post('http://localhost:4000/api/movies',movie)     // Make a post request to the movies endpoint with the movie object
        .then((res)=>{console.log(res.data)}) // Log the response data to the console
        .catch(); // Log any errors to the console
    } 

    return ( // Return a form with input fields for the title, year, and poster
        <div>
            <h3>Hello from create component!</h3> 
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Add Movie Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Movie Year: </label>
                    <input type="text"
                        className="form-control"
                        value={year}
                        onChange={(e) => { setYear(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Movie Poster: </label>
                    <input type="text"
                        className="form-control"
                        value={poster}
                        onChange={(e) => { setPoster(e.target.value) }}
                    />
                </div>
                <div>
                    <input type="submit" value="Add Movie"></input> 
                </div>
            </form>
        </div>
    );
}
export default Create; // Export the Create component