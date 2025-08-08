
import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom"
import { Dashboard } from "./components/Dashboard"
import { SignUp } from "./components/SignUp"
import { SignIn } from "./components/SignIn"
import { toast, ToastContainer } from "react-toastify"
import { Youtube } from "./icons/youtube"
import { YoutubeComponent } from "./components/YoutubeComponent"
import { TwitterComponent } from "./components/TwitterComponent"
import { DocumentComponent } from "./components/DocumentComponent"
import { AllContents } from "./components/AllContents"
import { HomePage } from "./components/HomePage"
import { SharedComponent } from "./components/sharedComponent"
function App() {

    const token = localStorage.getItem("token");

return (
  <>
  <div className="">

<BrowserRouter>

<Routes>

<Route path="/" element={<HomePage/>}/>
   <Route path="/signup" element={<SignUp/>}/>
   <Route path="/signin" element={<SignIn/>}/>
 {token ? <>

    <Route path="/dashboard" element={<Dashboard/>}>

      <Route index element={<AllContents/>}/>
    <Route path="youtube" element={<YoutubeComponent/>}/>
    <Route path="twitter" element={<TwitterComponent/>}/>
    <Route path="document" element={<DocumentComponent/>}/>
 </Route>
 </>:(
    toast.error("user not signed In "),
    <Route path="*" element={<Navigate to="/signin"></Navigate>}/>)

}
<Route path="/share/:shareLink" element={<SharedComponent/>} />
</Routes>
</BrowserRouter>
</div>
<ToastContainer />



</>

  )
}
// https://youtu.be/6J1FQoYP0o0?si=tGFGqyTKuytLmCI-
//https://www.youtube.com/watch?v=6J1FQoYP0o0

export default App
