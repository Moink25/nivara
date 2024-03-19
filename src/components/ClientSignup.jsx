
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const logo=require('../img/BuildTrackEr.png')
const ClientSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [address,setAddress]=useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/client-signup", {
        name,
        email,
        mobile,
        address,
        password,
      });

      if (response.data === "exist") {
        setMessage("User already exists");
      } else if (response.data === "notexist") {
        // Use the navigate function directly
        navigate("/client", { state: { email: email } });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return ( 
    <section class="text-gray-600 body-font flex justify-center items-center w-full">
  <div class="w-2/5 container px-5 py-24 mx-auto flex  items-center justify-center">
    
    <div class=" bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto  mt-10 md:mt-0">
    <img src={logo} alt="" className='w-20 ml-32'/>
      <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Signup</h2>
      <div class="relative mb-4">
        <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
        <input type="name" id="name" name="name" onChange={(e) => { setName(e.target.value) }} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div class="relative mb-4">
        <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
        <input type="email" id="email" name="email" onChange={(e) => { setEmail(e.target.value) }} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div class="relative mb-4">
        <label for="mobile" class="leading-7 text-sm text-gray-600">Mobile</label>
        <input type="mobile" id="mobile" name="mobile" onChange={(e) => { setMobile(e.target.value) }} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div class="relative mb-4">
        <label for="address" class="leading-7 text-sm text-gray-600">Address</label>
        <input type="address" id="address" name="address" onChange={(e) => { setAddress(e.target.value) }} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div class="relative mb-4">
        <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
        <input type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value) }} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <button class="text-white bg-[#802bb1] border-0 py-2 px-8 focus:outline-none hover:bg-[#800b75] rounded text-lg"onClick={submit}>Signup</button>
      <p class="text-xs text-gray-500 mt-3">Already Have an Account?<a href="/client-login" className='text-md text-[#802bb1] ml-4'>Login</a></p>
    </div>
  </div>
</section>
   );
}
 
export default ClientSignup;