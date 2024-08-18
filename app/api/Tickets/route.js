// file is named route.js and is important
// lets nextjs know this is a db call 

import Ticket from "../../(models)/Ticket";
import { NextResponse } from "next/server";

export async function POST(req){
  try {
    const body = await req.json();
    const ticketData = body.formData;
    console.log(ticketData)
    await Ticket.create(ticketData);
    return NextResponse.json({message: "Ticket Created Successfully"}, {status: 201})
  } catch (error) {
    return NextResponse.json({message: error}, {status: 401})
  }
}

export async function GET(req){
  try {
    const tickets = await Ticket.find();
    return NextResponse.json({tickets}, {status: 200});
  } catch (error){
    return NextResponse.json({message: error}, {status: 401});
  }
}