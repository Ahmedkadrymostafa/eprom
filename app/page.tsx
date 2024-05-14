'use client'
import axios from "axios";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loading from "../app/loading";
import Logo from '../app/assets/eprom.jpg'
import Image from "next/image";

export default function Home() {
  const email: any = useRef()
  const password: any = useRef<HTMLInputElement>()
  const router = useRouter();
  const [ isLoading, setIsLoading ] = useState(false);




  async function Login(e: any) {
  
    if (!email.current.value || !password.current.value) return toast.warning("Please enter full inputs")
    setIsLoading(true);

    axios.post(`/api/auth/login/${e}`, {password: password.current.value}).then(async (res: any) => {
        
        await axios.put(`/api/auth/login/${e}`, {password: password.current.value}).then((res: any) => {
          setIsLoading(false)
          toast.success("Login successful")
          router.push('/dashboard')
        })


    }).catch((err) => {
      setIsLoading(false)
      console.log(err)
      if (err.response.status === 404) return toast.error("invalid email")
      if (err.response.status === 403) return toast.error("invalid password")
    })
      

  }

  

  return (
    <div className="img-bg h-screen relative">
      {isLoading && <Loading />}
      <form>
        <div className="glass w-[400px] max-sm:w-80 flex justify-center items-center flex-col p-9 absolute top-14 left-8 max-md:top-1/2 max-md:left-1/2 max-md:-translate-x-1/2 max-md:-translate-y-1/2">
              <div className="glass p-4 mx-auto mb-4">
                  <Image src={Logo} alt="eprom logo" height={250} width={300} />
              </div>
              {/* <h1 className="text-3xl text-center text-slate-100">Login</h1> */}
              <div>
                <label className="block text-slate-100 mb-2 text-xl right-0">Email</label>
                <input ref={email} type="text" placeholder="Email" id="username" className=" bg-gray-700 border-gray-400 rounded-xl h-10 w-full text-white focus:outline-none text-lg p-4" />
              </div>

              <div>
                <label className="block text-slate-100 mb-2 text-xl right-0 mt-7">Password</label>
                <input ref={password} type="password" placeholder="Password" id="password" className=" bg-gray-700 border-gray-400 rounded-xl w-full h-10 text-white focus:outline-none text-lg p-4" />
              </div>
              <input type="submit" value="Login" className="bg-white mt-10 text-center text-xl font-bold h-10 w-48 mx-auto rounded-lg hover:bg-black hover:text-slate-100 cursor-pointer duration-200"  onClick={(e) => {
                e.preventDefault();
                Login(email.current.value)
              }} />
              
        </div>
      </form>
    </div>
  );
}
