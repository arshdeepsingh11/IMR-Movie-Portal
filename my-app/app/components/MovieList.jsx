'use client'

import { useState, useEffect, useRef } from 'react';
import MovieForm from './MovieForm';

/**
 * MovieList Component
 * 
 * Description:
 * - Manages a list of movies with the ability to add, update, and delete movies.
 * - Fetches movie data from an API when the component is mounted.
 * - Uses a reference to scroll to the movie form when editing.
 * 
 * State:
 * - movies: Stores the list of movies.
 * - editingMovie: Stores the movie being edited.
 * - formRef: A reference to the form element for smooth scrolling.
 */
const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null); // Track movie being edited
  const formRef = useRef(null); // Reference to the form

  /**
   * Fetch movies from API when the component is mounted.
   */
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await fetch("/api");
    if (response.ok) {
      const data = await response.json();
      setMovies(data);
    }
  };

  /**
   * Handle adding a movie to the list.
   * @param {Object} movieData - The movie details.
   */
  const handleAddMovie = async (movieData) => {
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    });

    if (res.ok) {
      const newMovie = await res.json();
      setMovies((prevMovies) => [...prevMovies, newMovie]);
    } else {
      console.error("Failed to add movie");
    }
  };

  /**
   * Handle updating an existing movie.
   * @param {Object} updatedMovieData - The updated movie details.
   */
  const handleUpdateMovie = async (updatedMovieData) => {
    const res = await fetch("/api", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingMovie._id,
        ...updatedMovieData,
      }),
    });

    if (res.ok) {
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie._id === editingMovie._id ? { ...movie, ...updatedMovieData } : movie
        )
      );
      setEditingMovie(null); // Clear editing state after update
    } else {
      console.error("Failed to update movie");
    }
  };

  /**
   * Handle deleting a movie from the list.
   * @param {string} id - The ID of the movie to delete.
   */
  const handleDeleteMovie = async (id) => {
    const res = await fetch("/api", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
    } else {
      console.error("Failed to delete movie");
    }
  };

  /**
   * Handle initiating the edit process for a movie.
   * @param {Object} movie - The movie to edit.
   */
  const handleEditClick = (movie) => {
    setEditingMovie(movie);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Smooth scrolling
    }
  };

  /**
   * Handle canceling the edit process.
   */
  const handleCancelEdit = () => {
    setEditingMovie(null); // Reset editing state on cancel
  };

  return (
    <div>
      {/* Pass the ref to the MovieForm */}
      <MovieForm
        onSubmit={editingMovie ? handleUpdateMovie : handleAddMovie}
        movie={editingMovie}
        onCancel={handleCancelEdit} // Pass the cancel handler to MovieForm
        formRef={formRef} // Provide formRef to scroll to it when editing
      />

      <h2 className="text-xl font-semibold pt-10 pb-5">Movies List</h2>
      <ul className="space-y-4">
        {movies.map((movie) => (
          <li key={movie._id} className="border p-4 rounded-md">
            <h3 className="text-lg font-bold">{movie.title}</h3>
            <p>Actors: {movie.actors.join(", ")}</p>
            <p>Release Year: {movie.releaseYear}</p>

            {/* Edit and Delete Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                className="text-blue-500"
                onClick={() => handleEditClick(movie)} // Scroll to form and edit movie
              >
                Edit
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDeleteMovie(movie._id)} // Delete movie
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
