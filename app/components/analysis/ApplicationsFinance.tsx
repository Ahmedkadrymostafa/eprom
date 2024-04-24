'use client'

import { BsFillBookmarkCheckFill } from "react-icons/bs"
import { FaArrowTrendUp, FaUsers } from "react-icons/fa6"
import { GiMoneyStack } from "react-icons/gi"
import { GrMoney } from "react-icons/gr"
import { MdMenuBook } from "react-icons/md"
import { PiPiggyBankBold } from "react-icons/pi"
import PlannedCourses from "./PlannedCourses"

const ApplicationsFinance = (props: any) => {
  return (
    <div className="glass p-7">
        <div>
                <div className="glass flex justify-between flex-wrap p-5 gap-5 mb-20">
                    <div className="card-one flex justify-between w-[32%] items-center py-11 px-6 bg-slate-700 rounded-2xl">
                        <div className="gap-4">
                            <p className="text-2xl main-color font-black">Current Trainees</p>
                            <p className="text-4xl main-color font-black">{props.trainees}</p>
                        </div>
                        <p className="text-6xl main-color"><FaUsers /></p>
                    </div>
                    <div className="card-two flex justify-between w-[32%] items-center py-11 px-6 bg-slate-700 rounded-2xl">
                    <div className="gap-3">
                            <p className="text-2xl main-color font-black">Planned Courses</p>
                            <p className="text-4xl main-color font-black">{props.courses}</p>
                        </div>
                        <p className="text-6xl main-color"><MdMenuBook /></p>
                    </div>
                    <div className="card-three flex justify-between w-[32%] items-center py-11 px-6 bg-slate-700 rounded-2xl">
                    <div className="gap-3">
                            <p className="text-2xl main-color font-black">Total Applications</p>
                            <p className="text-4xl main-color font-black">{props.APPS}</p>
                        </div>
                        <p className="text-6xl main-color"><BsFillBookmarkCheckFill /></p>
                    </div>
                </div>
        </div>
        <p className="main-color text-3xl font-semibold">Financial information for applications</p>
        <div className="flex justify-between gap-5 mt-5">
            <div className="yellow-bg w-1/4 p-5 rounded-2xl">
                <div>
                    <div className="flex justify-between">
                        <p className="main-color text-2xl font-black">Remaining</p>
                        <p className="text-gold text-4xl"><PiPiggyBankBold /></p>
                    </div>
                    <p className="text-sm text-gray-500 max-w-44">Total Revenue for not implemented course</p>
                </div>
                <p className="text-black text-xl font-bold mt-4">150000 EGP</p>
            </div>
            <div className="blue-bg w-1/4 p-5 rounded-2xl">
                <div>
                    <div className="flex justify-between">
                        <p className="main-color text-2xl font-black">Revenue</p>
                        <p className="text-green-600 text-4xl"><FaArrowTrendUp /></p>
                    </div>
                    <p className="text-sm text-gray-500 max-w-44">Revenue for implemented Courses</p>
                </div>
                <p className="text-black text-xl font-bold mt-4">210000 EGP</p>
            </div>
            <div className="blue-bg w-1/4 p-5 rounded-2xl">
                <div>
                    <div className="flex justify-between">
                        <p className="main-color text-2xl font-black">Expenses</p>
                        <p className="text-gold text-4xl"><GrMoney /></p>
                    </div>
                    <p className="text-sm text-gray-500 max-w-44">Expenses for implemented Courses</p>
                </div>
                <p className="text-black text-xl font-bold mt-4">10000 EGP</p>
            </div>
            <div className="green-bg w-1/4 p-5 rounded-2xl">
                <div>
                    <div className="flex justify-between">
                        <p className="main-color text-2xl font-black">Profit</p>
                        <p className="main-color text-4xl"><GiMoneyStack /></p>
                    </div>
                    <p className="text-sm text-gray-500  max-w-44">Current Profit for implemented courses only</p>
                </div>
                <p className="text-black text-xl font-bold mt-4">450000 EGP</p>
            </div>
            
        </div>

        <PlannedCourses />
    </div>
  )
}

export default ApplicationsFinance