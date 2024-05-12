'use client'
import { BsFillBookmarkCheckFill } from "react-icons/bs"
import { FaArrowTrendUp, FaUsers } from "react-icons/fa6"
import { GiMoneyStack } from "react-icons/gi"
import { GrMoney } from "react-icons/gr"
import { MdMenuBook } from "react-icons/md"
import PlannedCourses from "./PlannedCourses"
import { DataContext } from "@/app/dashboard/layout"
import { useContext, useEffect, useState } from "react"
import formatNumberInEGP from "@/app/helpers/FormatNumInEGP"

const ApplicationsFinance = (props: any) => {

    const dataContext: any = useContext(DataContext);
    
    const [implementedCourses, setImplementedCourses] = useState<any[]>([]);
    const [nonImplementedCourses, setNonImplementedCourses] = useState<any[]>([]);
    
    const [implementedRevenue, setImplementedRevenue] = useState<number>(0);
    const [implementedExpenses, setImplementedExpenses] = useState<number>(0);
    
    const [peopleTrained, setPeopleTrained] = useState<number>(0);
    const [ currentYearApps, setCurrentYearApps ] = useState([])

    useEffect(() => {
        const currentYear = new Date().getFullYear();

        const filteredImplementedCourses = dataContext.courses.filter((course: any) => {
            const year = parseInt(course.date_from.split('-')[0])
            return (course.course_status === 'implemented' && year === currentYear)
        });
        const filteredNonImplementedCourses = dataContext.courses.filter((course: any) => {
            const year = parseInt(course.date_from.split('-')[0])
            return (course.course_status === 'not implemented' && year === currentYear)
        });

        setImplementedCourses(filteredImplementedCourses);
        setNonImplementedCourses(filteredNonImplementedCourses);

        const filteredCurrentYearApps = dataContext.APPS.filter((app: any) => {
            const year = parseInt(app.date_from.split('-')[0])
            return year === currentYear
        })
        setCurrentYearApps(filteredCurrentYearApps)

        const implementedRev = filteredImplementedCourses.reduce((acc: any, course: any) => acc + parseInt(course.total_revenue), 0);
        const implementedExp = filteredImplementedCourses.reduce((acc: any, course: any) => acc + parseInt(course.total_expenses), 0);
        setImplementedRevenue(implementedRev);
        setImplementedExpenses(implementedExp);
        
        const implementedTrainees = filteredImplementedCourses.reduce((acc: any, course: any) => acc + parseInt(course.num_of_trainees), 0);
        setPeopleTrained(implementedTrainees)
        

    }, [dataContext.courses, dataContext.APPS]);

    return (
    <div className="glass p-7">
        <div>
            <p className="text-gray-600 text-3xl font-bold mb-6 text-center"><p className=" text-blue-950 text-7xl font-black">EPR<span className="text-green-600">O</span>M</p> progress over the current year</p>
                <div className="glass flex justify-between flex-wrap p-5 gap-5 mb-20">
                    <div className="card-one flex justify-between w-[32%] items-center py-11 px-6 bg-slate-700 rounded-2xl">
                        <div className="gap-4">
                            <p className="text-2xl main-color font-black">People Trained</p>
                            <p className="text-4xl main-color font-black">{peopleTrained}</p>
                        </div>
                        <p className="text-6xl main-color"><FaUsers /></p>
                    </div>
                    <div className="card-two flex justify-between w-[32%] items-center py-11 px-6 bg-slate-700 rounded-2xl">
                    <div className="gap-3">
                            <p className="text-2xl main-color font-black">Planned Courses</p>
                            <p className="text-4xl main-color font-black">{implementedCourses.length + nonImplementedCourses.length}</p>
                        </div>
                        <p className="text-6xl main-color"><MdMenuBook /></p>
                    </div>
                    <div className="card-three flex justify-between w-[32%] items-center py-11 px-6 bg-slate-700 rounded-2xl">
                    <div className="gap-3">
                            <p className="text-2xl main-color font-black">Total Applications</p>
                            <p className="text-4xl main-color font-black">{currentYearApps.length}</p>
                        </div>
                        <p className="text-6xl main-color"><BsFillBookmarkCheckFill /></p>
                    </div>
                </div>
        </div>
        <p className="main-color text-3xl font-semibold">Financial information for implemented courses</p>
        <div className="flex justify-between gap-5 mt-5">
           
            <div className="blue-bg w-1/3 p-5 rounded-2xl">
                <div>
                    <div className="flex justify-between">
                        <p className="main-color text-2xl font-black">Revenue</p>
                        <p className="text-green-600 text-4xl"><FaArrowTrendUp /></p>
                    </div>
                    <p className="text-sm text-gray-500 max-w-44">Revenue for implemented Courses</p>
                </div>
                <p className="text-black text-xl font-bold mt-4">{formatNumberInEGP(implementedRevenue)}</p>
            </div>
            <div className="yellow-bg w-1/3 p-5 rounded-2xl">
                <div>
                    <div className="flex justify-between">
                        <p className="main-color text-2xl font-black">Expenses</p>
                        <p className="text-gold text-4xl"><GrMoney /></p>
                    </div>
                    <p className="text-sm text-gray-500 max-w-44">Expenses for implemented Courses</p>
                </div>
                <p className="text-black text-xl font-bold mt-4">{formatNumberInEGP(implementedExpenses)}</p>
            </div>
            <div className="green-bg w-1/3 p-5 rounded-2xl">
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