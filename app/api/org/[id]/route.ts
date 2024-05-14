import { query } from "../../../db"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function DELETE(request: any, {params}: {params: any}) {
    const id = await params.id;   
    
      const cookieStore = cookies()
      const session: any = cookieStore.get("session")
      if (!session) return NextResponse.json({message: "forbidden"}, {status: 403})
  
    const credentials: any = await query({
      query: "SELECT * FROM admins WHERE session = ?",
      values: [session.value],
    })
  
    if (credentials.length === 0) return NextResponse.json({message: "forbidden"}, {status: 403})
  
  
  
    if (credentials[0].session === session.value) {
      const orgs = await query({
        query: "DELETE FROM organizations WHERE id = ?",
        values: [id],
      })
      return NextResponse.json({message: "deleted"}, {status: 200})
    }
  }