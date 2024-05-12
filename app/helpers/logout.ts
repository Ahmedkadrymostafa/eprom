'use client'
import axios from "axios"

export const LogOut = async (email: any, route: any) => {

    axios.put('/api/auth/login/session', {email: email}).then(() => {
        route.push('/')
    })
}