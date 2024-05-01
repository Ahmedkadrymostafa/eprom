'use client'
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { FaEdit, FaPencilAlt } from "react-icons/fa";
import { MdDelete, MdOutlineNoteAlt } from "react-icons/md";
import { toast } from "react-toastify";
import { DataContext } from "../layout";
import { GrClose } from "react-icons/gr";
import DatePicker from 'react-date-picker';
import NewCourseInfo from "@/app/components/NewCourseInfo";
import { IoAlertCircle } from "react-icons/io5";
import { RiShareBoxFill } from "react-icons/ri";
// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

// type newCourseData = {
//     name?: any,
//     num_of_trainees?: any,
//     date_from?: any,
//     date_to?: any,
//     days?: any,
//     total_hours?: any,
//     location?: any,
//     courseStatus?: any,
//     total_revenue?: any,
//     instructor_fees?: any,
//     break_cost?: any,
//     training_tools?: any,
//     net_revenue?: any,
//     instructors?: any,
//     notes?: any,
// }
type addNewCourseData = {
    id?: any
    course_title: any,
    course_price: any,
    num_of_trainees: any,
    days: any,
    total_hours: any,
    location: any,
    course_status: any,
    date_from: any,
    date_to: any,
    total_revenue: any,
    instructor_fees: any,
    break_cost: any,
    tools: any,
    transportation: any,
    accommodation: any,
    allowance: any,
    other_expenses: any,
    total_expenses: any,
    net_revenue: any,
    instructors?: any,
    notes?: any,
}
const Page = () => {

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
    // const dateFromRef: any = useRef()
    // const dateToRef: any = useRef()
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
    // const total_revenueRef: any = useRef()
    // const instructor_feesRef: any = useRef()
    // const break_costRef: any = useRef()
    // const toolsRef: any = useRef()
    // const transportationRef: any = useRef()
    // const accommodationRef: any = useRef()
    // const allowanceRef: any = useRef()
    // const other_expensesRef: any = useRef()
    // const total_expensesRef: any = useRef()
    // const [ totalExpenses, setTotalExpenses ] = useState(0); 
    // const net_revenueRef: any = useRef()
    
    // const [ totalHours, setTotalHours ] = useState(0);
    // const [ newCourseData, setNewCourseData ] = useState<newCourseData>({});


//   const [daysDifference, setDaysDifference] = useState(0);

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

    let instructorsSplitter = course.instructors.split('-')

    if (!instructorsSplitter.includes('')) {
        setInstructorsToShow(instructorsSplitter)
    }else {
        setInstructorsToShow([])
    }
   }
//   const calculateDays = (from: any, to: any) => {
//     const fromDateObj: any = new Date(from);
//     const toDateObj: any = new Date(to);

//     if (isNaN(fromDateObj.getTime()) || isNaN(toDateObj.getTime())) {
//       setDaysDifference(0);
//       return;
//     }

//     const timeDifference = toDateObj - fromDateObj;
//     const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

//     let totalRev = parseInt(coursePrice.current.value) * Math.round(daysDifference)
//     setTotalHours(Math.round(daysDifference) * 6)
//     setTotalRevenue(totalRev)
//     setDaysDifference(Math.round(daysDifference));
//   };

    const notesRef: any = useRef()
    const [notes, setNotes] = useState('');
    const [selectedNoteId, setSelectedNoteId] = useState<any>('');
    // const editName: any = useRef()
    // const editCourse: any = useRef()
    const newCourseForm: any = useRef()
    const newCourseInfo: any = useRef()

    const dataContext: any = useContext(DataContext)
    const [ courses, setCourses ] = useState(dataContext.courses)

    const toggleForm = () => {
        newCourseForm.current.classList.toggle('left-[15px]')
        newCourseForm.current.classList.toggle('-left-full')
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
        // date_to.current.value = ''
        // date_from.current.value = ''
        // setStatusCourse('not implemented')
        // statusRef.current.checked = false
        // setTotalRevenue(0)
        // setTotalHours(0)
        // setDaysDifference(0)
        // instructor_fees.current.value = ''
        // break_cost.current.value = ''
        // training_tools.current.value = ''
        // setInstructorsToShow([])
        // toggleCourseInfo()
    }
    const viewCourseInfo = () => {
        if (
            !name.current.value ||
            !numOfTrainees.current.value ||
            !fromDate ||
            !toDate ||
            !coursePrice.current.value ||
            !instructor_fees.current.value ||
            !break_cost.current.value ||
            !training_tools.current.value
        ) {
            return toast.warn("please enter full fields")
        }
        let IF = parseInt(instructor_fees.current.value) * parseInt(numOfTrainees.current.value);
        let BC = parseInt(break_cost.current.value) * parseInt(numOfTrainees.current.value);
        let TT = parseInt(training_tools.current.value) * parseInt(numOfTrainees.current.value);
        setNewCourseData({
            name: name.current.value,
            num_of_trainees: parseInt(numOfTrainees.current.value),
            date_from: fromDate,
            date_to: toDate,
            days: daysDifference,
            total_hours: totalHours,
            location: location.current.value,
            status: statusCourse,
            total_revenue: totalRevenue,
            instructor_fees: IF,
            break_cost: BC,
            training_tools: TT,
            net_revenue: totalRevenue - (IF + BC + TT),
            instructors: instructorsToShow.join('-'),
            notes: '',
        })
        toggleForm();
        toggleCourseInfo();
    }
    const saveNotes = async (id: any) => {
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
        })
    }
    const addNewCourse = async () => {
        let data: addNewCourseData = {
            course_title: courseTitle.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
            course_price: coursePrice.current.value,
            num_of_trainees: numOfTrainees.current.value,
            days: days.current.value,
            total_hours: totalHours,
            location: location.current.value,
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
            // console.log(courses)
            toast.success("New course added successfully")
            emptyInputs();
        }).catch(error => toast.error("course title is exist"))
        console.log(data)
    }
    const updateCourse = async () => {
        let data: addNewCourseData = {
            id: selectedCourseToUpdateId,
            course_title: courseTitle.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
            course_price: coursePrice.current.value,
            num_of_trainees: numOfTrainees.current.value,
            days: days.current.value,
            total_hours: totalHours,
            location: location.current.value,
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
            instructors: instructorsToShow.join('-'),
        };
        console.log(data);
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
            // editCourse.current.classList.toggle('active-new-course')
        }).catch((error) => {
            console.log(error)
        })
    }
    const deleteCourse = async (id: any) => {
        console.log(id)
        await axios.delete(`/api/courses/${id}`).then(() => {
            toast.success('deleted')
            const afterDeleted = courses.filter((i: any) => i.id !== id)
            setCourses(afterDeleted)
            dataContext.setCourses(afterDeleted)
        }).catch((err) => {
            console.log(err)
        })
    }
    
  return (
    <div className="relative">
        <div className="flex justify-between items-center mx-6 my-5">
            <p className="main-color text-4xl font-bold">Courses</p>
            <button className="button" onClick={() => {
                toggleForm();
                setFormRole('add');
            }}>
                <span className="button-content">Add New Course</span>
            </button>
        </div>

        <div ref={newCourseInfo} className='glass w-[100%] hidden absolute z-10 px-5 py-2 top-0 -translate-x-1/2 left-1/2'>
            <div className='bg-white px-7 py-3 rounded-3xl'>
                <div className='flex justify-between items-center bottom-border px-5'>
                    <p className='main-color text-3xl font-bold'>New Course Info</p>
                    <p className='text-red-800 font-black text-2xl cursor-pointer' onClick={emptyInputs}>Cancel</p>
                </div>
                <div className='flex justify-around m-7'>
                    <div className='flex flex-col gap-4'>
                        <div>
                            <p className='main-color text-2xl font-bold'>Course Title</p>
                            <p className='text-black text-xl font-semibold max-w-60'>{newCourseData.name}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <p className='main-color text-xl font-bold'>Number of trainees</p>
                            <p className='text-black text-3xl'>{newCourseData.num_of_trainees}</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <p className='main-color text-xl font-bold'>From</p>
                            <p className='text-black text-xl'>{newCourseData.date_from}</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <p className='main-color text-xl font-bold'>To</p>
                            <p className='text-black text-xl'>{newCourseData.date_to}</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <p className='main-color text-xl font-bold'>Location</p>
                            <p className='text-black text-2xl'>{newCourseData.location}</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <p className='main-color text-xl font-bold'>Days</p>
                            <p className='text-black text-2xl'>{newCourseData.days}</p>
                        </div>
                        <div className="flex items-center gap-12">
                            <div className='flex items-center gap-3'>
                                <p className='main-color text-xl font-bold'>Total hours</p>
                                <p className='text-black text-2xl'>{newCourseData.total_hours}</p>
                            </div>
                            <p className='text-black font-black text-xl capitalize'>{newCourseData.status}</p>
                            
                        </div>
                        
                    </div>
                    <div className='flex flex-col gap-6'>
                        <p className='main-color text-3xl font-bold'>Total Revenue & Fees</p>
                        <div className='flex flex-col gap-4'>
                            <pre className='text-black text-xl font-bold'>Total revenue:    {newCourseData.total_revenue}</pre>
                            <pre className="text-gray-500 text-xl font-bold">-Instructor fees:    {newCourseData.instructor_fees}</pre>
                            <pre className="text-gray-500 text-xl font-bold">-Break cost:    {newCourseData.break_cost}</pre>
                            <pre className="text-gray-500 text-xl font-bold">-Training Tools:    {newCourseData.training_tools}</pre>
                            <pre className='text-black text-xl font-bold'>Net revenue:    {newCourseData.net_revenue}</pre>
                        </div>
                        <button className='button-81' onClick={addNewCourse}>Submit</button>
                    </div>
                    <div>
                        <p className="text-2xl main-color font-black">Instructors</p>
                        <div className="mt-4">
                            {
                                instructorsToShow.map((e: any) => (
                                    <p key={e} className="text-base text-black capitalize">{e}</p>
                                ))
                            }
                        </div>
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
                                        // let totalRev = parseInt(coursePrice.current.value) * parseInt(numOfTrainees.current.value);
                                        // setTotalRevenue(totalRev)
                                    }} type="number" name="input" className="input" />
                            </div>
                            <div className="coolinput">
                                    <label className="text">Number of trainees</label>
                                    <input ref={numOfTrainees} onChange={() => {
                                        // let totalRev = parseInt(coursePrice.current.value) * parseInt(numOfTrainees.current.value);
                                        // setTotalRevenue(totalRev)
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
                                    <option value="Alexandria">Alexandria</option>
                                    <option value="Cairo">Cairo</option>
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
                                                        setInstructorsToShow([...instructorsToShow, instructorRef.current.value])                              
                                                    } 
                                                    instructorRef.current.value = ''
                                                }}>Add</button>
                                                <button className="border-2 border-black h-11 text-xl px-2" onClick={(e: any) => {
                                                    e.preventDefault(); 
                                                    setInstructorsToShow([])
                                                }}>Reset</button>
                                            
                                        </div>
                                        {instructorsToShow.length !== 0 &&
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
                    {/* <div className="w-1/2">
                        <div className="flex gap-5">
                            */}
                                
                                
                            
                            {/* <div className="flex flex-col gap-5">
                                <div className="coolinput">
                                    <label className="text">Instructor fees</label>
                                    <input ref={instructor_fees} type="number" name="input" className="input" />
                                </div>
                                <div className="coolinput">
                                    <label className="text">Break cost</label>
                                    <input ref={break_cost} type="number" name="input" className="input" />
                                </div>
                                <div className="coolinput">
                                    <label className="text">Training tools</label>
                                    <input ref={training_tools} type="number" name="input" className="input" />
                                </div>
                            </div> */}
                        {/* </div>
                    </div> */}

                    {/* <div>
                        <div className="flex">
                            <div className="coolinput">
                                <label className="text">Instructors</label>
                                <input ref={instructorRef} type="text" name="input" className="input" />
                            </div>
                            <button onClick={(e: any) => {
                                e.preventDefault();                                
                                instructorsToShow.push(instructorRef.current.value);
                                instructorRef.current.value = ''
                            }}>Add</button>
                        </div>
                        
                    </div> */}
                {/* </div> */}
                    
                <div className="mt-7 mx-auto">
                    {formRole === 'add' &&
                        <input className="button-81" type="submit" value="Add New" onClick={(e: any) => {
                            e.preventDefault();
                            // viewCourseInfo();
                            addNewCourse();
                        }} />
                    }
                    {formRole === 'update' && 
                        <input className="button-81" type="submit" value="Save" onClick={(e: any) => {
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
                    <tr className="text-gold text-2xl font-bold">
                        <th>Title</th>
                        <th>from</th>
                        <th>to</th>
                        <th>location</th>
                        <th>status</th>
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
                                }}><MdOutlineNoteAlt /></p> {course.course_title}
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
                                <td>{course.course_status}</td>
                                <td>{course.total_revenue}</td>
                                <td>{course.total_expenses}</td>
                                <td>{course.net_revenue}</td>
                                <td>
                                    <div className="table-row-buttons flex justify-center gap-3">
                                        <RiShareBoxFill className="cursor-pointer text-2xl text-gray-700" />
                                        <FaEdit className="cursor-pointer text-2xl text-green-700" onClick={() => {
                                            // editCourse.current.classList.toggle('active-new-course')
                                            // setSelected({id: course.id, name: course.name})
                                            // editName.current.value = course.name
                                            setFormRole('update')
                                            toggleForm()
                                            changeInputsToUpdate(course)
                                        }} />
                                        <MdDelete className="cursor-pointer text-2xl text-red-700" onClick={() => {
                                            deleteCourse(course.id)
                                        }} />
                                    </div>     
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
    
    
                {/* <div className="flex flex-col gap-3 w-full m-16">

                    {
                        courses.map((course: any) => (
                            <div key={course.id} className="flex justify-between items-center p-4 hover:bg-slate-300">
                                <p className="main-color text-2xl font-black">{course.name}</p>
                                
                                <div className="flex justify-center gap-5">
                                    <FaEdit className="cursor-pointer text-3xl text-yellow-400" onClick={() => {
                                        editCourse.current.classList.toggle('active-new-course')
                                        setSelected({id: course.id, name: course.name})
                                        editName.current.value = course.name
                                    }} />
                                    <MdDelete className="cursor-pointer text-3xl text-red-700" onClick={() => {
                                        deleteCourse(course.id)
                                    }} />
                                </div>                       
                            </div>
                        ))
                    }
                    

                </div> */}
    
                
    
    
    
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


            {/* <div ref={editCourse} className="soft-bg w-fit p-7 hidden opacity-0 duration-300 flex-col gap-5 fixed top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="flex justify-between items-center">
                                <p className="main-color text-3xl font-black">Edit Course</p>
                                <div onClick={(e: any) => {
                                    e.preventDefault();
                                    editCourse.current.classList.toggle('active-new-course');
                                }}><p className="main-color text-3xl font-black cursor-pointer">
                                    <GrClose />
                                </p></div>
                            </div>
                            <div className="flex flex-col">
                                <form>
                                    <div className="coolinput mx-auto">
                                        <label className="text">Course Name:</label>
                                        <input ref={editName} type="text" name="input" className="input" />
                                    </div>
                                    
                                    <input className="submit mx-auto mt-7" type="submit" value="Save" onClick={(e: any) => {
                                        e.preventDefault();
                                        // update();
                                    }} />
                                </form>
                            </div>
                </div> */}
    </div>
  )
}

export default Page