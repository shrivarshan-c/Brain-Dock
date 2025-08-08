import type { ReactNode } from "react"

interface buttonTypes{

    variant:string,
    text:string,
    startIcon?:ReactNode,
    onClick?:()=>void

}

const variantArray={
    "primary":"bg-red-500 font-medium text-base py-4 px-4 flex justify-center items-center rounded-md transition duration-200",
   "secondary":"bg-gray-300 font-medium text-ba  se py-4 px-4 flex justify-center items-center rounded-md transition duration-200"
}

export const Button=(props:buttonTypes)=>{

    return <button className={variantArray[props.variant]} onClick={props.onClick}> {props.startIcon}{props.text}</button>

}
