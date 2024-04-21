import React from 'react'

const CourseForm = () => {
    let data = {
        person_id: id.trim().toLowerCase().replace(/\s+/g, ' '),
        course: course.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
        date: today.toISOString().split('T')[0],
        date_from: from.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
        date_to: to.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
        org: org.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
        status: statusJob,
        days: days.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
        total_hours: total_hours.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
        training_center: training_center.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
        city: city.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
        instructor: instructor.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
        budget_code: budget_code.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
        course_fees: course_fees.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
        instructor_fees: instructor_fees.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
        total_cost: total_cost.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
        profit: profit.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
        allowance: allowance.current.value.trim().toLowerCase().replace(/\s+/g, ' '),
        hotel_cost: hotel_cost.current.value.trim().toLowerCase().replace(/\s+/g, ' ')
    }
  return (
    <div>
        <form className="mt-9 mb-11 flex justify-between gap-8">
                
                <div className="soft-bg w-1/2 p-7 flex flex-col gap-7">
                    <p className="text-gray-700 text-2xl font-bold">Course Information</p>
                    <div className="flex flex-col gap-3">
                        {/* <div className="flex gap-3">
                            
                        </div> */}
                            <select ref={course} className="select-form input" onChange={(e: any) => handleCourseChange(e.target.value)}>
                                {
                                    courses.map((course: any) => (
                                        <option key={course.id}>{course.name}</option>
                                    ))
                                }
                            </select>
                        {/* <div className="coolinput">
                            <label className="text">Course Name</label>
                            <input type="text" name="input" className="input" />
                        </div> */}
                        <div className="flex justify-between gap-4 my-7">
                            <div className="flex gap-2">
                                <label className="main-color text-xl font-black">From</label>
                                <input ref={from} className="select-form" type="date" />
                            </div>
                            <div className="flex gap-2">
                                <label className="main-color text-xl font-black">To</label>
                                <input ref={to} className="select-form" type="date" />
                            </div>
                        </div>

                        <div className="flex justify-between mb-3">
                            <select ref={org} className="select-form input uppercase font-black">
                                {
                                    ORGS.map((org: any) => (
                                        <option className="uppercase font-black" key={org.id}>{org.name}</option>
                                    ))
                                }
                            </select>
                            <div className="flex gap-3 items-center">
                                <input ref={statusRef} type="checkbox" value="Not implemented" className="w-6 h-6" onChange={(e: any) => {
                                    console.log("changed")
                                    if (e.target.checked === true) {
                                        setStatusJob("implemented")
                                        // statusRef.current.value = 'implemented'
                                        // console.log(e.target.value)
                                    }else {
                                        setStatusJob("not implemented")
                                        // statusRef.current.value = 'not implemented'
                                        // console.log(e.target.value)
                                    }
                                }} />
                                <label className="main-color text-2xl">Implemented</label>
                            </div>
                            {/* <select ref={statusInput} className="select-form input capitalize font-black">
                                <option className="capitalize font-black">Not Implemented</option>
                                <option className="capitalize font-black">Implemented</option>  
                            </select> */}
                            
                        </div>

                        <div className="flex gap-3">
                            <div className="coolinput">
                                <label className="text">Days</label>
                                <input ref={days} type="number" name="input" className="input" />
                            </div>
                            <div className="coolinput">
                                <label className="text">Hours</label>
                                <input ref={total_hours} type="number" name="input" className="input" />
                            </div>
                        </div>
                        <div className="coolinput">
                            <label className="text">Training center</label>
                            <input ref={training_center} type="text" name="input" className="input" />
                        </div>
                        <div className="coolinput">
                            <label className="text">City</label>
                            <input ref={city} type="text" name="input" className="input" />
                        </div>
                        <div className="coolinput">
                            <label className="text">Instructor</label>
                            <input ref={instructor} type="text" name="input" className="input" />
                        </div>
                        
                        
                    </div>
                </div>

                <div className="soft-bg w-full p-7 flex flex-col gap-5">
                    <p className="text-gray-700 text-2xl font-bold">Financial Information</p>
                    <div className="flex flex-col gap-5">
                        <div className="coolinput">
                            <label className="text">Budget Code:</label>
                            <input ref={budget_code} type="text" name="input" className="input" />
                        </div>
                        <div className="flex justify-between gap-5">
                            <div className="coolinput">
                                <label className="text">Course Fees:</label>
                                <input ref={course_fees} type="number" name="input" className="input" />
                            </div>
                            <div className="coolinput">
                                <label className="text">Instructor Fees:</label>
                                <input ref={instructor_fees} type="number" name="input" className="input" />
                            </div>
                        </div>
                        <div className="coolinput">
                            <label className="text">Total Cost:</label>
                            <input ref={total_cost} type="number" name="input" className="input" />
                        </div>
                        <div className="coolinput">
                            <label className="text">Profit:</label>
                            <input ref={profit} type="number" name="input" className="input" />
                        </div>
                        <div className="flex gap-5">
                            <div className="coolinput">
                                <label className="text">Allowance:</label>
                                <input ref={allowance} type="text" name="input" className="input" />
                            </div>
                            <div className="coolinput">
                                <label className="text">Hotel Cost:</label>
                                <input ref={hotel_cost} type="number" name="input" className="input" />
                            </div>
                        </div>
                    </div>
                    {edit === false ? 
                        <input className="text-white rounded-2xl p-5 main-bg mx-auto mt-7 text-xl cursor-pointer font-black duration-300 hover:scale-105" type="submit" value="Submit Course" onClick={(e: any) => {
                            e.preventDefault();
                            addNewCourse();
                        }} />
                        :
                        <input className="text-white rounded-2xl p-5 main-bg mx-auto mt-7 text-xl cursor-pointer font-black duration-300 hover:scale-105" type="submit" value="Save" onClick={(e: any) => {
                            e.preventDefault();
                            updateCourse();
                        }} />
                    }
                </div>

                
            </form>
    </div>
  )
}

export default CourseForm