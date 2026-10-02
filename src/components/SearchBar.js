import React, { useRef, useEffect } from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onClearSearch }) => {
    const searchInputRef = useRef(null);

    // Automatic focus on search input on mount
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    return (
        <div style={{ marginBottom: '10px' }}>
            <label htmlFor="search-movie-input" style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                Search Movie:
            </label>
            <div className="d-flex gap-2">
                <input
                    ref={searchInputRef}
                    id="search-movie-input"
                    type="text"
                    className="form-control form-control-sm"
                    style={{ borderRadius: 0 }}
                    placeholder="Tìm tên phim..."
                    value={searchTerm}
                    onChange={() => onSearchChange(searchInputRef.current?.value || '')}
                    aria-label="Search Movie"
                />
                {searchTerm && (
                    <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        style={{ borderRadius: 0 }}
                        onClick={() => {
                            if (onClearSearch) onClearSearch();
                            searchInputRef.current?.focus();
                        }}
                    >
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
