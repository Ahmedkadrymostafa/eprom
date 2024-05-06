'use client'
import AdminForm from "@/app/components/forms/AdminForm";
import { useContext } from "react";
import { DataContext } from "../layout";
import { useRouter } from "next/navigation";

const Page = () => {
  const dataContext: any = useContext(DataContext)
  const router = useRouter();

  if (dataContext.credentials.role === "admin" || dataContext.credentials.role === "developer") {
    return (
      <div>
        <AdminForm />
      </div>
    )
  }else {
    router.push('/dashboard')
  }
}

export default Page