import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [mentorName, setMentorName] = useState('');
    const [studentName, setStudentName] = useState('');
    const [mentorId, setMentorId] = useState('');
    const [students, setStudents] = useState([]);

    const createMentor = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/mentors', { name: mentorName });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createStudent = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/students', { name: studentName });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const assignStudentToMentor = async (studentId) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/students/${studentId}`, { mentor: mentorName });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getStudentsOfMentor = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/mentors/${mentorId}/students`);
            setStudents(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input type="text" placeholder="Mentor Name" onChange={e => setMentorName(e.target.value)} />
            <button onClick={createMentor}>Create Mentor</button>

            <input type="text" placeholder="Student Name" onChange={e => setStudentName(e.target.value)} />
            <button onClick={createStudent}>Create Student</button>

            <input type="text" placeholder="Mentor ID" onChange={e => setMentorId(e.target.value)} />
            <button onClick={getStudentsOfMentor}>Get Students of Mentor</button>

            <ul>
                {students.map(student => (
                    <li key={student._id}>
                        {student.name} <button onClick={() => assignStudentToMentor(student._id)}>Assign to Mentor</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

