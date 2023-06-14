import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [mentorName, setMentorName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [selectedMentor, setSelectedMentor] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(() => {
    fetchMentors();
    fetchStudents();
  }, []);

  const fetchMentors = () => {
    axios.get('/mentors')
      .then(response => {
        setMentors(response.data);
      })
      .catch(error => {
        console.error('Error fetching mentors:', error.response.data.error);
      });
  };

  const fetchStudents = () => {
    axios.get('/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error.response.data.error);
      });
  };

  const handleCreateMentor = (e) => {
    e.preventDefault();
    axios.post('/mentors', { name: mentorName })
      .then(response => {
        console.log('Mentor created:', response.data);
        setMentorName('');
        fetchMentors();
      })
      .catch(error => {
        console.error('Error creating mentor:', error.response.data.error);
      });
  };

  const handleCreateStudent = (e) => {
    e.preventDefault();
    axios.post('/students', { name: studentName })
      .then(response => {
        console.log('Student created:', response.data);
        setStudentName('');
        fetchStudents();
      })
      .catch(error => {
        console.error('Error creating student:', error.response.data.error);
      });
  };

  const handleAssignStudent = (e) => {
    e.preventDefault();
    axios.put(`/mentors/${selectedMentor}/students/${selectedStudent}`)
      .then(response => {
        console.log('Student assigned to mentor:', response.data);
        setSelectedMentor('');
        setSelectedStudent('');
        fetchStudents();
      })
      .catch(error => {
        console.error('Error assigning student to mentor:', error.response.data.error);
      });
  };

  return (
    <div>
      <h1>Mentor-Student Assignment</h1>

      <h2>Create Mentor</h2>
      <form onSubmit={handleCreateMentor}>
        <input
          type="text"
          value={mentorName}
          onChange={e => setMentorName(e.target.value)}
          placeholder="Mentor Name"
          required
        />
        <button type="submit">Create Mentor</button>
      </form>

      <h2>Create Student</h2>
      <form onSubmit={handleCreateStudent}>
        <input
          type="text"
          value={studentName}
          onChange={e => setStudentName(e.target.value)}
          placeholder="Student Name"
          required
        />
        <button type="submit">Create Student</button>
      </form>

      <h2>Assign Student to Mentor</h2>
      <form onSubmit={handleAssignStudent}>
        <select
          value={selectedMentor}
          onChange={e => setSelectedMentor(e.target.value)}
          required
        >
          <option value="">Select Mentor</option>
          {mentors.map(mentor => (
            <option key={mentor._id} value={mentor._id}>{mentor.name}</option>
          ))}
        </select>

        <select
          value={selectedStudent}
          onChange={e => setSelectedStudent(e.target.value)}
          required
        >
          <option value="">Select Student</option>
          {students.map(student => (
            <option key={student._id} value={student._id}>{student.name}</option>
          ))}
        </select>
        <button type="submit">Assign Student</button>
      </form>
    </div>
  );
}

export default App;
