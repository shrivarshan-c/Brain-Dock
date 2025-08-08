import './HomePageButton.css';
import homepageImage from "../assets/image.png";
import { Navbar } from "./Navbar";

export const HomePage = () => {
  return (
    <div className="w-screen h-screen overflow-y-auto bg-gradient-to-br from-[#e0f7fa] via-[#f1f8e9] to-[#fffde7]">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center min-h-screen w-full px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col gap-6 max-w-3xl w-full">

          {/* Heading */}
          <div className="text-xl sm:text-2xl md:text-5xl font-extrabold flex flex-wrap justify-center items-center gap-3 text-center">
            Don’t just save links
            <span className="border-4 border-red-400 px-3 py-1 rounded-3xl inline-block mt-2">
              Dock your ideas.
            </span>
         {//home page
}

            <div className="mt-2 animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#FF7461"
                  stroke="#000"
                  strokeWidth="1.25"
                  d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z"
                />
              </svg>
            </div>
          </div>

          {/* Subheading */}
          <div className="text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto">
            All your favorite videos, tweets, and docs in one searchable, organized hub.
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex justify-center items-center py-10 px-4 sm:px-6 lg:px-8">
        <img
          src={homepageImage}
          alt="home_page_image"
          className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl rounded-2xl shadow-xl border-2 border-transparent p-1"
        />
      </div>

      <div className="fixed bottom-4 right-4 bg-slate-200 border-4 border-black h-26  justify-center p-4 rounded-lg shadow-lg z-50">
  <p className="font-bold">Test it using</p>
  <p><span className='bg-red-300'>Username</span> varshan</p>
  <p><span className='bg-red-300'>Password</span> varshan</p>
</div>

    </div>
  );
};
