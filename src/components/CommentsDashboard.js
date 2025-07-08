import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';

function CommentsDashboard() {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('dashboardState'));
    if (saved) {
      setSearch(saved.search || '');
      setSortColumn(saved.sortColumn || null);
      setSortOrder(saved.sortOrder || null);
      setPageSize(saved.pageSize || 10);
      setPage(saved.page || 1);
    }

    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(res => res.json())
      .then(data => setComments(data));
  }, []);

  useEffect(() => {
    let data = comments;

    if (search) {
      data = data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortColumn) {
      data = [...data].sort((a, b) => {
        const valA = a[sortColumn].toString().toLowerCase();
        const valB = b[sortColumn].toString().toLowerCase();
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredData(data);
    localStorage.setItem('dashboardState', JSON.stringify({ search, sortColumn, sortOrder, pageSize, page }));
  }, [comments, search, sortColumn, sortOrder, pageSize, page]);

  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (col) => {
    if (sortColumn !== col) {
      setSortColumn(col);
      setSortOrder('asc');
    } else {
      if (sortOrder === 'asc') setSortOrder('desc');
      else if (sortOrder === 'desc') {
        setSortColumn(null);
        setSortOrder(null);
      } else setSortOrder('asc');
    }
  };

  const getSortSymbol = (col) => {
  if (sortColumn !== col) return '';
  if (sortOrder === 'asc') return ' 🔼';
  if (sortOrder === 'desc') return ' 🔽';
  return '';
};


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Comments Dashboard</h2>
        <button className="btn btn-primary" onClick={() => navigate('/profile')}>
          View Profile
        </button>
      </div>

      <div className="d-flex gap-3 my-3">
        <input
          type="text"
          value={search}
          className="form-control"
          placeholder="Search by name or email"
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select className="form-select w-auto" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
          <option value={10}>10 / page</option>
          <option value={50}>50 / page</option>
          <option value={100}>100 / page</option>
        </select>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-3">
  <label className="fw-bold">Sort by:</label>

  <button className="btn btn-outline-secondary btn-sm" onClick={() => { setSortColumn('postId'); setSortOrder('asc'); }}>
    Post ID 🔼
  </button>
  <button className="btn btn-outline-secondary btn-sm" onClick={() => { setSortColumn('postId'); setSortOrder('desc'); }}>
    Post ID 🔽
  </button>

  <button className="btn btn-outline-secondary btn-sm" onClick={() => { setSortColumn('name'); setSortOrder('asc'); }}>
    Name 🔼
  </button>
  <button className="btn btn-outline-secondary btn-sm" onClick={() => { setSortColumn('name'); setSortOrder('desc'); }}>
    Name 🔽
  </button>

  <button className="btn btn-outline-secondary btn-sm" onClick={() => { setSortColumn('email'); setSortOrder('asc'); }}>
    Email 🔼
  </button>
  <button className="btn btn-outline-secondary btn-sm" onClick={() => { setSortColumn('email'); setSortOrder('desc'); }}>
    Email 🔽
  </button>

  <button className="btn btn-danger btn-sm" onClick={() => { setSortColumn(null); setSortOrder(null); }}>
    Clear Sort
  </button>
</div>


      <table className="table table-bordered">
        <thead>
  <tr>
    <th>Post ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Comment</th>
  </tr>
</thead>


        <tbody>
          {paginatedData.map(item => (
            <tr key={item.id}>
              <td>{item.postId}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        total={filteredData.length}
        pageSize={pageSize}
        currentPage={page}
        setPage={setPage}
      />
    </div>
  );
}

export default CommentsDashboard;
