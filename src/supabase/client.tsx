import { createClient } from "@supabase/supabase-js"; 

export const supabase = createClient(
    'https://wdtrdzkngudzdqjbhtso.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkdHJkemtuZ3VkemRxamJodHNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI0NDEwODcsImV4cCI6MjAzODAxNzA4N30.Te33foY7OQY_uxjDQkMhz5kRSh0KGQGS8V7GmkMxpOM',
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            storage: window.localStorage,
            storageKey: 'bmovies-auth-token',
        }
    }
)


