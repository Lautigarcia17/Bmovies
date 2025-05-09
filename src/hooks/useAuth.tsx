import { useForm } from "react-hook-form";
import { AuthError, AuthResponse, UserMetadata } from "@supabase/supabase-js";
import { getSession, logOut, signInDatabase, signUpDatabase } from '../services/database'
import { useEffect, useState } from "react";
import { UserLogin, UserRegister } from "../types/interface";
import { UseAuthReturn } from "../types/type";

export const useAuth = (): UseAuthReturn => {
  const [idSession, setIdSession] = useState<string | null | undefined>();
  const [userData, setUserData] = useState<UserMetadata>();
  const [loadingSession, setLoadingSession] = useState<boolean>(true);
  const { register, formState: { errors }, reset, handleSubmit, watch } = useForm({
    mode: 'onSubmit'
  });


  const signIn = async (dataUser: UserLogin): Promise<AuthResponse> => {
    try {
      if (dataUser.email && dataUser.password) {
        const response = await signInDatabase(dataUser);
        if (response.data.session !== null) {
          reset();
          setIdSession(response.data.session?.user.id ?? '');
          setUserData(response.data.session?.user.user_metadata);
        }


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

  const signUp = async (dataUser: UserRegister): Promise<AuthResponse> => {
    try {
      if (dataUser.email && dataUser.password) {
        const response = await signUpDatabase(dataUser)


        if (response && response.data.session !== null) {
          reset()
          setIdSession(response.data.session?.user.id ?? '');
          setUserData(response.data.session?.user.user_metadata);
        }

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
  const signOut = async () => {
    try {
      setLoadingSession(true);
      await logOut();
      setIdSession(null);
    } catch (error) {
      throw new Error(`Error in logout`);
    }finally{
      setTimeout(() => {
        setLoadingSession(false);
      }, 500);
    }
  }

  useEffect(() => {
    const loadSession = async () => {
      try {
        const responseApi = await getSession();
        if (responseApi) {
          setUserData(responseApi.data.session?.user.user_metadata);
          setIdSession(responseApi.data.session?.user.id ?? null);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      } finally {
        setLoadingSession(false);
      }
    };

    loadSession();
  }, []);

  return { idSession, userData, loadingSession, signIn, signUp, signOut, register, handleSubmit, errors, reset, watch }
}

