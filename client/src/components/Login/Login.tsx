import React from "react";

export default function Login() {

  const handleLoginClick = () => {
    // Add your login logic here
    //console.log("Login button clicked");
    // You can replace the console.log statement with your actual login logic
    window.location.href = "http://localhost:3000/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500  flex flex-col justify-center ">
      {/* <div className="max-w-md md:max-w-full mx-auto ">
        { <div className="text-center font-medium text-xl">Bine ai revenit in arena!</div> }
      </div> */}
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300 rounded-xl bg-opacity-80 ">
        <div className="text-5xl font-bold text-gray-800 mb-8 text-center">
          Login
        </div>
        <form action="" className="space-y-8" id="nameform">
          <div>
            <label htmlFor="" className="text-md font-bold text-gray-700 block">
              Email
            </label>
            <input
              type="text"
              className="w-full p-2 border  rounded-lg mt-1 opacity-80"
              required
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="text-md font-bold border-gray-300 text-gray-700 block "
            >
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-lg mt-1 opacity-80"
              required
            />
          </div>
          
        </form>
        <div className="flex justify-center">
            <button onClick={handleLoginClick} type="submit" form="nameform" value="Submit" className=" bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold w-2/3 p-2 border rounded-2xl shadow-md mt-6">
              Login
            </button>
        </div>
      </div>
    </div>
  );
}
