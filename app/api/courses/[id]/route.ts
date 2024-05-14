import { query } from "../../../db"
import { NextResponse } from "next/server"
import pool from "../../../db"
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
      const courses = await query({
        query: "DELETE FROM courses WHERE id = ?",
        values: [id],
      })
      return NextResponse.json({message: "deleted"}, {status: 200})
    }
  }

  export async function PUT(request: any, {params}: {params: any}) {
    const data = await request.json()
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
        
          try {
            const connection = await pool.getConnection();
            const result: any = await connection.query(
              'UPDATE courses set notes = ? WHERE id = ?',
              [data.notes, id]
            );
            connection.release();
            return NextResponse.json({message: "success", id: result[0].insertId}, {status: 200})
          } catch (error) {
            console.error('Error registering user:', error);
            return NextResponse.json({message: "failed"}, {status: 200})
          }    
    }
}
