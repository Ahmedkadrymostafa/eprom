'use client'
import { LogOut } from "@/app/helpers/logout";
import { useState } from "react";
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
    
    if (dropDown) {
        document.body.addEventListener('click', (e: any) => {
            if (!e.target.classList.contains("drop-down") && !e.target.classList.contains("user-drop-down")) {
                setDropDown(false)
            }
        })
    }
    
  return (
    <div className="relative">
        <p className="user-drop-down second-color text-3xl capitalize cursor-pointer flex items-center gap-1" onClick={openDropDown}><FaUserCircle /><p className="user-drop-down second-color text-xl max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">{props.name.split(' ')[0]}</p></p>
        {dropDown && 
            <div className="drop-down absolute z-10 right-0 top-12 p-6 flex flex-col gap-1 glass">
                <div className="bg-white flex flex-col gap-4 rounded-3xl p-4">
                    <p className="main-color font-bold text-xl flex items-center gap-1 p-2 rounded-lg"><MdOutlineMail className="text-2xl text-gold font-black" />{props.email}</p>
                    <button onClick={() => {
                        router.push('/dashboard/settings')
                        setDropDown(false)
                    }} className="user-drop-down main-color font-bold text-xl flex items-center gap-1 p-2 rounded-lg hover:bg-slate-200"><IoMdSettings className="text-2x text-gray-600" /> Settings</button>
                   <button className="user-drop-down main-color w-full font-bold text-xl flex items-center gap-1  p-2 rounded-lg hover:bg-slate-200" onClick={() => LogOut(props.email, router)}><BiLogOut className="text-2x text-gray-600" /> Logout</button>
                </div>
            </div>
        }
    </div>
  )
}

export default UserDropDown