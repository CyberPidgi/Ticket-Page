"use client";

import { useRouter } from "next/navigation"
import React, { useState } from "react"

const TicketForm = ({ ticket, EDITMODE }) => {
  const initialTicketData = ticket || {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware",
  }

  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      })
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/Tickets", {
      method: "POST",
      body: JSON.stringify({ formData }),
    })

    if (!res.ok) throw new Error("Failed to Create Ticket")
    router.refresh();
    router.push('/');
  }

  const [formData, setFormData] = useState(initialTicketData);
  return (
    <div className="flex justify-center">
      <form className="flex flex-col gap-3 w-1/2" method="post" onSubmit={handleSubmit}>
        <h3>Create Your Ticket</h3>
        <label>Title</label>
        <input id="title" name="title" type="text" onChange={handleChange} required={true} value={formData.title}/>

        <label>Description</label>
        <textarea id="description" name="description" type="text" onChange={handleChange} required value={formData.description} rows={5}/>

        <label>category</label>
        <select name="category" id="category" value={formData.category} onChange={handleChange}>
          <option value="Hardware">Hardware</option>
          <option value="Software">Software</option>
          <option value="Project">Project</option>
        </select>

        <label htmlFor="Priority">Priority</label>
        <div>
          <input type="radio" name="priority" id="priority-1" onChange={handleChange} value={1} checked={formData.priority == 1}/>
          <label htmlFor="">1</label>

          <input type="radio" name="priority" id="priority-2" onChange={handleChange} value={2} checked={formData.priority == 2}/>
          <label htmlFor="">2</label>

          <input type="radio" name="priority" id="priority-3" onChange={handleChange} value={3} checked={formData.priority == 3}/>
          <label htmlFor="">3</label>

          <input type="radio" name="priority" id="priority-4" onChange={handleChange} value={4} checked={formData.priority == 4}/>
          <label htmlFor="">4</label>

          <input type="radio" name="priority" id="priority-5" onChange={handleChange} value={5} checked={formData.priority == 5}/>
          <label htmlFor="">5</label>
        </div>

        <label htmlFor="">Progress ({formData.progress}%)</label>
        <input type="range" name="progress" id="progress" value={formData.progress} min="0" max="100" onChange={handleChange}/>

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>

        <input type="submit" value={`${!EDITMODE ? "Create" : "Edit" } Ticket`} className="btn"/>
      </form>
    </div>
  )
}

export default TicketForm