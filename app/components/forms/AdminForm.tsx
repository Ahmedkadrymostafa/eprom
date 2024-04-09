'use client'
import axios from "axios";
import { useEffect, useRef, useState } from "react"
import Cryptr from "cryptr";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Loading from "@/app/loading";

const AdminForm = () => {
  const cryptr = new Cryptr('secretKey', { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 10 });
  const name: any = useRef();
  const email: any = useRef();
  const password: any = useRef();
  const id: any = useRef();
  const role: any = useRef();
  const [ admins, setAdmins ] = useState<any>([]);
  const [ isLoading, setIsLoading ] = useState(true);

    const emptyInputs = () => {
        name.current.value = "";
        email.current.value = "";
        password.current.value = "";
        id.current.value = "";
    }
  async function postAdmins() {
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

    let data = {
      name: nameV,
      email: emailV,
      password: hash,
      id: parseInt(idV),
      role: roleV,
      session: ""
    }

    axios.post('http://localhost:3000/api/admins', data).then((res) => {
        setIsLoading(false)
        toast.success("New admin added successfully")
        setAdmins([...admins, 
            {
                name: nameV,
                email: emailV,
                password: hash,
                id: parseInt(idV),
                role: roleV,
                session: ""
            }
        ])
        emptyInputs();
    }).catch(err => {
        setIsLoading(false)
        toast.error("Failed to add admin because Email is exist")
    })
    
  }

  const getAdmins = async () => {
    await axios.get("/api/admins").then((res) => {
        console.log(res.data)
        setIsLoading(false)
        setAdmins(res.data)
    }).catch(err => {
        console.log(err)
        setIsLoading(false)
    })
    console.log(admins)
  }

  const deleteAdmin = async (email: any) => {
    setIsLoading(true)
   axios.delete(`/api/admins/${email}`).then((res) => {
        setIsLoading(false)
        getAdmins();
    }).catch((err) => {
        toast.error("Failed to delete admin")
        setIsLoading(false)
    });
  }
  useEffect(() => {
    getAdmins();
  }, [])

return (
    <div>
            {isLoading && <Loading />}

        <div className="relative flex justify-between pt-9 px-11 max-md:flex-col">
                
            
            <div className="glass p-5 w-96">
                <p className="main-color text-2xl font-black mb-4 text-center">Add new admin</p>
                <form className="flex flex-col gap-3">
                    <input className="input" ref={name} type="text" placeholder="name" />
                    <input className="input" ref={email} type="email" placeholder="email" />
                    <input className="input" ref={password} type="password" placeholder="password" />
                    <input className="input" ref={id} type="number" placeholder="id" />
                    <select className="input" ref={role}>
                    <option value="admin">admin</option>
                    <option value="super admin">super admin</option>
                    </select>
                    <input className="button-81" type="submit" onClick={(e: any) => {
                    e.preventDefault();
                    // console.log()
                    postAdmins();
                    }} />
                </form>
            </div>




            <div className="h-[75vh] overflow-y-scroll max-md:h-auto">
                <table className="admin-table">
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
                            admins.map((e: any) => (
                                <tr key={e.email} className="admin-tr">
                                    <td className="admin-td">{e.id}</td>
                                    <td className="admin-td">{e.name}</td>
                                    <td className="admin-td">{e.email}</td>
                                    <td className="admin-td">{e.role}</td>
                                    {e.session === "" ? <td className="text-gray-500">Offline</td> : <td className="text-green-500 font-bold">Online</td>}
                                    {e.role === "admin" && <td className="text-red-700 text-2xl font-black"><MdDelete onClick={() => deleteAdmin(e.email)} className="cursor-pointer mx-auto" /></td>}
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

export default AdminForm