"use client"
import { useContext, useEffect, useState } from "react"
import { FaUsers } from "react-icons/fa"
import { DataContext } from "./layout"
import { BsFillBookmarkCheckFill } from "react-icons/bs"
import { MdLibraryBooks, MdMenuBook } from "react-icons/md"
import { BiBookOpen } from "react-icons/bi"
import NonImplemented from "../components/analysis/NonImplemented"
import LastSevenDaysApps from "../components/analysis/LastSevenDaysApps"
import LastSevenDaysRevenue from "../components/analysis/LastSevenDaysRevenue"


const Page = () => {
    const data: any = useContext(DataContext)
    // const [lastSevenDaysDates, setLastSevenDaysDates] = useState<any>([]);
    // const [filteredAppsDates, setFilteredAppsDates] = useState<any>([]);
    // const [lastSevenDaysNames, setLastSevenDaysNames] = useState<any>([]);
    // const today: any = new Date();
    // const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // const getLastSevenDays = () => {
    //     const names = [];
    //     const lastSevenDays = [];

    //     for (let i = 0; i < 7; i++) {
    //         const date = new Date(today);
    //         date.setDate(today.getDate() - i);
    //         const dayName = dayNames[date.getDay()];
    //         names.push(dayName);
    //     }

    //     for (let i = 0; i <= 6; i++) { // Adjusted the loop condition to include today
    //         const date = new Date(today);
    //         date.setDate(today.getDate() - i);
            
    //         const year = date.getFullYear();
    //         const month = String(date.getMonth() + 1).padStart(2, '0'); // Zero-pad month
    //         const day = String(date.getDate()).padStart(2, '0'); // Zero-pad day
            
    //         const formattedDate = `${year}/${month}/${day}`;
    //         lastSevenDays.push(formattedDate);
    //     }

    //     names.reverse();
    //     lastSevenDays.reverse();
    //     setLastSevenDaysNames(names);
    //     setLastSevenDaysDates(lastSevenDays);
    //     // lastSevenDaysDates = lastSevenDays
    //     console.log(names);
    //     console.log(lastSevenDays);
    // }
    // const filteredDates = () => {
    //     const apps = data.APPS
    //     const lastSevenDays = [];
    //     for (let i = 0; i < apps.length; i++) {
    //         const date: any = new Date(apps[i].date.replace(/\//g, '-')); // Convert to 'YYYY-MM-DD' format
            
    //         // Calculate the difference in days
    //         const diffTime: any = today - date;
    //         const diffDays = diffTime / (1000 * 60 * 60 * 24);
            
    //         // Check if the date is within the last seven days
    //         if (diffDays >= 0 && diffDays <= 6) {
    //           lastSevenDays.push(apps[i].date);
    //         }
    //     }
    //     const sortedDates = lastSevenDays.map(dateStr => new Date(dateStr.replace(/\//g, '-')))
    //                      .sort((a: any, b: any) => a - b)
    //                      .map(date => date.toISOString().split('T')[0].replace(/-/g, '/'));

    //     console.log(lastSevenDays);
    //     setFilteredAppsDates(sortedDates);
    //     // filteredAppsDates = sortedDates;
    //     console.log(sortedDates);
    // }

    // useEffect(() => {
    //     getLastSevenDays();
    //     filteredDates();
    // },[])

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

            <div className="mt-16 margin flex flex-col gap-24">
                <LastSevenDaysRevenue />
                <LastSevenDaysApps />
                <NonImplemented apps={data.APPS} />
            </div>
       </>
    )
  
}

export default Page