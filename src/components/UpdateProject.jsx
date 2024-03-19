import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { project } = state;
  const projectId=project._id;

  const [date, setDate] = useState(null);
  const [percentage, setPercentage] = useState(project.percentage);
  const [status, setStatus] = useState(project.status);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setDate(currentDate);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(`http://localhost:8000/update-project`, {
        date,
        percentage,
        status,
        projectId,
      });

      if (response.data === "success") {
        // Handle successful update
        navigate('/admin', { state: { email: project.email } });
      } else {
        setErrorMessage("Error updating project. Please try again.");
      }
    } catch (error) {
      console.error("Error during update:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="text-gray-600 body-font flex justify-center items-center w-full">
      <div className="w-2/5 container px-5 py-24 mx-auto flex items-center justify-center">
        <div className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Update Project</h2>
          <form onSubmit={submit}>
            <div className="relative mb-4">
              <label htmlFor="date" className="leading-7 text-sm text-gray-600">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="percentage" className="leading-7 text-sm text-gray-600">Percentage</label>
              <input
                type="number"
                id="percentage"
                name="percentage"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="status" className="leading-7 text-sm text-gray-600">Project Status</label>
              <input
                type="text"
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <button
              className="text-white bg-[#802bb1] border-0 py-2 px-8 focus:outline-none hover:bg-[#800b75] rounded text-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Project"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateProject;
