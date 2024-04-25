'use client'
import { BsFillBookmarkCheckFill } from "react-icons/bs"
import { FaArrowTrendUp, FaUsers } from "react-icons/fa6"
import { GiMoneyStack } from "react-icons/gi"
import { GrMoney } from "react-icons/gr"
import { MdMenuBook } from "react-icons/md"
import { PiPiggyBankBold } from "react-icons/pi"
import PlannedCourses from "./PlannedCourses"
import { DataContext } from "@/app/dashboard/layout"
import { useContext, useEffect, useState } from "react"
import formatNumberInEGP from "@/app/helpers/FormatNumInEGP"

const ApplicationsFinance = (props: any) => {
    // const dataContext: any = useContext(DataContext);
    
    // const [ implementedCourses, setImplementedCourses ] = useState(dataContext.courses.filter((course: any) => course.status === 'implemented'))
    // const [ nonImplementedCourses, setNonImplementedCourses ] = useState(dataContext.courses.filter((course: any) => course.status === 'not implemented'))
    
    // const [ implementedRevenue, setImplementedRevenue ] = useState(0)
    // const [ implementedExpenses, setImplementedExpenses ] = useState(0)
    // const [ notImplementedRevenue, setNotImplementedRevenue ] = useState(0)

    // useEffect(() => {
    //     // setImplementedCourses(dataContext.courses.filter((course: any) => course.status === 'implemented'))
    //     // setNonImplementedCourses(dataContext.courses.filter((course: any) => course.status === 'not implemented'))
        
    //     setImplementedRevenue(implementedCourses.reduce((acc: any, course: any) => acc + parseInt(course.total_revenue), 0))
    //     setImplementedExpenses(implementedCourses.reduce((acc: any, course: any) => acc + (parseInt(course.total_revenue) - parseInt(course.net_revenue)), 0))
    //     setNotImplementedRevenue(nonImplementedCourses.reduce((acc: any, course: any) => acc + parseInt(course.total_revenue), 0))

    //     console.log(implementedCourses)

    // }, [dataContext.courses])


    const dataContext: any = useContext(DataContext);

    const [implementedCourses, setImplementedCourses] = useState<any[]>([]);
    const [nonImplementedCourses, setNonImplementedCourses] = useState<any[]>([]);
    
    const [implementedRevenue, setImplementedRevenue] = useState<number>(0);
    const [implementedExpenses, setImplementedExpenses] = useState<number>(0);
    const [notImplementedRevenue, setNotImplementedRevenue] = useState<number>(0);

    useEffect(() => {
        const filteredImplementedCourses = dataContext.courses.filter((course: any) => course.status === 'implemented');
        const filteredNonImplementedCourses = dataContext.courses.filter((course: any) => course.status === 'not implemented');

        setImplementedCourses(filteredImplementedCourses);
        setNonImplementedCourses(filteredNonImplementedCourses);

        const implementedRev = filteredImplementedCourses.reduce((acc: any, course: any) => acc + parseInt(course.total_revenue), 0);
        const implementedExp = filteredImplementedCourses.reduce((acc: any, course: any) => acc + (parseInt(course.total_revenue) - parseInt(course.net_revenue)), 0);
        const notImplementedRev = filteredNonImplementedCourses.reduce((acc: any, course: any) => acc + parseInt(course.total_revenue), 0);

        setImplementedRevenue(implementedRev);
        setImplementedExpenses(implementedExp);
        setNotImplementedRevenue(notImplementedRev);

        console.log(filteredImplementedCourses);

    }, [dataContext.courses]);

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
                <p className="text-black text-xl font-bold mt-4">{formatNumberInEGP(notImplementedRevenue)}</p>
            </div>
            <div className="blue-bg w-1/4 p-5 rounded-2xl">
                <div>
                    <div className="flex justify-between">
                        <p className="main-color text-2xl font-black">Revenue</p>
                        <p className="text-green-600 text-4xl"><FaArrowTrendUp /></p>
                    </div>
                    <p className="text-sm text-gray-500 max-w-44">Revenue for implemented Courses</p>
                </div>
                <p className="text-black text-xl font-bold mt-4">{formatNumberInEGP(implementedRevenue)}</p>
            </div>
            <div className="blue-bg w-1/4 p-5 rounded-2xl">
                <div>
                    <div className="flex justify-between">
                        <p className="main-color text-2xl font-black">Expenses</p>
                        <p className="text-gold text-4xl"><GrMoney /></p>
                    </div>
                    <p className="text-sm text-gray-500 max-w-44">Expenses for implemented Courses</p>
                </div>
                <p className="text-black text-xl font-bold mt-4">{formatNumberInEGP(implementedExpenses)}</p>
            </div>
            <div className="green-bg w-1/4 p-5 rounded-2xl">
                <div>
                    <div className="flex justify-between">
                        <p className="main-color text-2xl font-black">Profit</p>
                        <p className="main-color text-4xl"><GiMoneyStack /></p>
                    </div>
                    <p className="text-sm text-gray-500  max-w-44">Current Profit for implemented courses only</p>
                </div>
                <p className="text-black text-xl font-bold mt-4">{formatNumberInEGP(implementedRevenue - implementedExpenses)}</p>
            </div>
            
        </div>

        <PlannedCourses implemented={implementedCourses} notImplemented={nonImplementedCourses} />
    </div>
  )
}

export default ApplicationsFinance