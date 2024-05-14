'use client'
import Image from "next/image"
import UserDropDown from "../dropdowns/UserDropDown";
import { IoMdExit } from "react-icons/io";
import { useRouter } from "next/navigation";
import { LogOut } from "@/app/helpers/logout";
import eprom from '@/app/assets/eprom.jpg'
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

            <Search />

            <nav className="flex gap-7 items-center">
                
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