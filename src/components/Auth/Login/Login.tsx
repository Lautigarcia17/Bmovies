import styles from './Login.module.css'
import { toast } from 'react-hot-toast'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { authContext } from '../../../context/AuthContext';
import { useGenericContext } from '../../../hooks/useGenericContext';
import { useRef } from 'react';
import { useEnterClick } from '../../../hooks/useEnterClick';



function Login() {

  const {signIn,register,handleSubmit,errors} = useGenericContext(authContext)

  const navigate: NavigateFunction = useNavigate()
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEnterClick(containerRef);

  const onSubmit = async (dataUser: any) => {
    const { data, error } = await signIn(dataUser);

    if (error) {
      toast.error(error.message, { position: 'top-right', duration: 3000 });
    }
    else {
      toast.success(`Congratulations ${data?.user?.user_metadata.username}! you have logged in`, { position: 'top-right', duration: 3000 })
      navigate('/')
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" className={styles.inputText} {...register("email", {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        })} />
        {errors.email?.type === 'required' && <p className={styles.messageError}>Email is required</p>}
        {errors.email?.type === 'pattern' && <p className={styles.messageError}>Invalid email format</p>}

        <label htmlFor="password">Password</label>
        <input type="password" id='password' className={styles.inputText} {...register('password', {
          required: true,
          pattern: /^[^\s]+$/
        })} />
        {errors.password?.type === 'required' && <p className={styles.messageError}>Password is required</p>}
        {errors.password?.type === 'pattern' && <p className={styles.messageError}>Password cannot contain spaces</p>}

        <div ref={containerRef} className={styles.containerRefButton}>
          <input type="submit" value="Login" className={styles.submit} />
        </div>
      </form>
    </>

  );
};

export default Login