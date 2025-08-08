import { Button } from "./button";

import { CrossIcon} from "../icons/CrossIcons";
import type React from "react";
import { useRef, useState, type ReactNode, type SetStateAction } from "react";
import Select from "react-select";
import axios from "axios";
import { BACKED_URL } from "../config";
import { toast } from "react-toastify";
interface InputBoxType{

    type:string;
    placeholder:string;
    onclick?:()=>void;// components/CrossIcon.tsx or CrossIcon.jsx
    className?:string;
    ref?:any;
}
const options = [
    { value: 'youtube', label: 'youtube' },
    { value: 'twitter', label: 'twitter' },
    { value: 'document', label: 'document' },
    { value: 'leetcode', label: 'leetcode' },

  ];



interface modelType{
model:boolean,
setModel:React.Dispatch<SetStateAction<boolean>>
}


export const CreateContent=({model,setModel}:modelType)=>{
    const [selectedOption, setSelectedOption] = useState<any>(options[0]);
    const titleRef=useRef<HTMLInputElement>();
    const linkRef=useRef<HTMLInputElement>();
 ;
    const descriptionRef= useRef<HTMLInputElement>();

    async function addContent()
    {

        try{


        const title= titleRef.current?.value;
        const  link= linkRef.current?.value;

        const description= descriptionRef.current?.value;

    const result = await axios.post(`${BACKED_URL}/api/v1/content`,{


       title,
        link,
        type:selectedOption.value,
        description


    },


    {
        headers:{
         "Authorization":`${localStorage.getItem("token")}`

        }

    })



    const mess= result.data?.message || "contents added succesful";
        toast.success(mess);





}catch(e)
{
    const errormessage= e?.response?.data?.message ||"failed";
toast.error(errormessage);
}
}

    return(
        <>
      { model &&  <div className="w-screen h-screen fixed bg-black opacity-90 top-0 left-0 flex justify-center items-center">

  <div className="bg-white  bg-opacity-100 w-80 h-100 p-6 rounded shadow space-y-6">
  <div className="flex justify-end items-end">
<div onClick={()=>setModel(false)} className="cursor-pointer">
<CrossIcon/>
</div>

      </div>
    <InputBox ref={titleRef} type="title" placeholder="Title"  />
    <InputBox ref={linkRef} type="link" placeholder="Link" />
    <div>
    <Select




        defaultValue={selectedOption}
        onChange={(option)=>{setSelectedOption(option)}}
        options={options}
      />
    </div>
    <InputBox ref={descriptionRef} type="description" placeholder="Description"/>


<div className="flex justify-center items-end mt-14">
<Button variant="primary" text="Add Content" onClick={addContent}/>

</div>

  </div>


</div>

      }
      </>
    )
}



export const InputBox=({type,placeholder,ref}:InputBoxType)=>{

    return(
        <>
       <div className="">


        <input className="w-full bg-white text-black border border-gray-300 placeholder-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" type={type}  placeholder={placeholder} ref={ref}/>

        </div>
        </>
    )
}
