import { query } from "../../db"
import { NextResponse } from "next/server"
import pool from "../../db"
import { NextApiRequest } from "next"
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
      const courses = await query({
        query: "SELECT * FROM courses",
        values: [],
      })
      return NextResponse.json(courses, {status: 200})
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



    if (credentials[0].session === session.value) {
        const courses = await query({
            query: "SELECT * FROM courses WHERE name = ?",
            values: [data.name],
          })
          if (courses.length !== 0) return NextResponse.json({message: "course is exist"}, {status: 400})
        
          try {
            const connection = await pool.getConnection();
            const result: any = await connection.query(
              'INSERT INTO courses (name) values (?)',
              [data.name]
            );
            connection.release();
            return NextResponse.json({message: "success", id: result[0].insertId}, {status: 200})
          } catch (error) {
            console.error('Error registering user:', error);
            return NextResponse.json({message: "failed"}, {status: 200})
          }    
    }
}
export async function PUT(request: any, res: any) {
    const data = await request.json()
  

    const cookieStore = cookies()
    const session: any = cookieStore.get("session")
    if (!session) return NextResponse.json({message: "forbidden"}, {status: 403})

    const credentials = await query({
      query: "SELECT * FROM admins WHERE session = ?",
      values: [session.value],
    })

    if (credentials.length === 0) return NextResponse.json({message: "forbidden"}, {status: 403})



    if (credentials[0].session === session.value) {
        const courses = await query({
            query: "SELECT * FROM courses WHERE name = ?",
            values: [data.name],
          })
          if (courses.length !== 0) return NextResponse.json({message: "course is exist"}, {status: 400})
        
          try {
            const connection = await pool.getConnection();
            const result: any = await connection.query(
              'UPDATE courses set name = ? WHERE id = ?',
              [data.name, data.id]
            );
            connection.release();
            return NextResponse.json({message: "success", id: result[0].insertId}, {status: 200})
          } catch (error) {
            console.error('Error registering user:', error);
            return NextResponse.json({message: "failed"}, {status: 200})
          }    
    }
}
