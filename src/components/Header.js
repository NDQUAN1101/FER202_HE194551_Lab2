import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
    const { toggleTheme, isDarkMode } = useTheme();

    return (
        <header style={{ borderBottom: '1px solid #000', padding: '10px 0', marginBottom: '15px' }}>
            <div className="container d-flex justify-content-between align-items-center">
                <h4 style={{ margin: 0, fontWeight: 'bold' }}>Mini Movie Manager</h4>
                <button
                    id="theme-toggle-btn"
                    className="btn btn-outline-dark btn-sm"
                    onClick={toggleTheme}
                    aria-label="Toggle theme mode"
                    style={{ borderRadius: 0 }}
                >
                    {isDarkMode ? '☀️ Light' : '🌙 Dark'}
                </button>
            </div>
        </header>
    );
};

export default Header;
