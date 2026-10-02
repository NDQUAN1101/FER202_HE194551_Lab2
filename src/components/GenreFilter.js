import React from 'react';

const GenreFilter = ({
    selectedGenre = 'All Genres',
    onGenreChange,
    sortBy = 'Default',
    onSortChange
}) => {
    const genreOptions = [
        'All Genres',
        'Action',
        'Animation',
        'Comedy',
        'Drama',
        'Romance',
        'Sci-Fi'
    ];

    const sortOptions = [
        'Default',
        'Rating: High -> Low',
        'Rating: Low -> High'
    ];

    return (
        <div className="row g-2">
            <div className="col-sm-6 d-flex align-items-center gap-2">
                <label htmlFor="genre-select" style={{ fontWeight: 'bold', whiteSpace: 'nowrap', margin: 0 }}>
                    Genre:
                </label>
                <select
                    id="genre-select"
                    className="form-select form-select-sm"
                    style={{ borderRadius: 0 }}
                    value={selectedGenre}
                    onChange={(e) => onGenreChange(e.target.value)}
                    aria-label="Filter Movies by Genre"
                >
                    {genreOptions.map((g) => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>
            </div>

            <div className="col-sm-6 d-flex align-items-center gap-2">
                <label htmlFor="sort-select" style={{ fontWeight: 'bold', whiteSpace: 'nowrap', margin: 0 }}>
                    Sort by:
                </label>
                <select
                    id="sort-select"
                    className="form-select form-select-sm"
                    style={{ borderRadius: 0 }}
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    aria-label="Sort Movies by Rating"
                >
                    {sortOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default GenreFilter;
