import React from 'react';
import { Search, BookOpen } from 'lucide-react';

export default function SearchHeader({ query, setQuery, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <header className="header">
      <h1><BookOpen size={36} /> Book Explorer</h1>
      <p>Find your next cozy read ✨</p>

      <form onSubmit={handleSubmit} className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Search by title or author..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">
          <Search size={18} /> Search
        </button>
      </form>
    </header>
  );
}