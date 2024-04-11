'use client'
import { LogOut } from "@/app/helpers/logout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { MdOutlineMail } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
const UserDropDown = (props: any) => {
    const router = useRouter();
    const [ dropDown, setDropDown ] = useState(false);
    const openDropDown = () => {
        if (!dropDown) {
            setDropDown(true)
        } else {setDropDown(false)}
    }

    useEffect(() => {
        document.body.addEventListener('click', (e: any) => {
            if (!e.target.classList.contains("drop-down") && !e.target.classList.contains("user-drop-down")) {
                // openDropDown();
                setDropDown(false)
                console.log(dropDown)
            }
        })
    }, [])
  return (
    <div className="relative">
        <p className="user-drop-down second-color text-3xl capitalize cursor-pointer flex items-center gap-1" onClick={openDropDown}><FaUserCircle /><p className="user-drop-down second-color text-xl">{props.name}</p></p>
        {dropDown && 
            <div className="drop-down absolute z-10 right-0 top-12 p-6 flex flex-col gap-3 glass">
                <div className="bg-white flex flex-col gap-4 rounded-3xl p-4">
                    <Link href="#" className="main-color font-bold text-xl flex items-center gap-1"><MdOutlineMail className="text-2xl" />{props.email}</Link>
                    <Link href="#" className="main-color font-bold text-xl flex items-center gap-1"><IoMdSettings className="text-2xl" /> Settings</Link>
                    {/* <Link href="#" className="main-color font-bold text-xl capitalize">Logout</Link> */}
                    <button className="main-color w-fit font-bold text-xl flex items-center gap-1" onClick={() => LogOut(props.email, router)}><BiLogOut className="text-2xl" /> Logout</button>
                </div>
            </div>
        }
    </div>
  )
}

export default UserDropDown