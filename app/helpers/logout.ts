'use client'
import axios from "axios"
// import { useRouter } from "next/navigation"
export const LogOut = async (email: any, route: any) => {
    // const router = useRouter();

    axios.put('/api/auth/login/session', {email: email}).then(() => {
        route.push('/')
    })
}