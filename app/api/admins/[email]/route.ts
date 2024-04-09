import { query } from "../../../db"
import { NextResponse } from "next/server"

export async function GET(req: any, {params}: {params: any}) {
  // Do whatever you want
  const email: any = await params.email;
  
  const admins = await query({
    query: "SELECT * FROM admins WHERE email = ?",
    values: [email],
  })
  return NextResponse.json(admins[0], {status: 200})
}

export async function DELETE(req: any, {params}: {params: any}) {
  const email: any = await params.email;
  const admin = await query({
    query: "DELETE FROM admins WHERE email = ?",
    values: [email],
  })
  return NextResponse.json({message: "deleted success"}, {status: 200})
}
