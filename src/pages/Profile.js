import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Container, Card, Image, Button, Form } from 'react-bootstrap';
import UserContext from '../UserContext';
import { Redirect, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import ResetPassword from '../components/ResetPassword';

export default function Profile() {
  const { user } = useContext(UserContext);
  const [details, setDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const history = useHistory();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setDetails(data);
          setFormData(data); // Initialize form data with fetched details
        } else if (data.error === 'User not found') {
          Swal.fire({
            title: 'User not found',
            icon: 'error',
            text: 'Something went wrong. Please contact us for assistance.',
          });
          history.push('/profile');
        } else {
          Swal.fire({
            title: 'Something went wrong',
            icon: 'error',
            text: 'Something went wrong. Please contact us for assistance.',
          });
          history.push('/profile');
        }
      });
  }, [history]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Save the updated details (API call can be added here)
    setDetails(formData);
    setIsEditing(false);
    Swal.fire({
      title: 'Success',
      icon: 'success',
      text: 'Your information has been updated.',
    });
  };

  return (
    <>
      {user.id === null ? (
        <Redirect to="/profile" />
      ) : (
        <Container fluid className="py-5" style={{ backgroundColor: '#e3f2fd', minHeight: '100vh' }}>
          <h1 className="text-center mb-4 text-primary">Profile</h1>
          <Card className="shadow-lg mx-auto p-4 position-relative" style={{ maxWidth: '1200px', borderRadius: '15px' }}>
            {/* School Logo at top right */}
            <Image
              src="https://www.ua.edu.ph/wp-content/uploads/2017/07/UA-Logo.png" // Replace with your school logo URL
              alt="School Logo"
              style={{
                position: 'absolute',
                top: '24px',
                right: '32px',
                width: '60px',
                height: '60px',
                objectFit: 'contain',
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            />
            <Card.Body>
              <Row className="align-items-center">
                {/* Left Side: Name and Image */}
                <Col md={4} className="text-center mb-4 mb-md-0">
                  {isEditing ? (
                    <Form.Group className="mb-4">
                      <Form.Label>Profile Image URL</Form.Label>
                      <Form.Control
                        type="text"
                        name="profileImage"
                        value={formData.profileImage || ''}
                        onChange={handleInputChange}
                        placeholder="Insert image URL"
                      />
                    </Form.Group>
                  ) : (
                    <Image
                      src={details.profileImage || 'https://via.placeholder.com/180'}
                      roundedCircle
                      className="mb-3"
                      style={{ width: '180px', height: '180px' }}
                    />
                  )}
                  <h2 className="text-secondary">{`${details.firstName} ${details.lastName}`}</h2>
                </Col>

                {/* Right Side: Contact Information */}
                <Col md={8}>
                  <h4 className="text-dark mb-4">Contact Information</h4>
                  {isEditing ? (
                    <Form>
                      <Form.Group className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email || ''}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Label>Mobile No</Form.Label>
                        <Form.Control
                          type="text"
                          name="mobileNo"
                          value={formData.mobileNo || ''}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <Button variant="success" className="me-2" onClick={handleSave}>
                        Save
                      </Button>
                      <Button variant="secondary" onClick={handleEditToggle}>
                        Cancel
                      </Button>
                    </Form>
                  ) : (
                    <>
                      <ul className="list-unstyled text-muted mb-4">
                        <li className="mb-2">
                          <strong>Email:</strong> {details.email}
                        </li>
                        <li className="mb-2">
                          <strong>Mobile No:</strong> {details.mobileNo}
                        </li>
                      </ul>
                      <Button variant="primary" onClick={handleEditToggle}>
                        Edit
                      </Button>
                    </>
                  )}
                  <hr className="my-4" />
                  <ResetPassword />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      )}
    </>
  );
}
