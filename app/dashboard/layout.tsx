'use client'
import { useRouter, usePathname } from "next/navigation";
import Header from "../components/header/Header";
import axios from "axios";
import { useEffect, useState, createContext, Context } from "react";
import Loading from "../loading";
import SideBar from "../components/sidebar/SideBar";
import Footer from "../components/footer/Footer";
// import { useRouter } from 'next/router';

type DataContext = {
  credentials?: any,
  trainees?: any,
  setTrainees?: any,
  courses?: any,
  setCourses?: any,
  ORGS?: any,
  setORGS?: any,
  APPS?: any,
  setAPPS?: any,
}

interface ReportContextType {

  reportByTraineesData?: any[],
  setReportByTraineesData?: React.Dispatch<React.SetStateAction<any[]>>,
  reportByCoursesData?: any[],
  setReportByCoursesData?: React.Dispatch<React.SetStateAction<any[]>>,
  reportByApps?: any[],
  setReportByApps?: React.Dispatch<React.SetStateAction<any[]>>
}

export const ReportContext: Context<ReportContextType> = createContext<ReportContextType>(
  {
    reportByTraineesData: [],
    setReportByTraineesData: () => {},
    reportByCoursesData: [],
    setReportByCoursesData: () => {},
    reportByApps: [],
    setReportByApps: () => {}
  }
);

export const DataContext = createContext<DataContext>({})

export default function Layout({children}: {children: any}){
    
  const [loggedIn, setLoggedIn] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);
  const router = useRouter();
  const pathname = usePathname()

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
    console.log(pathname)
  }, [])


  const [ reportByTraineesData, setReportByTraineesData ] = useState<any>([])
  const [ reportByCoursesData, setReportByCoursesData ] = useState<any>([])
  const [ reportByApps, setReportByApps ] = useState<any>([])

  const reportContextValue: ReportContextType = {
    reportByTraineesData,
    setReportByTraineesData,
    reportByCoursesData,
    setReportByCoursesData,
    reportByApps,
    setReportByApps
  };


 
  if (loading) {
    return <Loading />
  }else if (loggedIn === true) {
    return (
        
      <DataContext.Provider value={{credentials, trainees, setTrainees, courses, setCourses, ORGS, setORGS, APPS, setAPPS}}>
          <div className="min-h-screen flex flex-col">

              {!pathname.includes('report') &&
                <Header  email={credentials.email} name={credentials.name} /> 
              }
              {!pathname.includes('report') &&
                <SideBar role={credentials.role} />                
              }

              
              <ReportContext.Provider value={reportContextValue}>
                <div className="page-width flex-1">
                  {children}
                </div>
              </ReportContext.Provider>
              
              {!pathname.includes('report') &&
                <Footer />
              }
          </div>    
    </DataContext.Provider>
    );
  }else if (loggedIn === false) {
    router.push('/');
  }
   
}
