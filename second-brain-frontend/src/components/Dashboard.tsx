import { Button } from "./button"
import { Card } from "./Card"
import { addIcon } from "../icons/addicon"
import { shareIcon } from "../icons/shareicon"
import { CreateContent } from "./createContent"
import { useState } from "react"
import { SideBar } from "./Sidebar"
import { useContent } from "./usefetchContent"
import { Outlet } from "react-router-dom";
import axios from "axios"

import { toast } from "react-toastify"

 async function handleshare()
{
    const BACKED_URL= import.meta.env.VITE_BACKEND_URL;
    try{


    const findLink = await axios.post(`${BACKED_URL}/api/v1/brain/share` ,{
        share:true},
        { headers:{
            Authorization:localStorage.getItem("token")
        }});
              const hash= findLink.data.message;

        const fullLink =`${window.location.origin}/share/${hash}`;
     await  navigator.clipboard.writeText(fullLink)

toast.success("copied to clipboard");

    }catch(e)
    {
        console.error("Error generating share link:", e);
        toast.error("Failed to generate link.");
    }
}

export function Dashboard() {
    const con = useContent();
    const [model, openModel] = useState(false);

    return (
      <div className="min-h-screen  flex bg-gray-100">
        {/* Sidebar */}
        <SideBar />

        {/* Main Content */}
        <div className="flex-col  p-4">
          <div className="flex justify-end gap-4 mb-10">
            <CreateContent model={model} setModel={openModel} />

            <Button
              variant="primary"
              text="Add Content"
              startIcon={addIcon()}
              onClick={() => openModel(true)}
            />
            <Button variant="secondary" text="Share Link" startIcon={shareIcon()} onClick={handleshare} />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-6 px-4">
  <Outlet />
</div>
        </div>
      </div>
    );
  }
