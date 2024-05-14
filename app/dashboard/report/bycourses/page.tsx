'use client'
import { ReportContext } from "@/app/dashboard/layout"
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
        const filteredImplementedCourses: any = reportContext?.reportByCoursesData?.filter((course: any) => {
            return (course.course_status === 'implemented')
        });
        const filteredNotImplementedCourses: any = reportContext?.reportByCoursesData?.filter((course: any) => {
            return (course.course_status === 'not implemented')
        });

        setImplemented(filteredImplementedCourses)
        setNotImplemented(filteredNotImplementedCourses)
        setProgress(((filteredImplementedCourses.length / (filteredImplementedCourses.length + filteredNotImplementedCourses.length)) * 100).toFixed(1))

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

            <div className='mx-auto mb-16 w-full'>
                <p className='text-black font-bold text-base text-center mb-5'>Comparison between expenses and revenue for the given time frame included profit</p>
                <div>
                    <table className='border-black border w-[80%] mx-auto'>
                        <thead>
                            <tr className='text-xl bg-gray-200 h-10 border-b-2 border-black'>
                                <th>Revenue</th>
                                <th className='border-x-2 border-black'>Expenses</th>
                                <th className="border-r-2 border-black">Profit</th>
                                <th>Profit Ratio</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='text-center font-semibold text-base text-black h-14'>
                                <td>{formatNumberInEGP(implementedRevenue)}</td>
                                <td className='border-x-2 border-black'>
                                    {formatNumberInEGP(implementedExpenses)}
                                </td>
                                <td className="border-r-2 border-black">{formatNumberInEGP(implementedNetRevenue)}</td>
                                <td>{((implementedNetRevenue / implementedRevenue) * 100).toFixed(1)} %</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        <div>
            <p className='text-black font-bold text-xl text-center mb-8'>Implemented Courses View</p>
            
            <table className="w-full">
                <thead className="bg-gray-200 h-12 border border-black">
                    <tr className="text-black text-base font-bold">
                        <th className="text-left">Course Title</th>
                        <th>from</th>
                        <th>to</th>
                        <th>revenue</th>
                        <th>expenses</th>
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
                                <td>{course.total_revenue}</td>
                                <td>{course.total_expenses}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
        </div>
        <div>
            <p className='text-black font-bold text-xl text-center mb-8'>Not Implemented Courses View</p>
            
            <table className="w-full mx-auto p-2">
                <thead className="bg-gray-200 border border-black">
                    <tr className="text-black h-12 text-base font-bold">
                        <th className="w-1/2 text-left">Course Title</th>
                        <th>from</th>
                        <th>to</th>
                        <th>location</th>
                       
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