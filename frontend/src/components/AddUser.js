import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';

const AddUserForm = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('student'); // Default role is student
    const [classes, setClasses] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Fetch classes when component mounts
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await axios.get('http://your-api-endpoint/classes');
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
        setSelectedClasses([]); // Clear selected classes when role changes
    };

    const handleClassChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedClasses(selectedOptions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const userData = {
            name,
            role,
            classes: selectedClasses,
            email,
            password,
            // Add other fields here as needed
        };

        try {
            const response = await axios.post('http://your-api-endpoint/add-user', userData);
            console.log('User added successfully:', response.data);
            // Reset form after successful submission
            setName('');
            setRole('student');
            setSelectedClasses([]);
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error adding user:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add New User</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select onChange={handleRoleChange} value={role} required>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="parent">Parent</option>
                    </Form.Select>
                </Form.Group>

                {role === 'student' && (
                    <Form.Group className="mb-3">
                        <Form.Label>Select Class</Form.Label>
                        <Form.Select
                            multiple
                            onChange={handleClassChange}
                            value={selectedClasses}
                            required
                        >
                            {classes.map((cls) => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                )}

                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
            </Form>
        </div>
    );
};

export default AddUserForm;
