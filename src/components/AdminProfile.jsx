import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

const AdminProfile = () => {
  const location = useLocation();
  const { state } = location;
  const email = state?.email; // Use optional chaining to handle undefined state

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/admin-profile",
          { email }
        ); // Send email in the request body
        setProfile(response.data);
        console.log(profile);
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
      <div className="h-auto w-full mt-2">
        {profile && Array.isArray(profile) && profile.length > 0 ? (
          profile.map((profile) => (
            <div
              className="w-1/2 shadow-sm shadow-gray-400 rounded-lg text-center flex flex-col justify-start px-4 gap-2 hover:scale-105 duration-500 cursor-pointer  mx-auto my-24 h-auto py-2"
              key={profile._id}
            >
              <PermIdentityOutlinedIcon className="ml-80" />
              <div className="flex justify-between">
                <h2>Name: </h2>
                <h2>{profile.name}</h2>
              </div>
              <div className="flex justify-between">
                <h2>Email: </h2>
                <h2>{profile.email}</h2>
              </div>
              <div className="flex justify-between">
                <h2>Mobile: </h2>
                <h2>{profile.mobile}</h2>
              </div>
              <div className="flex justify-between">
                <h2>Address: </h2>
                <h2>{profile.address}</h2>
              </div>
              {/* <h2 className="text-sm">Address: {profile.address}</h2> */}
              {/* <h2 className="text-sm">client-email: {project.client.email}</h2> */}
              <button className="bg-[#802bb1] rounded-xl py-1 text-[14px] w-2/5 mt-6 text-center hover:scale-105 duration-500 text-white mb-2 ml-52">
                Update
              </button>
            </div>
          ))
        ) : (
          <div>No projects found</div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
