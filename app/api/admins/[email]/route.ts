import { query } from "../../../db"
import { NextResponse } from "next/server"
import pool from "../../../db"
import { NextApiRequest } from "next"
import { cookies } from "next/headers"

export async function GET(req: any, {params}: {params: any}) {
  
  const cookieStore = cookies()
    const session: any = cookieStore.get("session")
    if (!session) return NextResponse.json({message: "forbidden"}, {status: 403})

    const credentials = await query({
      query: "SELECT * FROM admins WHERE session = ?",
      values: [session.value],
    })

    if (credentials.length === 0) return NextResponse.json({message: "forbidden"}, {status: 403})


  const email: any = await params.email;
  
  const admins = await query({
    query: "SELECT * FROM admins WHERE email = ?",
    values: [email],
  })
  return NextResponse.json(admins[0], {status: 200})
}
export async function PUT(req: any, {params}: {params: any}) {
  
  const cookieStore = cookies()
    const session: any = cookieStore.get("session")
    if (!session) return NextResponse.json({message: "forbidden"}, {status: 403})

    const credentials = await query({
      query: "SELECT * FROM admins WHERE session = ?",
      values: [session.value],
    })

    if (credentials.length === 0) return NextResponse.json({message: "forbidden"}, {status: 403})


  const email: any = await params.email;
  const data = await req.json()

  const admins = await query({
    query: "UPDATE admins set password = ? WHERE email = ?",
    values: [data.password, email],
  })
  return NextResponse.json({message: "success"}, {status: 200})
}

export async function DELETE(req: any, {params}: {params: any}) {
  const email: any = await params.email;
  const admin = await query({
    query: "DELETE FROM admins WHERE email = ?",
    values: [email],
  })
  return NextResponse.json({message: "deleted success"}, {status: 200})
}
