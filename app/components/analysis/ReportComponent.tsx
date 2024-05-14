'use client'
import { useState, useContext } from "react";
import { DataContext } from "@/app/dashboard/layout";
import { ReportContext } from "@/app/dashboard/layout";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const ReportComponent = () => {

 
  const router = useRouter()
    const dataContext: any = useContext(DataContext);
    const reportContext: any = useContext(ReportContext);

    const [fromDate, setFromDate ] = useState<any>('');
    const [toDate, setToDate ] = useState<any>('');
    
    const [ traineesWithProject, setTraineesWithProject ] = useState<any>([]);
    const [ coursesWithProject, setCoursesWithProject ] = useState<any>([]);
    const [ projectsToFilter, setProjectsToFilter ] = useState<any>([]);
    const [ showResult, setShowResult ] = useState<any>(false);
    const [ filterByStatus, setFilterByStatus ] = useState<any>('all');
    const [ reportType, setReportType ] = useState<any>('');
   
    const handleFilterByStatusChange = (e: any) => {
      setFilterByStatus(e.target.value);
    }
    const handleReportTypeChange = (e: any) => {
      setReportType(e.target.value);
    }
    const handleFilterByProjectChange = (project: any) => {
      if (reportType === 'include trainees') {
        if (project !== 'all') {
          let filteredByProject = projectsToFilter.filter((e: any) => e.project === project)
          setTraineesWithProject(filteredByProject)
        }else {
          setTraineesWithProject(projectsToFilter)
        }

      }else if (reportType === 'only courses') {
        if (project !== 'all') {
          let filteredByProject = projectsToFilter.filter((e: any) => e.project === project)
          setCoursesWithProject(filteredByProject)
        }else {
          setCoursesWithProject(projectsToFilter)
        }
      }

    }
    const handleFromDateChange = (e: any) => {
        setFromDate(e.target.value)
    }
    const handleToDateChange = (e: any) => {
        setToDate(e.target.value)
    }
    
    function PersonsWithApplications() {
        
        // Create a new array combining person data with applications
        const personsWithApplications = dataContext.trainees.reduce((acc: any, person: any) => {
          const personApplications = dataContext.APPS.filter(
            (app: any) => app.person_id === person.person_id &&
            new Date(app.date_from) >= new Date(fromDate) &&
            new Date(app.date_to) <= new Date(toDate)
          );
      
          if (personApplications.length > 0) {
            if (filterByStatus === 'all') {
              acc.push({
                ...person,
                applications: personApplications.map((app: any) => app),
              });
            }else {
              const filteredByStatus = personApplications.filter((app: any) => app.status === filterByStatus)
              if (filteredByStatus.length > 0) {
                acc.push({
                  ...person,
                  applications: filteredByStatus.map((app: any) => app),
                });
              }
            }
          }
      
          return acc;

        }, []);

        const projectTrainees = personsWithApplications.reduce((acc: any, trainee: any) => {
          const existingProject = acc.find((item: any) => item.project === trainee.project);
        
          if (existingProject) {
            existingProject.trainees.push(trainee);
          } else {
            acc.push({
              project: trainee.project,
              trainees: [trainee]
            });
          }
        
          return acc;
        }, []);
        setTraineesWithProject(projectTrainees)
        setProjectsToFilter(projectTrainees)
    }

    const projectsWithCourses = () => {
      const filteredData = dataContext.APPS.filter((app: any) => {

        const appStartDate = new Date(app.date_from);
        const appEndDate = new Date(app.date_to);
        const selectedFromDate = new Date(fromDate);
        const selectedToDate = new Date(toDate);
  
        return (
          (appStartDate >= selectedFromDate && appEndDate <= selectedToDate)
        );
      });

      if (filterByStatus === 'all') {

        const reducedData = filteredData.reduce((acc: any, curr: any) => {
          const {id, person_id, project, course, date_from, date_to, status} = curr;
  
          const existingProjectIndex = acc.findIndex((item: any) => item.project === project);
          if (existingProjectIndex !== -1) {
            // Project already exists, check if the course exists for this project
            const existingCourseIndex = acc[existingProjectIndex].courses.findIndex((c: any) => c.course === course);
            if (existingCourseIndex !== -1) {
              // Course exists, add the person to this course
              acc[existingProjectIndex].courses[existingCourseIndex].persons.push(person_id);
            } else {
              // Course doesn't exist, create a new entry for the course
              acc[existingProjectIndex].courses.push({
                course,
                id: id,
                status: status,
                date_from: date_from,
                date_to: date_to,
                persons: [person_id]
              });
            }
          } else {
            // Project doesn't exist, create a new entry for the project
            acc.push({
              project,
              courses: [{ course,
              id: id,
              status: status,
              date_from: date_from,
              date_to: date_to,
              persons: [person_id] }]
            });
          }
          return acc;
  
        }, []);
        setCoursesWithProject(reducedData)
        setProjectsToFilter(reducedData)

      }else if (filterByStatus === 'implemented') {
        let filterByImplemented = filteredData.filter((app: any) => app.status === 'implemented')

        const reducedData = filterByImplemented.reduce((acc: any, curr: any) => {
          const {id, person_id, project, course, date_from, date_to, status } = curr;
  
          const existingProjectIndex = acc.findIndex((item: any) => item.project === project);
          if (existingProjectIndex !== -1) {
            // Project already exists, check if the course exists for this project
            const existingCourseIndex = acc[existingProjectIndex].courses.findIndex((c: any) => c.course === course);
            if (existingCourseIndex !== -1) {
              // Course exists, add the person to this course
              acc[existingProjectIndex].courses[existingCourseIndex].persons.push(person_id);
            } else {
              // Course doesn't exist, create a new entry for the course
              acc[existingProjectIndex].courses.push({
                course,
                id: id,
                status: status,
                date_from: date_from,
                date_to: date_to,
                persons: [person_id]
              });
            }
          } else {
            // Project doesn't exist, create a new entry for the project
            acc.push({
              project,
              courses: [{ course,
              id: id,
              status: status,
              date_from: date_from,
              date_to: date_to,
              persons: [person_id] }]
            });
          }
          return acc;
  
        }, []);
        setCoursesWithProject(reducedData)
        setProjectsToFilter(reducedData)

      }else if (filterByStatus === 'not implemented') {
        let filterByNotImplemented = filteredData.filter((app: any) => app.status === 'not implemented')

        const reducedData = filterByNotImplemented.reduce((acc: any, curr: any) => {
          const {id, person_id, project, course, date_from, date_to, status } = curr;
  
          const existingProjectIndex = acc.findIndex((item: any) => item.project === project);
          if (existingProjectIndex !== -1) {
            // Project already exists, check if the course exists for this project
            const existingCourseIndex = acc[existingProjectIndex].courses.findIndex((c: any) => c.course === course);
            if (existingCourseIndex !== -1) {
              // Course exists, add the person to this course
              acc[existingProjectIndex].courses[existingCourseIndex].persons.push(person_id);
            } else {
              // Course doesn't exist, create a new entry for the course
              acc[existingProjectIndex].courses.push({
                course,
                id: id,
                status: status,
                date_from: date_from,
                date_to: date_to,
                persons: [person_id]
              });
            }
          } else {
            // Project doesn't exist, create a new entry for the project
            acc.push({
              project,
              courses: [{ course,
              id: id,
              status: status,
              date_from: date_from,
              date_to: date_to,
              persons: [person_id] }]
            });
          }
          return acc;
  
        }, []);
        setCoursesWithProject(reducedData)
        setProjectsToFilter(reducedData);
      }
    }


    const getApplicationsWithTrainees = () => {
      const applicationsMap = dataContext.APPS.reduce((acc: any, app: any) => {
        const from = new Date(app.date_from);
        const to = new Date(app.date_to);
        const selectedFrom = new Date(fromDate);
        const selectedTo = new Date(toDate);
    
        if (
          from >= selectedFrom && to <= selectedTo 
        ) {
          const traineesForApp = dataContext.trainees.filter(
            (trainee: any) => trainee.person_id === app.person_id
          );
    
          if (!acc[app.course]) {
            acc[app.course] = {
              ...app,
              trainees: traineesForApp
            };
          } else {
            acc[app.course].trainees = [
              ...acc[app.course].trainees,
              ...traineesForApp
            ];
          }
        }
    
        return acc;
      }, {});
    
      const applicationsArray = Object.values(applicationsMap);
      console.log(applicationsArray)
    
  };
   
  const report = () => {
    if (reportType === 'include trainees') {
      reportContext.setReportByTraineesData(traineesWithProject)
      router.push('/dashboard/report/bytrainees')      
    }else if (reportType === 'only courses') {
      reportContext.setReportByApps(coursesWithProject)
      router.push('/dashboard/report/byapps')
    }
  }
    
  return (
    <div>
        <div className="flex justify-between items-center p-14">
            <div className="w-1/3">
                <p className="main-color text-6xl font-black">Reports</p>
                <p className="text-base text-gray-600 my-3">This part is specific for creating reports on applications and including projects related to people, and choosing the type of report whether it includes people and courses or only courses.</p>
                
                {(traineesWithProject.length > 0 || coursesWithProject.length > 0) && 
                    <button className="download-button mt-5" onClick={report}>
                      <div className="docs"><svg className="css-i6dzq1" strokeLinejoin="round" strokeLinecap="round" fill="none" strokeWidth="2" stroke="currentColor" height="20" width="20" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line y2="13" x2="8" y1="13" x1="16"></line><line y2="17" x2="8" y1="17" x1="16"></line><polyline points="10 9 9 9 8 9"></polyline></svg> Report</div>
                      <div className="download">
                          <svg className="css-i6dzq1" strokeLinejoin="round" strokeLinecap="round" fill="none" strokeWidth="2" stroke="currentColor" height="24" width="24" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line y2="3" x2="12" y1="15" x1="12"></line></svg>
                      </div>
                    </button>
                }
            </div>
            <div>
                
                <div className="flex justify-between gap-14 my-7">
                    <div className="flex gap-2">
                        <label className="main-color text-xl font-black">From</label>
                        <input value={fromDate} onChange={handleFromDateChange} className="select-form" type="date" />
                    </div>
                    <div className="flex gap-2">
                        <label className="main-color text-xl font-black">To</label>
                        <input value={toDate} onChange={handleToDateChange} className="select-form" type="date" />
                    </div>
                </div>

                <div>
                  <div className="flex justify-between">
                     
                    <div className="mb-7">
                      <p className="main-color text-xl font-black">Filter By Status</p>
                      <select className="input" value={filterByStatus} onChange={handleFilterByStatusChange}>
                        <option value="all">All</option>
                        <option value="implemented">Implemented</option>
                        <option value="not implemented">Not implemented</option>
                      </select>
                    </div>
                    
                    <div className="mb-7">
                      <p className="main-color text-xl font-black">Report Type</p>
                      <select className="input" value={reportType} onChange={handleReportTypeChange}>
                        <option value="include trainees">Include Trainees</option>
                        <option value="only courses">Only Courses</option>
                      </select>
                    </div>
                  </div>

                </div>
                
                <div className="flex gap-4">
                    <button className="cta" onClick={() => {
                      if (reportType === '') return toast.warn('Please select report type first');
                      if (reportType === 'only courses') {
                        projectsWithCourses();
                      }else {
                        PersonsWithApplications();
                      }
                    }}>
                        <span>Collect</span>
                        <svg width="15px" height="10px" viewBox="0 0 13 10">
                            <path d="M1,5 L11,5"></path>
                            <polyline points="8 1 12 5 8 9"></polyline>
                        </svg>
                    </button>

                    {((traineesWithProject.length > 0 || coursesWithProject.length > 0) && !showResult) &&
                      <button className="cta" onClick={() => setShowResult(true)}>
                        <span>Show Result</span>
                        <svg width="15px" height="10px" viewBox="0 0 13 10">
                            <path d="M1,5 L11,5"></path>
                            <polyline points="8 1 12 5 8 9"></polyline>
                        </svg>
                      </button>                    
                    }
                    
                </div>

                
                {projectsToFilter.length > 0 && 
                    <div className="mb-7">
                      <p className="main-color text-xl font-black">Filter By Project</p>
                      <select className="input" onChange={(value: any) => handleFilterByProjectChange(value.target.value)}>
                        <option value="all">All</option>
                        {
                          projectsToFilter.map((trainee: any) => (
                            <option className="capitalize" key={trainee.project} value={trainee.project}>{trainee.project}</option>
                          ))
                        }
                      </select>
                    </div>
                  }
            </div>
        </div>

        {showResult && <div>
          <p className="main-color text-4xl font-black w-fit mx-auto my-11">Report Result</p>

          {reportType === 'include trainees' && traineesWithProject.map((trainee: any) => (

              <div key={trainee.project} className="w-[80%] mx-auto p-4 border-black border-2">
                <p className="text-black text-4xl font-black w-fit mx-auto my-5 uppercase">{trainee.project}</p>
                {trainee.trainees.map((trainee: any) => (
                  <div key={trainee} className="my-6">
                      <div className="flex flex-col gap-1">
                        <p className="text-black text-2xl font-black capitalize">{trainee.name}</p>
                        <p className="text-black text-2xl font-black capitalize">ID: {trainee.person_id}</p>
                      </div>
                      <div>
                        <table className="w-full my-2">
                          <thead>
                              <tr className="main-color text-2xl font-bold p-3 bg-gray-200">
                                  <th className="w-1/2 text-left">Course</th>
                                  <th>from</th>
                                  <th>to</th>
                                  <th>status</th>
                              </tr>
                          </thead>
                          <tbody>

                            {trainee.applications.map((app: any) => (
                              <tr key={app.id} className="text-center text-black text-xl p-3">
                                <td className="w-1/2 text-left">{app.course}</td>
                                <td>{app.date_from}</td>
                                <td>{app.date_to}</td>
                                <td>{app.status}</td>
                              </tr>
                            ))}

                          </tbody>
                        </table>
                        <hr className="w-full h-[2px] bg-black" />
                      </div>
                    </div>        
                ))}
            </div>))}

          {reportType === 'only courses' && coursesWithProject.map((project: any) => (

              <div key={project.project} className="w-[80%] mx-auto p-4 border-black border-2">
                <p className="text-black text-4xl font-black w-fit mx-auto my-5 uppercase">{project.project}</p>
                  <div className="my-6">
                      
                      <div>
                        <table className="w-full my-2">
                          <thead>
                              <tr className="main-color text-2xl font-bold p-3 bg-gray-200">
                                  <th className="w-1/2 text-left">Course</th>
                                  <th>Persons</th>
                                  <th>Status</th>
                                  <th>From</th>
                                  <th>To</th>
                              </tr>
                          </thead>
                          <tbody>

                        {project.courses.map((course: any) => (

                          <tr key={course} className="text-center text-black text-base p-3">
                                <td className="w-1/2 text-left">{course.course}</td>
                                <td>{course.persons.length}</td>
                                <td>{course.status}</td>
                                <td>{course.date_from}</td>
                                <td>{course.date_to}</td>
                          </tr>
                        ))}

                          </tbody>
                        </table>
                        <hr className="w-full h-[2px] bg-black" />
                      </div>
                    </div>        
            </div>))}

        </div>}

    </div>
  )
}

export default ReportComponent