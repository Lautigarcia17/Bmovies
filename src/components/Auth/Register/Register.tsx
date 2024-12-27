import styles from './Register.module.css'
import { toast } from 'react-hot-toast'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { authContext } from '../../../context/AuthContext';
import { useGenericContext } from '../../../hooks/useGenericContext';
import { useRef, useState } from 'react';
import { useEnterClick } from '../../../hooks/useEnterClick';


function Register() {
  const navigate : NavigateFunction = useNavigate();

  const {signUp,register,handleSubmit,errors} = useGenericContext(authContext)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEnterClick(containerRef);

  const onSubmit = async (dataUser: any) => {
    if (dataUser !== null && !isSubmitting) {
      setIsSubmitting(true);
      const { data, error } = await signUp(dataUser);
      setIsSubmitting(false);
  
      if (error) {
        toast.error(error.message, { position: 'top-right', duration: 3000 });
      } else {
        toast.success(`Congratulations ${data?.user?.user_metadata.username}! you have logged in`, { position: 'top-right', duration: 3000 });
        navigate('/');
      }
    }
  };

  return (
        <>
          <form  className={styles.form} aria-disabled={isSubmitting} onSubmit={handleSubmit(onSubmit)}>

            <label htmlFor="username">Username</label>
            <input type="text" id='username' className={styles.inputText} placeholder='Enter your username ...' {...register('username', {
              required: true,
              pattern: /^[a-zA-Z0-9\s]+$/
            })} />
            {errors.username?.type === 'required' && <p className={styles.messageError}>Username is required</p>}
            {errors.username?.type === 'pattern' && <p className={styles.messageError}>Username cannot contain symbols</p>}

            <label htmlFor="age">Age</label>
            <input type="number" id='age' className={styles.inputText} placeholder='Enter your age ...' {...register('age', {
              required: true,
            })} />
            {errors.age?.type === 'required' && <p className={styles.messageError}>Age is required</p>}

            <label htmlFor="email">Email</label>
            <input type="text" id="email" className={styles.inputText} placeholder='Enter your email ...' {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            })} />
            {errors.email?.type === 'required' && <p className={styles.messageError}>Email is required</p>}
            {errors.email?.type === 'pattern' && <p className={styles.messageError}>Invalid email format</p>}

            <label htmlFor="password">Password</label>
            <input type="password" id='password' className={styles.inputText} placeholder='Enter your password ...' {...register('password', {
              required: true,
              pattern: /^[^\s]+$/
            })} />
            {errors.password?.type === 'required' && <p className={styles.messageError}>Password is required</p>}
            {errors.password?.type === 'pattern' && <p className={styles.messageError}>Password cannot contain spaces</p>}

            <div ref={containerRef} className={styles.containerRefButton}>
              <input type="submit" value="Register" className={styles.submit} />
            </div>
          </form>
        </>

  );
};

export default Register