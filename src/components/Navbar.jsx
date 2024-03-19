import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
  const location =useLocation()
  const {state}=location
  const email=state.email
  const navigate=useNavigate()
  const addproject=()=>{
    navigate('/add-project',{state:{email:email}})
  }
  const showprofile=()=>{
    navigate('/admin-profile',{state:{email:email}})
  }
  return (
    <div className="h-20 w-full  flex justify-end gap-8 items-center px-6 shadow-md shadow-gray-200">
      <a href="/"><HomeIcon className="ml-0 border-2 border-gray-400 rounded-full m-4" /></a>
      <button className="bg-[#802bb1] rounded-xl  text-sm px-2 py-1 text-center hover:scale-105 duration-500 text-white ml-8" onClick={addproject}>
        <span className="text-md"> + </span>ADD PROJECT
      </button>
      <div className="flex flex-col justify-center items-center ml-9">
        <h2 className="text-md font-normal">{email}</h2>
        <h2 className="text-sm ">Admin</h2>
      </div>
      <PermIdentityOutlinedIcon className=" bg-gray-200 rounded-full p-1 cursor-pointer border-2 border-gray-400 h-full w-12" onClick={showprofile}/>
    </div>
  );
};

export default Navbar;
