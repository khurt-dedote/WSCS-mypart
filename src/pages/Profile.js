import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Container, Card, Image, Button, Form } from 'react-bootstrap';
import { FaEnvelope, FaPhoneAlt, FaEdit, FaSave, FaTimes, FaShoppingCart } from 'react-icons/fa';
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
        if (data) {
          setDetails(data);
          setFormData(data);
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

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setDetails(formData);
    setIsEditing(false);
    Swal.fire({
      title: 'Success',
      icon: 'success',
      text: 'Your information has been updated.',
    });
  };

  // Example recommended products (static for demo)
  const recommendedProducts = [
    {
      id: 1,
      name: "UA Hoodie",
      image: "https://down-ph.img.susercontent.com/file/sg-11134201-7rbk2-lq8w6v9v5w2v7e",
      price: "₱799",
    },
    {
      id: 2,
      name: "UA Tumbler",
      image: "https://down-ph.img.susercontent.com/file/sg-11134201-7rbk2-lq8w6v9v5w2v7e",
      price: "₱299",
    },
    {
      id: 3,
      name: "UA Lanyard",
      image: "https://down-ph.img.susercontent.com/file/sg-11134201-7rbk2-lq8w6v9v5w2v7e",
      price: "₱99",
    },
  ];

  // Example recent orders (static for demo)
  const recentOrders = [
    {
      id: 1,
      name: "UA Hoodie",
      image: "https://down-ph.img.susercontent.com/file/sg-11134201-7rbk2-lq8w6v9v5w2v7e",
      status: "To Review",
      orderDate: "2024-06-01",
    },
    {
      id: 2,
      name: "UA Tumbler",
      image: "https://down-ph.img.susercontent.com/file/sg-11134201-7rbk2-lq8w6v9v5w2v7e",
      status: "To Review",
      orderDate: "2024-05-28",
    },
    {
      id: 3,
      name: "UA Lanyard",
      image: "https://down-ph.img.susercontent.com/file/sg-11134201-7rbk2-lq8w6v9v5w2v7e",
      status: "To Review",
      orderDate: "2024-05-20",
    },
  ];

  return (
    <>
      {user.id === null ? (
        <Redirect to="/profile" />
      ) : (
        <Container
          fluid
          className="py-5"
          style={{ backgroundColor: '#e3f2fd', minHeight: '100vh' }}
        >
          <h1 className="text-center mb-5 text-primary fw-bold display-4">Profile</h1>
          <Card
            className="shadow border-0 mx-auto p-4 position-relative"
            style={{
              maxWidth: '1100px',
              borderRadius: '24px',
              background: '#fff',
              boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
              border: '2px solid #e3f2fd',
            }}
          >
            {/* School Logo */}
            <Image
              src="https://www.ua.edu.ph/wp-content/uploads/2017/07/UA-Logo.png"
              alt="UA Logo"
              style={{
                position: 'absolute',
                top: '24px',
                right: '32px',
                width: '56px',
                height: '56px',
                borderRadius: '8px',
                background: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                border: '2px solid #e3f2fd',
              }}
              title="University of the Assumption"
            />
            <Card.Body>
              <Row className="align-items-center">
                {/* Profile Image and Name */}
                <Col
                  md={4}
                  className="text-center mb-4 mb-md-0 d-flex flex-column align-items-center"
                >
                  {isEditing ? (
                    <Form.Group className="mb-3 w-100">
                      <Form.Label className="fw-semibold">Profile Image URL</Form.Label>
                      <Form.Control
                        type="text"
                        name="profileImage"
                        value={formData.profileImage || ''}
                        onChange={handleInputChange}
                        placeholder="Paste image URL here"
                      />
                    </Form.Group>
                  ) : (
                    <Image
                      src={details.profileImage || 'https://via.placeholder.com/180'}
                      roundedCircle
                      className="mb-3 shadow"
                      style={{
                        width: '150px',
                        height: '150px',
                        border: '4px solid #e3f2fd',
                        objectFit: 'cover',
                        background: '#f8f9fa',
                      }}
                    />
                  )}
                  <h3 className="text-dark fw-bold text-capitalize mt-2 mb-0">
                    {`${details.firstName || ''} ${details.lastName || ''}`}
                  </h3>
                </Col>
                {/* Contact Info */}
                <Col md={8}>
                  <h5 className="text-dark mb-3 fw-semibold">Contact Information</h5>
                  {isEditing ? (
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FaEnvelope className="me-2 text-primary" /> Email
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email || ''}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Label>
                          <FaPhoneAlt className="me-2 text-primary" /> Mobile No
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="mobileNo"
                          value={formData.mobileNo || ''}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <div className="d-flex gap-2">
                        <Button variant="success" onClick={handleSave}>
                          <FaSave className="me-1" /> Save
                        </Button>
                        <Button variant="secondary" onClick={handleEditToggle}>
                          <FaTimes className="me-1" /> Cancel
                        </Button>
                      </div>
                    </Form>
                  ) : (
                    <>
                      <ul className="list-unstyled text-muted mb-4">
                        <li className="mb-2">
                          <FaEnvelope className="me-2 text-primary" />
                          <span className="fw-semibold">Email:</span>{' '}
                          <span className="text-dark">{details.email}</span>
                        </li>
                        <li className="mb-2">
                          <FaPhoneAlt className="me-2 text-primary" />
                          <span className="fw-semibold">Mobile No:</span>{' '}
                          <span className="text-dark">{details.mobileNo}</span>
                        </li>
                      </ul>
                      <div className="d-flex gap-2 mb-3">
                        <Button variant="primary" onClick={handleEditToggle}>
                          <FaEdit className="me-1" /> Edit
                        </Button>
                        <ResetPassword />
                      </div>
                    </>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Recent Orders Card - now appears before Recommended Products */}
          <Card
            className="shadow border-0 mx-auto mt-5 p-4"
            style={{
              maxWidth: '1100px',
              borderRadius: '24px',
              background: '#fff',
              boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
              border: '2px solid #e3f2fd',
            }}
          >
            <Card.Body>
              <h4 className="mb-4 text-primary fw-bold">
                <FaShoppingCart className="me-2" />
                Recent Orders - To Review
              </h4>
              <Row>
                {recentOrders.map(order => (
                  <Col key={order.id} xs={12} sm={6} md={4} className="mb-4 d-flex">
                    <Card className="w-100 h-100 shadow-sm border-0" style={{ borderRadius: '16px' }}>
                      <Card.Img
                        variant="top"
                        src={order.image}
                        style={{ height: '180px', objectFit: 'cover', borderRadius: '16px 16px 0 0' }}
                        alt={order.name}
                      />
                      <Card.Body className="d-flex flex-column align-items-center">
                        <Card.Title className="text-dark text-center" style={{ fontSize: '1.1rem' }}>
                          {order.name}
                        </Card.Title>
                        <Card.Text className="text-muted mb-1" style={{ fontSize: '0.95em' }}>
                          Order Date: {order.orderDate}
                        </Card.Text>
                        <Card.Text className="text-warning fw-bold mb-2">{order.status}</Card.Text>
                        <Button variant="outline-primary" size="sm" disabled>
                          Review
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>

          {/* Recommended Products Card - now appears after Recent Orders */}
          <Card
            className="shadow border-0 mx-auto mt-5 p-4"
            style={{
              maxWidth: '1100px',
              borderRadius: '24px',
              background: '#fff',
              boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
              border: '2px solid #e3f2fd',
            }}
          >
            <Card.Body>
              <h4 className="mb-4 text-primary fw-bold">
                <FaShoppingCart className="me-2" />
                Recommended Products for UA Shops
              </h4>
              <Row>
                {recommendedProducts.map(product => (
                  <Col key={product.id} xs={12} sm={6} md={4} className="mb-4 d-flex">
                    <Card className="w-100 h-100 shadow-sm border-0" style={{ borderRadius: '16px' }}>
                      <Card.Img
                        variant="top"
                        src={product.image}
                        style={{ height: '180px', objectFit: 'cover', borderRadius: '16px 16px 0 0' }}
                        alt={product.name}
                      />
                      <Card.Body className="d-flex flex-column align-items-center">
                        <Card.Title className="text-dark text-center" style={{ fontSize: '1.1rem' }}>
                          {product.name}
                        </Card.Title>
                        <Card.Text className="text-success fw-bold mb-2">{product.price}</Card.Text>
                        <Button variant="outline-primary" size="sm" disabled>
                          View Product
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Container>
      )}
    </>
  );
}