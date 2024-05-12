import { query } from "../../../../db"
import { NextResponse } from "next/server"
import Cryptr from "cryptr";
import { cookies } from 'next/headers'

const cryptr = new Cryptr('secretKey', { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 10 });


export async function POST(req: any, {params}: {params: any}) {
  const email: any = await params.email;
  const password: any = await req.json()
  const admins = await query({
    query: "SELECT * FROM admins WHERE email = ?",
    values: [email],
  })
  
  if (admins.length === 0) return NextResponse.json({message: "incorrect email"}, {status: 404})
  let hash = admins[0].password
  let token = cryptr.encrypt(hash)
  if (password.password !== cryptr.decrypt(hash)) {
    return NextResponse.json({message: "incorrect password"}, {status: 403})        
  }else {
    return NextResponse.json({message: "success"}, {status: 200})
  }

}

export async function PUT(req: any, {params}: {params: any}) {
    const email: any = await params.email;
    const password: any = await req.json()
    let session = cryptr.encrypt(password)

    const admin = await query({
      query: "UPDATE admins SET session = ? WHERE email = ?",
      values: [session, email],
    }).then(() => {
      const cookieStore = cookies()
      cookieStore.set('session', session)  
    })
    return NextResponse.json({session: session}, {status: 200})
    
}
