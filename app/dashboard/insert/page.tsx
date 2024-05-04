'use client'
import { useContext, useState } from "react"
import { DataContext } from "../layout"
import Search from "@/app/components/search/Search";

const Page = () => {
    const dataContext = useContext<any>(DataContext);

    const [ courseToInsert, setCourseToInsert ] = useState<any>({});

    const handleCourseChange = (e: any) => {
        let id = e.target.selectedOptions[0].id;

        let filteredCourse = dataContext.courses.filter((course: any) => course.id === parseInt(id))
        console.log(filteredCourse)
        console.log(id)
        setCourseToInsert(filteredCourse[0])
    }

  return (
    <div className="m-6">
        <p className='main-color text-3xl font-semibold'>Insert Courses To Trainees</p>

        <div className="flex flex-col gap-9">
            
            <div className="w-fit mx-auto flex flex-col justify-center">
                <p className="text-gray-700 text-3xl font-bold w-fit m-7">Choose course to add</p>

                <select className="select-form input" onChange={(e: any) => handleCourseChange(e)}>
                    <option value="please select course">please select course</option>
                {
                    dataContext.courses.map((course: any) => (
                        <option id={course.id} key={course.id}>{course.course_title}</option>
                    ))
                }
                </select>
            </div>
            
            <div className='glass flex flex-col gap-4'>
                <div>
                    <p className='main-color text-2xl font-bold'>Course Title</p>
                    <p className='text-black text-xl font-semibold max-w-60'>{courseToInsert.course_title}</p>
                </div>
                <div className="flex items-center gap-3">
                    <p className='main-color text-xl font-bold'>Price</p>
                    <p className='text-black text-3xl'>{courseToInsert.course_price}</p>
                </div>
                <div className='flex items-center gap-3'>
                    <p className='main-color text-xl font-bold'>From</p>
                    <p className='text-black text-xl'>{courseToInsert.date_from}</p>
                </div>
                <div className='flex items-center gap-3'>
                    <p className='main-color text-xl font-bold'>To</p>
                    <p className='text-black text-xl'>{courseToInsert.date_to}</p>
                </div>
                <div className='flex items-center gap-3'>
                    <p className='main-color text-xl font-bold'>Location</p>
                    <p className='text-black text-2xl'>{courseToInsert.location}</p>
                </div>
                <div className='flex items-center gap-3'>
                    <p className='main-color text-xl font-bold'>Days</p>
                    <p className='text-black text-2xl'>{courseToInsert.days}</p>
                </div>
                <div className="flex items-center gap-12">
                    <div className='flex items-center gap-3'>
                        <p className='main-color text-xl font-bold'>Total hours</p>
                        <p className='text-black text-2xl'>{courseToInsert.total_hours}</p>
                    </div>
                    <p className='text-black font-black text-xl capitalize'>{courseToInsert.status}</p>
                    
                </div>
                
            </div>
        </div>

        <div>
            
        </div>

    </div>
  )
}

export default Page