import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

import styles from '../styles/global.module.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    try {
      const decoded = jwt.decode(token);
      setUser(decoded);
    } catch (error) {
      router.push('/');
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{margin:'auto',maxWidth:'500px',color:'#12111f'}}><br /><br /><br /><br /><br /><br /><br /><br />
      <h1 style={{color:'#ce1212'}}>Welcome {user.name},Your role is `<span style={{color:'#04aeff'}}>{user.role === 'pharmacist' ? 'Pharmacist' : 'Supplier'}</span>`</h1>
      <h4 style={{color:'#fff'}}>This is your dashboard!</h4>
      <button className={styles.buttonlogin} onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
