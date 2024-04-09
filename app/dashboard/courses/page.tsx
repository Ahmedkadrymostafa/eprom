'use client'
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { DataContext } from "../layout";
import { GrClose } from "react-icons/gr";

const Page = () => {
    const name: any = useRef()
    const editName: any = useRef()
    const editCourse: any = useRef()
    const dataContext: any = useContext(DataContext)
    const [ courses, setCourses ] = useState(dataContext.courses)
    const [ selected, setSelected ] = useState<any>({})

    const addNewCourse = async () => {
        let data = {
            name: name.current.value.trim().toLowerCase().replace(/\s+/g, ' ')
        }
        if (!data.name) return toast.warn("field course name is required")

        await axios.post('/api/courses', data).then(response => {
            setCourses([{id: response.data.id, name: data.name}, ...courses])
            dataContext.setCourses([{id: response.data.id, name: data.name}, ...courses])
            // console.log(courses)
            toast.success("New course added successfully")
            name.current.value = ""
        }).catch(error => toast.error("course title is exist"))
    }
    const update = async () => {
        let data = {
            id: selected.id,
            name: editName.current.value.trim().toLowerCase().replace(/\s+/g, ' ')
        }
        if (!data.name) return toast.warn("field course name is required")
        let updatedCourses = [...courses]
        await axios.put('/api/courses', data).then(() => {
            let toUpdate = courses.findIndex((i: any) => i.id === selected.id)
            if (toUpdate !== -1) {
                updatedCourses[toUpdate] = {...updatedCourses[toUpdate],
                    name: data.name                   
                }
            }
            setCourses(updatedCourses);
            dataContext.setCourses(updatedCourses)
            toast.success("updated successfully")
            editCourse.current.classList.toggle('active-new-course')
        }).catch((err) => {
            toast.error("course title is exist")
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
        <p className="main-color text-4xl font-bold mx-6 my-5">Courses</p>
        <div className="glass flex justify-between pt-9 mx-11 max-md:flex-col">
                
            
                <div className="p-5 w-96">
                    <p className="main-color text-2xl font-black mb-4 text-center">Add New Course</p>
                    <form className="flex flex-col gap-3">
                        <input className="input" ref={name} type="text" placeholder="Course Title" />
                        
                        <input className="button-81" type="submit" onClick={(e: any) => {
                            e.preventDefault();
                            addNewCourse();
                        }} />
                    </form>
                    
    
                </div>
    
    
                <div className="flex flex-col gap-3 w-full m-16">

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
                    

                </div>
    
                
    
    
    
            </div>
            <div ref={editCourse} className="soft-bg w-fit p-7 hidden opacity-0 duration-300 flex-col gap-5 fixed top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2">
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
                                        update();
                                    }} />
                                </form>
                            </div>
                </div>
    </div>
  )
}

export default Page