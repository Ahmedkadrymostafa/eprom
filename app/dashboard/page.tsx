"use client"
import { useContext } from "react"
import { DataContext } from "./layout"
import NonImplemented from "../components/analysis/NonImplemented"
import LastSevenDaysApps from "../components/analysis/LastSevenDaysApps"
import LastSevenDaysRevenue from "../components/analysis/LastSevenDaysRevenue"
import ReportComponent from "../components/analysis/ReportComponent"
import ApplicationsFinance from "../components/analysis/ApplicationsFinance"


const Page = () => {
    const data: any = useContext(DataContext)
   
    return (
       <>
            
            <div className="mt-16 margin flex flex-col gap-16">
                <ApplicationsFinance />
                <LastSevenDaysRevenue />
                <LastSevenDaysApps />
                <NonImplemented apps={data.APPS} />
                <ReportComponent />
            </div>
       </>
    )
  
}

export default Page