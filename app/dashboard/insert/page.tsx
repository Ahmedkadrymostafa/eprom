'use client'
import { useContext, useRef, useState } from "react"
import { DataContext } from "../layout"
import Search from "@/app/components/search/Search";
import { FaSearch } from "react-icons/fa";
import { RiUserShared2Fill } from "react-icons/ri";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

type course = {
    course_title: any,
    course_price: any, 
    date: any,
    date_from: any, 
    date_to: any,
    course_status: any,
    days: any,
    total_hours: any, 
    location: any,
}

const Page = () => {
    const dataContext = useContext<any>(DataContext);

    const [ courseToInsert, setCourseToInsert ] = useState<course>();

    const handleCourseChange = (e: any) => {
        let id = e.target.selectedOptions[0].id;

        let filteredCourse = dataContext.courses.filter((course: any) => course.id === parseInt(id))
        console.log(filteredCourse)
        console.log(id)
        setCourseToInsert(filteredCourse[0])
    }

    // const dataContext: any = useContext(DataContext)
    const [ trainees, setTrainees ] = useState<any>([])
    const searchResultRef: any = useRef();
    
    const search = (e: any) => { 
        console.log(trainees)          
        if (e !== "") {
            const filtered = dataContext.trainees.filter((index: any) => index.name.includes(e.toLowerCase()) || index.person_id.includes(e))
            // console.log(filtered)
            setTrainees(filtered)
            searchResultRef.current.classList.remove('hidden')
        }else {
            setTrainees([]);
            searchResultRef.current.classList.add('hidden')
        }
        
    }
    
    document.body.addEventListener('click', (e: any) => {
        if (e.target && searchResultRef.current && e.target instanceof HTMLElement && !e.target.classList.contains("search-result")) {
            searchResultRef.current.classList.add('hidden')
            }
    })
    
    const [ selectedTrainees, setSelectedTrainees ] = useState<any>([])
    const traineeToSelect = (id: any, name: any, project: any) => {
        let trainee = {
            person_id: id,
            name: name,
            project: project
        }
        console.log(trainee)
        setSelectedTrainees([...selectedTrainees, trainee])
    }

    const deleteTraineeFromSelected = (e: any) => {
        let filtered = selectedTrainees.filter((t: any) => t.person_id !== e)
        setSelectedTrainees(filtered)
    }

    const today = new Date();

    const insertApplications = () => {
        if (!courseToInsert?.course_title || !courseToInsert) return toast.error('please select a course')
        if (selectedTrainees.length === 0) return toast.error('please select at least one person')

        selectedTrainees.map(async (trainee: any) => {
            let data = {
                person_id: trainee.person_id,
                person_name: trainee.name,
                project: trainee.project,
                course: courseToInsert.course_title,
                course_price: courseToInsert.course_price,
                date: today.toISOString().split('T')[0],
                date_from: courseToInsert.date_from,
                date_to: courseToInsert.date_to,
                status: courseToInsert.course_status,
                days: courseToInsert.days,
                total_hours: courseToInsert.total_hours,
                location: courseToInsert.location,
            }

            await axios.post('/api/apps', data).then(response => {           
                toast.success(`New course added successfully for ${data.person_name}`)
                // APPS.push({id: response.data.id, ...data})
                dataContext.setAPPS([{id: response.data.id, ...data}, ...dataContext.APPS])
                // setTotalHours(totalHours +  parseInt(data.total_hours))
                // emptyInputs()
                // setShowInfo(false)
                // toggleForm()
                
            }).catch(error => console.log(error))
        })
    }
  return (
    <div className="m-6">
        <p className='main-color text-3xl font-semibold'>Insert Courses To Trainees</p>

        <div className="flex justify-evenly m-7">
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
                
                <div className='glass flex flex-col gap-4 p-5'>
                    <div>
                        <p className='main-color text-2xl font-bold'>Course Title</p>
                        <p className='text-black text-xl font-semibold max-w-60'>{courseToInsert?.course_title}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <p className='main-color text-xl font-bold'>Price</p>
                        <p className='text-black text-3xl'>{courseToInsert?.course_price}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <p className='main-color text-xl font-bold'>From</p>
                        <p className='text-black text-xl'>{courseToInsert?.date_from}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <p className='main-color text-xl font-bold'>To</p>
                        <p className='text-black text-xl'>{courseToInsert?.date_to}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <p className='main-color text-xl font-bold'>Location</p>
                        <p className='text-black text-2xl'>{courseToInsert?.location}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <p className='main-color text-xl font-bold'>Days</p>
                        <p className='text-black text-2xl'>{courseToInsert?.days}</p>
                    </div>
                    <div className="flex items-center gap-12">
                        <div className='flex items-center gap-3'>
                            <p className='main-color text-xl font-bold'>Total hours</p>
                            <p className='text-black text-2xl'>{courseToInsert?.total_hours}</p>
                        </div>
                        <p className='text-black font-black text-xl capitalize'>{courseToInsert?.course_status}</p>
                        
                    </div>
                    
                </div>
            </div>

            
           <div>
                <p className="text-gray-700 text-3xl font-bold w-fit m-7">Select trainees to insert course</p>
                <div className="relative glass w-fit py-2 px-4 mx-auto flex flex-col">
                    <div className="search">
                        <input type="text" className="searchTerm" placeholder="Select Trainee" onChange={(e: any) => {
                            search(e.target.value)
                        }} />
                        <button type="submit" className="searchButton">
                            <FaSearch />
                        </button>
                    </div>
                    
                    <div ref={searchResultRef} className="search-result glass py-5 hidden px-5 absolute top-[70px] right-0 w-full max-h-96 overflow-y-scroll">
                        <ul className="bg-white py-5 px-2 rounded-3xl flex flex-col gap-4">
                            {trainees.length === 0 &&
                                <p className="main-color text-2xl font-bold text-center">Not Found</p>                       
                            }
                            {
                                trainees.map((trainee: any) => (
                                    <li key={trainee.id} className="hover:bg-slate-200 rounded-3xl p-2">
                                        <div className="cursor-pointer" onClick={() => traineeToSelect(trainee.person_id, trainee.name, trainee.project)}>
                                            <div className="flex gap-3 items-center">
                                                <p className="main-color text-2xl"><RiUserShared2Fill /></p>
                                                <div>
                                                    <p className="main-color text-xl capitalize font-bold">{trainee.name}</p>
                                                    <div className="flex gap-3">
                                                        <p className="text-gray-700 text-sm ml-2">{`ID: ${trainee.person_id}`}</p>
                                                        <p className="text-gray-700 text-sm ml-2">{`ID: ${trainee.project}`}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }        
                        </ul>
                    </div>
                </div>
           </div>
            
        </div>

        <div className="flex flex-col mt-16">
            <button className="button w-fit mx-auto" onClick={insertApplications}>
                <span className="button-content">Submit Courses</span>
            </button>

            <div className="h-[500px] overflow-y-scroll max-md:h-auto my-11">
                <table className="admin-table relative left-1/2 -translate-x-1/2 w-[80%]">
                    <thead>
                        <tr>
                            <th className="admin-th">Id</th>
                            <th className="admin-th">Name</th>
                            {/* <th className="admin-th">Title</th>
                            <th className="admin-th">Company</th> */}
                            <th className="admin-th">Project</th>
                            <th className="text-white text-2xl cursor-pointer" onClick={() => setSelectedTrainees([])}>Reset</th>
                            {/* <th className="text-green-500 text-2xl cursor-pointer" onClick={insertApplications}>Submit</th> */}
                            {/* <th className="admin-th">location</th>
                            <th className="admin-th">{`${trainees.length} Trainee`}</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        
                            {
                                selectedTrainees.map((e: any) => (
                                <tr key={e.person_id} className="admin-tr">
                                    <td className="admin-td">{e.person_id}</td>
                                    <td className="admin-td">{e.name}</td>
{/*                                     
                                    <td className="admin-td">{e.title}</td>
                                    <td className="admin-td">{e.department}</td> */}
                                    <td className="admin-td">{e.project}</td>
                                    <td className="admin-td">
                                        <MdDelete className="cursor-pointer text-2xl mx-auto text-red-700" onClick={() => {
                                            deleteTraineeFromSelected(e.person_id)
                                        }} />
                                    </td>
                                    
                                </tr>
                            
                                ))
                            }
                                
                               
                    </tbody>
                </table>
            </div>
        </div>

    </div>
  )
}

export default Page