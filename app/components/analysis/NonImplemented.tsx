'use client'
import Link from "next/link";
import { IoIosShareAlt } from "react-icons/io";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { FaClockRotateLeft } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@/app/dashboard/layout";
import axios from "axios";
import { toast } from "react-toastify";

const NonImplemented = (props: any) => {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const dataContext = useContext<any>(DataContext);
    const [runEffect, setRunEffect] = useState(true);
    const today = new Date().setHours(0, 0, 0, 0);
    const [ completedApps, setCompletedApps ] = useState([]);

    const changeAppStatusToImplemented = async (id: any) => {
        let data = {
            status: 'implemented'
        }
        let updatedAllApps = [...dataContext.APPS]

        await axios.put(`/api/apps/${id}`, data).then(() => {
            toast.success('Status updated successfully')
            let toUpdate = updatedAllApps.findIndex((i: any) => i.id === id)
                if (toUpdate !== -1) {
                   
                    updatedAllApps[toUpdate] = {...updatedAllApps[toUpdate],
                        ...data
                    }
                }

            setCompletedApps(completedApps.filter((app: any) => app.id !== id))
            dataContext.setAPPS(updatedAllApps)
        }).catch((error) => console.log(error))
    }

    const changeAllToImplemented = () => {
        let data = {
            status: 'implemented'
        }
        let updatedAllApps = [...dataContext.APPS]

        completedApps.map(async (app: any) => {
            await axios.put(`/api/apps/${app.id}`, data).then(() => {
                toast.success('Status updated successfully')
                let toUpdate = updatedAllApps.findIndex((i: any) => i.id === app.id)
                    if (toUpdate !== -1) {
                       
                        updatedAllApps[toUpdate] = {...updatedAllApps[toUpdate],
                            ...data
                        }
                    }
    
                dataContext.setAPPS(updatedAllApps)
            }).catch((error) => console.log(error))
        })
        setRunEffect(false)
        setCompletedApps([])
    }

    useEffect(() => {
        if (runEffect) {
            setCompletedApps(dataContext.APPS.filter((app: any) => (new Date(app.date_to).setHours(0, 0, 0, 0) < today && app.status === 'not implemented')))
        }
    }, [dataContext.APPS, today])


if (completedApps.length > 0) {

  return (
    <div className="flex flex-col justify-center mb-14">
            <div className="m-6 text-center">
                <p className="main-color text-5xl font-black">Completed Applications</p>
                <p className="text-base ml-3 mt-2 text-gray-500">you must change the status for this application because it is complete</p>
            </div>
            
            <button className="button w-fit my-4 mx-auto" onClick={() => {
                changeAllToImplemented();
            }}>
                <span className="button-content text-xl font-bold">Apply all as <span className="text-gold ">Implemented</span></span>
            </button>

            <div className="h-auto w-[90%] mx-auto">
                <div className="h-[400px] overflow-y-scroll max-md:h-auto">
                    <table className="admin-table w-[96%]">
                        <thead>
                            <tr>
                                <th className="admin-th">Course Name</th>
                                <th className="admin-th">Days</th>
                                <th className="admin-th">End date</th>
                                <th className="admin-th">Status</th>
                                <th className="admin-th"></th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            
                                {
                                    completedApps.map((e: any) => (
                                    <tr key={e.id} className="admin-tr">
                                        <td className="admin-td relative">
                                            <Link href={`/dashboard/trainees/${e.person_id}`} >
                                                {e.course}
                                                <p className="text-gold text-2xl font-black absolute top-4 left-6"><IoIosShareAlt /></p>
                                            </Link>
                                        </td>
                                        <td className="admin-td">{e.days}</td>
                                        <td className="admin-td">{e.date_to}</td>
                                        <td className="admin-td">{e.status}</td>
                                        <td className="text-2xl font-black ">
                                            <div className="flex justify-center gap-5 row-buttons">
                                                <FaClockRotateLeft className="cursor-pointer text-gray-500" onClick={() => changeAppStatusToImplemented(e.id)} />                                               
                                            </div>
                                        </td>
                                    </tr>
                                
                                    ))
                                }
                                    
                                
                        </tbody>
                    </table>
                </div>
                
            </div>
            
    </div>
  )
}
}

export default NonImplemented