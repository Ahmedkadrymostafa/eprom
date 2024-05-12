'use client'
import Loading from "@/app/loading"
import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { FaCheckCircle, FaGraduationCap, FaUserClock } from "react-icons/fa"
import { GrClose } from "react-icons/gr"
import { MdDelete } from "react-icons/md"
import { DataContext } from "../../layout"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation";
import { FaClockRotateLeft } from "react-icons/fa6"

type courseData = {
    person_id?: any,
    project?: any,
    course?: any,
    course_price?: any,
    date?: any,
    date_from?: any,
    date_to?: any,
    status?: any,
    days?: any,
    total_hours?: any,
    location?: any,
    course_fees?: any,
    
}


const Page = ({params}: {params: any}) => {
    const router = useRouter();
    const personId = params.id
    const dataContext: any = useContext(DataContext)
    

    const [ trainee, setTrainee ] = useState<any>()
    const [ loading, setLoading ] = useState(false)
    const courseForm: any = useRef();
    
    const courseFormContent: any = useRef('');

    const [ courses, setCourses ] = useState(dataContext.courses)
    
    const [ APPS, setAPPS ] = useState(dataContext.APPS.filter((app: any) => app.person_id === personId))
    const [ totalHours, setTotalHours ] = useState(0)

    const [ showInfo, setShowInfo ] = useState(false);
    const [ courseDataToSubmit, setCourseDataToSubmit ] = useState<courseData>({})
    const [ courseToDeleteID, setCoursesToDeleteID ] = useState();
    const deletePopUp: any = useRef();

    const today = new Date();
    const course: any = useRef();
   

    const toggleForm = () => {
        courseForm.current.classList.toggle('active-course-form')
        setTimeout(() => {
            courseFormContent.current.classList.toggle('active-course-form-content')
        }, 1000)
    }

    
   const handleCourseChange = (e: any) => {
    let id = e.target.selectedOptions[0].id
    
    setShowInfo(true)
    let currentCourse = courses.filter((course: any) => course.id === parseInt(id))
    if (currentCourse.length > 0) {
        setCourseDataToSubmit({
            person_id: personId,
            project: trainee.project,
            course: currentCourse[0].course_title,
            course_price: currentCourse[0].course_price,
            date: today.toISOString().split('T')[0],
            date_from: currentCourse[0].date_from,
            date_to: currentCourse[0].date_to,
            status: currentCourse[0].course_status,
            days: currentCourse[0].days,
            total_hours: currentCourse[0].total_hours,
            location: currentCourse[0].location,
        })
    }
   }

    const addNewCourse = async () => {
        setLoading(true)
        let data = courseDataToSubmit
        

        await axios.post('/api/apps', data).then(response => {           
            toast.success('New course added successfully')
            APPS.push({id: response.data.id, ...data})
            dataContext.setAPPS([{id: response.data.id, ...data}, ...dataContext.APPS])
            setTotalHours(totalHours +  parseInt(data.total_hours))
            // emptyInputs()
            setShowInfo(false)
            toggleForm()
            
        }).catch(error => console.log(error)).finally(() => setLoading(false))
    }

    const getTrainee = async () => {
        
        let data = await dataContext.trainees
        let traineeIndex = await data.findIndex((item: any) => item.person_id === personId)
        setTrainee(data[traineeIndex])
        if (traineeIndex === -1) {
            router.push('/dashboard/trainees')
        }else {
            setLoading(false)
            
        }
    }

   
    
    const deleteCourse = async () => {
        setLoading(true)
        let filteredAppsAfterDelete = dataContext.APPS.filter((app: any) => app.id !== courseToDeleteID)
        axios.delete(`/api/apps/${courseToDeleteID}`).then(() => {
            toast.success(`Course deleted successfully`);
            setLoading(false)
            const updatedApps = filteredAppsAfterDelete.filter((app: any) => app.person_id === personId)
            setAPPS(updatedApps)
            setTotalHours(updatedApps.reduce((acc: any, current: any) => parseInt(acc) + parseInt(current.total_hours), 0))
            dataContext.setAPPS(filteredAppsAfterDelete)
        })
    }

    const changeAppStatusToImplemented = async (id: any) => {
        let data = {
            status: 'implemented'
        }
        let updatedAllApps = [...dataContext.APPS]

        await axios.put(`/api/apps/${id}`, data).then(() => {
            toast.success('Status updated successfully')
            let toUpdate = updatedAllApps.findIndex((i: any) => i.id === id)
                if (toUpdate !== -1) {
                   
                    updatedAllApps[toUpdate] = {...updatedAllApps[toUpdate],
                        ...data
                    }
                }
            let filteredApps = updatedAllApps.filter((app: any) => app.person_id === personId)
            setAPPS(filteredApps);
            dataContext.setAPPS(updatedAllApps)
        }).catch((error) => console.log(error))
    }

    const changeAppStatusToNotImplemented = async (id: any) => {
        let data = {
            status: 'not implemented'
        }
        let updatedAllApps = [...dataContext.APPS]

        await axios.put(`/api/apps/${id}`, data).then(() => {
            toast.success('Status updated successfully')
            let toUpdate = updatedAllApps.findIndex((i: any) => i.id === id)
                if (toUpdate !== -1) {
                   
                    updatedAllApps[toUpdate] = {...updatedAllApps[toUpdate],
                        ...data
                    }
                }
            let filteredApps = updatedAllApps.filter((app: any) => app.person_id === personId)
            setAPPS(filteredApps);
            dataContext.setAPPS(updatedAllApps)
        }).catch((error) => console.log(error))
    }

    useEffect(() => {
        getTrainee()
        setCourses(dataContext.courses)
        setAPPS(dataContext.APPS.filter((app: any) => app.person_id === personId))
        setTotalHours(APPS.reduce((acc: any, current: any) => parseInt(acc) + parseInt(current.total_hours), 0))
        
    }, [])
    

    if (loading) return <Loading />


    return (
        <div className="relative">
                        <div ref={deletePopUp} className="form-popup z-[3] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 w-96">
                            <div className="flex justify-between items-center mb-8">
                                <p>{`Are you sure to delete this Course`}</p>
                                <p className="text-black cursor-pointer text-2xl font-bold" onClick={() => {
                                    deletePopUp.current.classList.toggle('active-form-popup')
                                }} ><GrClose /></p>
                            </div>
                            <div className="trainee-btn w-fit mx-auto h-[45px] flex gap-2 items-center cursor-pointer duration-150 main-bg text-gold rounded-xl p-3 text-xl" onClick={() => {
                                deleteCourse()
                                deletePopUp.current.classList.toggle('active-form-popup')
                            }}>
                                Delete
                            </div>
                        </div>


                            

            {!loading && trainee &&
                <div className="margin">




                            <div className="gr-bg h-64 w-full rounded-3xl flex justify-start content-end flex-wrap">
                                <div className="m-10">
                                    <p className="main-color text-5xl font-bold mb-5 capitalize">{trainee.name}</p>
                                    <div className="flex text-gray-700 font-bold text-xl gap-2 ml-5 capitalize">
                                        <p>{trainee.title}</p>
                                        
                                    </div>
                                </div>
                            </div>
                
                            <div className="flex justify-between my-5 mx-10 gap-6 shadow-2xl p-6 rounded-3xl">
                                <div className="flex flex-col gap-3">
                                    <div className="glass p-5 w-80 text-center">
                                        <div className="flex gap-2 w-fit mx-auto items-center">
                                            <p className=" text-gray-700 text-5xl font-black mb-5"><FaGraduationCap /></p>
                                            <p className=" text-gray-700 text-3xl font-black mb-5">Courses</p>
                                        </div>
                                        <p className="text-gold text-5xl font-black">{APPS.length}</p>
                                    </div>

                                    <div className="glass p-5 w-80 text-center">
                                        <div className="flex gap-2 w-fit mx-auto items-center">
                                            <p className=" text-gray-700 text-5xl font-black mb-5"><FaUserClock /></p>
                                            <p className=" text-gray-700 text-3xl font-black mb-5">Total Hours</p>
                                        </div>
                                        <p className="text-gold text-5xl font-black">{
                                            totalHours
                                        }</p>
                                    </div>                    
                                </div>
                                <div className="glass w-full py-10">
                                    <p className="text-gold text-5xl font-black mb-5 px-12">Person Information</p>
                                    <div className="flex gap-x-16 px-16">
                                        <div className="flex flex-col gap-4">
                                            <p className="main-color text-2xl font-black">Person ID: </p>
                                            <p className="main-color text-2xl font-black">Location: </p>
                                            <p className="main-color text-2xl font-black">Company: </p>
                                            <p className="main-color text-2xl font-black">Project: </p>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <p className="text-gray-600 text-2xl font-bold capitalize">{trainee.person_id}</p>
                                            <p className="text-gray-600 text-2xl font-bold capitalize">{trainee.location}</p>
                                            <p className="text-gray-600 text-2xl font-bold capitalize">{trainee.department}</p>
                                            <p className="text-gray-600 text-2xl font-bold capitalize">{trainee.project}</p>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                
                            <div className="glass">
                                <div className="flex justify-between items-start px-10 py-7">
                                    <p className="main-color text-3xl font-black">Applied Modules</p>
                                    <div>
                                        <button className="button" onClick={() => {
                                            toggleForm();
                                        }}>
                                            <span className="button-content">Add New Course</span>
                                        </button>
                                       
                                    </div>
                                </div>
                
                
                                <div className="max-h-[500px] overflow-y-scroll max-md:h-auto w-full">
                                    
                                    <table className="admin-table w-[97%]">
                                        <thead>
                                            <tr>
                                                <th className="admin-th">Course Name</th>
                                                <th className="admin-th">Price</th>
                                                <th className="admin-th">From</th>
                                                <th className="admin-th">To</th>
                                                <th className="admin-th">Days</th>
                                                <th className="admin-th">Location</th>
                                                <th className="admin-th">status</th>
                                                <th className="admin-th"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            
                                            {
                                                APPS.map((app: any) => (
                                                    <tr key={app.id} className="admin-tr relative">
                                                        <td className="admin-td">{app.course}</td>                                       
                                                        <td className="admin-td">{app.course_price}</td>                                       
                                                        <td className="admin-td">{app.date_from}</td>
                                                        <td className="admin-td">{app.date_to}</td>
                                                        <td className="admin-td">{app.days}</td>
                                                        <td className="admin-td">{app.location}</td>
                                                        <td className="admin-td">{app.status}</td>
                                                        <td className="text-2xl font-black ">
                                                            <div className="flex justify-center gap-5 row-buttons">
                                                                {app.status === 'implemented' && <FaCheckCircle className="cursor-pointer text-green-500" onClick={() => changeAppStatusToNotImplemented(app.id)} />}
                                                                {app.status === 'not implemented' && <FaClockRotateLeft className="cursor-pointer text-gray-500" onClick={() => changeAppStatusToImplemented(app.id)} />}
                                                                <MdDelete className="cursor-pointer text-red-700" onClick={() => {
                                                                    setCoursesToDeleteID(app.id)
                                                                    deletePopUp.current.classList.toggle('active-form-popup')
                                                                }} />
                                                            </div>
                                                        </td>
                                                        
                                                    </tr>
                                                    
                                                ))
                                            }
                                                
                                                
                                                
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                
                            <div ref={courseForm} className="course-form-popup overflow-scroll">
                                <div ref={courseFormContent} className="course-form-content">
                                    <div className="flex justify-between items-center">
                                        
                                        <p className="main-color text-3xl font-black">Add New Course</p>
                                        <div onClick={() => {
                                        toggleForm();
                                       
                                        }}><p className="main-color text-3xl font-black cursor-pointer">
                                            <GrClose />
                                        </p></div>
                                    </div>
                
                                    <div className="flex flex-col gap-12">
                                        <div className="w-fit mx-auto flex flex-col justify-center">
                                            <p className="text-gray-700 text-3xl font-bold w-fit m-7">Choose course to add</p>

                                            <select ref={course} className="select-form input" onChange={(e: any) => handleCourseChange(e)}>
                                                <option value="please select course">please select course</option>
                                            {
                                                courses.map((course: any) => (
                                                    <option id={course.id} key={course.id}>{course.course_title}</option>
                                                ))
                                            }
                                            </select>
                                        </div>
                                        {showInfo && <div>
                                            <div  className='glass w-full z-10 px-5 py-2 top-0'>
                                                <div className='bg-white px-7 py-3 rounded-3xl'>
                                                    <div className='bottom-border px-5'>
                                                        <p className='text-gold text-3xl font-bold'>New Course Info</p>
                                                    </div>
                                                    <div className='flex justify-center flex-col m-7'>
                                                        <div className='flex flex-col gap-4'>
                                                            <div>
                                                                <p className='main-color text-2xl font-bold'>Course Title</p>
                                                                <p className='text-black text-xl font-semibold max-w-60'>{courseDataToSubmit.course}</p>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <p className='main-color text-xl font-bold'>Price</p>
                                                                <p className='text-black text-3xl'>{courseDataToSubmit.course_price}</p>
                                                            </div>
                                                            <div className='flex items-center gap-3'>
                                                                <p className='main-color text-xl font-bold'>From</p>
                                                                <p className='text-black text-xl'>{courseDataToSubmit.date_from}</p>
                                                            </div>
                                                            <div className='flex items-center gap-3'>
                                                                <p className='main-color text-xl font-bold'>To</p>
                                                                <p className='text-black text-xl'>{courseDataToSubmit.date_to}</p>
                                                            </div>
                                                            <div className='flex items-center gap-3'>
                                                                <p className='main-color text-xl font-bold'>Location</p>
                                                                <p className='text-black text-2xl'>{courseDataToSubmit.location}</p>
                                                            </div>
                                                            <div className='flex items-center gap-3'>
                                                                <p className='main-color text-xl font-bold'>Days</p>
                                                                <p className='text-black text-2xl'>{courseDataToSubmit.days}</p>
                                                            </div>
                                                            <div className="flex items-center gap-12">
                                                                <div className='flex items-center gap-3'>
                                                                    <p className='main-color text-xl font-bold'>Total hours</p>
                                                                    <p className='text-black text-2xl'>{courseDataToSubmit.total_hours}</p>
                                                                </div>
                                                                <p className='text-black font-black text-xl capitalize'>{courseDataToSubmit.status}</p>
                                                                
                                                            </div>
                                                            
                                                        </div>
                                                        
                                                        <button className='button-81' onClick={addNewCourse}>Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                    </div>
                                       
                                </div>
                            </div>
                
                </div>      
            }
        </div>
    )
    
}

export default Page