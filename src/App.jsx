import React, { useState, useEffect } from 'react';
import StudentCard from './components/StudentCard';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy fallback data in case offline
  const fallbackStudents = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul.s@example.com', rollNo: 'BCA-101', department: 'Computer Applications', phone: '98765-43210', city: 'Mumbai' },
    { id: 2, name: 'Priya Patel', email: 'priya.p@example.com', rollNo: 'BCA-102', department: 'Data Science', phone: '98765-43211', city: 'Ahmedabad' },
    { id: 3, name: 'Amit Verma', email: 'amit.v@example.com', rollNo: 'BCA-103', department: 'Cyber Security', phone: '98765-43212', city: 'Delhi' },
    { id: 4, name: 'Sneha Kulkarni', email: 'sneha.k@example.com', rollNo: 'BCA-104', department: 'Cloud Computing', phone: '98765-43213', city: 'Pune' },
    { id: 5, name: 'Vikram Singh', email: 'vikram.s@example.com', rollNo: 'BCA-105', department: 'Artificial Intelligence', phone: '98765-43214', city: 'Jaipur' },
    { id: 6, name: 'Ananya Roy', email: 'ananya.r@example.com', rollNo: 'BCA-106', department: 'Information Systems', phone: '98765-43215', city: 'Kolkata' }
  ];

  // Fetch student data from dummy API
  async function fetchStudents() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Network response failed');
      const data = await response.json();

      // Transform API users to student records
      const depts = ['Computer Applications', 'Data Science', 'Cyber Security', 'Cloud Computing', 'Artificial Intelligence'];
      const transformed = data.slice(0, 8).map((user, idx) => ({
        id: user.id,
        name: user.name,
        email: user.email.toLowerCase(),
        rollNo: `BCA-${100 + user.id}`,
        department: depts[idx % depts.length],
        phone: user.phone.split(' ')[0],
        city: user.address?.city || 'Delhi'
      }));
      setStudents(transformed);
    } catch (err) {
      console.warn('API error, using local dummy data fallback:', err.message);
      setStudents(fallbackStudents);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-shell">
      <div className="container">
        <header className="page-header">
          <span className="badge">Unit 5: Practical 17</span>
          <h1>Student List (Read Operation with API)</h1>
          <p className="subtitle">
            Retrieves records using <code>fetch()</code> API in a <code>useEffect</code> lifecycle and renders items with React components and <code>Array.map()</code>.
          </p>

          <div className="toolbar">
            <input
              type="text"
              placeholder="🔍 Search student by name, ID, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button onClick={fetchStudents} className="btn-refresh">
              🔄 Refresh API Data
            </button>
          </div>
        </header>

        {loading ? (
          <div className="loading-box">
            <div className="spinner"></div>
            <p>Fetching student records from API...</p>
          </div>
        ) : error ? (
          <div className="error-box">
            <p>Error: {error}</p>
            <button onClick={fetchStudents} className="btn-refresh">Retry</button>
          </div>
        ) : (
          <div className="students-grid">
            {filtered.map(student => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
