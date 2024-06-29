import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Profile = ({ user }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>User Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
