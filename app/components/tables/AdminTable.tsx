import { MdDelete } from "react-icons/md";


const AdminTable = () => {
  return (
    <div className="h-[75vh] overflow-y-scroll max-md:h-auto">
        <table className="admin-table">
            <thead>
                <tr>
                    <th className="admin-th">Id</th>
                    <th className="admin-th">Name</th>
                    <th className="admin-th">Email</th>
                    <th className="admin-th">Role</th>
                    <th className="admin-th">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr className="admin-tr">
                    <td className="admin-td">1</td>
                    <td className="admin-td">ahmed kadry</td>
                    <td className="admin-td">ahmed@email.com</td>
                    <td className="admin-td">super admin</td>
                    <td className="text-red-700 text-2xl font-black flex justify-center items-center h-full"><MdDelete className="cursor-pointer" /></td>
                </tr>
                <tr className="admin-tr">
                    <td className="admin-td">1</td>
                    <td className="admin-td">ahmed kadry</td>
                    <td className="admin-td">ahmed@email.com</td>
                    <td className="admin-td">super admin</td>
                    <td className="text-red-700 text-2xl font-black flex justify-center items-center h-full"><MdDelete className="cursor-pointer" /></td>
                </tr>
                <tr className="admin-tr">
                    <td className="admin-td">1</td>
                    <td className="admin-td">ahmed kadry</td>
                    <td className="admin-td">ahmed@email.com</td>
                    <td className="admin-td">super admin</td>
                    <td className="text-red-700 text-2xl font-black flex justify-center items-center h-full"><MdDelete className="cursor-pointer" /></td>
                </tr>
                <tr className="admin-tr">
                    <td className="admin-td">1</td>
                    <td className="admin-td">ahmed kadry</td>
                    <td className="admin-td">ahmed@email.com</td>
                    <td className="admin-td">super admin</td>
                    <td className="text-red-700 text-2xl font-black flex justify-center items-center h-full"><MdDelete className="cursor-pointer" /></td>
                </tr>
                
            </tbody>
        </table>
    </div>
  )
}

export default AdminTable