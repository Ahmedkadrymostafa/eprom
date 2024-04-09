import Link from 'next/link'
import React from 'react'
import { MdSpaceDashboard, MdMenuBook } from "react-icons/md";
import styles from "./sidebar.module.css"
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { LuBookPlus } from "react-icons/lu";

const SideBar = () => {
  return (
    <div>
        <ul className={styles.sideMenu}>
            <li className={styles.sideMenuLi}>
                <Link className={styles.sideMenuLink} href="/dashboard">
                    <p className='text-3xl'><MdSpaceDashboard /></p>
                    <p>Overview</p>
                </Link>
            </li>
            <li className={styles.sideMenuLi}>
                <Link className={styles.sideMenuLink} href="/dashboard/trainees">
                    <p className='text-3xl'><FaUsers /></p>
                    <p>View Trainees</p>
                </Link>
            </li>
            {/* <li className={styles.sideMenuLi}>
                <Link className={styles.sideMenuLink} href="#">
                    <p className='text-3xl'><FaUserPlus /></p>
                    <p>Add new Trainer</p>
                </Link>
            </li> */}
            <li className={styles.sideMenuLi}>
                <Link className={styles.sideMenuLink} href="/dashboard/courses">
                    <p className='text-3xl'><MdMenuBook /></p>
                    <p>Courses</p>
                </Link>
            </li>
            <li className={styles.sideMenuLi}>
                <Link className={styles.sideMenuLink} href="/dashboard/organizations">
                    <p className='text-3xl'><LuBookPlus /></p>
                    <p>Organizations</p>
                </Link>
            </li>
            
        </ul>
    </div>
  )
}

export default SideBar