import { useRouter } from 'next/router';
import styles from './Register.module.scss'
import Link from 'next/link';
import { FormEvent, useState } from 'react';
// import { error } from 'console';

const RegisterView = () => {

  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      password: form.password.value,
      phone: form.phone.value,
    };

    const result = await fetch ('/api/user/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push('/auth/login');
    } else {
      setIsLoading(false);
      setError('Email is already registered');
    }
  };
  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      {error && <p className={styles.register__error}>{error}</p>}
      <div className={styles.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.register__form__item}>
            <label htmlFor="email">Email
              <input name="email" id='email' type="email" className={styles.register__form__item__input} />
            </label>
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="">Fullname
              <input name="fullname" id='fullname' type="text" className={styles.register__form__item__input} />
            </label>
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="">Password
              <input name="password" id='password' type="password" className={styles.register__form__item__input} />
            </label>
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="">Phone
              <input name="phone" id='phone' type="text" className={styles.register__form__item__input} />
            </label>
          </div>
          
          <button type='submit' className={styles.register__form__button}>
            {isLoading ? 'Loading...' : 'Register'}
          </button>
        </form>
      </div>
      <p className={styles.register__link}>
        Have an account? Sign in <Link href="/auth/login">here</Link>
      </p>
    </div>
  );
}

export default RegisterView;


