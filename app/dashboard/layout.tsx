'use client'
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
// import middleware from "../helpers/middleware";
import Header from "../components/header/Header";
import axios from "axios";
import { useEffect, useState, createContext, useContext } from "react";
import Cookies from 'js-cookie';
import { cookies } from "next/headers";
import Loading from "../loading";
import SideBar from "../components/sidebar/SideBar";

export const DataContext = createContext<unknown>(null)

export default function Layout({children}: {children: any}){
  
  const [loggedIn, setLoggedIn] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);
  const router = useRouter();
  const [ credentials, setCredentials] = useState<any>({});
  const [ trainees, setTrainees] = useState([])
  const [ courses, setCourses ] = useState([])
  const [ ORGS, setORGS ] = useState([])
  const [ APPS, setAPPS ] = useState([])

  const getSession = async () => {
    await axios.get('/api/auth/login/session').then((res: any) => {
      
      if (res.data.cookie === res.data.credentials[0].session) {
        setLoggedIn(true)
        setCredentials(res.data.credentials[0])
        
        // console.log(loggedIn)
      }else {
        setLoggedIn(false)
        // console.log(loggedIn)
      }
    }).catch((err) => {
      // console.log(err)
      router.push('/')
    })
    
  }
  const getTrainees = async () => {
    await axios.get("/api/trainees").then((res) => {
        // console.log(res.data)
        // setIsLoading(false)
        setTrainees(res.data)
        // setCloneTrainees(res.data)
    }).catch(err => {
        console.log(err)
        // setIsLoading(false)
    })
  }
  const getCourses = async () => {
    await axios.get('/api/courses').then((res: any) => {
        // console.log(res.data)
        setCourses(res.data)
    })
   }
  const getORGS = async () => {
    await axios.get('/api/org').then((res: any) => {
        // console.log(res.data)
        setORGS(res.data)
    })
   }
  const getAPPS = async () => {
    await axios.get('/api/apps').then((res: any) => {
        // console.log(res.data)
        setAPPS(res.data)
    })
   }
   const getData = async () => {
     getSession();
     getTrainees();
     getCourses();
     getORGS();
     getAPPS();
  }
  useEffect(() => {
    getData().then(() => {
      setLoading(false);
    })
    
  }, [])




  if (loading) {
    return <Loading />
  }else if (loggedIn === true) {
    return (
        
      <DataContext.Provider value={{credentials, trainees, setTrainees, courses, setCourses, ORGS, setORGS, APPS, setAPPS}}>
          <div>
              <Header  email={credentials.email} name={credentials.name} /> 
              
              <SideBar role={credentials.role} />        
                <div className="page-width">
                  {children}
                </div>
              
          </div>    
    </DataContext.Provider>
    );
  }else if (loggedIn === false) {
    router.push('/');
  }
   
}
