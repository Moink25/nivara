import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation, useNavigate } from "react-router-dom";
const ClientNavbar = () => {
  const location =useLocation()
  const navigate=useNavigate()
  const {state}=location
  const email=state.email
  const showprofile=()=>{
    navigate('/client-profile',{state:{email:email}})
  }
  return (
    <div className="h-20 w-full  flex justify-end gap-8 items-center px-6 shadow-md shadow-gray-200">
      <a href="/"><HomeIcon className="ml-0 border-2 border-gray-400 rounded-full m-4" /></a>
      
      <div className="flex flex-col justify-center items-center ml-9">
        <h2 className="text-md font-normal">{email}</h2>
        <h2 className="text-sm ">Client</h2>
      </div>
      <PermIdentityOutlinedIcon onClick={showprofile} className=" bg-gray-200 rounded-full p-1 cursor-pointer border-2 border-gray-400 h-full w-12" />
    </div>
  );
};

export default ClientNavbar;
