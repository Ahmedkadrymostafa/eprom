'use client'
import Image from "next/image"
import Link from "next/link"
// import { credentials } from "@/app/helpers/middleware"
import { FaSearch, FaUserCircle } from "react-icons/fa";
import UserDropDown from "../dropdowns/UserDropDown";
import { IoMdExit } from "react-icons/io";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LogOut } from "@/app/helpers/logout";
import eprom from '../../assets/eprom.PNG'
import Search from "../search/Search";

const Header = (props: any) => {
    const router = useRouter();

    

  return (
    <div className="w-screen z-10 fixed top-0 h-20 main-bg">
        <header className="relative flex items-center justify-between px-8 h-full">
            
            <div className="w-[400px] h-[80px] overflow-hidden">
                <div className="relative w-[21rem] h-[14rem] -rotate-45 top-[-90%] right-[-8%] bg-white">
                    
                    <div className="absolute rotate-45 w-fit top-[35%] right-[13%]">
                        <Image src={eprom} width={260} alt="company logo"></Image>
                    </div>
                    
                </div>
            </div>
            <nav className="flex gap-7 items-center">
                {/* <div className="flex gap-6 items-center">
                    <Link href="/dashboard" className="second-color text-2xl capitalize">dashboard</Link>
                    {props.role === "super admin" && 
                        <Link href="/dashboard/admins" className="second-color text-2xl capitalize">admins</Link>
                    }
                </div> */}

                <Search />

                <div className="flex items-center gap-5">
                    <UserDropDown email={props.email} name={props.name} />
                    <button className="second-color text-3xl capitalize flex items-center gap-1" onClick={() => LogOut(props.email, router)}><IoMdExit /> <p className="second-color text-xl">Logout</p></button>
                </div>

            </nav>
        </header>
    </div>
  )
}

export default Header