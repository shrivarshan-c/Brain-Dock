
import { BrowserRouter, Navigate, Route, Router, Routes, useNavigate } from "react-router-dom"
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
import { PrivateRoute } from "./components/PrivateRoutes"
import { useEffect } from "react"
function App() {



return (
  <>
  <div className="">

<Routes>

<Route path="/" element={<HomePage/>}/>
   <Route path="/signup" element={<SignUp/>}/>
   <Route path="/signin" element={<SignIn/>}/>


    <Route path="/dashboard" element={
        <PrivateRoute>


        <Dashboard/>
        </PrivateRoute>}>

      <Route index element={<AllContents/>}/>
    <Route path="youtube" element={<YoutubeComponent/>}/>
    <Route path="twitter" element={<TwitterComponent/>}/>
    <Route path="document" element={<DocumentComponent/>}/>
 </Route>
<Route path="/share/:shareLink" element={<SharedComponent/>} />
</Routes>

</div>
<ToastContainer />



</>

  )
}
// https://youtu.be/6J1FQoYP0o0?si=tGFGqyTKuytLmCI-
//https://www.youtube.com/watch?v=6J1FQoYP0o0

export default App
