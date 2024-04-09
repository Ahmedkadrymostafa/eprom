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
      const trainees = await query({
        query: "SELECT * FROM trainees",
        values: [],
      })
      return NextResponse.json(trainees, {status: 200})
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
        const trainees = await query({
            query: "SELECT * FROM trainees WHERE person_id = ?",
            values: [data.person_id],
          })
          if (trainees.length !== 0) return NextResponse.json({message: "trainee is exist"}, {status: 400})
        
          try {
            const connection = await pool.getConnection();
            const result: any = await connection.query(
              'INSERT INTO trainees (person_id, name, title, project, location, department) VALUES (?, ?, ?, ?, ?, ?)',
              [data.person_id, data.name, data.title, data.project, data.location, data.department]
            );
            connection.release();
            return NextResponse.json({message: "success", id: result[0].insertId}, {status: 200})
          } catch (error) {
            console.error('Error registering user:', error);
            return NextResponse.json({message: "failed"}, {status: 200})
          }    
    }



    // const trainees = await query({
    //   query: "SELECT * FROM trainees WHERE person_id = ?",
    //   values: [data.person_id],
    // })
    // if (trainees.length !== 0) return NextResponse.json({message: "trainee is exist"}, {status: 400})
  
    // try {
    //   const connection = await pool.getConnection();
    //   const result = await connection.query(
    //     'INSERT INTO trainees (person_id, name, title, project, location, department) VALUES (?, ?, ?, ?, ?, ?)',
    //     [data.person_id, data.name, data.title, data.project, data.location, data.department]
    //   );
    //   connection.release();
    //   return NextResponse.json({message: "success"}, {status: 200})
    // } catch (error) {
    //   console.error('Error registering user:', error);
    //   return NextResponse.json({message: "failed"}, {status: 200})
    // }    
  }
