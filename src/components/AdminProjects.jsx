import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate,Link } from "react-router-dom";

const ShowProjects = () => {
  const location = useLocation();
  const { state } = location;
  const email = state?.email; // Use optional chaining to handle undefined state

  const [projects, setProjects] = useState([]);
  const navigate=useNavigate()
  // const [topass,setTopass]=useState(null)

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/admin-projects",
          { email }
        ); // Send email in the request body
        setProjects(response.data);
        console.log(projects);
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
      {/* <h1>Your Projects</h1> */}
      <div className="h-auto w-full grid grid-cols-2 gap-10 mt-2 px-6 ml-10">
        {projects && Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project) => {
            const projectId = project._id; // Extract projectId here
            return (
              <div
                className="w-4/5 px-2 py-2 h-auto shadow-sm shadow-gray-400 rounded-lg text-center flex flex-col justify-between  gap-2 hover:scale-105 duration-500 cursor-pointer "
                key={projectId}
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
                  <h2>Client name: </h2>
                  <h2>{project.client.name}</h2>
                </div>
                <div className="flex justify-between">
                  <h2>Client email: </h2>
                  <h2>{project.client.email}</h2>
                </div>
                {/* <h2 className="text-sm">client-email: {project.client.email}</h2> */}
                <a onClick={()=>{
                  navigate('/update-project',{state:{project:project}})
                }} className="bg-[#802bb1] rounded-xl py-1 text-[14px] w-2/5 mt-6 text-center hover:scale-105 duration-500 text-white mb-2 ml-40">
  Update
</a>
              </div>
            );
          })
        ) : (
          <div>No projects found</div>
        )}
      </div>
    </div>
  );
};

export default ShowProjects;
