import { useState } from 'react';
import { assets} from '../../assets/assets';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppcontext } from '../../context/AppContext';
import { MdDashboard } from "react-icons/md";
import { RiMotorbikeFill } from "react-icons/ri";   
import { IoMdAddCircle } from "react-icons/io"; 
import { MdOutlineManageSearch } from "react-icons/md";
import { updateHostImage } from '../../services/owner';

const Sidebar = () => {
  const {user,fetchUser } = useAppcontext();
  const location = useLocation();
  const [image, setImage] = useState('');
  
  const updateImage = async () => {  //for updating the image section.
    
    await updateHostImage(image,setImage)
          fetchUser();
  };


  return (
    <div className='relative  flex flex-col items-center pt-8 max-w-13 md:max-w-55 w-full
      min-h-[900px]'>

      {/*  Save Button in top-right corner of sidebar */}
      {image && (
        <button
          onClick={updateImage}
          className='absolute top-3 right-4 flex items-center gap-1 px-2 py-1 bg-blue-700 text-white 
          text-xs rounded shadow'
        >
          Save
          <img src={assets.check_icon} width={13} alt="check icon" />
        </button>
      )}

      {/*  Profile Image */}
      <div className='relative w-16 h-16'>
       <label htmlFor="image" className='block w-full h-full cursor-pointer'>
     <img
      src={image ? URL.createObjectURL(image) : user?.image}
      className='w-full h-full rounded-full object-cover'  
      alt="host"
    />
    <input
      type='file'
      id='image'
      accept='image/*'
      hidden
      onChange={(e) => setImage(e.target.files[0])}
    />
    <div className='absolute inset-0 rounded-full bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition'>
      <img src={assets.edit_icon} alt="edit_icon" className='w-4 h-4' />
    </div>
  </label>
      </div>
      {/* User Name */}
      <p className='mt-2 text-xs sm:text-md md:text-base'>{user.firstname} </p>

      {/* Menu Items */}
      <div className='w-full flex flex-col gap-4 mt-4'>
         <div className='flex flex-col mx-auto space-y-10'>

         <NavLink to={'/owner'} end className={({isActive})=>`flex items-center gap-1 ${isActive ?'text-blue-500':'text-gray-600'}`}> 
         <span ><MdDashboard /></span>
         <h2  className='max-md:hidden' >Dashboard</h2>
        </NavLink>

        <NavLink to={'/owner/addbike'}  className={({isActive})=>`flex items-center gap-1 ${isActive ?'text-blue-500':'text-gray-600'}`}>
         <span ><IoMdAddCircle /></span>
         <h2  className='max-md:hidden'>Add Bike</h2>
        </NavLink>

        <NavLink to={'/owner/managebike'}  className={({isActive})=>`flex items-center gap-1 ${isActive ?'text-blue-500':'text-gray-600'}`}>
          <span ><RiMotorbikeFill /></span>
          <h2  className='max-md:hidden'>Manage Bike</h2>
         </NavLink>
         
        <NavLink to={'/owner/managebook'}   className={({isActive})=>`flex items-center gap-1 ${isActive ?'text-blue-500':'text-gray-600'}`}>
          <span ><MdOutlineManageSearch /></span>
          <h2  className='max-md:hidden'>Manage Booking</h2>
         </NavLink>
        </div>
    
      </div>
    </div>
  );
};

export default Sidebar;
