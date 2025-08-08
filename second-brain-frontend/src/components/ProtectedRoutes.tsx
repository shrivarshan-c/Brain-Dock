import { Route } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { HomePage } from "./HomePage";



export const ProtectedRoutes=()=>{

    const token = localStorage.getItem("token");
    return(
        <>
        {
            token?<>
            <Route>
                <Route path="/dashboard" element={<Dashboard/>}></Route>
            </Route>

            </>:<HomePage/>
        }


        </>
    )
}
