import React, { useState, useMemo } from 'react';
import './App.css';
import { movies as initialMovies } from './datas/movies';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import GenreFilter from './components/GenreFilter';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';

function MainApp() {
    const { theme } = useTheme();

    // Data loaded from datas/movies.js
    const [moviesList] = useState(initialMovies);

    // Favorites stored in localStorage
    const [favorites, setFavorites] = useLocalStorage('favorite_movies', []);

    // 2. Search state
    const [searchTerm, setSearchTerm] = useState('');

    // 3. Genre filter state
    const [selectedGenre, setSelectedGenre] = useState('All Genres');

    // 4. Sort by rating state
    const [sortBy, setSortBy] = useState('Default');

    // Movie detail selection
    const [selectedMovie, setSelectedMovie] = useState(null);

    // Toggle favorite
    const handleToggleFavorite = (movieId) => {
        setFavorites((prev) =>
            prev.includes(movieId)
                ? prev.filter((id) => id !== movieId)
                : [...prev, movieId]
        );
    };

    // Filter and Sort logic
    const filteredMovies = useMemo(() => {
        let result = moviesList.filter((movie) => {
            const matchesSearch = movie.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase().trim());

            const matchesGenre =
                selectedGenre === 'All Genres' || movie.genre === selectedGenre;

            return matchesSearch && matchesGenre;
        });

        if (sortBy === 'Rating: High -> Low') {
            result = [...result].sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'Rating: Low -> High') {
            result = [...result].sort((a, b) => a.rating - b.rating);
        }

        return result;
    }, [moviesList, searchTerm, selectedGenre, sortBy]);

    return (
        <div className={`App theme-${theme}`}>
            {/* Header: Mini Movie Manager */}
            <Header />

            <div className="container pb-4">
                {/* Search and Filter Box */}
                <div className="box-border">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        onClearSearch={() => setSearchTerm('')}
                    />

                    <GenreFilter
                        selectedGenre={selectedGenre}
                        onGenreChange={setSelectedGenre}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                    />
                </div>

                {/* Status line: Tổng: 6 | Yêu thích: 2 | Đang hiển thị: 3 */}
                <div className="summary-line d-flex justify-content-between align-items-center flex-wrap">
                    <div>
                        <span>Tổng: <strong>{moviesList.length}</strong></span>
                        <span className="mx-2">|</span>
                        <span>Yêu thích: <strong>{favorites.length}</strong></span>
                        <span className="mx-2">|</span>
                        <span>Đang hiển thị: <strong>{filteredMovies.length}</strong></span>
                    </div>

                    {selectedMovie && (
                        <div>
                            Đang xem: <strong>{selectedMovie.title}</strong>
                        </div>
                    )}
                </div>

                {/* Main Content Layout */}
                <div className="row g-3">
                    {/* Left Column: Movie List */}
                    <div className={selectedMovie ? 'col-md-7' : 'col-md-12'}>
                        <MovieList
                            movies={filteredMovies}
                            favorites={favorites}
                            onToggleFavorite={handleToggleFavorite}
                            onViewDetails={(movie) => setSelectedMovie(movie)}
                        />
                    </div>

                    {/* Right Column: Movie Details */}
                    {selectedMovie && (
                        <div className="col-md-5">
                            <MovieDetail
                                movie={selectedMovie}
                                onClose={() => setSelectedMovie(null)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <MainApp />
        </ThemeProvider>
    );
}

export default App;
