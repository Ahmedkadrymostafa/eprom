import React from 'react'

const NewCourseInfo = () => {
  return (
    <div className='glass absolute z-10 px-5 py-2 top-0 -translate-x-1/2 left-1/2'>
        <div className='bg-white px-7 py-3 rounded-3xl'>
            <div className='flex justify-between items-center bottom-border'>
                <p className='main-color text-3xl font-bold'>New Course Info</p>
                <p className='text-red-800 font-black text-2xl cursor-pointer' onClick={(e: any) => {}}>Cancel</p>
            </div>
            <div className='flex gap-14 m-7'>
                <div className='flex flex-col gap-4'>
                    <div>
                        <p className='main-color text-xl font-bold'>Course Title</p>
                        <p className='text-black text-base max-w-60'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div>
                        <p className='main-color text-xl font-bold'>Number of trainees</p>
                        <p className='text-black text-base'>10</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <p className='main-color text-xl font-bold'>From</p>
                        <p className='text-black text-base'>10</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <p className='main-color text-xl font-bold'>To</p>
                        <p className='text-black text-base'>10</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <p className='main-color text-xl font-bold'>Days</p>
                        <p className='text-black text-base'>10</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <p className='main-color text-xl font-bold'>Total hours</p>
                        <p className='text-black text-base'>10</p>
                    </div>
                    
                </div>
                <div className='flex flex-col gap-6'>
                    <p className='main-color text-2xl font-bold'>Total Revenue & Fees</p>
                    <div className='flex flex-col gap-4'>
                        <pre className='text-black text-xl font-bold'>Total revenue    2000</pre>
                        <pre>-Instructor fees    2500</pre>
                        <pre>-Break cost    2500</pre>
                        <pre>-Training Tools    2500</pre>
                        <pre className='text-black text-xl font-bold'>Net revenue    1200</pre>
                    </div>
                    <button className='button-81'>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewCourseInfo