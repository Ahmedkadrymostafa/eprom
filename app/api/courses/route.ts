import { query } from "../../db"
import { NextResponse } from "next/server"
import pool from "../../db"
import { cookies } from "next/headers"

export async function GET(request: any) {
    
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
        query: "SELECT * FROM courses ORDER BY date_from DESC",
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

    const credentials: any = await query({
      query: "SELECT * FROM admins WHERE session = ?",
      values: [session.value],
    })

    if (credentials.length === 0) return NextResponse.json({message: "forbidden"}, {status: 403})



    if (credentials[0].session === session.value) {
       
          try {
            const connection = await pool.getConnection();
            const result: any = await connection.query(
              'INSERT INTO courses (course_title, course_price, num_of_trainees, date_from, date_to, days, total_hours, location, course_status, total_revenue, instructor_fees, break_cost, tools, transportation, accommodation, allowance, other_expenses, total_expenses, net_revenue, instructors, notes) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
              [
                data.course_title,
                data.course_price,
                data.num_of_trainees,
                data.date_from,
                data.date_to,
                data.days,
                data.total_hours,
                data.location,
                data.course_status,
                data.total_revenue,
                data.instructor_fees,
                data.break_cost,
                data.tools,
                data.transportation,
                data.accommodation,
                data.allowance,
                data.other_expenses,
                data.total_expenses,
                data.net_revenue,
                data.instructors,
                data.notes
              ]
            );
            connection.release();
            return NextResponse.json({message: "success", id: result[0].insertId}, {status: 200})
          } catch (error) {
            console.error('Error adding course:', error);
            return NextResponse.json({message: "failed"}, {status: 200})
          }    
          
    }
}
export async function PUT(request: any, res: any) {
    const data = await request.json()
  

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
              `UPDATE courses set 
              course_title = ?,
              course_price = ?, 
              num_of_trainees= ?, 
              date_from = ?, 
              date_to = ?, 
              days = ?, 
              total_hours = ?, 
              location = ?,
              course_status = ?, 
              total_revenue = ?, 
              instructor_fees = ?,
              break_cost = ?, 
              tools = ?,
              transportation = ?, 
              accommodation = ?, 
              allowance = ?, 
              other_expenses = ?, 
              total_expenses = ?, 
              net_revenue = ?, 
              instructors = ?
              WHERE id = ?
              `,
              [
                data.course_title,
                data.course_price,
                data.num_of_trainees,
                data.date_from,
                data.date_to,
                data.days,
                data.total_hours,
                data.location,
                data.course_status,
                data.total_revenue,
                data.instructor_fees,
                data.break_cost,
                data.tools,
                data.transportation,
                data.accommodation,
                data.allowance,
                data.other_expenses,
                data.total_expenses,
                data.net_revenue,
                data.instructors,
                data.id]
            );
            connection.release();
            return NextResponse.json({message: "success", id: result[0].insertId}, {status: 200})
          } catch (error) {
            console.error('Error registering user:', error);
            return NextResponse.json({message: "failed"}, {status: 200})
          }    
    }
}
