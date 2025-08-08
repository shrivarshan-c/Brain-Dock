import SplitText from "./Particles";
import './HomePageButton.css';
import brainImage from "./brainstorm.png"
import { useNavigate } from "react-router-dom";

export const Navbar =()=>{
const navigate= useNavigate();
    return(
        <div className="sticky top-0 z-10 mt-4 flex w-11/12 max-w-5xl mx-auto h-[65px] items-center justify-between px-6 bg-white/30 backdrop-blur-md rounded-lg border border-black border-x-4 border-y-0 shadow-md gap-2">
        <div className="hidden sm:flex items-center cursor-pointer" onClick={()=>{navigate("/")
        }}>
          <img className="w-6 h-6" src={brainImage} alt="logo" />
          <SplitText
            text="BrainDock"
            className="text-2xl font-semibold text-black"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={()=>{console.log("letters animated")}}
          />
        </div>
        <div className="flex space-x-4 items-center">
          <div className="button-56 px-4 py-2" onClick={() => navigate("/signin")}>Login</div>
          <div className="button-56 px-4 py-2" onClick={() => navigate("/signup")}>Signup</div>
        </div>
      </div>
    )
}
