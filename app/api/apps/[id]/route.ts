import { query } from "../../../db"
import { NextResponse } from "next/server"
import pool from "../../../db"
import { cookies } from "next/headers"

export async function PUT(request: any, {params}: {params: any}) {
    const data = await request.json()
    let id: any = await params.id;

    const cookieStore = cookies()
    const session: any = cookieStore.get("session")
    if (!session) return NextResponse.json({message: "forbidden"}, {status: 403})

    const credentials = await query({
      query: "SELECT * FROM admins WHERE session = ?",
      values: [session.value],
    })

    if (credentials.length === 0) return NextResponse.json({message: "forbidden"}, {status: 403})



    if (credentials[0].session === session.value) {
        
          try {
            const connection = await pool.getConnection();
            const result: any = await connection.query(
              `UPDATE applications set status = ? WHERE id = ${id}`,
              [data.status]
            );
            connection.release();
            return NextResponse.json({message: "success", id: result[0].insertId}, {status: 200})
          } catch (error) {
            console.error('Error Update Status:', error);
            return NextResponse.json({message: "failed"}, {status: 200})
          }    
    }
}

export async function DELETE(req: any, {params}: {params: any}) {
  const id: any = await params.id;
  const apps = await query({
    query: "DELETE FROM applications WHERE id = ?",
    values: [id],
  })
  return NextResponse.json({message: "deleted success"}, {status: 200})
}