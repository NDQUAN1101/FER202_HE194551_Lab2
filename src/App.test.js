import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Mini Movie Manager and displays movies dynamically', () => {
    render(<App />);

    // Header title from wireframe
    expect(screen.getByText('Mini Movie Manager')).toBeInTheDocument();

    // Movies displayed dynamically from datas/movies.js
    expect(screen.getByText('Interstellar')).toBeInTheDocument();
    expect(screen.getByText('Spirited Away')).toBeInTheDocument();
    expect(screen.getByText('The Dark Knight')).toBeInTheDocument();

    // Action buttons exist
    const favoriteButtons = screen.getAllByRole('button', { name: /favorite/i });
    expect(favoriteButtons.length).toBeGreaterThan(0);

    const viewDetailsButtons = screen.getAllByRole('button', { name: /view details/i });
    expect(viewDetailsButtons.length).toBeGreaterThan(0);
});

test('toggles theme between light and dark modes', () => {
    render(<App />);

    const themeToggleBtn = screen.getByRole('button', { name: /toggle theme mode/i });
    expect(themeToggleBtn).toBeInTheDocument();

    fireEvent.click(themeToggleBtn);
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark');
});

test('searches movies by title case-insensitively and updates dynamically', () => {
    render(<App />);

    const searchInput = screen.getByLabelText(/search movie/i);
    expect(searchInput).toBeInTheDocument();

    // Type lowercase search term "inter"
    fireEvent.change(searchInput, { target: { value: 'inter' } });

    expect(screen.getByText('Interstellar')).toBeInTheDocument();
    expect(screen.queryByText('Spirited Away')).not.toBeInTheDocument();

    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('Spirited Away')).toBeInTheDocument();
});

test('filters movies by genre dropdown', () => {
    render(<App />);

    const genreSelect = screen.getByLabelText(/filter movies by genre/i);
    expect(genreSelect).toBeInTheDocument();

    // Select Animation
    fireEvent.change(genreSelect, { target: { value: 'Animation' } });
    expect(screen.getByText('Spirited Away')).toBeInTheDocument();
    expect(screen.queryByText('Interstellar')).not.toBeInTheDocument();

    // Select All Genres
    fireEvent.change(genreSelect, { target: { value: 'All Genres' } });
    expect(screen.getByText('Interstellar')).toBeInTheDocument();
    expect(screen.getByText('Spirited Away')).toBeInTheDocument();
});

test('sorts movies by rating', () => {
    render(<App />);

    const sortSelect = screen.getByLabelText(/sort movies by rating/i);
    expect(sortSelect).toBeInTheDocument();

    // Change sort to High -> Low
    fireEvent.change(sortSelect, { target: { value: 'Rating: High -> Low' } });
    const movieHeadings = screen.getAllByRole('heading', { level: 5 });
    // The Dark Knight (9.0) should be first
    expect(movieHeadings[0]).toHaveTextContent('The Dark Knight');

    // Change sort to Low -> High
    fireEvent.change(sortSelect, { target: { value: 'Rating: Low -> High' } });
    const movieHeadingsLow = screen.getAllByRole('heading', { level: 5 });
    // The Grand Budapest Hotel (8.1) should be first
    expect(movieHeadingsLow[0]).toHaveTextContent('The Grand Budapest Hotel');
});

test('opens and closes movie details panel', () => {
    render(<App />);

    // Click [View Details] on first movie (Interstellar)
    const viewDetailsButtons = screen.getAllByRole('button', { name: /view details/i });
    fireEvent.click(viewDetailsButtons[0]);

    // Detail panel should be visible with complete info
    expect(screen.getByText('Movie Details:')).toBeInTheDocument();
    expect(screen.getByText('Christopher Nolan')).toBeInTheDocument();
    expect(screen.getByText('169 minutes')).toBeInTheDocument();

    // Click Close button
    const closeBtn = screen.getByText('Close');
    fireEvent.click(closeBtn);
    expect(screen.queryByText('Movie Details:')).not.toBeInTheDocument();
});

test('toggles favorite status and updates favorites count', () => {
    render(<App />);

    // Check initial favorite button for Interstellar
    const favButtons = screen.getAllByRole('button', { name: /favorite/i });
    fireEvent.click(favButtons[0]);

    // Button should now show Unfavorite
    expect(screen.getByRole('button', { name: /unfavorite/i })).toBeInTheDocument();
});
