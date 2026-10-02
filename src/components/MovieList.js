import React from 'react';
import MovieItem from './MovieItem';
import { FaFilm } from 'react-icons/fa';

const MovieList = ({ movies = [], favorites = [], onToggleFavorite, onViewDetails }) => {
    if (!movies || movies.length === 0) {
        return (
            <div className="text-center py-5 my-3 border rounded-3 p-4 bg-body-tertiary">
                <div className="display-6 text-secondary mb-2">
                    <FaFilm />
                </div>
                <h5 className="fw-semibold">No movies found</h5>
                <p className="text-secondary small mb-0">Try changing your search keyword or selected genre.</p>
            </div>
        );
    }

    return (
        <div className="movie-list-container d-flex flex-column gap-2">
            {movies.map((movie) => (
                <MovieItem
                    key={movie.id}
                    movie={movie}
                    isFavorite={favorites.includes(movie.id)}
                    onToggleFavorite={onToggleFavorite}
                    onViewDetails={onViewDetails}
                />
            ))}
        </div>
    );
};

export default MovieList;
