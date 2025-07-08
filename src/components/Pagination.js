import React from 'react';

function Pagination({ total, pageSize, currentPage, setPage }) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="d-flex flex-wrap gap-2 mt-3">
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={`btn ${currentPage === i + 1 ? 'btn-info' : 'btn-outline-info'}`}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
