'use client'
import axios from "axios";
import { parse } from "path";
import { useRef } from "react"
import Cryptr from "cryptr";
import AdminForm from "@/app/components/forms/AdminForm";
import AdminTable from "@/app/components/tables/AdminTable";

const Page = () => {
  const cryptr = new Cryptr('secretKey', { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 10 });
  const name: any = useRef();
  const email: any = useRef();
  const password: any = useRef();
  const id: any = useRef();
  const role: any = useRef();
   
    async function postAdmins() {
      const nameV = name.current.value;
      const emailV = email.current.value;
      const passwordV = password.current.value;
      const idV = id.current.value;
      const roleV = role.current.value
      
      const hash = cryptr.encrypt(passwordV)
      
      let data = {
        name: nameV,
        email: emailV,
        password: hash,
        id: parseInt(idV),
        role: roleV
      }
      axios.post('http://localhost:3000/api/admins', data).then(() => {
        console.log("Success added")
        console.log(data)
      }).catch(err => {
        console.log(err);
      })
      
    }
  return (
    <div>
      <AdminForm />
    </div>
        // <AdminTable />
  )
}

export default Page