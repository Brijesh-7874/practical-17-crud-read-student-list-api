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
