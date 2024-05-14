'use client'
import { useContext } from 'react'
import { ReportContext } from '@/app/dashboard/layout'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Bar } from 'react-chartjs-2';

const Page = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const reportContext: any = useContext(ReportContext);
    const data: any = reportContext.reportByTraineesData
    

    const chartData = {
        labels: data.map((e: any) => e.project),
        datasets: [{
          label: 'Applications',
          data: data.map((e: any) => e.trainees.length),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      };
    
  return (
    <div className='p-4'>
        <div className='mx-auto mb-11 mt-4'>
            <p className='text-black font-bold text-xl text-center'>Number of trainees</p>
            <div className='h-[350px] w-[70%] mx-auto flex justify-center'>
                <Bar data={chartData} />
            </div>
        </div>
        
        <div>
          {data.map((trainee: any) => (

          <div key={trainee.project} className="w-[100%] mx-auto">
            <p className="text-black text-2xl font-black w-fit mx-auto my-2 uppercase">{trainee.project}</p>
            {trainee.trainees.map((trainee: any) => (
              <div key={trainee} className="my-6">
                  <div className="flex flex-col gap-1">
                    <p className="text-black text-xl font-black capitalize">{trainee.name}</p>
                  </div>
                  <div>
                    <table className="w-full my-2">
                      <thead>
                          <tr className="main-color text-base font-bold p-3 bg-gray-200">
                              <th className="w-1/2 text-left">Course name</th>
                              <th>from</th>
                              <th>to</th>
                              <th>status</th>
                          </tr>
                      </thead>
                      <tbody>

                        {trainee.applications.map((app: any) => (
                          <tr key={app.id} className="text-center text-black text-sm p-3">
                            <td className="w-1/2 text-left">{app.course}</td>
                            <td>{app.date_from}</td>
                            <td>{app.date_to}</td>
                            <td>{app.status}</td>
                          </tr>
                        ))}

                      </tbody>
                    </table>
                    <hr className="w-full h-[1px] bg-black" />
                  </div>
                </div>        
            ))}
      </div>))}

        </div>

    </div>
  )
}

export default Page