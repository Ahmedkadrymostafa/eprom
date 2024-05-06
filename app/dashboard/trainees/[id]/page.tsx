'use client'
import Loading from "@/app/loading"
import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { FaEdit, FaGraduationCap, FaUserClock } from "react-icons/fa"
import { GrClose } from "react-icons/gr"
import { MdDelete, MdOutlineClose } from "react-icons/md"
import { DataContext } from "../../layout"
import { toast } from "react-toastify"
// import { parse } from "path"
import { useRouter } from "next/navigation";
// import { AiFillCloseSquare } from "react-icons/ai"
// import { FiShare } from "react-icons/fi"
// import { RiShareBoxLine } from "react-icons/ri"

type courseData = {
    person_id?: any,
    person_name?: any,
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
    instructor_fees?: any,
    break_cost?: any,
    tools?: any,
}


const Page = ({params}: {params: any}) => {
    const router = useRouter();
    const personId = params.id
    const dataContext: any = useContext(DataContext)
    // let data = dataContext.trainees
    // let traineeIndex = data.findIndex((item: any) => item.person_id === id)

    const [ trainee, setTrainee ] = useState<any>()
    const [ loading, setLoading ] = useState(false)
    const courseForm: any = useRef();
    // const newCourse: any = useRef();
    // const newCourseName: any = useRef();
    const courseFormContent: any = useRef('');
    const courseDropDownRef: any = useRef('');

    const [ courses, setCourses ] = useState(dataContext.courses)
    // const [ courseInfo, setCourseInfo ] = useState<any>({})
    // const [ ORGS, setORGS ] = useState(dataContext.ORGS)
    const [ APPS, setAPPS ] = useState(dataContext.APPS.filter((app: any) => app.person_id === personId))
    const [ totalHours, setTotalHours ] = useState(0)

    // const [ edit, setEdit ] = useState(false);
    const [ showInfo, setShowInfo ] = useState(false);
    const [ courseDataToSubmit, setCourseDataToSubmit ] = useState<courseData>({})
    // const [ courseToUpdateID, setCoursesToUpdateID ] = useState();
    const [ courseToDeleteID, setCoursesToDeleteID ] = useState();
    const deletePopUp: any = useRef();

    const today = new Date();
    const course: any = useRef();
    // const from: any = useRef();
    // const to: any = useRef();
    // const org: any = useRef();
    // const statusRef: any = useRef(null);
    // const [ statusJob, setStatusJob ] = useState("not implemented");
    // const days: any = useRef();
    // const total_hours: any = useRef();
    // const training_center: any = useRef();
    // const city: any = useRef();
    // const instructor: any = useRef();
    // const budget_code: any = useRef();
    // const course_fees: any = useRef();
    // const instructor_fees: any = useRef();
    // const total_cost: any = useRef();
    // const profit: any = useRef();
    // const allowance: any = useRef();
    // const hotel_cost: any = useRef();

    const toggleForm = () => {
        courseForm.current.classList.toggle('active-course-form')
        setTimeout(() => {
            courseFormContent.current.classList.toggle('active-course-form-content')
        }, 1000)
    }

    const toggleCourseDropDown = () => {
        if (courseDropDownRef.current) {
            courseDropDownRef.current.classList.toggle("course-dropdown-active")
        }
    }

   const emptyInputs = () => {
        course.current.value = ""
        setCourseDataToSubmit({})
        setShowInfo(false)
        // from.current.value = ""
        // to.current.value = ""
        // org.current.value = ""
        // statusRef.current.checked = false
        // days.current.value = ""
        // total_hours.current.value = ""
        // training_center.current.value = ""
        // city.current.value = ""
        // instructor.current.value = ""
        // budget_code.current.value = ""
        // course_fees.current.value = ""
        // instructor_fees.current.value = ""
        // total_cost.current.value = ""
        // profit.current.value = ""
        // allowance.current.value = ""
        // hotel_cost.current.value = ""
        // setStatusJob("not implemented")
   }


   const handleCourseChange = (e: any) => {
    let id = e.target.selectedOptions[0].id
    // console.log(id)
    // console.log(courses)
    setShowInfo(true)
    let currentCourse = courses.filter((course: any) => course.id === parseInt(id))
    if (currentCourse.length > 0) {
        setCourseDataToSubmit({
            person_id: personId,
            person_name: trainee.name,
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
    // console.log(currentCourse)
   }

    const addNewCourse = async () => {
        setLoading(true)
        let data = courseDataToSubmit
        // if (!data.total_hours) {
        //     setLoading(false)
        //     return toast.warn("Hours is required! if you not know the hours for this course write zero instead")
        // }
        // if (!data.person_id && !data.course) {
        //     setLoading(false)
        //     return toast.warn("field course name is required")
        // }

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
        // await axios.get(`/api/trainees/${id}`).then((response) => {
        //     console.log(response.data)
        //     setTrainee(response.data)
        // })
        let data = await dataContext.trainees
        let traineeIndex = await data.findIndex((item: any) => item.person_id === personId)
        setTrainee(data[traineeIndex])
        if (traineeIndex === -1) {
            router.push('/dashboard/trainees')
        }else {
            setLoading(false)
            
        }
        // console.log(traineeIndex)
    }

    // const updateCourse = async () => {
    //     setLoading(true)
    //     console.log(courseToUpdateID)

    //     let data = {
    //         person_id: personId.trim().toLowerCase().replace(/\s+/g, ' '),
    //         course: course.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
    //         date_from: from.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
    //         date_to: to.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
    //         org: org.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
    //         status: statusJob,
    //         days: days.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
    //         total_hours: total_hours.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
    //         training_center: training_center.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
    //         city: city.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
    //         instructor: instructor.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
    //         budget_code: budget_code.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
    //         course_fees: course_fees.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
    //         instructor_fees: instructor_fees.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
    //         total_cost: total_cost.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
    //         profit: profit.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
    //         allowance: allowance.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
    //         hotel_cost: hotel_cost.current.value.trim().toLowerCase().replace(/\s+/g, ' ')
    //     }
    //     if (!data.total_hours) {
    //         setLoading(false)
    //         return toast.warn("Hours is required! if you not know the hours for this course write zero instead")
    //     }
    //     if (!data.person_id && !data.course) {
    //         setLoading(false)
    //         return toast.warn("field course name is required")
    //     }

    //         let updatedAllApps = [...dataContext.APPS]

    //         await axios.put(`/api/apps/${courseToUpdateID}`, data).then(response => {
    //             toast.success('Course updated successfully')
    //             setLoading(false)
                

    //             let toUpdate = updatedAllApps.findIndex((i: any) => i.id === courseToUpdateID)
    //             console.log(toUpdate)
    //             if (toUpdate !== -1) {
                   
    //                 updatedAllApps[toUpdate] = {...updatedAllApps[toUpdate],
    //                     ...data
    //                 }
    //             }
    //             // console.log(statusRef.current.checked)
    //             // console.log(data.status)
    //             let filteredApps = updatedAllApps.filter((app: any) => app.person_id === personId)
    //             let updatedHours = filteredApps.reduce((acc: any, current: any) => parseInt(acc) + parseInt(current.total_hours), 0)
    //             setAPPS(filteredApps);
    //             setTotalHours(updatedHours)
    //             dataContext.setAPPS(updatedAllApps)
    //             console.log(updatedHours)
    //             toggleForm()
    //             emptyInputs()              

    //         }).catch(error => console.log(error))
    // }
    
    const deleteCourse = async () => {
        setLoading(true)
        // let updatedAllApps = [...dataContext.APPS]
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
    useEffect(() => {
        getTrainee()
        setCourses(dataContext.courses)
        // setORGS(dataContext.ORGS)
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


                            {/* <div ref={courseDropDownRef} className="p-3 flex flex-col gap-5 course-dropdown fixed z-[3] bg-white h-full">
                                <p className="absolute main-color text-3xl cursor-pointer right-2" onClick={toggleCourseDropDown}><AiFillCloseSquare /></p>
                                <div>
                                    <p className="text-gold text-2xl font-bold mb-2">Additional Information:-</p>
                                    
                                        <div className="ml-4 flex flex-col gap-2">
                                            <p className="main-color text-xl font-bold flex gap-2">Days: <p className="text-xl text-gray-700">{courseInfo.days}</p></p>
                                            <p className="main-color text-xl font-bold flex gap-2">Hours: <p className="text-xl text-gray-700">{courseInfo.hours}</p></p>
                                            <p className="main-color text-xl font-bold flex gap-2">Training Center: <p className="text-xl text-gray-700">{courseInfo.training_center}</p></p>
                                            <p className="main-color text-xl font-bold flex gap-2">City: <p className="text-xl text-gray-700">{courseInfo.city}</p></p>
                                            <p className="main-color text-xl font-bold flex gap-2">Instructor: <p className="text-xl text-gray-700">{courseInfo.instructor}</p></p>
                                        </div>
                                       
                                    
                                </div>
                                <div>
                                    <p className="text-gold text-2xl font-bold mb-2">Financial:-</p>
                                        <div className="ml-4 flex flex-col gap-2">
                                            <p className="main-color text-xl font-bold">Budget Code: {courseInfo.budget_code}</p>
                                            <p className="main-color text-xl font-bold">Course Fees: {courseInfo.course_fees}</p>
                                            <p className="main-color text-xl font-bold">Instructor Fees: {courseInfo.instructor_fees}</p>
                                            <p className="main-color text-xl font-bold">Profit: {courseInfo.profit}</p>
                                            <p className="main-color text-xl font-bold">Allowance: {courseInfo.allowance}</p>
                                            <p className="main-color text-xl font-bold">Hotel Cost: {courseInfo.hotel_cost}</p>
                                        </div>
                                    <div className="flex gap-4">
                                        <div className="ml-4 flex flex-col gap-2">
                                            <p className="text-gray-900 text-xl font-bold">{courseInfo.budget_code}</p>
                                            <p className="text-gray-900 text-xl font-bold">{courseInfo.course_fees}</p>
                                            <p className="text-gray-900 text-xl font-bold">{courseInfo.instructor_fees}</p>
                                            <p className="text-gray-900 text-xl font-bold">{courseInfo.profit}</p>
                                            <p className="text-gray-900 text-xl font-bold">{courseInfo.allowance}</p>
                                            <p className="text-gray-900 text-xl font-bold">{courseInfo.hotel_cost}</p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}


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
                                    <div className="flex gap-4">
                                        <button className="button" onClick={() => {
                                            toggleForm();
                                        }}>
                                            <span className="button-content">Add New Course</span>
                                        </button>
                                        
                                        {/* <button className="download-button">
                                            <div className="docs"><svg className="css-i6dzq1" strokeLinejoin="round" strokeLinecap="round" fill="none" strokeWidth="2" stroke="currentColor" height="20" width="20" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line y2="13" x2="8" y1="13" x1="16"></line><line y2="17" x2="8" y1="17" x1="16"></line><polyline points="10 9 9 9 8 9"></polyline></svg> Report</div>
                                            <div className="download">
                                                <svg className="css-i6dzq1" strokeLinejoin="round" strokeLinecap="round" fill="none" strokeWidth="2" stroke="currentColor" height="24" width="24" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line y2="3" x2="12" y1="15" x1="12"></line></svg>
                                            </div>
                                        </button> */}
                                    </div>
                                </div>
                
                
                                <div className="max-h-[500px] overflow-y-scroll max-md:h-auto w-full">
                                    
                                    <table className="admin-table w-[97%]">
                                        <thead>
                                            <tr>
                                                <th className="admin-th">Course Name</th>
                                                <th className="admin-th">Price</th>
                                                {/* <th className="admin-th">ORG</th> */}
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
                                                    <tr key={app.id} className="admin-tr relative cursor-pointer" onClick={() => {
                                                        // setCourseInfo({
                                                        //     days: app.days,
                                                        //     hours: app.total_hours,
                                                        //     training_center: app.training_center,
                                                        //     city: app.city,
                                                        //     instructor: app.instructor,
                                                        //     budget_code: app.budget_code,
                                                        //     course_fees: app.course_fees,
                                                        //     instructor_fees: app.instructor_fees,
                                                        //     profit: app.profit,
                                                        //     allowance: app.allowance,
                                                        //     hotel_cost: app.hotel_cost,
                                                        // })
                                                    }}>
                                                        <td className="admin-td">{app.course}</td>                                       
                                                        <td className="admin-td">{app.course_price}</td>                                       
                                                        {/* <td className="admin-td uppercase">{app.org}</td>                                        */}
                                                        <td className="admin-td">{app.date_from}</td>
                                                        <td className="admin-td">{app.date_to}</td>
                                                        <td className="admin-td">{app.days}</td>
                                                        <td className="admin-td">{app.location}</td>
                                                        <td className="admin-td">{app.status}</td>
                                                        <td className="text-2xl font-black ">
                                                            <div className="flex justify-center gap-5 row-buttons">
                                                                {/* <RiShareBoxLine className="text-white cursor-pointer" onClick={toggleCourseDropDown} />
                                                                <FaEdit className="cursor-pointer text-yellow-400" onClick={() => {
                                                                setEdit(true)
                                                                    toggleForm();
                                                                    setCoursesToUpdateID(app.id)
                                                                    course.current.value = app.course
                                                                    from.current.value = app.date_from
                                                                    to.current.value = app.date_to
                                                                    org.current.value = app.org
                    
                                                                    app.status === "implemented" ?
                                                                    statusRef.current.checked = true
                                                                    : 
                                                                    statusRef.current.checked = false  
                                                                    
                                                                    days.current.value = app.days
                                                                    total_hours.current.value = app.total_hours
                                                                    training_center.current.value = app.training_center
                                                                    city.current.value = app.city
                                                                    instructor.current.value = app.instructor
                                                                    budget_code.current.value = app.budget_code
                                                                    course_fees.current.value = app.course_fees
                                                                    instructor_fees.current.value = app.instructor_fees
                                                                    total_cost.current.value = app.total_cost
                                                                    profit.current.value = app.profit
                                                                    allowance.current.value = app.allowance
                                                                    hotel_cost.current.value = app.hotel_cost
                                                                }} /> */}
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
                                        {/* {edit === false ? <p className="main-color text-3xl font-black">Add New Course</p> :
                                            <p className="text-gray-700 text-3xl font-black">Edit Course</p>
                                        } */}
                                        <p className="main-color text-3xl font-black">Add New Course</p>
                                        <div onClick={() => {
                                        toggleForm();
                                        // emptyInputs();
                                        // setEdit(false)
                                        setShowInfo(false);
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
                                                        {/* <p className='text-red-800 font-black text-2xl cursor-pointer'>Cancel</p> */}
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
                                                        {/* <div className='flex flex-col gap-6'>
                                                            <p className='main-color text-3xl font-bold'>Total Revenue & Fees</p>
                                                            <div className='flex flex-col gap-4'>
                                                                <pre className='text-black text-xl font-bold'>Course fees:    {courseDataToSubmit.course_fees}</pre>
                                                                <pre className="text-gray-500 text-xl font-bold">Instructor fees:    {courseDataToSubmit.instructor_fees}</pre>
                                                                <pre className="text-gray-500 text-xl font-bold">Break cost:    {courseDataToSubmit.break_cost}</pre>
                                                                <pre className="text-gray-500 text-xl font-bold">Training Tools:    {courseDataToSubmit.tools}</pre>
                                                                <pre className='text-green-700 text-xl font-bold'>Profit:    {courseDataToSubmit.course_fees - (courseDataToSubmit.instructor_fees + courseDataToSubmit.break_cost + courseDataToSubmit.tools)}</pre>
                                                            </div>
                                                        </div> */}
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