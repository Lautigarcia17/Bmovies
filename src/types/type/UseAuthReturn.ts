import { AuthResponse } from "@supabase/supabase-js"
import { UserLogin, UserRegister } from "../interface"
import { FieldErrors, FieldValues, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"

export type UseAuthReturn = {
    session: string,
    signIn: (dataUser : UserLogin) => Promise<AuthResponse>,
    signUp: (dataUser : UserRegister) => Promise<AuthResponse>,
    register: UseFormRegister<FieldValues>,
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>,
    errors: FieldErrors<FieldValues>
}