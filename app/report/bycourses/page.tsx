'use client'
import { ReportContext } from "@/app/layout"
import { useContext, useEffect, useState } from "react"
import formatNumberInEGP from "@/app/helpers/FormatNumInEGP"

const Page = () => {
    const reportContext = useContext(ReportContext)
    
    const [ implemented, setImplemented ] = useState([]);
    const [ NotImplemented, setNotImplemented ] = useState([]);
    const [ progress, setProgress ] = useState<any>();

    const [implementedRevenue, setImplementedRevenue] = useState<number>(0);
    const [implementedExpenses, setImplementedExpenses] = useState<number>(0);
    const [implementedNetRevenue, setImplementedNetRevenue] = useState<number>(0);

    useEffect(() => {
        const filteredImplementedCourses = reportContext.reportByCoursesData.filter((course: any) => {
            return (course.course_status === 'implemented')
        });
        const filteredNotImplementedCourses = reportContext.reportByCoursesData.filter((course: any) => {
            return (course.course_status === 'not implemented')
        });

        setImplemented(filteredImplementedCourses)
        setNotImplemented(filteredNotImplementedCourses)
        setProgress((filteredImplementedCourses.length / (filteredImplementedCourses.length + filteredNotImplementedCourses.length)) * 100)

        const implementedRev = filteredImplementedCourses.reduce((acc: any, course: any) => acc + parseInt(course.total_revenue), 0);
        const implementedExp = filteredImplementedCourses.reduce((acc: any, course: any) => acc + parseInt(course.total_expenses), 0);
        const implementedNet = filteredImplementedCourses.reduce((acc: any, course: any) => acc + parseInt(course.net_revenue), 0);
        setImplementedRevenue(implementedRev);
        setImplementedExpenses(implementedExp);
        setImplementedNetRevenue(implementedNet);

    }, [reportContext.reportByCoursesData])

  return (
    <div className='flex flex-col gap-12 m-5'>
        <p className='text-black font-bold text-3xl text-center'>Courses Report</p>
        <div className='flex flex-col gap-10 items-center'>
            <div className='flex justify-between gap-10'>
                <div className="flex flex-col gap-5">
                    <p className='text-black text-base font-bold border border-black py-5 px-5 flex justify-center items-center gap-4'>Implemented Courses: <span className='text-xl'>{implemented.length}</span></p>
                    <p className='text-black text-base font-bold border border-black py-5 px-5 flex justify-center items-center gap-4'>Not Implemented Courses: <span className='text-xl'>{NotImplemented.length}</span></p>
                </div>
                <p className='text-black text-base w-fit h-fit m-auto font-bold border border-black py-5 px-5 flex justify-center items-center gap-4'>Progress: <span className='text-xl'>{progress} %</span></p>
            </div>
            <div className="my-6">
                <p className='text-black text-xl font-bold mb-4 text-center'>Total financial data for the selected period</p>
                <div className='flex items-center gap-6'>
                        <div className='flex flex-col border border-black text-center'>
                            <p className='text-black text-base font-black border-b border-black py-2 px-3'>Revenue</p>
                            <span className='text-base main-color font-bold p-3'>{formatNumberInEGP(implementedRevenue)}</span>
                        </div>
                        <div className='flex flex-col border border-black text-center'>
                            <p className='text-black text-base font-black border-b border-black py-2 px-3'>Expenses</p>
                            <span className='text-base main-color font-bold p-3'>{formatNumberInEGP(implementedExpenses)}</span>
                        </div>
                    {/* <div className="flex gap-4">
                    </div> */}
                    <div className='flex flex-col border border-black text-center'>
                        <p className='text-black text-base font-black border-b border-black py-2 px-3'>Profit</p>
                        <span className='text-base main-color font-bold p-3'>{formatNumberInEGP(implementedNetRevenue)}</span>
                    </div>
                    <div className='flex flex-col border border-black text-center'>
                        <p className='text-black text-base font-black border-b border-black py-2 px-3'>Profit Ratio</p>
                        <span className='text-base main-color font-bold p-3'>{(implementedNetRevenue / implementedRevenue) * 100} %</span>
                    </div>
                    
                </div>
            </div>
        </div>
        <div>
            <p className='text-black font-bold text-xl text-center mb-8'>Implemented Courses View</p>
            
            <table className="w-full">
                <thead className="border h-12 border-black">
                    <tr className="text-black text-base font-bold">
                        <th className="text-left">Course Title</th>
                        <th>from</th>
                        <th>to</th>
                        {/* <th>location</th> */}
                        <th>revenue</th>
                        <th>expenses</th>
                        {/* <th>net revenue</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        implemented.map((course: any) => (
                            <tr key={course.id} className="main-color text-sm font-semibold text-center h-16">
                                <td className="flex gap-1 text-left mt-4 items-center">
                                    <p className="max-w-60">{course.course_title}</p>
                                </td>
                                <td>{course.date_from}</td>
                                <td>{course.date_to}</td>
                                {/* <td>{course.location}</td> */}
                                <td>{course.total_revenue}</td>
                                <td>{course.total_expenses}</td>
                                {/* <td>{course.net_revenue}</td>                             */}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
        </div>
        <div>
            <p className='text-black font-bold text-xl text-center mb-8'>Not Implemented Courses View</p>
            
            <table className="w-full mx-auto p-2">
                <thead>
                    <tr className="text-black h-12 text-base font-bold">
                        <th className="w-1/2 text-left">Course Title</th>
                        <th>from</th>
                        <th>to</th>
                        <th>location</th>
                        {/* <th>revenue</th>
                        <th>expenses</th>
                        <th>net revenue</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        NotImplemented.map((course: any) => (
                            <tr key={course.id} className="main-color text-sm font-semibold text-center h-16">
                                <td className="flex gap-1 mt-4 items-center text-left">
                                    {course.course_title}
                                </td>
                                <td>{course.date_from}</td>
                                <td>{course.date_to}</td>
                                <td>{course.location}</td>
                                {/* <td>{course.total_revenue}</td>
                                <td>{course.total_expenses}</td>
                                <td>{course.net_revenue}</td>                             */}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
        </div>
    </div>
  )
}

export default Page