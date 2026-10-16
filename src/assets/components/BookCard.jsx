import React from 'react';
import { BookMarked } from 'lucide-react';

export default function BookCard({ book, onSelectBook }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  return (
    <div className="book-card" onClick={() => onSelectBook(book)}>
      <div className="card-cover-wrapper">
        {coverUrl ? (
          <img src={coverUrl} alt={book.title} className="card-cover" />
        ) : (
          <BookMarked size={48} color="#bae6fd" />
        )}
      </div>
      <div>
        <h3 className="card-title">{book.title}</h3>
        <p className="card-author">
          {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
        </p>
      </div>
      {book.first_publish_year && (
        <span className="card-year">Est. {book.first_publish_year}</span>
      )}
    </div>
  );
}