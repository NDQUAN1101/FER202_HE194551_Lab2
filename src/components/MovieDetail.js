import React from 'react';

const MovieDetail = ({ movie, onClose }) => {
    if (!movie) return null;

    const { title, genre, year, rating, director, duration, description } = movie;

    return (
        <div className="box-border" style={{ position: 'sticky', top: '20px' }}>
            <h5 style={{ fontWeight: 'bold', borderBottom: '1px solid #999', paddingBottom: '6px', marginBottom: '10px' }}>
                Movie Details:
            </h5>
            <div style={{ marginBottom: '6px' }}><strong>Title:</strong> {title}</div>
            <div style={{ marginBottom: '6px' }}><strong>Genre:</strong> {genre}</div>
            <div style={{ marginBottom: '6px' }}><strong>Year:</strong> {year}</div>
            <div style={{ marginBottom: '6px' }}><strong>Rating:</strong> {rating}</div>
            <div style={{ marginBottom: '6px' }}><strong>Director:</strong> {director}</div>
            <div style={{ marginBottom: '8px' }}><strong>Duration:</strong> {duration} minutes</div>
            <div style={{ marginBottom: '12px' }}>
                <strong>Description:</strong>
                <p style={{ marginTop: '4px', marginBottom: 0, fontSize: '13px' }}>{description}</p>
            </div>
            <div>
                <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ borderRadius: 0, padding: '2px 10px' }}
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default MovieDetail;
