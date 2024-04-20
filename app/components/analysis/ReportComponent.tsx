'use client'
import { useRef, useState, useContext } from "react";
import { DataContext } from "@/app/dashboard/layout";
const ReportComponent = () => {
    const dataContext: any = useContext(DataContext);

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    // const date_from: any = useRef()
    // const date_to: any = useRef()
    const handleFromDateChange = (e: any) => {
        setFromDate(e.target.value)
    }
    const handleToDateChange = (e: any) => {
        setToDate(e.target.value)
    }
    const handleFilter = () => {

        const filteredData = dataContext.APPS.filter((app: any) => {

          const appStartDate = new Date(app.date_from);
          const appEndDate = new Date(app.date_to);
          const selectedFromDate = new Date(fromDate);
          const selectedToDate = new Date(toDate);
    
          return (
            appStartDate >= selectedFromDate && appEndDate <= selectedToDate
          );
        });
    
        console.log(filteredData);
        // You can set filteredData to state or use it as needed
    };

    function PersonsWithApplications() {
        
        // Create a new array combining person data with applications
        const personsWithApplications = dataContext.trainees.reduce((acc: any, person: any) => {
          const personApplications = dataContext.APPS.filter(
            (app: any) => app.person_id === person.person_id &&
            new Date(app.date_from) >= new Date(fromDate) &&
            new Date(app.date_to) <= new Date(toDate)
          );
      
          if (personApplications.length > 0) {
            acc.push({
              ...person,
              applications: personApplications.map((app: any) => app),
            });
          }
      
          return acc;

        }, []);

        console.log(personsWithApplications)
    }
  return (
    <div>
        <div className="flex justify-between items-center p-14">
            <div className="w-1/3">
                <p className="main-color text-4xl font-black">Reports</p>
                <p className="text-base text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam inventore id earum?</p>
            </div>
            <div>
                
                    <div className="flex justify-between gap-14 my-7">
                        <div className="flex gap-2">
                            <label className="main-color text-xl font-black">From</label>
                            <input value={fromDate} onChange={handleFromDateChange} className="select-form" type="date" />
                        </div>
                        <div className="flex gap-2">
                            <label className="main-color text-xl font-black">To</label>
                            <input value={toDate} onChange={handleToDateChange} className="select-form" type="date" />
                        </div>
                    </div>
                
                <div>
                    <button className="cta" onClick={PersonsWithApplications}>
                        <span>Start</span>
                        <svg width="15px" height="10px" viewBox="0 0 13 10">
                            <path d="M1,5 L11,5"></path>
                            <polyline points="8 1 12 5 8 9"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReportComponent