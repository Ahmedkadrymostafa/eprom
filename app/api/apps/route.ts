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
      const apps = await query({
        query: "SELECT * FROM applications",
        values: [],
      })
      return NextResponse.json(apps, {status: 200})
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
        
          try {
            const connection = await pool.getConnection();
            const result: any = await connection.query(
              'INSERT INTO applications (person_id, course, date, date_from, date_to, status, days, total_hours, location, course_fees, instructor_fees, break_cost, tools) values (?,?,?,?,?,?,?,?,?,?,?,?,?)',
              [
                data.person_id,
                data.course,
                data.date,
                data.date_from,
                data.date_to,
                data.status,
                data.days,
                data.total_hours,
                data.location,
                data.course_fees,
                data.instructor_fees,
                data.break_cost,
                data.tools
              ]
            );
            connection.release();
            return NextResponse.json({message: "success", id: result[0].insertId}, {status: 200})
          } catch (error) {
            console.error('Error registering course:', error);
            return NextResponse.json({message: "failed"}, {status: 200})
          }    
    }
}
