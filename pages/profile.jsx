import { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import { Container } from 'react-bootstrap';

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/auth/profile');
      const data = await res.json();
      setUser(data);
    }

    fetchUser();
  }, []);

  return (
    <Container>
      <h2>User Profile</h2>
      {user && <Profile user={user} />}
    </Container>
  );
}
