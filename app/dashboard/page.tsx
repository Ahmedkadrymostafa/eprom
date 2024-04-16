"use client"
import { useContext } from "react"
import { FaUsers } from "react-icons/fa"
import { DataContext } from "./layout"
import { BsFillBookmarkCheckFill } from "react-icons/bs"
import { MdLibraryBooks, MdMenuBook } from "react-icons/md"
import { BiBookOpen } from "react-icons/bi"
import NonImplemented from "../components/analysis/NonImplemented"


const Page = () => {
    const data: any = useContext(DataContext)
    
    return (
       <>
            <div className="margin">
                <div className="glass flex justify-between flex-wrap p-5 gap-5">
                    <div className="card-yellow flex justify-between w-[30%] items-center py-11 px-6 bg-slate-700 rounded-2xl">
                        <div className="gap-3">
                            <p className="text-2xl main-color font-black">Trainees</p>
                            <p className="text-2xl main-color font-black">{data.trainees.length}</p>
                        </div>
                        <p className="text-6xl main-color"><FaUsers /></p>
                    </div>
                    <div className="card-blue flex justify-between w-[30%] items-center py-11 px-6 bg-slate-700 rounded-2xl">
                    <div className="gap-3">
                            <p className="text-2xl main-color font-black">Courses</p>
                            <p className="text-2xl main-color font-black">{data.courses.length}</p>
                        </div>
                        <p className="text-6xl main-color"><MdMenuBook /></p>
                    </div>
                    <div className="card-green flex justify-between w-[30%] items-center py-11 px-6 bg-slate-700 rounded-2xl">
                    <div className="gap-3">
                            <p className="text-2xl main-color font-black">Applications</p>
                            <p className="text-2xl main-color font-black">{data.APPS.length}</p>
                        </div>
                        <p className="text-6xl main-color"><BsFillBookmarkCheckFill /></p>
                    </div>
                </div>
            </div>

            <div className="mt-20 mx-6">
                <NonImplemented apps={data.APPS} />
            </div>
       </>
    )
  
}

export default Page