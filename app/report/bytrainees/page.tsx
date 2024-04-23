'use client'
import { useContext, useEffect, useState } from 'react'
import { ReportContext } from '@/app/layout'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Bar } from 'react-chartjs-2';

const Page = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const reportContext: any = useContext(ReportContext);
    const data = reportContext.reportByTraineesData
    const [ traineesWithProject, setTraineesWithProject ] = useState(data);

    const [ revenue, setRevenue ] = useState<any>([]);
    const [ expense, setExpense ] = useState<any>([]);

    let rev: number = revenue.reduce((acc: any, current: any) => acc + current, 0)
    let exp: number = expense.reduce((acc: any, current: any) => acc + current, 0)
    let profit = rev - exp;

    function formatNumberInEGP(amount: any) {
        const formattedAmount = amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
         // Remove the last two zeros
        const trimmedAmount = formattedAmount.replace(/(\.00)$/, '');
        return `${trimmedAmount} EGP`;
    }
    const calculateTotalRevenue = () => {
        let rev: any = []
        let exp: any = []
        data.map((e: any) => {
            e.trainees.map((trainee: any) => {
                trainee.applications.map((app: any) => {
                    rev.push(app.course_fees)
                    exp.push((app.break_cost + app.instructor_fees + app.tools))
                })
            })
        })
        setRevenue(rev)
        setExpense(exp)
    }

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
    console.log(data)
    useEffect(() => {
        calculateTotalRevenue();
    }, [])
  return (
    <div className='p-4'>
        <div className='mx-auto mb-11 mt-4'>
            <p className='text-black font-bold text-xl text-center'>Number of trainees</p>
            <div className='h-[350px] w-[70%] mx-auto flex justify-center'>
                <Bar data={chartData} />
            </div>
        </div>
        <div className='mx-auto mb-16'>
            <p className='text-black font-bold text-base text-center mb-5'>Comparison between expenses and revenue for the given time frame</p>
            <div>
                <table className='border-black border w-[80%] mx-auto'>
                    <thead>
                        <tr className='text-xl bg-gray-200 h-10 border-b-2 border-black'>
                            <th>Revenue</th>
                            <th className='border-x-2 border-black'>Expenses</th>
                            <th>Profit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-center font-semibold text-base text-black h-14'>
                            <td>{formatNumberInEGP(rev)}</td>
                            <td className='border-x-2 border-black'>
                                {formatNumberInEGP(exp)}
                            </td>
                            <td>{formatNumberInEGP(profit)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div>
          {/* <p className="main-color text-4xl font-black w-fit mx-auto my-11">Report Result</p> */}
          {traineesWithProject.map((trainee: any) => (

          <div key={trainee.project} className="w-[100%] mx-auto">
            <p className="text-black text-2xl font-black w-fit mx-auto my-2 uppercase">{trainee.project}</p>
            {trainee.trainees.map((trainee: any) => (
              <div key={trainee} className="my-6">
                  <div className="flex flex-col gap-1">
                    <p className="text-black text-xl font-black capitalize">{trainee.name}</p>
                    {/* <p className="text-black text-2xl font-black capitalize">ID: {trainee.person_id}</p> */}
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