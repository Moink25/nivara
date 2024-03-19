import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
// import { Project } from '../../mongo';

const AddProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const email = state.email;

  // State variables for form fields
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [members, setMembers] = useState("");
  const [budget, setBudget] = useState("");
  const [client_name, setClient_name] = useState("");
  const [client_email, setClient_email] = useState("");
  const [status, setStatus] = useState("");

  // State for displaying form submission status
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Create form data
    const formData = new FormData();
    formData.append('email', email);
    formData.append('name', name);
    formData.append('date', date);
    formData.append('members', members);
    formData.append('budget', budget);
    formData.append('client_name', client_name);
    formData.append('client_email', client_email);
    formData.append('status', status);

    try {
      const response = await axios.post("http://localhost:8000/add-project", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Handle successful response
      console.log("Project added successfully:", response.data);
      setSubmitting(false);
      navigate('/admin',{state:{email:email}}); // Redirect to success page or any other desired page
    } catch (error) {
      console.error("Error during project addition:", error);
      setSubmitting(false);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="text-gray-600 body-font flex justify-center items-center w-full">
      <div className="w-2/5 container px-5 py-24 mx-auto flex items-center justify-center">
        <div className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Add New Project</h2>
          <form onSubmit={submit}>
            <div className="relative mb-4">
              <label htmlFor="name">Project Name:</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="date">Start Date:</label>
              <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="members">Members:</label>
              <input type="number" id="members" value={members} onChange={(e) => setMembers(e.target.value)} required className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="budget">Budget:</label>
              <input type="number" id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} required className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="client_name">Client Name:</label>
              <input type="text" id="client_name" value={client_name} onChange={(e) => setClient_name(e.target.value)} required className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="client_email">Client Email:</label>
              <input type="email" id="client_email" value={client_email} onChange={(e) => setClient_email(e.target.value)} required className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="status">Status:</label>
              <input type="text" id="status" value={status} onChange={(e) => setStatus(e.target.value)} required className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <button type="submit" disabled={submitting} className="text-white bg-[#802bb1] border-0 py-2 px-8 focus:outline-none hover:bg-[#800b75] rounded text-lg">
              {submitting ? "Adding Project..." : "Add Project"}
            </button>
            {submitting && <div>Loading...</div>}
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
