'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { CgSandClock } from "react-icons/cg"
import { MdLibraryAddCheck } from "react-icons/md"

const PlannedCourses = (props: any) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const nonImplementedCourses = props.notImplemented
  const implementedCourses = props.implemented

  const data = {
    labels: ['Not implemented', 'Implemented',],
    datasets: [
      {
        label: 'Count',
        data: [nonImplementedCourses.length, implementedCourses.length],
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
    <div className="pt-14">
        <p className="main-color text-3xl font-semibold my-5">Overview about planned courses status</p>
        <div className="flex justify-between items-center">

            <div className="w-1/2 flex flex-col gap-8">
              <div className="lightblue-color flex justify-between items-center rounded-3xl p-7">
                <div>
                  <p className="main-color text-2xl font-bold">Implemented Courses</p>
                  <p className="text-black text-4xl font-semibold mx-6 mt-6">{implementedCourses.length}</p>
                </div>
                <p className="text-green-600 text-6xl"><MdLibraryAddCheck /></p>
              </div>
              <div className="lightred-color flex justify-between items-center rounded-3xl p-7">
                <div>
                  <p className="main-color text-2xl font-bold">Not Implemented Courses</p>
                  <p className="text-black text-4xl font-semibold mx-6 mt-6">{nonImplementedCourses.length}</p>
                </div>
                <p className="text-gray-500 text-6xl"><CgSandClock /></p>
              </div>
              
            </div>

            <div>
              <Doughnut data={data} />
            </div>
        </div>
    </div>
  )
}

export default PlannedCourses