// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Context, createContext, useContext, useState } from "react";
// import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

// interface ReportContextType {

//   reportByTraineesData?: any[],
//   setReportByTraineesData?: React.Dispatch<React.SetStateAction<any[]>>,
//   reportByCoursesData?: any[],
//   setReportByCoursesData?: React.Dispatch<React.SetStateAction<any[]>>,
//   reportByApps?: any[],
//   setReportByApps?: React.Dispatch<React.SetStateAction<any[]>>
// }

// export const ReportContext: Context<ReportContextType | undefined> = createContext<ReportContextType | undefined>(
//   {
//     reportByTraineesData: [],
//     setReportByTraineesData: () => {},
//     reportByCoursesData: [],
//     setReportByCoursesData: () => {},
//     reportByApps: [],
//     setReportByApps: () => {}
//   }
// );


// export const metadata: Metadata = {
//   title: "EPROM",
//   description: "",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const [ reportByTraineesData, setReportByTraineesData ] = useState<any>([])
  // const [ reportByCoursesData, setReportByCoursesData ] = useState<any>([])
  // const [ reportByApps, setReportByApps ] = useState<any>([])

  // const reportContextValue: ReportContextType = {
  //   reportByTraineesData,
  //   setReportByTraineesData,
  //   reportByCoursesData,
  //   setReportByCoursesData,
  //   reportByApps,
  //   setReportByApps
  // };

  return (
    <html lang="en">
      <head>
          <title>EPROM</title>
          <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ToastContainer position="bottom-right" autoClose={5000} />
          {children}
        {/* <ReportContext.Provider value={reportContextValue}>
        </ReportContext.Provider> */}
      </body>
    </html>
  );
}
