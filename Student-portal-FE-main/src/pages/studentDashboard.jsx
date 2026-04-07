// StudentDashboard.jsx
import "../styles/StudentDashboard.css"

function StudentDashboard({ student }) {
  if (!student) return <p className="loading-message">Loading student data...</p>;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Student Dashboard</h2>

      <div className="dashboard-info-group">
        <p><strong>Name:</strong> {student.name}</p>
      </div>

      <div className="dashboard-info-group">
        <p><strong>Email:</strong> {student.email}</p>
      </div>

      <div className="dashboard-info-group">
        <p><strong>Department:</strong> {student.department}</p>
      </div>

      <div className="dashboard-info-group">
        <p>
          <strong>Courses:</strong>
          {student.courses && student.courses.length > 0 ? (
            <ul>
              {student.courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          ) : (
            <span> No courses enrolled</span>
          )}
        </p>
      </div>

      <div className="dashboard-info-group">
        <p>
          <strong>Upcoming Events:</strong>
          {student.upcomingEvents && student.upcomingEvents.length > 0 ? (
            <ul>
              {student.upcomingEvents.map((event, index) => (
                <li key={index}>{event}</li>
              ))}
            </ul>
          ) : (
            <span> No upcoming events</span>
          )}
        </p>
      </div>
    </div>
  );
}

export default StudentDashboard;