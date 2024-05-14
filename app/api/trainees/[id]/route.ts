import { query } from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(req: any, {params}: {params: any}) {
    const id: any = await params.id;
    const trainee: any = await query({
      query: "SELECT * FROM trainees WHERE person_id = ?",
      values: [id],
    })
    return NextResponse.json(trainee[0], {status: 200})
}

export async function DELETE(req: any, {params}: {params: any}) {
    const id: any = await params.id;
    const trainee = await query({
      query: "DELETE FROM trainees WHERE person_id = ?",
      values: [id],
    })
    return NextResponse.json({message: "deleted success"}, {status: 200})
}
  
export async function PUT(req: any, {params}: {params: any}) {
    const id: any = await params.id;
    const data = await req.json();

    // const trainees = await query({
    //   query: "SELECT * FROM trainees WHERE person_id = ?",
    //   values: [data.person_id],
    // })
    // if (trainees.length !== 0) return NextResponse.json({message: "trainee is exist"}, {status: 400})
  

    try {
      const trainee = await query({
        query: `UPDATE trainees SET person_id = ?, name = ?, title = ?, project = ?, location = ?, department = ? WHERE id = ${id}`,
        values: [data.person_id, data.name, data.title, data.project, data.location, data.department],
      })
      return NextResponse.json({message: "updated success"}, {status: 200})

    } catch (error) {
      console.error('Error registering user:', error);
      return NextResponse.json({message: "failed"}, {status: 400})
    }    
    
}
  