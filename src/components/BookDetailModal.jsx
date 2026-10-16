import React from 'react';
import { X, BookOpen, Layers } from 'lucide-react';

export default function BookDetailModal({ book, onClose }) {
  if (!book) return null;

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-body">
          {coverUrl && (
            <div className="card-cover-wrapper" style={{ height: '280px' }}>
              <img src={coverUrl} alt={book.title} className="card-cover" />
            </div>
          )}

          <h2 className="font-heading" style={{ color: 'var(--dark-blue)', fontSize: '1.8rem' }}>
            {book.title}
          </h2>

          <p style={{ color: 'var(--text-muted)' }}>
            <strong>Author:</strong> {book.author_name ? book.author_name.join(', ') : 'Unknown'}
          </p>

          <p style={{ color: 'var(--text-muted)' }}>
            <strong>First Published:</strong> {book.first_publish_year || 'N/A'}
          </p>

          <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={18} color="var(--primary-blue)" /> 
            <strong>Editions:</strong> {book.edition_count || 'N/A'}
          </p>

          {book.subject && book.subject.length > 0 && (
            <div>
              <strong>Subjects / Genres:</strong>
              <div className="tag-list">
                {book.subject.slice(0, 8).map((sub, i) => (
                  <span key={i} className="tag">{sub}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}