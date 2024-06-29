import Head from 'next/head';
import styles from '../styles/global.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    try {
      const { data } = await axios.post('/api/auth/login', form);
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div>
      <Head>
      <title>B2B drug store LoginPage</title>
      </Head>
      <main><br /><br />
      <section className={styles.loginpage}>
        <div className={styles.formboxlp}>
            <div className={styles.formvalue}>
                <form onSubmit={handleSubmit}>
                    <h1 className={styles.headtext}>Login</h1>
                    {error && <p className={styles.error}>{error}</p>}
                    <div className={styles.inputbox}>
                        <ion-icon name="mail-outline"></ion-icon>
                        <input name="email" value={form.email} onChange={handleChange} className={styles.inputfiled} type="email" required/>
                        <label for="">Email</label>
                    </div>
                    <div className={styles.inputbox}>
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input name="password" value={form.password} onChange={handleChange} className={styles.inputfiled} type="password" required/>
                        <label for="">Password</label>
                    </div>
                    <div className={styles.forget}>
                        <label for="">
                            <input className={styles.inputfiled} type="checkbox"/>Remember Me
                            <span>|</span>
                            <a href="#">Forget Password</a>
                        </label>
                    </div>
                    <button className={styles.buttonlogin}>Log in</button>
                    <div className={styles.registerlp}>
                        <p>Don't have an Account?
                            <span>|</span>
                            <a href="/register">Create an Account</a>
                        </p>
                    </div>
                   
                </form>
            </div>
        </div>
    </section>
      </main>
    </div>
  );
}
