import Link from "next/link";
import { IoIosShareAlt } from "react-icons/io";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";


const NonImplemented = (props: any) => {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const today = new Date().setHours(0, 0, 0, 0);
    // console.log(today)
    const completedApps = props.apps.filter((app: any) => (new Date(app.date_to).setHours(0, 0, 0, 0) < today && app.status === 'not implemented'))
    const nonImplementedApps = props.apps.filter((app: any) => app.status === 'not implemented');
    const implementedApps = props.apps.filter((app: any) => app.status === 'implemented');
    // console.log(nonImplementedApps)
    // console.log(implementedApps)

    const data = {
        labels: ['Not implemented', 'Implemented',],
        datasets: [
          {
            label: 'number',
            data: [nonImplementedApps.length, implementedApps.length],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

  return (
    <div>
            <div className="m-6">
                <p className="main-color text-5xl font-black">Completed Courses</p>
                <p className="text-base ml-3 mt-2 text-gray-500">you must change the status for this course because it is complete</p>
            </div>

            <div className="flex justify-evenly h-auto max-h-[360px]">
                <div className="overflow-y-scroll max-md:h-auto">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th className="admin-th">Course Name</th>
                                <th className="admin-th">Days</th>
                                <th className="admin-th">End date</th>
                                <th className="admin-th">Status</th>
                                
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
                                        
                                    </tr>
                                
                                    ))
                                }
                                    
                                
                        </tbody>
                    </table>
                </div>

                <div className="">
                    <Doughnut data={data} />
                </div>
            </div>
            
    </div>
  )
}

export default NonImplemented