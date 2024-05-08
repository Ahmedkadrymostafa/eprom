import React from 'react'

const Loading = () => {
  return (
    // <div className='loader-bg'>
    //     <div className="profile-main-loader">
    //         <div className="loader">
    //           <svg className="circular-loader"viewBox="25 25 50 50" >
    //             <circle className="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#70c542" strokeWidth="4" />
    //           </svg>
    //         </div>
    //       </div>
    // </div>
    <div className='loader-bg'>
      <div className="profile-main-loader">
        <ul className="wave-menu">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
      </div>
    </div>
  )
}

export default Loading