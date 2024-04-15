'use client'
import Loading from "@/app/loading";
import { useState, useRef, useEffect, useContext } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaSearch, FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { GrClose } from "react-icons/gr";
import { DataContext } from "../layout";
import Link from "next/link";
import { FaShareFromSquare } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";

const Page = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ editButton, setEditButton ] = useState(false);
    const [ trainees, setTrainees ] = useState<any>([]);
    // const [ cloneTrainees, setCloneTrainees ] = useState<any>([]);
    const [ traineeToDelete, setTraineeToDelete ] = useState({id: "", name: ""})
    const [ traineeToDeleteIndex, setTraineeToDeleteIndex ] = useState()
    const [ traineeToUpdate, setTraineeToUpdate ] = useState("")
    const person_id: any = useRef()
    const name: any = useRef()
    const title: any = useRef()
    const project: any = useRef()
    const location: any = useRef()
    const department: any = useRef()
    const formPopUp: any = useRef();
    const deletePopUp: any = useRef();

    const dataContext: any = useContext(DataContext)
    
 
       const emptyInputs = () => {
        person_id.current.value = ""
        name.current.value = ""
        title.current.value = ""
        project.current.value = ""
        location.current.value = ""
        department.current.value = ""
        formPopUp.current.classList.toggle('active-form-popup')
       }

    const addTrainee = async () => {
        let data = {
            person_id: person_id.current.value.toLowerCase().trim().replace(/\s+/g, ' '),
            name: name.current.value.toLowerCase().trim().replace(/\s+/g, ' '),
            title: title.current.value.toLowerCase().trim().replace(/\s+/g, ' '),
            project: project.current.value.toLowerCase().trim().replace(/\s+/g, ' '),
            location: location.current.value.toLowerCase().trim().replace(/\s+/g, ' '),
            department: department.current.value.toLowerCase().trim().replace(/\s+/g, ' '),
        }
        if (!data.person_id || !data.name ) {
            return toast.warning("person id and name is required")
        }

        await axios.post('/api/trainees', data).then((res: any) => {
            console.log(res.data.id)
            setTrainees([{id: res.data.id, ...data}, ...trainees])
            // setCloneTrainees([data, ...trainees])

            dataContext.setTrainees([{id: res.data.id, ...data}, ...trainees])

            emptyInputs();
            toast.success("New Trainee added successfully")
        
        // emptyInputs();
        }).catch(err => {
            toast.error(`Failed to add because trainee is exist with id ${data.person_id}`)
        })
            console.log(data)
    }
    const updateTrainee = async () => {
        console.log(traineeToUpdate)
        let data = {
            person_id: person_id.current.value.toLowerCase().trim().replace(/\s+/g, ' '),
            name: name.current.value.toLowerCase().trim().replace(/\s+/g, ' '),
            title: title.current.value.toLowerCase().trim().replace(/\s+/g, ' '),
            project: project.current.value.toLowerCase().trim().replace(/\s+/g, ' '),
            location: location.current.value.toLowerCase().trim().replace(/\s+/g, ' '),
            department: department.current.value.toLowerCase().trim().replace(/\s+/g, ' '),
        }
        if (!data.person_id || !data.name ) {
            return toast.warning("person id and name is required")
        }
        const updatedTrainees = [...trainees]
        await axios.put(`/api/trainees/${traineeToUpdate}`, data).then(() => {
            let updated = trainees.findIndex((i: any) => i.id === traineeToUpdate)
            console.log(trainees[updated])
            if (updated !== -1) {
                updatedTrainees[updated] = {...updatedTrainees[updated], 
                    person_id: data.person_id,
                    name: data.name,
                    title: data.title,
                    project: data.project,
                    location: data.location,
                    department: data.department,
                }
            }
            
            setTrainees(updatedTrainees)
            // setCloneTrainees(updatedTrainees)
            dataContext.setTrainees(updatedTrainees)
            emptyInputs()
            toast.success("updated successfully")
        }).catch(err => {
            toast.error(`Failed to update trainee`)
            console.log(err)
        })
    }
    const deleteTrainee = async (id: any, e: any) => {  
        setIsLoading(true)

        await axios.delete(`/api/trainees/${id}`).then((res) => {
            setIsLoading(false)
            const updatedItems = trainees.filter((index: any) => index !== e);
            setTrainees(updatedItems)
            // setCloneTrainees(updatedItems)
            toast.success("Successfully deleted")
        }).catch((err) => {
            toast.error("Failed to delete trainee")
            setIsLoading(false)
        });  
    }


    const search = (e: any) => {           
        if (e !== "") {
            const filtered = dataContext.trainees.filter((index: any) => index.name.includes(e.toLowerCase()))
            setTrainees(filtered)
        }else {
            setTrainees(dataContext.trainees);
        }
        
    }


    useEffect(() => {
    //    GetTrainees()
            setIsLoading(false)
            setTrainees(dataContext.trainees)
            // setCloneTrainees(dataContext.trainees)
            console.log(dataContext.trainees)
    }, [dataContext])

  return (
    <>
        {isLoading ?  <Loading /> : 
            <div className="relative">
                
                <div ref={deletePopUp} className="form-popup absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 w-96">
                    <div className="flex justify-between items-center mb-8">
                        <p>{`Are you sure to delete ${traineeToDelete.name}`}</p>
                        <p className="text-black cursor-pointer text-2xl font-bold" onClick={() => {
                            
                            deletePopUp.current.classList.toggle('active-form-popup')
                        }} ><GrClose /></p>
                    </div>
                    <div className="trainee-btn w-fit mx-auto h-[45px] flex gap-2 items-center cursor-pointer duration-150 main-bg text-gold rounded-xl p-3 text-xl" onClick={() => {
                        deleteTrainee(traineeToDelete.id, traineeToDeleteIndex)
                        deletePopUp.current.classList.toggle('active-form-popup')
                        // console.log(traineeToDelete.id, traineeToDeleteIndex)
                    }}>
                        Delete
                    </div>
                </div>
        <div>
                
        <div>
            <div className="glass w-fit py-9 px-7 mx-auto flex justify-between items-center gap-6">
                <div className="search">
                    <input type="text" className="searchTerm" placeholder="What are you looking for?" onChange={(e: any) => {
                        search(e.target.value)
                    }} />
                    <button type="submit" className="searchButton">
                        <FaSearch />
                    </button>
                </div>
                <div className="trainee-btn h-[45px] flex gap-2 items-center cursor-pointer duration-150 main-bg text-gold rounded-xl p-3 text-xl" onClick={() => {
                    setEditButton(false);
                    formPopUp.current.classList.toggle('active-form-popup')
                }}>
                    
                        <FaUserPlus />
                        <span>Trainee</span>
                </div>
            </div>
        </div>

        <div className="h-[500px] overflow-y-scroll max-md:h-auto w-full">
                <table className="admin-table w-[97%]">
                    <thead>
                        <tr>
                            <th className="admin-th">Id</th>
                            <th className="admin-th">Name</th>
                            <th className="admin-th">Title</th>
                            <th className="admin-th">Project</th>
                            <th className="admin-th">location</th>
                            <th className="admin-th">department</th>
                            <th className="admin-th">{`${trainees.length} Trainee`}</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {
                                trainees.map((e: any) => (
                                <tr key={e.person_id} className="admin-tr">
                                    <td className="admin-td">{e.person_id}</td>
                                    <td className="admin-td relative">
                                        <Link href={`/dashboard/trainees/${e.person_id}`} >
                                            {e.name}
                                            <p className="text-gold text-2xl font-black absolute top-6 left-6"><IoIosShareAlt /></p>
                                        </Link>
                                    </td>
                                    <td className="admin-td">{e.title}</td>
                                    <td className="admin-td">{e.project}</td>
                                    <td className="admin-td">{e.location}</td>
                                    <td className="admin-td">{e.department}</td>
                                    
                                    <td className="text-2xl font-black ">
                                        <div className="flex justify-center gap-5 row-buttons">
                                            <Link href={`/dashboard/trainees/${e.person_id}`} className="text-white"><FaShareFromSquare /></Link>
                                            <FaEdit className="cursor-pointer text-yellow-400" onClick={() => {
                                                setEditButton(true);
                                                setTraineeToUpdate(e.id)
                                                person_id.current.value = e.person_id
                                                name.current.value = e.name
                                                title.current.value = e.title
                                                project.current.value = e.project
                                                location.current.value = e.location
                                                department.current.value = e.department
                                                formPopUp.current.classList.toggle('active-form-popup')
                                            }} />
                                            <MdDelete className="cursor-pointer text-red-700" onClick={() => {
                                                setTraineeToDeleteIndex(e)
                                                setTraineeToDelete({id: e.person_id, name: e.name})
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

            <div ref={formPopUp} className="form-popup fixed top-[57%] left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 w-96">
                <div className="flex justify-between items-center mb-4">
                    {editButton ? <p className="main-color text-2xl font-black">Edit</p> : <p className="main-color text-2xl font-black">New Trainee</p>}
                    <p className="text-black cursor-pointer text-2xl font-bold" onClick={() => {
                        emptyInputs()
                    }} ><GrClose /></p>
                </div>
                <form className="flex flex-col gap-3">
                    <input ref={person_id} type="text" placeholder='Person Id' className='input' />
                    <input ref={name} type="text" placeholder='Name' className='input' />
                    <input ref={title} type="text" placeholder='Title' className='input' />
                    <input ref={project} type="text" placeholder='Project' className='input' />
                    <input ref={location} type="text" placeholder='Location' className='input' />
                    <input ref={department} type="text" placeholder='Department' className='input' />
                    {editButton ? <input className="button-81" type="submit" value="Save" onClick={(e: any) => {
                        e.preventDefault();
                        updateTrainee();
                    }} />
                    :
                    <input className="button-81" type="submit" onClick={(e: any) => {
                        e.preventDefault();
                        addTrainee()
                    }} />
                    }
                </form>
            </div>
                        
            </div>
        }
    </>
  )
}

export default Page