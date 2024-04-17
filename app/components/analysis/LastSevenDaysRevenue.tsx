'use client'
import { Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
 } from "chart.js/auto";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "@/app/dashboard/layout";
import { Line } from 'react-chartjs-2';

const LastSevenDaysRevenue = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
      const [lastSevenDaysNames, setLastSevenDaysNames] = useState<any>([]);
      const today: any = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const getLastSevenDays = () => {
        const names = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dayName = dayNames[date.getDay()];
            names.push(dayName);
        }

        names.reverse();
        setLastSevenDaysNames(names);
    }
     const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };
      
      const labels = lastSevenDaysNames
      
     const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: [500, 400, 800, 100, 600, 350, 480],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          
        ],
      };
      useEffect(() => {
        getLastSevenDays();
      }, [])
  return (
    <div className="h-[400px]">
        <Line options={options} data={data} />
    </div>
  )
}

export default LastSevenDaysRevenue