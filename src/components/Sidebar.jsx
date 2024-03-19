import DashboardIcon from '@mui/icons-material/Dashboard';
import ManIcon from '@mui/icons-material/Man';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsIcon from '@mui/icons-material/Settings';
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { useNavigate,useLocation } from 'react-router-dom';
const logo=require('../img/BuildTrackEr.png')
const Sidebar = () => {
  const location =useLocation()
  const {state}=location
  const email=state.email
  console.log(email)
  const navigate=useNavigate()
  const showprojects=()=>{
    navigate('/admin-projects',{state:{email:email}})
  }
  const showprofile=()=>{
    navigate('/admin-profile',{state:{email:email}})
  }
  const dashboard=()=>{
    navigate('/admin',{state:{email:email}})
  }
  return ( 
    <div className="h-[650px] w-[20%]  pl-4 shadow-md shadow-gray-200 bg-[#282828] text-white">
      <img src={logo} alt="" className='h-32 ml-12'/>
      <h2 className="font-semibold text-md text-center">Menu</h2>
      <li className='text-[16px] flex flex-col justify-center ml-10 pl-1 gap-4 mt-4 cursor-pointer'>
         <a onClick={dashboard} className='hover:text-[#802bb1] hover:scale-105 duration-500'><DashboardIcon/><span className='text-md font-normal ml-2'>Dashboard</span></a>
         <a onClick={showprofile}  className='hover:text-[#802bb1] hover:scale-105 duration-500'><PermIdentityOutlinedIcon/><span className='text-md font-normal ml-2'>Profile</span></a>
         <a href="/" className='hover:text-[#802bb1] hover:scale-105 duration-500'><ManIcon/><span className='text-md font-normal ml-2'>Clients</span></a>
         <a onClick={showprojects} className='hover:text-[#802bb1] hover:scale-105 duration-500'><AccountTreeIcon/><span className='text-md font-normal ml-2'>Projects</span></a>
         <a href='/' className='hover:text-[#802bb1] hover:scale-105 duration-500 mt-56'><SettingsIcon/><span className='text-md font-normal ml-2'>Settings</span></a>
        </li>
    </div>
   );
}
 
export default Sidebar;