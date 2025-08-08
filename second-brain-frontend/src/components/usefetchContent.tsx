import { useEffect, useState } from "react";

import axios from "axios";
export function useContent()
{
    const [con,setContent]=useState([]);
    const BACKED_URL= import.meta.env.VITE_BACKEND_URL;
    try{
    useEffect(()=>{

         axios.get(`${BACKED_URL}/api/v1/content`,{
            headers:{
            authorization:localStorage.getItem("token")
            }
        })

        .then((res)=>{

             setContent(res.data.content);

             console.log(res.data.content);
            });

    },[])
    }catch(e)
    {
        console.log(e);
    }
    return con;
}
