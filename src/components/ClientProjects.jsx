import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ShowProjects = () => {
  const location = useLocation();
  const { state } = location;
  const email = state?.email; // Use optional chaining to handle undefined state
  const navigate=useNavigate()

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/client-projects",
          { email }
        ); // Send email in the request body
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };

    if (email) {
      fetchCategoryDetails();
    }
  }, [email]); // Add email to the dependency array

  if (!email) {
    return <div>Loading category...</div>;
  }
  
  return (
    <div className="w-full">
      <div className="h-auto w-full grid grid-cols-2 gap-10  ml-20 mt-8">
        {projects && Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project) => (
            <div onClick={()=>{navigate('/detailed-project',{state:{projects:project.history}})}}
              className="w-4/5 h-auto shadow-sm shadow-gray-400 rounded-lg text-center flex flex-col justify-between gap-2 hover:scale-105 duration-500 cursor-pointer h-44 px-2 py-2"
              key={project._id}
            >
              <div className="flex justify-between">
                <h2>Project Name: </h2>
                <h2>{project.name}</h2>
              </div>
              {/* <div className="flex justify-between">
                <h2>Last Updated date: </h2>
                <h2>{project.history[project.history.length-1].date}</h2>
              </div> */}
              <div className="flex justify-between">
                <h2>Estimated Budget: </h2>
                <h2>{project.budget}</h2>
              </div>
              <div className="flex justify-between">
                <h2>Members: </h2>
                <h2>{project.members}</h2>
              </div>
              <div className="flex justify-between">
                <h2>Admin email: </h2>
                <h2>{project.email}</h2>
              </div>
              <div className="flex justify-between">
                <h2>Project Status: </h2>
                <div className="max-w-32">{project.status}</div>
              </div>
              <div class="relative size-40 w-3/4 flex justify-center items-center">
                <svg
                  class="size-full"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    class="stroke-current text-gray-200 dark:text-gray-700"
                    stroke-width="2"
                  ></circle>
                  <clipPath id="circleClip">
                    <circle cx="18" cy="18" r="16"></circle>
                  </clipPath>

                  <g class="origin-center -rotate-90 transform">
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      class="stroke-current text-[#802bb1] overflow-hidden "
                      stroke-width="2"
                      stroke-dasharray="100"
                      stroke-dashoffset={100 - project.history[project.history.length-1].percentage}
                    ></circle>
                  </g>
                </svg>
                <div className="w-1/2 items-center justify-center">
                  <h2>Work Done: </h2>
                  <h2>{project.history[project.history.length-1].percentage}%</h2>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No projects found</div>
        )}
      </div>
    </div>
  );
};

export default ShowProjects;
