import { useForm } from "react-hook-form";
import { AuthError, AuthResponse} from "@supabase/supabase-js";
import {getSession, logOut, signInDatabase,signUpDatabase} from '../services/database'
import { useEffect, useState } from "react";
import { UserLogin, UserRegister } from "../types/interface";
import { UseAuthReturn } from "../types/type";

export const useAuth = () : UseAuthReturn => {

  const [session,setSession] = useState<string>('');
  const { register, formState: { errors }, reset, handleSubmit } = useForm({
    mode: 'onChange'
  });

  const signIn = async (dataUser: UserLogin): Promise<AuthResponse> => {
    try {
      if (dataUser.email && dataUser.password) {
        const response = await signInDatabase(dataUser);
        setSession(response.data.session?.user.id ?? '');
        reset();

        return response;
      }
      
      return {
        data: { user: null, session: null },
        error: null,
      };
    } catch (error) {

      return {
        data: { user: null, session: null },
        error: error as AuthError,
      };
    }
  };

  const signUp = async (dataUser: UserRegister) : Promise<AuthResponse> => {
    try {
      if (dataUser.email && dataUser.password) {
        const response = await signUpDatabase(dataUser)
        reset();
        return response
      }

      return {
        data: { user: null, session: null },
        error: null,
      };
    } catch (error) {

      return {
        data: { user: null, session: null },
        error: error as AuthError,
      };
    }

  }

  const signOut = async ()=>{

    try {
      await logOut();
      setSession('');
    } catch (error) {
      throw new Error(`Error in logout`);
    }

}

  useEffect(() => {
    const loadSession = async () => {
      try {
        const responseApi = await getSession();
        setSession(responseApi.data.session?.user.id ?? '');
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    loadSession();
  }, []);

  return { session, signIn, signUp,signOut, register, handleSubmit, errors }
}

 