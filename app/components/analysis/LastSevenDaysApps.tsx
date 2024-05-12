'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "@/app/dashboard/layout";
import { Bar } from 'react-chartjs-2';

const LastSevenDaysApps = (props: any) => {
    ChartJS.register(ArcElement, Tooltip, Legend);
    
    const dataContext: any = useContext(DataContext);
    const [lastSevenDaysNames, setLastSevenDaysNames] = useState<any>([]);
    const [lastSevenDaysDates, setLastSevenDaysDates] = useState<any>([]);
    const [filteredAppsDates, setFilteredAppsDates] = useState<any>([]);
    const today: any = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const [ showing, setShowing ] = useState(false)

    const [dayOne, setDayOne] = useState<any>([]);
    const [dayTwo, setDayTwo] = useState<any>([]);
    const [dayThree, setDayThree] = useState<any>([]);
    const [dayFour, setDayFour] = useState<any>([]);
    const [dayFive, setDayFive] = useState<any>([]);
    const [daySix, setDaySix] = useState<any>([]);
    const [daySeven, setDaySeven] = useState<any>([]);
    

    const getLastSevenDays = () => {
        const names = [];
        const lastSevenDays = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dayName = dayNames[date.getDay()];
            names.push(dayName);
        }

        for (let i = 0; i <= 6; i++) { // Adjusted the loop condition to include today
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Zero-pad month
            const day = String(date.getDate()).padStart(2, '0'); // Zero-pad day
            
            const formattedDate = `${year}/${month}/${day}`;
            lastSevenDays.push(formattedDate);
        }

        names.reverse();
        lastSevenDays.reverse();
        setLastSevenDaysNames(names);
        setLastSevenDaysDates(lastSevenDays);
        console.log(names);
        console.log(lastSevenDays);
    }

        // Function to check if a date is within the last seven days
    function isWithinLastSevenDays(date: any, today: any) {
        const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
        const diffTime = today.getTime() - date.getTime(); // Get time difference in milliseconds

        // Convert time difference to days
        const diffDays = Math.round(diffTime / oneDay);

        return diffDays >= 0 && diffDays <= 6;
    }

    const filteredDates = async () => {
        const apps = dataContext.APPS
        const lastSevenDays: any = [];
        
        for (let i = 0; i < apps.length; i++) {
            const date: any = new Date(apps[i].date.replace(/\//g, '-')); // Convert to 'YYYY-MM-DD' format
            
            if (isWithinLastSevenDays(date, today)) {
                lastSevenDays.push(apps[i].date);
            }
        }
        const sortedDates = lastSevenDays.map((dateStr: any) => new Date(dateStr.replace(/\//g, '-')))
                         .sort((a: any, b: any) => a - b)
                         .map((date: any) => date.toISOString().split('T')[0].replace(/-/g, '/'));

        setFilteredAppsDates(sortedDates);
        
    }

const dividedAppsDates = () => {
    let dayOne = []
    let dayTwo = []
    let dayThree = []
    let dayFour = []
    let dayFive = []
    let daySix = []
    let daySeven = []

       

            for (let i = 0; i < filteredAppsDates.length; i++) {
                for (let j = 0; j < lastSevenDaysDates.length; j++) {
                    if (filteredAppsDates[i] === lastSevenDaysDates[j]) {
                        switch (j) {
                            case 0:
                                dayOne.push(filteredAppsDates[i]);
                                break;
                            case 1:
                                dayTwo.push(filteredAppsDates[i]);
                                break;
                            case 2:
                                dayThree.push(filteredAppsDates[i]);
                                break;
                            case 3:
                                dayFour.push(filteredAppsDates[i]);
                                break;
                            case 4:
                                dayFive.push(filteredAppsDates[i]);
                                break;
                            case 5:
                                daySix.push(filteredAppsDates[i]);
                                break;
                            case 6:
                                daySeven.push(filteredAppsDates[i]);
                                break;
                            
                        }
                    }
                }
            }
            
           
            setDayOne(dayOne)
            setDayTwo(dayTwo)
            setDayThree(dayThree)
            setDayFour(dayFour)
            setDayFive(dayFive)
            setDaySix(daySix)
            setDaySeven(daySeven)

    }

    useEffect(() => {
        getLastSevenDays();
        filteredDates();
       
         console.log(filteredAppsDates)
        return () => {
             if (filteredAppsDates.length === 0) {
            console.log(filteredAppsDates)
          console.log('Stopping effect...');
        }
      };
    }, [])

    const data = {
        labels: lastSevenDaysNames,
        datasets: [{
          label: 'Applications',
          data: [dayOne.length, dayTwo.length, dayThree.length, dayFour.length, dayFive.length, daySix.length, daySeven.length],
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
    <div className="my-9 h-[350px] flex justify-between items-center">
        <div className="px-7">
            <div>
                <p className="main-color text-5xl font-bold">Applications</p>
                <p className="text-gray-500 text-base ml-3">this chart shows the submitted applications for the last seven days</p>
            </div>

            <div className="m-6">
                {(!showing && filteredAppsDates.length === 0) && 
                    <button onClick={() => {
                        filteredDates();
                        setShowing(true);
                    }} className="cta">
                        <span>Calculate</span>
                        <svg width="15px" height="10px" viewBox="0 0 13 10">
                            <path d="M1,5 L11,5"></path>
                            <polyline points="8 1 12 5 8 9"></polyline>
                        </svg>
                    </button>
                }            

            {(filteredAppsDates.length !== 0) &&
                <button className="simple-btn" onClick={dividedAppsDates}>Show Result</button>
            }

            </div>
        </div>

        <Bar data={data} />
    </div>
  )
}

export default LastSevenDaysApps