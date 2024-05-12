'use client'
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { FaCheckCircle, FaEdit, FaPencilAlt, FaSearch } from "react-icons/fa";
import { MdDelete, MdOutlineNoteAlt } from "react-icons/md";
import { toast } from "react-toastify";
import { DataContext } from "../layout";
import { ReportContext } from "@/app/layout";
import { GrClose } from "react-icons/gr";
import { IoAlertCircle } from "react-icons/io5";
import { RiShareBoxFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { FaClockRotateLeft } from "react-icons/fa6";
import Loading from "@/app/loading";

type addNewCourseData = {
    id?: any
    course_title?: any,
    course_price?: any,
    num_of_trainees?: any,
    days?: any,
    total_hours?: any,
    location?: any,
    course_status?: any,
    date_from?: any,
    date_to?: any,
    total_revenue?: any,
    instructor_fees?: any,
    break_cost?: any,
    tools?: any,
    transportation?: any,
    accommodation?: any,
    allowance?: any,
    other_expenses?: any,
    total_expenses?: any,
    net_revenue?: any,
    instructors?: any,
    notes?: any,
}
const Page = () => {
    const router = useRouter();
    const reportContext = useContext(ReportContext);
    const [ isLoading, setIsLoading ] = useState(false); 
    const [ formRole, setFormRole ] = useState('add');

    const courseTitle: any = useRef()
    const coursePrice: any = useRef()
    const numOfTrainees: any = useRef()
    const days: any = useRef()
    const [ totalHours, setTotalHours ]: any = useState(0)
    const location: any = useRef()
    const [ statusCourse, setStatusCourse ] = useState('not implemented');
    const statusRef: any = useRef()
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [ totalRevenue, setTotalRevenue ] = useState();
    const [ instructorFees, setInstructorFees ] = useState();
    const [ breakCost, setBreakCost ] = useState();
    const [ tools, setTools ] = useState();
    const [ transportation, setTransportation ] = useState();
    const [ accommodation, setAccommodation ] = useState();
    const [ allowance, setAllowance ] = useState();
    const [ otherExpenses, setOtherExpenses ] = useState();
    const [ totalExpenses, setTotalExpenses ] = useState();
    const [ netRevenue, setNetRevenue] = useState();
    const instructorRef: any = useRef();
    const [ instructorsToShow, setInstructorsToShow ] = useState<any>([]);
    
    const [ selectedCourseToUpdateId, setSelectedCourseToUpdateId ] = useState<any>()
    const [ selectedCourseToShowInfo, setSelectedCourseToShowInfo ] = useState<addNewCourseData>()
    
    const [fromDateReport, setFromDateReport ] = useState<any>('');
    const [toDateReport, setToDateReport ] = useState<any>('');
    
    const [ coursesToReport, setCoursesToReport ] = useState<any>([]);
    const FromDateChangeReport = (e: any) => {
        setFromDateReport(e.target.value)
    }
    const ToDateChangeReport = (e: any) => {
        setToDateReport(e.target.value)
    }
    const getCoursesReport = () => {
        const filteredData = dataContext.courses.filter((course: any) => {

            const appStartDate = new Date(course.date_from);
            const appEndDate = new Date(course.date_to);
            const selectedFromDate = new Date(fromDateReport);
            const selectedToDate = new Date(toDateReport);
            if (selectedFromDate === null || selectedToDate === null) return toast.error("select date to create report")
            return (
              appStartDate >= selectedFromDate && appEndDate <= selectedToDate
            );
          });
          setCoursesToReport(filteredData)
          reportContext.setReportByCoursesData(filteredData)
    }
    const report = () => {
        router.push('/report/bycourses')
    }
  const handleFromDateChange = (event: any) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event: any) => {
    setToDate(event.target.value);
  };
   const changeInputsToUpdate = (course: any) => {
        setSelectedCourseToUpdateId(course.id)
        courseTitle.current.value = course.course_title
        coursePrice.current.value = course.course_price
        numOfTrainees.current.value = course.num_of_trainees
        days.current.value = course.days
        setTotalHours(course.total_hours)
        location.current.value = course.location
        if (course.course_status === 'implemented') {
            statusRef.current.checked = true
            setStatusCourse('implemented')
        }else {
            statusRef.current.checked = false
            setStatusCourse('not implemented')
        }
        setFromDate(course.date_from)
        setToDate(course.date_to)
        setTotalRevenue(course.total_revenue)
        setInstructorFees(course.instructor_fees)
        setBreakCost(course.break_cost)
        setTools(course.tools)
        setTransportation(course.transportation)
        setAccommodation(course.accommodation)
        setAllowance(course.allowance)
        setOtherExpenses(course.other_expenses)
        setTotalExpenses(course.total_expenses)
        setNetRevenue(course.net_revenue)

        if (course.instructors !== '') {
            let instructorsSplitter = course.instructors?.split('-')
            if (!instructorsSplitter?.includes('')) {
                setInstructorsToShow(instructorsSplitter)
            }else {
                setInstructorsToShow([])
            }
        }

   }

    const notesRef: any = useRef()
    const [notes, setNotes] = useState('');
    const [selectedNoteId, setSelectedNoteId] = useState<any>('');
 
    const newCourseForm: any = useRef()
    const newCourseInfo: any = useRef()

    const dataContext: any = useContext(DataContext)
    const [ courses, setCourses ] = useState(dataContext.courses)

    const toggleForm = () => {
        newCourseForm.current.classList.toggle('left-[15px]')
        newCourseForm.current.classList.toggle('-left-full')
        setInstructorsToShow([])
    }
    const toggleCourseInfo = () => {
        newCourseInfo.current.classList.toggle('hidden')
    }
    const toggleNotes = () => {
        notesRef.current.classList.toggle('hidden')
    }
    const emptyInputs = () => {
        courseTitle.current.value = ''
        coursePrice.current.value = null
        numOfTrainees.current.value = null
        location.current.value = ''
        days.current.value = 0
        setTotalHours(0)
        setStatusCourse('not implemented')
        statusRef.current.checked = false
        setFromDate('')
        setToDate('')
        toggleForm()
    }

    const saveNotes = async (id: any) => {
        setIsLoading(true)
        let data = {
            notes: notes
        }
        axios.put(`/api/courses/${id}`, data).then(() => {
            toast.success(`Notes saved successfully`);
            const updatedArray = courses.map((item: any) => {
                if (item.id === id) {
                  return { ...item, notes: data.notes };
                }
                return item;
            });
            setCourses(updatedArray)
            dataContext.setCourses(updatedArray)
        }).catch((err) => console.log(err)).finally(() => setIsLoading(false))
    }
    const addNewCourse = async () => {
        setIsLoading(true)
        let data: addNewCourseData = {
            course_title: courseTitle.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
            course_price: coursePrice.current.value,
            num_of_trainees: numOfTrainees.current.value,
            days: days.current.value,
            total_hours: totalHours,
            location: location.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
            course_status: statusCourse,
            date_from: fromDate,
            date_to: toDate,
            total_revenue: 0,
            instructor_fees: 0,
            break_cost: 0,
            tools: 0,
            transportation: 0,
            accommodation: 0,
            allowance: 0,
            other_expenses: 0,
            total_expenses: 0,
            net_revenue: 0,
            notes: '',
        };
        if (!data.course_title) return toast.warn("course title is required")

        await axios.post('/api/courses', data).then(response => {
            setCourses([{id: response.data.id, ...data}, ...courses])
            dataContext.setCourses([{id: response.data.id, ...data}, ...courses])
            toast.success("New course added successfully")
            emptyInputs();
            data = {}
        }).catch(error => console.log(error)).finally(() => setIsLoading(false))
    }
    const updateCourse = async () => {
        setIsLoading(true)
        let data: addNewCourseData = {
            id: selectedCourseToUpdateId,
            course_title: courseTitle.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
            course_price: coursePrice.current.value,
            num_of_trainees: numOfTrainees.current.value,
            days: days.current.value,
            total_hours: totalHours,
            location: location.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
            course_status: statusCourse,
            date_from: fromDate,
            date_to: toDate,
            total_revenue: totalRevenue,
            instructor_fees: instructorFees,
            break_cost: breakCost,
            tools: tools,
            transportation: transportation,
            accommodation: accommodation,
            allowance: allowance,
            other_expenses: otherExpenses,
            total_expenses: totalExpenses,
            net_revenue: netRevenue,
            instructors: instructorsToShow?.join('-'),
        };
        if (!data.course_title) return toast.warn("field course title is required")
        let updatedCourses = [...courses]
        await axios.put('/api/courses', data).then(() => {
            let toUpdate = courses.findIndex((i: any) => i.id === data.id)
            if (toUpdate !== -1) {
                updatedCourses[toUpdate] = {...updatedCourses[toUpdate],
                    ...data                   
                }
            }
            setCourses(updatedCourses);
            dataContext.setCourses(updatedCourses)
            toast.success("updated successfully")
            emptyInputs();
        }).catch((error) => {
            console.log(error)
        }).finally(() => setIsLoading(false))
    }
    const deleteCourse = async (id: any) => {
        setIsLoading(true)
        await axios.delete(`/api/courses/${id}`).then(() => {
            toast.success('deleted')
            const afterDeleted = courses.filter((i: any) => i.id !== id)
            setCourses(afterDeleted)
            dataContext.setCourses(afterDeleted)
        }).catch((err) => {
            console.log(err)
        }).finally(() => setIsLoading(false));
    }
    

    const changeCourseStatusToImplemented = async (id: any) => {
        let data = {
            id: id,
            status: 'implemented'
        }
        let updatedAllCourses = [...dataContext.courses]

        await axios.put(`/api/courses/status`, data).then(() => {
            toast.success('Status updated successfully')
            let toUpdate = updatedAllCourses.findIndex((i: any) => i.id === id)
                if (toUpdate !== -1) {
                   
                    updatedAllCourses[toUpdate] = {...updatedAllCourses[toUpdate],
                        course_status: 'implemented'
                    }
                }
            
            setCourses(updatedAllCourses)
            dataContext.setCourses(updatedAllCourses)
        }).catch((error) => console.log(error))
    }

    const changeCourseStatusToNotImplemented = async (id: any) => {
        let data = {
            id: id,
            status: 'not implemented'
        }
        let updatedAllCourses = [...dataContext.courses]

        await axios.put(`/api/courses/status`, data).then(() => {
            toast.success('Status updated successfully')
            let toUpdate = updatedAllCourses.findIndex((i: any) => i.id === id)
                if (toUpdate !== -1) {
                   
                    updatedAllCourses[toUpdate] = {...updatedAllCourses[toUpdate],
                        course_status: 'not implemented'
                    }
                }
            
            setCourses(updatedAllCourses)
            dataContext.setCourses(updatedAllCourses)
            
        }).catch((error) => console.log(error))
    }

    const search = (e: any) => {           
        if (e !== "") {
            const filtered = dataContext.courses.filter((index: any) => (index.course_title.includes(e.toLowerCase()) || index.location.includes(e.toLowerCase())));
            setCourses(filtered)
        }else {
            setCourses(dataContext.courses);
        }
        
    }

  return (
    <>
    {isLoading ? <Loading /> : 

    
    <div className="relative">
        <div className="flex justify-between items-center mx-6 my-5">
            <p className="main-color text-4xl font-bold">Courses</p>
                <div className="flex">
                    <input type="text" className="searchTerm" placeholder="What are you looking for?" onChange={(e: any) => {
                        search(e.target.value)
                    }} />
                    <button type="submit" className="searchButton">
                        <FaSearch />
                    </button>
                </div>
           
            <button className="button" onClick={() => {
                toggleForm();
                setFormRole('add');
            }}>
                <span className="button-content">Add New Course</span>
            </button>
        </div>

        <div className="flex items-center justify-between m-12">
            <div className="flex items-center gap-14">
                <div className="flex gap-2">
                    <label className="main-color text-xl font-black">From</label>
                    <input value={fromDateReport} onChange={FromDateChangeReport} className="select-form" type="date" />
                </div>
                <div className="flex gap-2">
                    <label className="main-color text-xl font-black">To</label>
                    <input value={toDateReport} onChange={ToDateChangeReport} className="select-form" type="date" />
                </div>
                <button className="cta" onClick={() => {
                    getCoursesReport();
                }}>
                    <span>Collect</span>
                    <svg width="15px" height="10px" viewBox="0 0 13 10">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                </button>
            </div>
            {coursesToReport.length > 0 && 
                <button className="download-button" onClick={report}>
                    <div className="docs"><svg className="css-i6dzq1" strokeLinejoin="round" strokeLinecap="round" fill="none" strokeWidth="2" stroke="currentColor" height="20" width="20" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line y2="13" x2="8" y1="13" x1="16"></line><line y2="17" x2="8" y1="17" x1="16"></line><polyline points="10 9 9 9 8 9"></polyline></svg> Report</div>
                    
                </button>
            }
        </div>

        

        <div ref={newCourseInfo} className='glass max-h-[500px] overflow-y-scroll none-scrollbar w-[94%] fixed hidden z-10 px-5 py-2 top-[58%] left-[48%] -translate-x-1/2 -translate-y-1/2'>
            <div className='bg-white px-7 py-3 rounded-3xl'>
                <div className='flex justify-between items-center bottom-border px-5'>
                    <p className='main-color text-3xl font-bold'>New Course Info</p>
                    <p className='text-red-800 font-black text-2xl cursor-pointer' onClick={toggleCourseInfo}>Cancel</p>
                </div>
                <div className='flex justify-around m-7'>
                    <div className='flex flex-col gap-4'>
                        <div>
                            <p className='main-color text-3xl font-bold'>Course Title</p>
                            <p className='text-gold text-2xl my-2 font-semibold max-w-60'>{selectedCourseToShowInfo?.course_title}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <p className='main-color text-xl font-bold'>Course Price</p>
                            <p className='text-black text-3xl font-black'>{selectedCourseToShowInfo?.course_price}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <p className='main-color text-xl font-bold'>Number of trainees</p>
                            <p className='text-black text-3xl'>{selectedCourseToShowInfo?.num_of_trainees}</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <p className='main-color text-xl font-bold'>From</p>
                            <p className='text-black text-xl'>{selectedCourseToShowInfo?.date_from}</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <p className='main-color text-xl font-bold'>To</p>
                            <p className='text-black text-xl'>{selectedCourseToShowInfo?.date_to}</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <p className='main-color text-xl font-bold'>Location</p>
                            <p className='text-black text-2xl'>{selectedCourseToShowInfo?.location}</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <p className='main-color text-xl font-bold'>Days</p>
                            <p className='text-black text-2xl'>{selectedCourseToShowInfo?.days}</p>
                        </div>
                        <div className="flex items-center gap-12">
                            <div className='flex items-center gap-3'>
                                <p className='main-color text-xl font-bold'>Total hours</p>
                                <p className='text-black text-2xl'>{selectedCourseToShowInfo?.total_hours}</p>
                            </div>
                            <p className='text-black font-black text-xl capitalize'>{selectedCourseToShowInfo?.course_status}</p>
                            
                        </div>
                        
                    </div>
                    <div className='flex flex-col gap-6'>
                        <p className='main-color text-3xl font-bold'>Total Revenue & Fees</p>
                        <div className='flex flex-col gap-4'>
                            <pre className='text-black text-2xl font-bold'>Total revenue:    {selectedCourseToShowInfo?.total_revenue}</pre>
                            <div className="flex flex-col gap-2 text-base">
                                <pre className="text-gray-500 font-bold">-Instructor fees:    {selectedCourseToShowInfo?.instructor_fees}</pre>
                                <pre className="text-gray-500 font-bold">-Break cost:    {selectedCourseToShowInfo?.break_cost}</pre>
                                <pre className="text-gray-500 font-bold">-Training Tools:    {selectedCourseToShowInfo?.tools}</pre>
                                <pre className="text-gray-500 font-bold">-Transportation:    {selectedCourseToShowInfo?.transportation}</pre>
                                <pre className="text-gray-500 font-bold">-Accommodation:    {selectedCourseToShowInfo?.accommodation}</pre>
                                <pre className="text-gray-500 font-bold">-Allowance:    {selectedCourseToShowInfo?.allowance}</pre>
                                <pre className="text-gray-500 font-bold">-Other Expenses:    {selectedCourseToShowInfo?.other_expenses}</pre>
                                <pre className="text-red-500 text-2xl font-bold">total Expenses:    {selectedCourseToShowInfo?.total_expenses}</pre>
                            </div>
                            <pre className='text-green-700 text-2xl font-bold'>Net revenue:    {selectedCourseToShowInfo?.net_revenue}</pre>
                        </div>
                    </div>
                    <div>
                        <p className="text-2xl main-color font-black">Instructors</p>
                        {instructorsToShow?.length > 0 && 
                            <div className="mt-4">
                                {
                                    instructorsToShow.map((e: any) => (
                                        <p key={e} className="text-xl my-2 text-black capitalize">{e}</p>
                                    ))
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>

        <div ref={newCourseForm} className="fixed z-10 soft-bg p-5 w-fit max-h-[500px] max-w-[850px] overflow-y-scroll none-scrollbar duration-300 top-[100px] -left-full">
            <div className="flex justify-between items-center mb-4">
                {formRole === 'add' ? 
                <p className="main-color text-4xl font-black">Add New Course</p>
                :
                <p className="main-color text-4xl font-black">Update Course</p>
                }
                <GrClose className="main-color text-3xl font-black cursor-pointer" onClick={() => {
                    toggleForm();
                    setFormRole('add')
                }} />
            </div>

            <form className="flex flex-col px-8">
                    <div className="flex flex-col gap-3">
                        
                        <div className="coolinput">
                                <label className="text">Course title</label>
                                <input ref={courseTitle} type="text" name="input" className="input" />
                        </div>
                        <div className="flex gap-3">
                            <div className="coolinput">
                                    <label className="text">Course price</label>
                                    <input ref={coursePrice} onChange={() => {
                                       
                                    }} type="number" name="input" className="input" />
                            </div>
                            <div className="coolinput">
                                    <label className="text">Number of trainees</label>
                                    <input ref={numOfTrainees} onChange={() => {
                                       
                                    }} type="number" name="input" className="input" />
                            </div>
                        </div>
                                <div className="flex justify-between">
                                    
                                    <div className="coolinput">
                                        <label className="text">Days</label>
                                        <input ref={days} type="number" name="input" onChange={(e: any) => setTotalHours(e.target.value * 6)} className="input" />
                                    </div>
                                    <div className="coolinput">
                                        <label className="text">Hours</label>
                                        <input type="number" name="input" className="input" disabled value={totalHours} />
                                    </div>
                                </div>
                        <div className="flex justify-between items-center">
                            <div className="coolinput">
                                <label className="text">Location</label>
                                <select ref={location} className="select-form input">
                                    <option value="alexandria">Alexandria</option>
                                    <option value="cairo">Cairo</option>
                                </select>
                            </div>
                            <div className="flex gap-3 items-center">
                                <input ref={statusRef} type="checkbox" value={statusCourse} className="w-6 h-6" onChange={(e: any) => {
                                    if (e.target.checked === true) {
                                        setStatusCourse("implemented")
                                       
                                    }else {
                                        setStatusCourse("not implemented")
                                        
                                    }
                                }} />
                                <label className="main-color text-2xl">Implemented</label>
                            </div>
                        </div>
                        
                        <div className="flex justify-between my-7">
                            <div className="flex gap-2">
                                <label className="main-color text-xl font-black">From</label>
                                <input value={fromDate} onChange={handleFromDateChange} className="select-form" type="date" />
                            </div>
                            <div className="flex gap-2">
                                <label className="main-color text-xl font-black">To</label>
                                <input value={toDate} onChange={handleToDateChange} className="select-form" type="date" />
                            </div>
                        </div>
                        

                        {formRole === 'update' && 
                        <div className="flex flex-col gap-4">
                            <div>
                                <hr className="main-bg h-1" />
                                <p className="main-color text-2xl font-semibold my-4">Financial Information</p>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="coolinput">
                                    <label className="text">Total revenue</label>
                                    <input value={totalRevenue} onChange={(e: any) => setTotalRevenue(e.target.value)} type="number" name="input" className="input" />
                                </div>
                                <div className="flex justify-between gap-3">
                                    <div className="coolinput">
                                        <label className="text">Instructor Fees</label>
                                        <input value={instructorFees} onChange={(e: any) => setInstructorFees(e.target.value)} type="number" name="input" className="input" />
                                    </div>
                                    <div className="coolinput">
                                        <label className="text">Break Cost</label>
                                        <input value={breakCost} onChange={(e: any) => setBreakCost(e.target.value)} type="number" name="input" className="input" />
                                    </div>
                                    <div className="coolinput">
                                        <label className="text">Tools</label>
                                        <input value={tools} onChange={(e: any) => setTools(e.target.value)} type="number" name="input" className="input" />
                                    </div>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <div className="coolinput">
                                        <label className="text">Transportation</label>
                                        <input value={transportation} onChange={(e: any) => setTransportation(e.target.value)} type="number" name="input" className="input" />
                                    </div>
                                    <div className="coolinput">
                                        <label className="text">Accommodation</label>
                                        <input value={accommodation} onChange={(e: any) => setAccommodation(e.target.value)} type="number" name="input" className="input" />
                                    </div>
                                    <div className="coolinput">
                                        <label className="text">Allowance</label>
                                        <input value={allowance} onChange={(e: any) => setAllowance(e.target.value)} type="number" name="input" className="input" />
                                    </div>
                                    <div className="coolinput">
                                        <label className="text">Other Expenses</label>
                                        <input value={otherExpenses} onChange={(e: any) => setOtherExpenses(e.target.value)} type="number" name="input" className="input" />
                                    </div>
                                </div>
                               <div className="flex gap-8 justify-between">
                                    <div>
                                        <div className="coolinput">
                                            <label className="text">Total Expenses</label>
                                            <input value={totalExpenses} onChange={(e: any) => setTotalExpenses(e.target.value)} type="number" name="input" className="input" />
                                        </div>
                                        <div className="coolinput">
                                            <label className="text">Net Revenue</label>
                                            <input value={netRevenue} onChange={(e: any) => setNetRevenue(e.target.value)} type="number" name="input" className="input" />
                                        </div>
                                    </div>
                                   <div>
                                    <div className="flex items-center gap-4">
                                            <div className="coolinput">
                                                <label className="text">Instructors</label>
                                                <input ref={instructorRef} type="text" name="input" className="input" />
                                            </div>
                                            
                                                <button className="border-2 border-green-600 h-11 text-xl px-2" onClick={(e: any) => {
                                                    e.preventDefault();
                                                    if (instructorRef.current.value !== '') {
                                                        setInstructorsToShow([...instructorsToShow, instructorRef.current.value.trim().toLowerCase().replace(/\s+/g, ' ')])                              
                                                    } 
                                                    instructorRef.current.value = ''
                                                }}>Add</button>
                                                <button className="border-2 border-black h-11 text-xl px-2" onClick={(e: any) => {
                                                    e.preventDefault(); 
                                                    setInstructorsToShow([])
                                                }}>Reset</button>
                                            
                                        </div>
                                        {instructorsToShow?.length > 0 &&
                                        <div>
                                            <p className="text-xl mt-3 main-color font-black">Instructors</p>
                                            <div className="mt-2">
                                                {
                                                    instructorsToShow.map((e: any) => (
                                                        <p key={e} className="text-xl text-black capitalize">{e}</p>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        }
                                   </div>
                               </div>
                            </div>
                        </div>
                        }

                    </div>
                    
                <div className="mt-7 mx-auto">
                    {formRole === 'add' &&
                        <input className="button-81" type="button" value="Add New" onClick={(e: any) => {
                            e.preventDefault();
                            addNewCourse();
                        }} />
                    }
                    {formRole === 'update' && 
                        <input className="button-81" type="button" value="Save" onClick={(e: any) => {
                            e.preventDefault();
                            updateCourse();
                        }} />
                    }
                </div>

            </form>
            

        </div>
        <div className="glass flex justify-between pt-9 mx-11 max-md:flex-col">
                
            <table className="w-full p-2">
                <thead>
                    <tr className="text-gold text-xl font-bold">
                        <th>Title</th>
                        <th>from</th>
                        <th>to</th>
                        <th>location</th>
                        <th>revenue</th>
                        <th>expenses</th>
                        <th>net revenue</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        courses.map((course: any) => (
                            <tr key={course.id} className="table-row main-color text-base font-semibold text-center h-16">
                                <td className="flex gap-1 justify-center mt-4 items-center"><p className="text-gray-600 cursor-pointer" onClick={() => {
                                    toggleNotes();
                                    setNotes(course.notes)
                                    setSelectedNoteId(course.id)
                                }}><MdOutlineNoteAlt /></p> <p className="max-w-60">{course.course_title}</p>
                                   {
                                    course.notes !== "" &&
                                    <IoAlertCircle onClick={() => {
                                        toggleNotes()
                                        setNotes(course.notes)
                                        setSelectedNoteId(course.id)
                                    }} className="text-yellow-400" />
                                   }
                                </td>
                                <td>{course.date_from}</td>
                                <td>{course.date_to}</td>
                                <td>{course.location}</td>
                                <td>{course.total_revenue}</td>
                                <td>{course.total_expenses}</td>
                                <td>{course.net_revenue}</td>
                                <td>
                                    <div className="table-row-buttons flex justify-center gap-3">
                                        {course.course_status === 'implemented' && <FaCheckCircle className="cursor-pointer text-xl text-green-500" onClick={() => changeCourseStatusToNotImplemented(course.id)} />}
                                        {course.course_status === 'not implemented' && <FaClockRotateLeft className="cursor-pointer text-xl text-gray-500" onClick={() => changeCourseStatusToImplemented(course.id)} />}
                                        <RiShareBoxFill className="cursor-pointer text-xl text-gray-700" onClick={() => {
                                            setSelectedCourseToShowInfo(course)
                                            toggleCourseInfo()
                                            let instSplitter = course.instructors?.split('-')
                                            setInstructorsToShow(instSplitter)
                                        }} />
                                        <FaEdit className="cursor-pointer text-xl text-green-700" onClick={() => {
                                            
                                            setFormRole('update')
                                            toggleForm()
                                            changeInputsToUpdate(course)
                                        }} />
                                        <MdDelete className="cursor-pointer text-xl text-red-700" onClick={() => {
                                            deleteCourse(course.id)
                                        }} />
                                    </div>     
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
    
        </div>

        <div ref={notesRef} className="soft-bg w-fit p-7 fixed hidden top-[56%] left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-between items-center mb-3 bottom-border">
                <p className="main-color text-3xl font-black flex gap-2">Notes <FaPencilAlt className="text-3xl text-green-600 font-black" /></p>
                <div onClick={toggleNotes}><p className="main-color text-3xl font-black cursor-pointer">
                    <GrClose />
                </p></div>
            </div>
            <div>
                <form className="flex flex-col justify-center gap-5">
                    <textarea value={notes} onChange={(e: any) => setNotes(e.target.value)} className="text-xl main-color bg-transparent" cols={35} rows={10}></textarea>
                    <input type="submit" value="Save" onClick={(e: any) => {
                        e.preventDefault();
                        saveNotes(selectedNoteId)
                        toggleNotes();
                    }} className="button-81 m-3" />
                </form>
            </div>
        </div>

    </div>
    }
</>
  )
}

export default Page