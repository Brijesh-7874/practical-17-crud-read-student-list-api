# Practical 17: Read Operation with API (Student List)

## 🎯 Aim / Objective
Develop a Student List application that retrieves student data from a dummy API using fetch() and displays the records using React components and map().

---

## 💻 Source Code

### `src/components/StudentCard.jsx`
```jsx
import React from 'react';

function StudentCard({ student }) {
  return (
    <div className="student-card">
      <div className="card-top">
        <div className="avatar-circle">
          {student.name.charAt(0)}
        </div>
        <div>
          <h3 className="student-name">{student.name}</h3>
          <span className="student-id">Student ID: {student.rollNo}</span>
        </div>
      </div>

      <div className="card-body">
        <div className="info-row">
          <span className="label">📧 Email:</span>
          <span className="value">{student.email}</span>
        </div>
        <div className="info-row">
          <span className="label">📚 Department:</span>
          <span className="value dept-pill">{student.department}</span>
        </div>
        <div className="info-row">
          <span className="label">📱 Phone:</span>
          <span className="value">{student.phone}</span>
        </div>
        <div className="info-row">
          <span className="label">📍 City:</span>
          <span className="value">{student.city}</span>
        </div>
      </div>
    </div>
  );
}

export default StudentCard;

```

### `src/App.jsx`
```jsx
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

```

### `src/App.css`
```jsx
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; color: #1e293b; }
.page-shell { min-height: 100vh; padding: 40px 20px; display: flex; justify-content: center; }
.container { max-width: 1000px; width: 100%; }
.page-header { text-align: center; margin-bottom: 30px; }
.badge { display: inline-block; background: #e0f2fe; color: #0284c7; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 12px; text-transform: uppercase; margin-bottom: 10px; }
h1 { font-size: 28px; color: #0f172a; margin-bottom: 6px; }
.subtitle { color: #64748b; font-size: 14px; margin-bottom: 24px; }
.toolbar { display: flex; gap: 12px; max-width: 700px; margin: 0 auto; }
.search-input { flex: 1; padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 14px; outline: none; background: white; }
.search-input:focus { border-color: #0284c7; box-shadow: 0 0 0 3px rgba(2,132,199,0.15); }
.btn-refresh { background: #0f172a; color: white; border: none; padding: 10px 18px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; white-space: nowrap; }
.btn-refresh:hover { background: #1e293b; }
.loading-box { text-align: center; padding: 60px 20px; color: #64748b; }
.spinner { width: 40px; height: 40px; border: 4px solid #e2e8f0; border-top-color: #0284c7; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px; }
@keyframes spin { to { transform: rotate(360deg); } }
.students-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
.student-card { background: white; border-radius: 14px; padding: 22px; border: 1px solid #e2e8f0; box-shadow: 0 2px 10px rgba(0,0,0,0.04); transition: transform 0.2s, box-shadow 0.2s; }
.student-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
.card-top { display: flex; align-items: center; gap: 14px; border-bottom: 1px solid #f1f5f9; padding-bottom: 14px; margin-bottom: 14px; }
.avatar-circle { width: 44px; height: 44px; border-radius: 50%; background: #0284c7; color: white; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800; }
.student-name { font-size: 17px; color: #0f172a; margin-bottom: 2px; }
.student-id { font-size: 12px; color: #64748b; font-family: monospace; font-weight: 600; }
.card-body { display: flex; flex-direction: column; gap: 8px; font-size: 13px; }
.info-row { display: flex; justify-content: space-between; align-items: center; }
.info-row .label { color: #64748b; }
.info-row .value { font-weight: 600; color: #1e293b; }
.dept-pill { background: #eff6ff; color: #1d4ed8; padding: 2px 8px; border-radius: 4px; font-size: 12px; }

```

---

## 🚀 How to Run

1. Open terminal in this directory:
   ```bash
   cd "D:\React-practicals\Reacts\Practical-17-CRUD-Read-Student-List-API"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run Vite dev server:
   ```bash
   npm run dev
   ```
