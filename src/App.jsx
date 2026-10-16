import React, { useState, useEffect } from 'react';
import SearchHeader from './components/SearchHeader';
import BookCard from './components/BookCard';
import BookDetailModal from './components/BookDetailModal';

export default function App() {
  // searchh''
  const [query, setQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    // search
    if (!activeQuery.trim()) return;

    const fetchBooks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(activeQuery)}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data from Open Library.');
        }

        const data = await response.json();
        setBooks(data.docs || []);
      } catch (err) {
        setError(err.message || 'Something went wrong while fetching books.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [activeQuery]);

  const handleSearch = () => {
    if (query.trim()) {
      setActiveQuery(query);
    }
  };

  return (
    <div className="container">
      <SearchHeader query={query} setQuery={setQuery} onSearch={handleSearch} />

      <main>
        {isLoading && (
          <div className="status-container">
            <div className="spinner"></div>
            <p className="font-heading" style={{ color: 'var(--dark-blue)' }}>
              Searching books... 📖
            </p>
          </div>
        )}

        {error && (
          <div className="status-container">
            <p style={{ color: '#ef4444' }}>{error}</p>
          </div>
        )}

        {/* State mess */}
        {!isLoading && !error && !activeQuery && (
          <div className="status-container">
            <p className="font-heading" style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
              Type a title or author above to start exploring! 📚✨
            </p>
          </div>
        )}

        {!isLoading && !error && activeQuery && books.length === 0 && (
          <div className="status-container">
            <p className="font-heading" style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
              No books found. Try another search! 🔍
            </p>
          </div>
        )}

        {!isLoading && !error && books.length > 0 && (
          <div className="book-grid">
            {books.map((book, index) => (
              <BookCard key={book.key || index} book={book} onSelectBook={setSelectedBook} />
            ))}
          </div>
        )}
      </main>

      <BookDetailModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}