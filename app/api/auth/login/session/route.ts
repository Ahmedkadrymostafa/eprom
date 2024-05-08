import { query } from '@/app/db'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// export async function POST(req: any) {
//     // const cookieStore = cookies()
//     // const session: any = cookieStore.get("session")
//     const session = await req.json();
//     const credentials = await query({
//       query: "SELECT * FROM admins WHERE session = ?",
//       values: [session.session],
//     })
//     console.log(session)
//     // console.log()
//     return NextResponse.json({credentials: credentials[0], cookie: session}, {status: 200})
// }
export async function GET(req: any) {
    const cookieStore = cookies()
    const session: any = cookieStore.get("session")
    // const session = await req.json();
    const credentials = await query({
      query: "SELECT * FROM admins WHERE session = ?",
      values: [session.value],
    })
    // console.log(session)
    // console.log()
    return NextResponse.json({credentials: credentials, cookie: session.value}, {status: 200})
}
export async function PUT(req: any, res: any) {
    let newSession = "";
    let email = await req.json();
    await query({
        query: "UPDATE admins SET session = ? WHERE email = ?",
        values: [newSession, email.email],
    }).then(() => {
      const cookieStore = cookies()
      cookieStore.delete('session')
    })
    return NextResponse.json({message: "success"}, {status: 200})
}