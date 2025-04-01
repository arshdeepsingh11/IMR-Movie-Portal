'use client'

import { useState, useEffect } from 'react'; 
import Button from './Button';

/**
 * MovieForm Component
 * 
 * This component provides a form for adding or editing a movie.
 * 
 * Inputs:
 * - title: The movie's title (string)
 * - actors: A comma-separated list of actor names (string)
 * - releaseYear: The year the movie was released (number)
 * 
 * Processing:
 * - If a movie object is provided, it populates the form fields for editing.
 * - Handles form submission by collecting input values and passing them to the parent component.
 * - Clears input fields after submission.
 * 
 * Output:
 * - Calls the onSubmit function with the movie details.
 * - Calls onCancel when editing is canceled (if applicable).
 */


const MovieForm = ({ onSubmit, movie = null, onCancel, formRef }) => {
  // State for form inputs
  const [title, setTitle] = useState("");
  const [actors, setActors] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  /**
   * Effect to populate form fields when editing an existing movie.
   * Runs whenever the `movie` prop changes.
   */
  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setActors(movie.actors.join(", "));
      setReleaseYear(movie.releaseYear);
    } else {
      setTitle("");
      setActors("");
      setReleaseYear("");
    }
  }, [movie]);

  /**
   * Handles form submission.
   * - Prevents default form submission behavior.
   * - Converts the actors string into an array.
   * - Calls `onSubmit` with the movie details.
   * - Clears input fields after submission.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const movieData = {
      title,
      actors: actors.split(",").map((actor) => actor.trim()),
      releaseYear,
    };
    onSubmit(movieData);
    setTitle("");
    setActors("");
    setReleaseYear("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-4xl mx-auto"
      ref={formRef} // Reference for scrolling to the form
    >
      {/* Input field for movie title */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-4 border rounded-md"
      />
      
      {/* Input field for actors (comma-separated) */}
      <input
        type="text"
        placeholder="Actors (comma separated)"
        value={actors}
        onChange={(e) => setActors(e.target.value)}
        required
        className="w-full p-4 border rounded-md"
      />
      
      {/* Input field for release year */}
      <input
        type="number"
        placeholder="Release Year"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
        required
        className="w-full p-4 border rounded-md"
      />
      
      {/* Submit button for adding/updating a movie */}
      <Button
        type="submit"
        text={movie ? "Update Movie" : "Add Movie"}
        className="w-full py-3 bg-blue-500 text-white rounded-md"
      />
      
      {/* Cancel button (only visible when editing a movie) */}
      {movie && (
        <Button
          type="button"
          text="Cancel"
          onClick={onCancel}
          className="w-full py-3 bg-red-500 text-white rounded-md"
        />
      )}
    </form>
  );
};

export default MovieForm;
