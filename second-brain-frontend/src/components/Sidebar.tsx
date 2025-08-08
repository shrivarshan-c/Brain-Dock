import { useState } from "react";
import { BrainIcon } from "../icons/BrainIcon";
import { Twitter } from "../icons/twitter";
import { Youtube } from "../icons/youtube";
import { Document } from "../icons/document";
import { useNavigate } from "react-router-dom";
import './Card.css'; // optional for custom card styles

export function SideBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button - Only visible on small screens */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border rounded shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 z-40 h-screen lg:h-auto w-64 lg:w-72 bg-white shadow-2xl transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Sidebar Content */}
        <div className="p-4">
          {/* Logo Section */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              navigate("/dashboard");
              setIsOpen(false);
            }}
          >
            <BrainIcon />
            <h2 className="text-2xl font-bold tracking-wider">
              <span className="text-red-500 text-3xl">B</span>rainDock
            </h2>
          </div>

          {/* Menu Items */}
          <div className="mt-10 space-y-4">
            {/* YouTube */}
            <div
              className="flex items-center p-3 hover:bg-red-200 hover:shadow-lg transition-all duration-200 rounded-md border-b-[3px] border-l-4 border-l-red-500 border-b-black cursor-pointer"
              onClick={() => {
                navigate("/dashboard/youtube");
                setIsOpen(false);
              }}
            >
              <Youtube />
              <span className="ml-3 font-semibold text-lg">YouTube</span>
            </div>

            {/* Twitter */}
            <div
              className="flex items-center p-3 hover:bg-blue-200 hover:shadow-lg transition-all duration-200 rounded-md border-b-[3px] border-l-4 border-l-blue-400 border-b-black cursor-pointer"
              onClick={() => {
                navigate("/dashboard/twitter");
                setIsOpen(false);
              }}
            >
              <Twitter />
              <span className="ml-3 font-semibold text-lg">Twitter</span>
            </div>

            {/* Documents */}
            <div
              className="flex items-center p-3 hover:bg-gray-200 hover:shadow-lg transition-all duration-200 rounded-md border-b-[3px] border-l-4 border-l-black border-b-black cursor-pointer"
              onClick={() => {
                navigate("/dashboard/document");
                setIsOpen(false);
              }}
            >
              <Document />
              <span className="ml-3 font-semibold text-lg">Document</span>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-12 flex justify-center">
            <button
              className="px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-full shadow-md transition-all duration-200"
              onClick={() => {
                // Add logout logic here
                localStorage.clear("token");
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Dark Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
