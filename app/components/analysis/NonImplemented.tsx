'use client'
import Link from "next/link";
import { IoIosShareAlt } from "react-icons/io";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { FaClockRotateLeft } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@/app/dashboard/layout";
import axios from "axios";
import { toast } from "react-toastify";

const NonImplemented = (props: any) => {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const dataContext = useContext<any>(DataContext);

    const today = new Date().setHours(0, 0, 0, 0);
    // console.log(today)
    const [ completedApps, setCompletedApps ] = useState([]);

    
    // const nonImplementedApps = props.apps.filter((app: any) => app.status === 'not implemented');
    // const implementedApps = props.apps.filter((app: any) => app.status === 'implemented');
    // console.log(nonImplementedApps)
    // console.log(implementedApps)

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
    
                // setCompletedApps(completedApps.filter((app: any) => app.id !== app.id))
                dataContext.setAPPS(updatedAllApps)
            }).catch((error) => console.log(error))
        })

        setCompletedApps([])
    }

    useEffect(() => {
        setCompletedApps(dataContext.APPS.filter((app: any) => (new Date(app.date_to).setHours(0, 0, 0, 0) < today && app.status === 'not implemented')))
    }, [])

    // const data = {
    //     labels: ['Not implemented', 'Implemented',],
    //     datasets: [
    //       {
    //         label: 'number',
    //         data: [nonImplementedApps.length, implementedApps.length],
    //         backgroundColor: [
    //           'rgba(255, 99, 132, 0.2)',
    //           'rgba(75, 192, 192, 0.2)',
    //         ],
    //         borderColor: [
    //           'rgba(255, 99, 132, 1)',
    //           'rgba(75, 192, 192, 1)',
    //         ],
    //         borderWidth: 1,
    //       },
    //     ],
    //   };

if (completedApps.length > 0) {

  return (
    <div className="flex flex-col justify-center">
            <div className="m-6 text-center">
                <p className="main-color text-5xl font-black">Completed Courses</p>
                <p className="text-base ml-3 mt-2 text-gray-500">you must change the status for this course because it is complete</p>
            </div>
            
            <button className="button w-fit my-4 mx-auto" onClick={() => {
                changeAllToImplemented();
            }}>
                <span className="button-content text-xl font-bold">Apply all as <span className="text-gold ">Implemented</span></span>
            </button>

            <div className="h-auto max-h-[360px] w-[90%] mx-auto">
                <div className="overflow-y-scroll max-md:h-auto">
                    <table className="admin-table w-[96%]">
                        <thead>
                            <tr>
                                <th className="admin-th">Trainee Name</th>
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
                                                {e.person_name}
                                                <p className="text-gold text-2xl font-black absolute top-4 left-6"><IoIosShareAlt /></p>
                                            </Link>
                                        </td>
                                        <td className="admin-td">{e.course}</td>
                                        <td className="admin-td">{e.days}</td>
                                        <td className="admin-td">{e.date_to}</td>
                                        <td className="admin-td">{e.status}</td>
                                        <td className="text-2xl font-black ">
                                            <div className="flex justify-center gap-5 row-buttons">
                                                {/* {e.status === 'implemented' && <FaCheckCircle className="cursor-pointer text-green-500" onClick={() => changeAppStatusToNotImplemented(app.id)} />} */}
                                                <FaClockRotateLeft className="cursor-pointer text-gray-500" onClick={() => changeAppStatusToImplemented(e.id)} />
                                                
                                            </div>
                                        </td>
                                    </tr>
                                
                                    ))
                                }
                                    
                                
                        </tbody>
                    </table>
                </div>

                {/* <div className="">
                    <Doughnut data={data} />
                </div> */}
            </div>
            
    </div>
  )
}
}

export default NonImplemented