'use client'
import { DataContext } from "../../dashboard/layout"
import Link from "next/link"
import { useContext, useRef, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { RiUserShared2Fill } from "react-icons/ri"

const Search = () => {
    const dataContext: any = useContext(DataContext)
    const [ trainees, setTrainees ] = useState<any>([])
    const searchResultRef: any = useRef();
    const [ titleToSearch, setTitleToSearch ] = useState<String>('')
    const search = (e: any) => { 
        console.log(trainees)          
        if (e !== "") {
            const filtered = dataContext.trainees.filter((index: any) => index.name.includes(e.toLowerCase()) || index.person_id.includes(e))
            setTrainees(filtered)
            searchResultRef.current.classList.remove('hidden')
        }else {
            setTrainees([]);
            searchResultRef.current.classList.add('hidden')
        }
        
    }
    
        document.body.addEventListener('click', (e: any) => {
            if (e.target && searchResultRef.current && e.target instanceof HTMLElement && !e.target.classList.contains("search-result")) {
                searchResultRef.current.classList.add('hidden')
            }
        })
    



  return (
    <div>
        <div>
            <div className="relative glass w-fit py-2 px-4 mx-auto flex flex-col">
                <form>
                    <div className="search">
                        <input type="text" className="searchTerm" placeholder="Who are you looking for?" onChange={(e: any) => {
                            // search(e.target.value)
                            setTitleToSearch(e.target.value);
                        }} />
                        <button type="submit" className="searchButton" onClick={(e: any) => {
                                e.preventDefault();
                                search(titleToSearch)}
                            }>
                            <FaSearch />
                        </button>
                    </div>
                </form>
                
                <div ref={searchResultRef} className="search-result glass py-5 hidden px-5 absolute top-[70px] right-0 w-full max-h-96 overflow-y-scroll">
                    <ul className="bg-white py-5 px-2 rounded-3xl flex flex-col gap-4">
                        {trainees.length === 0 &&
                            <p className="main-color text-2xl font-bold text-center">Not Found</p>                       
                        }
                        {
                            trainees.map((trainee: any) => (
                                <li key={trainee.id} className="hover:bg-slate-200 rounded-3xl p-2">
                                    <Link href={`/dashboard/trainees/${trainee.person_id}`}>
                                        <div className="flex gap-3 items-center">
                                            <p className="main-color text-2xl"><RiUserShared2Fill /></p>
                                            <div>
                                                <p className="main-color text-xl capitalize font-bold">{trainee.name}</p>
                                                <p className="text-gray-700 text-sm ml-2">{`ID: ${trainee.person_id}`}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        }
                         
                        
                        
                        
                    </ul>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Search