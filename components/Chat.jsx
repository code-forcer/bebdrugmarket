import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Chat = () => {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Chat</h2>
          <div className="chat-window">
            {messages.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
          <Form onSubmit={handleSendMessage}>
            <Form.Group controlId="formMessage">
              <Form.Control
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
              />
            </Form.Group>
            <Button type="submit">Send</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
