import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    return regex.test(pass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setError('The password must contain 8 characters, an uppercase letter, a number, and at least one special symbol.');
      return;
    }
    setError('');
    navigate('/home');
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center bg-white" style={{ minHeight: '100vh', padding: '2rem' }}>
      <Row className="w-100 align-items-center justify-content-center" style={{ maxWidth: '1200px' }}>
        
        <Col xs={12} md={6} lg={6} className="d-flex flex-column justify-content-center px-4">
          <div className="w-100" style={{ maxWidth: '400px', margin: '0 auto' }}>
            
            <h1 className="fw-bold mb-1" style={{ color: '#222', fontSize: '2.5rem' }}>Sign In</h1>
            
            <p className="text-muted mb-4 small">
              New user? <a href="#create" className="text-decoration-none" style={{ color: '#3b82f6' }}>Create an account</a>
            </p>

            {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control 
                  type="text" 
                  placeholder="Username or email" 
                  required 
                  onChange={(e) => setEmail(e.target.value)} 
                  style={{
                    height: '50px',
                    borderRadius: '0px',
                    borderColor: '#222',
                    fontSize: '0.95rem'
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  required 
                  onChange={(e) => setPassword(e.target.value)} 
                  style={{
                    height: '50px',
                    borderRadius: '0px',
                    borderColor: '#222',
                    fontSize: '0.95rem'
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-4 d-flex align-items-center">
                <Form.Check 
                  type="checkbox" 
                  id="keep-signed-in"
                  label="Keep me signed in" 
                  className="small text-muted"
                  style={{ fontSize: '0.88rem' }}
                />
              </Form.Group>

              <Button 
                type="submit" 
                className="w-100 border-0 mb-4"
                style={{ 
                  backgroundColor: '#333333', 
                  height: '50px', 
                  borderRadius: '0px',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}
              >
                Sign In
              </Button>
            </Form>

            <div className="d-flex align-items-center my-4 text-muted small">
              <div className="flex-grow-1" style={{ borderTop: '1px solid #ddd' }}></div>
              <span className="px-3" style={{ fontSize: '0.8rem', color: '#999' }}>Or Sign In With</span>
              <div className="flex-grow-1" style={{ borderTop: '1px solid #ddd' }}></div>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-3">
              <a href="#google" className="btn btn-outline-dark rounded-circle d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px', p: 0, borderColor: '#ccc' }}>
                <FaGoogle size={16} />
              </a>
              <a href="#facebook" className="btn btn-outline-dark rounded-circle d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px', p: 0, borderColor: '#ccc' }}>
                <FaFacebookF size={16} />
              </a>
              <a href="#linkedin" className="btn btn-outline-dark rounded-circle d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px', p: 0, borderColor: '#ccc' }}>
                <FaLinkedinIn size={16} />
              </a>
              <a href="#twitter" className="btn btn-outline-dark rounded-circle d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px', p: 0, borderColor: '#ccc' }}>
                <FaTwitter size={16} />
              </a>
            </div>

          </div>
        </Col>

        <Col md={6} lg={6} className="d-none d-md-flex justify-content-center align-items-center ps-5">
          <img 
            src="/login.png" 
            alt="Sign In Illustration" 
            className="img-fluid"
            style={{ maxHeight: '500px', objectFit: 'contain' }}
          />
        </Col>

      </Row>
    </Container>
  );
}