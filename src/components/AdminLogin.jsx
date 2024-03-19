// AdminLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const logo = require('../img/BuildTrackEr.png');

const AdminLogin = () => {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/admin-login", {
        email,
        password,
      })
        .then(res => {
          if (res.data === "exist") {
            history("/admin", { state: { email: email } });
          }
          else if (res.data === "wrongpassword") {
            alert("wrong password");
          }
          else if (res.data === "notexist") {
            alert("User have not sign up");
          }
        })
        .catch(e => {
          alert("wrong details");
          console.log(e);
        });
    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <section className="text-gray-600 body-font flex justify-center items-center w-full">
      <div className="w-2/5 container px-5 py-24 mx-auto flex items-center justify-center">
        <div className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto mt-10 md:mt-0">
          <img src={logo} alt="" className='w-20 ml-32' />
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Login</h2>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            className="text-white bg-[#802bb1] border-0 py-2 px-8 focus:outline-none hover:bg-[#800b75] rounded text-lg"
            onClick={submit}
          >
            Login
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Don't Have an Account?
            <a href="/admin-signup" className='text-md text-[#802bb1] ml-4'>
              Signup
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;