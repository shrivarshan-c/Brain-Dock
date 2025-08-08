
import { Button } from "./button";
import { InputBox } from "./createContent";
import Lottie from "lottie-react";
import passwordAnimation from "../icons/password.json"
import { useRef } from "react";
import { BACKED_URL } from "../config";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Navbar } from "./Navbar";

export function SignIn()
{
    const usernameRef=useRef<HTMLInputElement>();
    const passwordRef=useRef<HTMLInputElement>();
    const navigate=useNavigate();

    async  function signInHandle()
    {
        try{
            const username=usernameRef.current?.value;
            const password=passwordRef.current?.value;
       const result = await  axios.post(`${BACKED_URL}`+"/api/v1/signin",{
               username,
               password
            })

            const notemess= result?.data?.message || "signin successful"

            const jwt=result.data.token;
            localStorage.setItem("token",jwt);

        if(result.data.message=="SignedIn")
        {

            toast.success(notemess);
            navigate("/dashboard");

        }
        else
        {
            toast.error("Incorrect authorization")
        }


        }catch(error:any)
        {

         const errorMessage = error.response?.data?.message || "Something went wrong during signIn.";
          toast.error(errorMessage);

}
    }


    return (
        <>
<div className="flex flex-col justify-center">

<div><Navbar/></div>
<div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
  <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl p-8 border rounded-lg shadow-lg bg-white gap-10">

    {/* Lottie Animation */}
    <div className=" hidden  md:w-1/2 md:flex md:justify-center">
      <Lottie animationData={passwordAnimation} loop={true} className="w-full max-w-[400px] h-auto" />
    </div>

    {/* Signup Form */}



    <div className="w-1/2 h-[400px] bg-red-50 border flex flex-col gap-6 justify-center items-center">
  <h2 className="font-fancy font-extrabold text-3xl">SignIn</h2>

  <InputBox
    type="text"
    placeholder="Username"
    className="w-full" // adjust width here
    ref={usernameRef}
  />

  <InputBox
    type="password"
    placeholder="Password"
    className="w-full" // keep consistent width
    ref={passwordRef}
  />

  <Button variant="primary" text="Signin"  onClick={signInHandle}/>
  <div className="flex">
     <p>Dont Have an account ?</p>
  <a href="/signup">Signup</a>

  </div>





</div>
</div>




    </div>

  </div>

        </>
    )
}
