import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/global.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'pharmacist' });
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
      await axios.post('https://b2bdrugstore.netlify.app/api/auth/register', form);
      router.push('/');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
    <Head>
    <title>B2BDrugStore RegistrationPage</title>
    </Head>
    <main><br /><br /><br /><br /><br /><br />
    <section className={styles.loginpage}>
      <div className={styles.formboxlp}><br />
          <div className={styles.formvalue}>
              <form onSubmit={handleSubmit}>
                  <h1 className={styles.headtext}>Register</h1><br /> {error && <p className={styles.error}>{error}</p>}
                  <div className={styles.inputbox}>
                      <ion-icon name="person"></ion-icon>
                      <input name='name'  value={form.name} onChange={handleChange} className={styles.inputfiled} type="text" required/>
                      <label for="">Username</label>
                  </div>
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
                  <div>
                  <select name="role" value={form.role} onChange={handleChange} className={styles.inputbox}>
                 <option disabled value="selected" selected>Pick a role</option>
                    <option value="pharmacist">
                    Pharmacist
                    </option>
                    <option value="supplier">
                    Supplier
                    </option>
                  </select>
                  <ion-icon name="ribbon" style={{color:'#fff'}}></ion-icon>
                  </div>
                  <div className={styles.forget}>
                      <label for="">
                          <input className={styles.inputfiled} type="checkbox" required/>Accept Our Terms &amp; Conditions
                      </label>
                  </div>
                  <button type='submit' className={styles.buttonlogin}>Submit</button>
                  <div className={styles.registerlp}>
                      <p>Already have an Account?
                          <span>|</span>
                          <a href="/" style={{color:'#ce1212'}}>Login</a>
                      </p>
                  </div>
                 <br /><br /><br /><br /><br /><br />
              </form>
          </div>
      </div>
  </section>
    </main>
  </div>
  );
}
