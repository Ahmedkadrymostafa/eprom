'use client'
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react"
import Cryptr from "cryptr";
import { MdClose, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Loading from "@/app/loading";
import { FaWindowClose } from "react-icons/fa";
import { DataContext } from "@/app/dashboard/layout";

const AdminForm = () => {
const dataContext: any = useContext(DataContext)

  const cryptr = new Cryptr('secretKey', { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 10 });
  const name: any = useRef();
  const email: any = useRef();
  const password: any = useRef();
  const id: any = useRef();
  const role: any = useRef();
  const adminInputs: any = useRef();
  const [ admins, setAdmins ] = useState<any>([]);
  const [ isLoading, setIsLoading ] = useState(true);

  const toggler = () => {
    if (adminInputs.current.classList.contains('-left-96')) {
        adminInputs.current.classList.remove('-left-96')
        adminInputs.current.classList.add('left-10')
    }else {
        adminInputs.current.classList.add('-left-96')
        adminInputs.current.classList.remove('left-10')
    }
  }
    const emptyInputs = () => {
        name.current.value = "";
        email.current.value = "";
        password.current.value = "";
        id.current.value = "";
        toggler();
    }

const postAdmins = async () => {
    setIsLoading(true);

    const nameV = name.current.value.toLowerCase().trim().replace(/\s+/g, ' ');
    const emailV = email.current.value.toLowerCase().trim().replace(/\s+/g, '');
    const passwordV = password.current.value.toLowerCase();
    const idV = id.current.value;
    const roleV = role.current.value.toLowerCase()
    
    const hash = cryptr.encrypt(passwordV)
    
    if (!nameV || !emailV || !passwordV || !idV || !roleV) {
        setIsLoading(false)
        return toast.warning("Please enter full inputs")
    }
    
    let data: any = {
        name: nameV,
        email: emailV,
        password: hash,
        id: parseInt(idV),
        role: roleV,
        session: ""
    }

    let checkExistingEmail = admins.filter((admin: any) => admin.email === data.email)
    
    if (checkExistingEmail.length > 0) {
        setIsLoading(false)
        return toast.error("Failed to add admin because Email is exist")
    }
    
    await axios.post('/api/admins', data).then((res) => {
        // setIsLoading(false)
        toast.success("New admin added successfully")
        setAdmins([...admins, 
            data
        ])
       
        emptyInputs();
        
    }).catch(err => {
        
        console.log(err);
        // setIsLoading(false)
    }).finally(() => setIsLoading(false))
    
}

  const getAdmins = async () => {
    await axios.get("/api/admins").then((res) => {
        // console.log(res.data)
        setIsLoading(false)
        const filterAdmins = res.data.filter((admin: any) => admin.role !== 'developer')
        setAdmins(filterAdmins)
    }).catch(err => {
        console.log(err)
        setIsLoading(false)
    })
    // console.log(admins)
  }

  const deleteAdmin = async (email: any) => {
    setIsLoading(true)
   axios.delete(`/api/admins/${email}`).then((res) => {
        setIsLoading(false)
        getAdmins();
        toast.success("deleted successfully")
    }).catch((err) => {
        toast.error("Failed to delete admin")
        setIsLoading(false)
    });
  }
  
  useEffect(() => {
    getAdmins();
  }, [])

  if (isLoading) return <Loading />


return (
    <div>

            <div className="flex justify-between px-10 py-6">
                <p className="text-5xl font-bold main-color">Admins Board</p>
                <button className="button" onClick={toggler}>
                    <span className="button-content">New Admin</span>
                </button>
            </div>

        <div className="relative flex justify-between pt-5 px-11 max-md:flex-col">
                
            
            <div ref={adminInputs} className="glass p-5 w-96 fixed duration-300 top-[80px] -left-96 left">
                <div className="bg-white p-4 rounded-3xl">
                    <div className="flex justify-between items-center mb-8 ">
                        <p className="main-color text-3xl font-black text-center">New Admin</p>
                        <button className="main-color text-3xl font-black" onClick={toggler}><FaWindowClose /></button>
                    </div>
                    <form className="flex flex-col gap-3">
                        <input className="input" ref={name} type="text" placeholder="name" />
                        <input className="input" ref={email} type="email" placeholder="email" />
                        <input className="input" ref={password} type="password" placeholder="password" />
                        <input className="input" ref={id} type="number" placeholder="id" />
                        <select className="input" ref={role}>
                        <option value="admin">admin</option>
                        <option value="moderator">moderator</option>
                        </select>
                        {/* <input className="button-81" type="submit" onClick={(e: any) => {
                            e.preventDefault();
                            // console.log()
                            postAdmins();
                        }} /> */}
                        <button className="button-81" onClick={(e: any) => {
                            e.preventDefault();
                            // console.log()
                            postAdmins();
                        }}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>




            <div className="h-[75vh] w-full overflow-y-scroll max-md:h-auto">
                <table className="admin-table w-[97%]">
                    <thead>
                        <tr>
                            <th className="admin-th">Id</th>
                            <th className="admin-th">Name</th>
                            <th className="admin-th">Email</th>
                            <th className="admin-th">Role</th>
                            <th className="admin-th">Status</th>
                            <th className="admin-th">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            admins.map((e: any) =>                             
                                (
                                    <tr key={e.email} className="admin-tr">
                                        <td className="admin-td">{e.id}</td>
                                        <td className="admin-td">{e.name}</td>
                                        <td className="admin-td">{e.email}</td>
                                        <td className="admin-td">{e.role}</td>
                                        {e.session === "" ? <td className="text-gray-500">Offline</td> : <td className="text-green-500 font-bold">Online</td>}
                                        {(e.role === "moderator" && dataContext.credentials.role === 'admin') && <td className="text-red-700 text-2xl font-black"><MdDelete onClick={() => deleteAdmin(e.email)} className="cursor-pointer mx-auto" /></td>}
                                        {dataContext.credentials.role === 'developer' && <td className="text-red-700 text-2xl font-black"><MdDelete onClick={() => deleteAdmin(e.email)} className="cursor-pointer mx-auto" /></td>}
                                    </tr>
                                )                          
                            )
                        }
                        
                        
                    </tbody>
                </table>
            </div>




        </div>
</div>

  )
}

export default AdminForm