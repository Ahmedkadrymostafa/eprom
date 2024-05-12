'use client'
import { useRouter } from "next/navigation";
import Header from "../components/header/Header";
import axios from "axios";
import { useEffect, useState, createContext } from "react";
import Loading from "../loading";
import SideBar from "../components/sidebar/SideBar";
import Footer from "../components/footer/Footer";

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
        
      }else {
        setLoggedIn(false)
      }
    }).catch((err) => {
      router.push('/')
    })
    
  }
  const getTrainees = async () => {
    await axios.get("/api/trainees").then((res) => {
        
        setTrainees(res.data)
    }).catch(err => {
        console.log(err)
    })
  }
  const getCourses = async () => {
    await axios.get('/api/courses').then((res: any) => {
        setCourses(res.data)
    }).catch((err: any) => console.log(err))
   }
  const getORGS = async () => {
    await axios.get('/api/org').then((res: any) => {
        setORGS(res.data)
    }).catch((err: any) => console.log(err))
   }
  const getAPPS = async () => {
    await axios.get('/api/apps').then((res: any) => {
        setAPPS(res.data)
    }).catch((err: any) => console.log(err))
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
          <div className="min-h-screen flex flex-col">

              <Header  email={credentials.email} name={credentials.name} /> 
              
              <SideBar role={credentials.role} />        
                <div className="page-width flex-1">
                  {children}
                </div>
              
              <Footer />
          </div>    
    </DataContext.Provider>
    );
  }else if (loggedIn === false) {
    router.push('/');
  }
   
}
