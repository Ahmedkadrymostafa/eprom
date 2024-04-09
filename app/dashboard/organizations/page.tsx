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
    const editOrganization: any = useRef()
    const dataContext: any = useContext(DataContext)
    const [ ORGS, setORGS ] = useState(dataContext.ORGS)
    const [ selected, setSelected ] = useState<any>({})

    const addNewOrganization = async () => {
        let data = {
            name: name.current.value.trim().toLowerCase().replace(/\s+/g, ' ')
        }
        if (!data.name) return toast.warn("field ORG name is required")

        await axios.post('/api/org', data).then(response => {
            setORGS([{id: response.data.id, name: data.name}, ...ORGS])
            dataContext.setORGS([{id: response.data.id, name: data.name}, ...ORGS])
            // console.log(courses)
            toast.success("New ORG added successfully")
            name.current.value = ""
        }).catch(error => toast.error("ORG title is exist"))
    }
    const update = async () => {
        let data = {
            id: selected.id,
            name: editName.current.value.trim().toLowerCase().replace(/\s+/g, ' ')
        }
        if (!data.name) return toast.warn("field ORG name is required")
        let updatedORGS = [...ORGS]
        await axios.put('/api/org', data).then(() => {
            let toUpdate = ORGS.findIndex((i: any) => i.id === selected.id)
            if (toUpdate !== -1) {
                updatedORGS[toUpdate] = {...updatedORGS[toUpdate],
                    name: data.name                   
                }
            }
            setORGS(updatedORGS);
            dataContext.setORGS(updatedORGS)
            toast.success("updated successfully")
            editOrganization.current.classList.toggle('active-new-course')
        }).catch((err) => {
            toast.error("ORG title is exist")
        })
    }
    
  return (
    <div className="relative">
        <p className="main-color text-4xl font-bold mx-6 my-5">Organizations</p>
        <div className="glass flex justify-between pt-9 mx-11 max-md:flex-col">
                
            
                <div className="p-5 w-96">
                    <p className="main-color text-2xl font-black mb-4 text-center">Add New ORG</p>
                    <form className="flex flex-col gap-3">
                        <input className="input" ref={name} type="text" placeholder="Organization Title" />
                        
                        <input className="button-81" type="submit" onClick={(e: any) => {
                            e.preventDefault();
                            addNewOrganization();
                        }} />
                    </form>
                    
    
                </div>
    
    
                <div className="flex flex-col gap-3 w-full m-16">

                    {
                        ORGS.map((org: any) => (
                            <div key={org.id} className="flex justify-between items-center p-4 hover:bg-slate-300">
                                <p className="main-color text-2xl font-black uppercase">{org.name}</p>
                                
                                <div className="flex justify-center gap-5">
                                    <FaEdit className="cursor-pointer text-3xl text-yellow-400" onClick={() => {
                                        editOrganization.current.classList.toggle('active-new-course')
                                        setSelected({id: org.id, name: org.name})
                                        editName.current.value = org.name
                                    }} />
                                    {/* <MdDelete className="cursor-pointer text-3xl text-red-700" onClick={() => {
                                        deleteCourse(course.id)
                                    }} /> */}
                                </div>                       
                            </div>
                        ))
                    }
                    
                </div>
    
                
    
    
    
            </div>
            <div ref={editOrganization} className="soft-bg w-fit p-7 hidden opacity-0 duration-300 flex-col gap-5 fixed top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="flex justify-between items-center">
                                <p className="main-color text-3xl font-black">Edit</p>
                                <div onClick={(e: any) => {
                                    e.preventDefault();
                                    editOrganization.current.classList.toggle('active-new-course');
                                }}><p className="main-color text-3xl font-black cursor-pointer">
                                    <GrClose />
                                </p></div>
                            </div>
                            <div className="flex flex-col">
                                <form>
                                    <div className="coolinput mx-auto">
                                        <label className="text">Name:</label>
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