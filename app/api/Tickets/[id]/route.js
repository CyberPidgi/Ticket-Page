// import Ticket from "../../(models)/Ticket";
import Ticket from '../../../(models)/Ticket'
import { NextResponse } from "next/server";


export async function GET(req, { params }){
  const { id } = params
  const foundTicket = await Ticket.findOne({_id: id});

  return NextResponse.json({foundTicket: foundTicket}, {status: 200});
}

export async function DELETE(req, { params }){
  try {
    const { id } = params;
    await Ticket.findByIdAndDelete(id);

    return NextResponse.json({message: "Ticket Deleted"}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: "error"}, {status: 401})
  }
}