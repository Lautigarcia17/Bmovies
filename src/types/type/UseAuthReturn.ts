import { AuthResponse } from "@supabase/supabase-js"
import { UserLogin, UserRegister } from "../interface"
import { FieldErrors, FieldValues, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"

export type UseAuthReturn = {
    session: string | null,
    loadingSession: boolean,
    signIn: (dataUser : UserLogin) => Promise<AuthResponse>,
    signUp: (dataUser : UserRegister) => Promise<AuthResponse>,
    signOut: () => void,
    register: UseFormRegister<FieldValues>,
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>,
    errors: FieldErrors<FieldValues>
}