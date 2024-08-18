import TicketForm from '@/app/(components)/TicketForm'
import React from 'react'


const getTicketById = async(id) => {
  
  const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
    cache: "no-store"
  })

  if (!res.ok) throw new Error("Failed to get Ticket");

  return res.json(); 
  
}

const TicketPage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true;

  let updateTicketData = {};

  if (EDITMODE){
    console.log("testing");
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.foundTicket;
    console.log(updateTicketData);
  }
  return (
    <TicketForm ticket={updateTicketData} EDITMODE={EDITMODE}/>
  )
}

export default TicketPage