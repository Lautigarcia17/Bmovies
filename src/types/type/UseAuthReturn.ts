import { AuthResponse, UserMetadata } from "@supabase/supabase-js"
import {  UserLogin, UserRegister } from "../interface"
import { FieldErrors, FieldValues, UseFormHandleSubmit, UseFormRegister, UseFormReset } from "react-hook-form"

export type UseAuthReturn = {
    idSession: string | null | undefined,
    userData : UserMetadata | undefined,
    loadingSession: boolean,
    signIn: (dataUser : UserLogin) => Promise<AuthResponse>,
    signUp: (dataUser : UserRegister) => Promise<AuthResponse>,
    signOut: () => void,
    register: UseFormRegister<FieldValues>,
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>,
    errors: FieldErrors<FieldValues>,
    reset: UseFormReset<FieldValues>
}