import React from 'react';

const MovieItem = ({ movie, isFavorite, onToggleFavorite, onViewDetails }) => {
    if (!movie) return null;

    const { id, title, genre, year, rating } = movie;

    return (
        <div className="movie-item">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div>
                    <span style={{ marginRight: '6px', fontWeight: 'bold' }}>
                        {isFavorite ? '*' : 'o'}
                    </span>
                    <h5 className="d-inline mb-0 fw-bold">{title}</h5>
                </div>

                <div>
                    <span>{genre}</span>
                    <span style={{ margin: '0 6px' }}>|</span>
                    <span>{year}</span>
                    <span style={{ margin: '0 6px' }}>|</span>
                    <span>* {rating}</span>
                </div>
            </div>

            {/* Buttons aligned to the right, fully monochrome */}
            <div className="d-flex justify-content-end gap-2" style={{ marginTop: '8px' }}>
                <button
                    type="button"
                    className={`btn btn-sm ${isFavorite ? 'btn-dark' : 'btn-outline-dark'}`}
                    style={{ borderRadius: 0, padding: '2px 8px', fontSize: '13px' }}
                    onClick={() => onToggleFavorite(id)}
                    aria-label={isFavorite ? 'Unfavorite' : 'Favorite'}
                >
                    {isFavorite ? 'Unfavorite' : 'Favorite'}
                </button>

                <button
                    type="button"
                    className="btn btn-outline-dark btn-sm"
                    style={{ borderRadius: 0, padding: '2px 8px', fontSize: '13px' }}
                    onClick={() => onViewDetails(movie)}
                    aria-label={`View Details for ${title}`}
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default MovieItem;
