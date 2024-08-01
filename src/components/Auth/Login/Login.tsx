import styles from './Login.module.css'
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast'
import { supabase } from '../../../supabase/client';
import { NavigateFunction, useNavigate } from 'react-router-dom';

function Login() {

  const navigate : NavigateFunction = useNavigate()
  const { register, formState: { errors },reset, handleSubmit } = useForm({
    mode: 'onChange'
  });

  const signIn = async (dataUser: any) => {
    try {
      if (dataUser.email && dataUser.password) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: dataUser.email,
          password: dataUser.password
        })

        if(error){
          console.log(error);
          toast.error(error.message, { position: 'top-right',duration:3000 });
        }
        else{
          toast.success(`Congratulations ${data.user?.user_metadata.username}! you have logged in`, { position: 'top-right',duration:3000 })
          navigate('/')
        }
        reset();
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
        <>
        
          <form  className={styles.form} onSubmit={handleSubmit(signIn)}>
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

            <input type="submit" value="Login" className={styles.submit} />
          </form>
          <Toaster />
        </>

  );
};

export default Login