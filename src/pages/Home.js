import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Nav, Carousel } from 'react-bootstrap';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    fetch('https://restcountries.com/v2/all?fields=name,region,flag')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setVisibleCount(8);
  };

  const filteredCountries = selectedRegion === 'All'
    ? countries
    : countries.filter(c => c.region && c.region.toLowerCase() === selectedRegion.toLowerCase());

  const regions = ['All', 'Asia', 'Europe', 'Africa', 'Americas', 'Oceania'];

  const sliderCountries = countries.length >= 3 ? countries.slice(0, 3) : [];
  const sidebarCountry = countries.length >= 4 ? countries[3] : null;

  return (
    <Container className="py-4">
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" 
      />

      <header className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <h4 className="fw-bold m-0">Countries</h4>
        <Nav variant="pills" activeKey={selectedRegion} onSelect={handleRegionChange}>
          {regions.slice(0, 3).map(r => (
            <Nav.Item key={r}>
              <Nav.Link eventKey={r} className={`text-dark small bg-transparent ${selectedRegion === r ? 'fw-bold border-bottom rounded-0 border-dark' : ''}`}>
                {r}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </header>

      <div className="text-center my-4 position-relative">
        <h2 className="fw-bold bg-white d-inline-block px-4 position-relative" style={{ zIndex: 1 }}>WELCOME</h2>
        <hr className="position-absolute w-100 top-50 start-0 m-0" style={{ zIndex: 0 }} />
      </div>

      <Row className="mb-5 align-items-stretch">
        <Col lg={8} md={12} className="mb-3 mb-lg-0">
          {loading || sliderCountries.length === 0 ? (
            <div className="p-5 text-center bg-light border rounded" style={{ minHeight: '300px' }}>
              <Spinner animation="border" variant="secondary" />
            </div>
          ) : (
            <Carousel indicators={true} nextLabel="" prevLabel="" className="main-slider h-100">
              {sliderCountries.map((country, index) => (
                <Carousel.Item key={index} className="h-100">
                  <div className="p-4 d-flex flex-column justify-content-center align-items-center bg-light border rounded" style={{ minHeight: '300px' }}>
                    <img 
                      src={country.flag} 
                      alt={country.name} 
                      className="shadow-sm mb-3 border"
                      style={{ maxHeight: '140px', maxWidth: '240px', objectFit: 'contain', borderRadius: '4px' }}
                    />
                    <h5 className="fw-bold mb-1 text-dark">{country.name}</h5>
                    <p className="text-muted small mb-3">{country.region}</p>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Col>

        <Col lg={4} className="d-none d-lg-block">
          <div className="h-100 p-4 d-flex flex-column justify-content-center align-items-center bg-light border rounded">
            {loading ? (
              <Spinner animation="border" variant="secondary" />
            ) : sidebarCountry ? (
              <>
                <img 
                  src={sidebarCountry.flag} 
                  alt={sidebarCountry.name} 
                  className="shadow-sm mb-3 border"
                  style={{ maxHeight: '140px', maxWidth: '100%', objectFit: 'contain', borderRadius: '4px' }}
                />
                <h5 className="fw-bold mb-1 text-dark">{sidebarCountry.name}</h5>
                <p className="text-muted small mb-0">{sidebarCountry.region}</p>
              </>
            ) : null}
          </div>
        </Col>
      </Row>

      {loading && (
        <div className="text-center my-5"><Spinner animation="border" variant="dark" /></div>
      )}

      <Row xs={1} md={2} className="g-4">
        {filteredCountries.slice(0, visibleCount).map((country, idx) => (
          <Col key={idx}>
            <Card className="h-100 shadow-sm border border-secondary border-opacity-25" style={{ borderRadius: '8px' }}>
              <Row className="g-0 align-items-center h-100">
                <Col xs={4} className="p-2 text-center">
                  <img 
                    src={country.flag} 
                    alt={country.name}
                    className="img-fluid rounded border" 
                    style={{ maxHeight: '70px', objectFit: 'cover', width: '100%' }} 
                  />
                </Col>
                <Col xs={8} id="jimmy">
                  <Card.Body className="py-2">
                    <Card.Title className="fs-6 fw-bold mb-1">{country.name}</Card.Title>
                    <Card.Text className="text-muted small mb-0">{country.region}</Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredCountries.length > visibleCount && (
        <div className="text-center mt-5 mb-4">
          <Button variant="dark" className="px-4 py-2" onClick={() => setVisibleCount(p => p + 8)}>
            Load more
          </Button>
        </div>
      )}

      <footer className="text-center mt-5 pt-4 border-top">
        <div className="d-flex justify-content-center gap-3 mb-3">
          {['facebook', 'twitter', 'linkedin', 'youtube'].map((icon) => (
            <span key={icon} className="border rounded-circle d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px' }}>
              <i className={`bi bi-${icon} text-secondary`}></i>
            </span>
          ))}
        </div>
        <p className="text-muted small mb-1">Example@email.com</p>
        <p className="text-muted small" style={{ fontSize: '11px' }}>Copyright © 2020 Name. All rights reserved.</p>
      </footer>
    </Container>
  );
}