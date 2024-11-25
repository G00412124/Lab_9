import MovieItem from "./movieitem"; // Import the MovieItem component



const Movies = (props)=>{ // Define a functional component called Movies that takes a prop called myMovies
    return props.myMovies.map( // Map over the myMovies prop
        (movie)=>{ // For each movie in the myMovies prop
            return <MovieItem mymovie={movie} key={movie._id} /> // Pass the movie object as a prop to the MovieItem component
        }
    );
}




export default Movies;