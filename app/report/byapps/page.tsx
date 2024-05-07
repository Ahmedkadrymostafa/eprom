'use client'
import { useContext } from "react"
import { ReportContext } from "@/app/layout"

const Page = () => {
    const reportContext = useContext(ReportContext)
    const data = reportContext.reportByApps

  return (
    
        <div className="m-5">
          {data.map((project: any) => (

          <div key={project.project} className="w-[100%] mx-auto">
            <p className="text-black text-2xl font-black w-fit mx-auto my-2 uppercase">{project.project}</p>
              <div className="my-6">
                  
                    <table className="w-full my-2">
                      <thead>
                          <tr className="main-color text-base font-bold p-3 bg-gray-200">
                              <th className="w-[42%] text-left">Course name</th>
                              <th>persons</th>
                              <th>status</th>
                              <th>from</th>
                              <th>to</th>
                          </tr>
                      </thead>
                      <tbody>

                    {project.courses.map((course: any) => (
                        <tr key={project} className="text-center text-black text-sm p-3">
                            <td className="w-[42%] text-left">{course.course}</td>
                            <td>{course.persons.length}</td>
                            <td>{course.status}</td>
                            <td>{course.date_from}</td>
                            <td>{course.date_to}</td>
                        </tr>
                        
                    ))}

                      </tbody>
                    </table>
                    <hr className="w-full h-[1px] bg-black" />
                  </div>
            
            </div>))}
        </div>
    
  )
}

export default Page