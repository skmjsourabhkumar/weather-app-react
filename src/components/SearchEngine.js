import React, { useState, useEffect } from "react";

function SearchEngine({ query, setQuery, search }) {
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecent, setShowRecent] = useState(false);

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentWeatherSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recentWeatherSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      
      setRecentSearches(prev => [
        query,
        ...prev.filter(item => item.toLowerCase() !== query.toLowerCase())
      ].slice(0, 5));
      
      search(e);
      setShowRecent(false); 
    }
  };

  const handleRecentSearchClick = (searchTerm) => {
    setQuery(searchTerm);
    setShowRecent(false);
    
  };

  return (
    <div className="SearchEngine" style={{ position: 'relative' }}>
      <input
        type="text"
        className="city-search"
        placeholder="Enter city name"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={() => setShowRecent(true)}
        onBlur={() => setTimeout(() => setShowRecent(false), 200)}
      />
      <button onClick={handleSearch}>
        <i className="fas fa-search" style={{ fontSize: "18px" }}></i>
      </button>
      {showRecent && recentSearches.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'rgb(134, 126, 126)',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          zIndex: 10,
          marginTop: '5px'
        }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {recentSearches.map((searchTerm, index) => (
              <li 
                key={index}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee'
                }}
                onMouseDown={() => handleRecentSearchClick(searchTerm)}
              >
                {searchTerm}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchEngine;