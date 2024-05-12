import { query } from "../../db"
import { NextResponse } from "next/server"
import pool from "../../db"
import { cookies } from "next/headers"

export async function GET(request: any) {
    
    const cookieStore = cookies()
    const session: any = cookieStore.get("session")
    if (!session) return NextResponse.json({message: "forbidden"}, {status: 403})

    const credentials = await query({
      query: "SELECT * FROM admins WHERE session = ?",
      values: [session.value],
    })

    if (credentials.length === 0) return NextResponse.json({message: "forbidden"}, {status: 403})
    
    
    if (credentials[0].session === session.value) {
      const admins = await query({
        query: "SELECT * FROM admins",
        values: [],
      })
      return NextResponse.json(admins, {status: 200})
    }
    
    
}


export async function POST(request: any, res: any) {
  const data = await request.json()


    const cookieStore = cookies()
    const session: any = cookieStore.get("session")
    if (!session) return NextResponse.json({message: "forbidden"}, {status: 403})

    const credentials = await query({
      query: "SELECT * FROM admins WHERE session = ?",
      values: [session.value],
    })

    if (credentials.length === 0) return NextResponse.json({message: "forbidden"}, {status: 403})


  const admins = await query({
    query: "SELECT * FROM admins WHERE email = ?",
    values: [data.email],
  })
  if (admins.length !== 0) return NextResponse.json({message: "Email is exist"}, {status: 400})

  try {
    const connection = await pool.getConnection();
    const result = await connection.query(
      'INSERT INTO admins (name, email, password, id, role) VALUES (?, ?, ?, ?, ?)',
      [data.name, data.email, data.password, data.id, data.role]
    );
    connection.release();
    return NextResponse.json({message: "success"}, {status: 200})
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({message: "failed"}, {status: 200})
  }    
}