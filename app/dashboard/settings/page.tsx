'use client'
import axios from "axios"
import { DataContext } from "../layout"
import { useState, useContext, useEffect, useRef } from "react"
import { MdArrowBackIos } from "react-icons/md"
import Link from "next/link"
import Cryptr from "cryptr"
import { toast } from "react-toastify"
import Loading from "@/app/loading"

const Page = () => {
    const cryptr = new Cryptr('secretKey', { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 10 });
    const dataContext: any = useContext(DataContext)
    const [ admin, setAdmin ] = useState<any>({});
    const [ loading, setLoading ] = useState(true)
    const email = dataContext.credentials.email
    const currentRef: any = useRef();
    const newPasswordRef: any = useRef();
    const confirmNewPasswordRef: any = useRef();

    const getAdmin = async () => {
        await axios.get(`/api/admins/${email}`).then((res: any) => {
            setAdmin(res.data)
            setLoading(false)
        })
    }
    const updateAdmin = async () => {
        let current = currentRef.current.value
        let newPassword = newPasswordRef.current.value
        let confirm = confirmNewPasswordRef.current.value

        if (!current || !newPassword || !confirm) return toast.warn("please enter full inputs")

        let adminPassword = cryptr.decrypt(admin.password)
        if (current !== adminPassword) return toast.error("current password is incorrect")
        
        if (newPassword !== confirm) return toast.error("New password and confirm password isn't identical")
        
        setLoading(true)
        let data = {
            password: cryptr.encrypt(newPassword)
        }
        axios.put(`/api/admins/${email}`, data).then(() => {
            toast.success("Password updated successfully")
            getAdmin();
        })
    }
    useEffect(() => {
        getAdmin()
    }, [])

    if (loading) {
        return <Loading />
    }

  return (
    
    <div className="mt-8 mx-6">
        <div className="flex justify-between items-center">
            <p className="text-5xl font-bold main-color">Settings</p>
            <Link href='/dashboard' className="main-color flex items-center text-3xl font-black"><MdArrowBackIos /> <p>Dashboard</p></Link>
        </div>
        <div className="soft-bg p-5 mt-9 mx-auto w-fit flex gap-16 items-center">
            <div className="flex flex-col gap-6">
                <p className="main-color text-3xl font-bold">ID: {admin.id}</p>
                <p className="main-color text-3xl font-bold capitalize">{admin.name}</p>
                <p className="main-color text-3xl font-bold">{admin.email}</p>
            </div>
            <div className="soft-bg">
                <p className="main-color text-2xl font-black m-3">Change Password</p>
                <form className="flex flex-col gap-4 p-5">
                    <input ref={currentRef} className="input" type="password" placeholder="Current Password" />
                    <input ref={newPasswordRef} className="input" type="password" placeholder="New Password" />
                    <input ref={confirmNewPasswordRef} className="input" type="password" placeholder="Confirm Password" />
                    <input className="button-81" type="submit" value="Save" onClick={(e: any) => {
                        e.preventDefault();
                        updateAdmin()
                    }} />
                </form>
            </div>
        </div>
    </div>
  )
}

export default Page