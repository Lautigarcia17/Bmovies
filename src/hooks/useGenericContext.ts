import { Context, useContext } from "react";


export const  useGenericContext = <T>(context: Context<T | undefined>): T => {
    const ctx = useContext(context);
    if (!ctx) {
        throw new Error('Context must be used within a Provider');
    }
    return ctx;
}