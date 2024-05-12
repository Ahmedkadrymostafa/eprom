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
   

    const dataContext: any = useContext(DataContext);
    
    const [ janRev, setJanRev ] = useState(0);
    const [ janExp, setJanExp ] = useState(0);
    const [ janProfit, setJanProfit ] = useState(0);
    
    const [ fepRev, setFepRev ] = useState(0);
    const [ fepExp, setFepExp ] = useState(0);
    const [ fepProfit, setFepProfit ] = useState(0);

    const [ marRev, setMarRev ] = useState(0);
    const [ marExp, setMarExp ] = useState(0);
    const [ marProfit, setMarProfit ] = useState(0);

    const [ aprilRev, setAprilRev ] = useState(0);
    const [ aprilExp, setAprilExp ] = useState(0);
    const [ aprilProfit, setAprilProfit ] = useState(0);

    const [ mayRev, setMayRev ] = useState(0);
    const [ mayExp, setMayExp ] = useState(0);
    const [ mayProfit, setMayProfit ] = useState(0);
    
    const [ juneRev, setJuneRev ] = useState(0);
    const [ juneExp, setJuneExp ] = useState(0);
    const [ juneProfit, setJuneProfit ] = useState(0);

    const [ julyRev, setJulyRev ] = useState(0);
    const [ julyExp, setJulyExp ] = useState(0);
    const [ julyProfit, setJulyProfit ] = useState(0);

    const [ augRev, setAugRev ] = useState(0);
    const [ augExp, setAugExp ] = useState(0);
    const [ augProfit, setAugProfit ] = useState(0);

    const [ sepRev, setSepRev ] = useState(0);
    const [ sepExp, setSepExp ] = useState(0);
    const [ sepProfit, setSepProfit ] = useState(0);
    
    const [ octRev, setOctRev ] = useState(0);
    const [ octExp, setOctExp ] = useState(0);
    const [ octProfit, setOctProfit ] = useState(0);

    const [ novRev, setNovRev ] = useState(0);
    const [ novExp, setNovExp ] = useState(0);
    const [ novProfit, setNovProfit ] = useState(0);

    const [ decRev, setDecRev ] = useState(0);
    const [ decExp, setDecExp ] = useState(0);
    const [ decProfit, setDecProfit ] = useState(0);

    useEffect(() => {
      const currentYear = new Date().getFullYear();
  
      const filteredCourses = dataContext.courses.filter((course: any) => {
          const year = parseInt(course.date_from.split('/')[0])
          return (course.course_status === 'implemented' && year === currentYear)
      });
      
    const jan = filteredCourses.filter((course: any) => {
      const courseMonth = new Date(course.date_from).getMonth() + 1;
      return courseMonth === 1;
    })
    const fep = filteredCourses.filter((course: any) => {
      const courseMonth = new Date(course.date_from).getMonth() + 1;
      return courseMonth === 2;
    })
    const mar = filteredCourses.filter((course: any) => {
      const courseMonth = new Date(course.date_from).getMonth() + 1;
      return courseMonth === 3;
    })
    const april = filteredCourses.filter((course: any) => {
      const courseMonth = new Date(course.date_from).getMonth() + 1;
      return courseMonth === 4;
    })
    const may = filteredCourses.filter((course: any) => {
      const courseMonth = new Date(course.date_from).getMonth() + 1;
      return courseMonth === 5;
    })
    const june = filteredCourses.filter((course: any) => {
      const courseMonth = new Date(course.date_from).getMonth() + 1;
      return courseMonth === 6;
    })
    const july = filteredCourses.filter((course: any) => {
      const courseMonth = new Date(course.date_from).getMonth() + 1;
      return courseMonth === 7;
    })
    const aug = filteredCourses.filter((course: any) => {
      const courseMonth = new Date(course.date_from).getMonth() + 1;
      return courseMonth === 8;
    })
    const sep = filteredCourses.filter((course: any) => {
      const courseMonth = new Date(course.date_from).getMonth() + 1;
      return courseMonth === 9;
    })
    const oct = filteredCourses.filter((course: any) => {
      const courseMonth = new Date(course.date_from).getMonth() + 1;
      return courseMonth === 10;
    })
    const nov = filteredCourses.filter((course: any) => {
      const courseMonth = new Date(course.date_from).getMonth() + 1;
      return courseMonth === 11;
    })
    const dec = filteredCourses.filter((course: any) => {
      const courseMonth = new Date(course.date_from).getMonth() + 1;
      return courseMonth === 12;
    })

    setJanRev(jan.reduce((acc: number, cur: any) => acc + parseInt(cur.total_revenue), 0))
    setJanExp(jan.reduce((acc: number, cur: any) => acc + parseInt(cur.total_expenses), 0))
    setJanProfit(jan.reduce((acc: number, cur: any) => acc + parseInt(cur.net_revenue), 0))

    setFepRev(fep.reduce((acc: number, cur: any) => acc + parseInt(cur.total_revenue), 0))
    setFepExp(fep.reduce((acc: number, cur: any) => acc + parseInt(cur.total_expenses), 0))
    setFepProfit(fep.reduce((acc: number, cur: any) => acc + parseInt(cur.net_revenue), 0))

    setMarRev(mar.reduce((acc: number, cur: any) => acc + parseInt(cur.total_revenue), 0))
    setMarExp(mar.reduce((acc: number, cur: any) => acc + parseInt(cur.total_expenses), 0))
    setMarProfit(mar.reduce((acc: number, cur: any) => acc + parseInt(cur.net_revenue), 0))

    setAprilRev(april.reduce((acc: number, cur: any) => acc + parseInt(cur.total_revenue), 0))
    setAprilExp(april.reduce((acc: number, cur: any) => acc + parseInt(cur.total_expenses), 0))
    setAprilProfit(april.reduce((acc: number, cur: any) => acc + parseInt(cur.net_revenue), 0))

    setMayRev(may.reduce((acc: number, cur: any) => acc + parseInt(cur.total_revenue), 0))
    setMayExp(may.reduce((acc: number, cur: any) => acc + parseInt(cur.total_expenses), 0))
    setMayProfit(may.reduce((acc: number, cur: any) => acc + parseInt(cur.net_revenue), 0))
    
    setJuneRev(june.reduce((acc: number, cur: any) => acc + parseInt(cur.total_revenue), 0))
    setJuneExp(june.reduce((acc: number, cur: any) => acc + parseInt(cur.total_expenses), 0))
    setJuneProfit(june.reduce((acc: number, cur: any) => acc + parseInt(cur.net_revenue), 0))

    setJulyRev(july.reduce((acc: number, cur: any) => acc + parseInt(cur.total_revenue), 0))
    setJulyExp(july.reduce((acc: number, cur: any) => acc + parseInt(cur.total_expenses), 0))
    setJulyProfit(july.reduce((acc: number, cur: any) => acc + parseInt(cur.net_revenue), 0))

    setAugRev(aug.reduce((acc: number, cur: any) => acc + parseInt(cur.total_revenue), 0))
    setAugExp(aug.reduce((acc: number, cur: any) => acc + parseInt(cur.total_expenses), 0))
    setAugProfit(aug.reduce((acc: number, cur: any) => acc + parseInt(cur.net_revenue), 0))

    setSepRev(sep.reduce((acc: number, cur: any) => acc + parseInt(cur.total_revenue), 0))
    setSepExp(sep.reduce((acc: number, cur: any) => acc + parseInt(cur.total_expenses), 0))
    setSepProfit(sep.reduce((acc: number, cur: any) => acc + parseInt(cur.net_revenue), 0))

    setOctRev(oct.reduce((acc: number, cur: any) => acc + parseInt(cur.total_revenue), 0))
    setOctExp(oct.reduce((acc: number, cur: any) => acc + parseInt(cur.total_expenses), 0))
    setOctProfit(oct.reduce((acc: number, cur: any) => acc + parseInt(cur.net_revenue), 0))

    setNovRev(nov.reduce((acc: number, cur: any) => acc + parseInt(cur.total_revenue), 0))
    setNovExp(nov.reduce((acc: number, cur: any) => acc + parseInt(cur.total_expenses), 0))
    setNovProfit(nov.reduce((acc: number, cur: any) => acc + parseInt(cur.net_revenue), 0))


    setDecRev(dec.reduce((acc: number, cur: any) => acc + parseInt(cur.total_revenue), 0))
    setDecExp(dec.reduce((acc: number, cur: any) => acc + parseInt(cur.total_expenses), 0))
    setDecProfit(dec.reduce((acc: number, cur: any) => acc + parseInt(cur.net_revenue), 0))
  
    }, [dataContext.courses])


     const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Monthly financial statements for courses during the current year',
          },
        },
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
     const data = {
        labels,
        datasets: [
          {
            label: 'Revenue',
            data: [janRev, fepRev, marRev, aprilRev, mayRev, juneRev, julyRev, augRev, sepRev, octRev, novRev, decRev],
            borderColor: 'rgb(187, 223, 255)',
            backgroundColor: 'rgb(187, 223, 255)',
          },
          {
            label: 'Expenses',
            data: [janExp, fepExp, marExp, aprilExp, mayExp, juneExp, julyExp, augExp, sepExp, octExp, novExp, decExp],
            borderColor: 'rgb(228, 255, 0)',
            backgroundColor: 'rgba(228, 255, 0, 0.42)',
          },
          {
            label: 'Profit',
            data: [janProfit, fepProfit, marProfit, aprilProfit, mayProfit, juneProfit, julyProfit, augProfit, sepProfit, octProfit, novProfit, decProfit],
            borderColor: 'rgb(0, 255, 0)',
            backgroundColor: 'rgba(0, 255, 0, 0.4)',
          },
          
        ],
      };
  
  return (
    <div className="glass h-[540px] p-5 flex justify-center">
        <Line options={options} data={data} />
    </div>
  )
}

export default LastSevenDaysRevenue