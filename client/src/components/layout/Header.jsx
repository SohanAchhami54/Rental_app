import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../shadcnui/button";
import { useAppcontext } from "../../context/AppContext";

const Header = () => {
  const {  user, logout, isLogged } = useAppcontext();
  const navigate=useNavigate();
  const [open, setOpen] = useState(false);

 
  return (
    <header className="bg-neutral-200">
     
        <nav className='flex justify-between px-2 md:justify-around p-3 font-medium'>
          <h1 className="text-2xl font-medium"><NavLink to='/'>RentalApp</NavLink></h1>

          {!open && (
            <button className="md:hidden text-xl" onClick={() => setOpen(true)}>
              <GiHamburgerMenu />
            </button>
          )}
          <section className="hidden md:flex">
            <ul className='flex gap-10 justify-center items-center'>
              <NavLink to={'/'} ><li>Home</li> </NavLink>
              <NavLink to={'/bike'} ><li>Bike</li></NavLink>
              {/* <NavLink to={'/mybooking'} > <li>My Booking</li> </NavLink> */}
              {user?.usertype === 'guest' && (
              <NavLink to='/mybooking'><li>My Booking</li></NavLink>
              
             )}
             {user?.usertype==='guest'&&(
              <h2>Hi.{user.firstname}</h2>
             )}

              {/* <NavLink to={'/owner'} ><li> Dashboard </li></NavLink> */}
              
            {user?.usertype === 'host' && (
              <NavLink to='/owner'><li>Dashboard</li></NavLink>
            )}


              <div className="flex gap-2">
                {isLogged ? ( // Conditionally render Login/Logout button
                  <li>
                    <Button onClick={()=>{logout()}} 
                    className="bg-black text-white">
                      Logout
                    </Button>
                  </li>
                ) : (
                  <>
                    <li>
                      <Button className="bg-black text-white">
                        <NavLink to={'/login'}>Login</NavLink>
                      </Button>
                    </li>
                    <li>
                      <Button className="bg-black text-white">
                        <NavLink to={'/signup'} >SignUp</NavLink>
                      </Button>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </section>
          {open && (
            <section className="flex flex-col gap-3 z-10 fixed right-0 top-0 h-[100vh] pt-2 pl-2 bg-neutral-500 ">
              <button onClick={() => setOpen(false)} > <RxCross1 /></button>
              <ul className='flex flex-col gap-10'>
                <NavLink to={'/'} onClick={() => setOpen(false)}><li>Home</li> </NavLink>
                <NavLink to={'/bike'} onClick={() => setOpen(false)}><li>Bike</li></NavLink>
               {user?.usertype === 'guest' && (
                <NavLink to='/mybooking' onClick={() => setOpen(false)}><li>My Booking</li></NavLink>
              )}
              {user?.usertype==='guest'&&(
              <h2 onClick={()=>setOpen(false)}>Hi.{user.firstname}</h2>
             )}
                
                {user?.usertype === 'host' && (
                <NavLink to='/owner' onClick={() => setOpen(false)}><li>Dashboard</li></NavLink>
              )}

                {isLogged ? ( // Conditionally render Login/Logout for mobile menu
                  <NavLink to={'#'} onClick={() => { logout(); setOpen(false); }}> <li><Button className="bg-black text-white">Logout</Button></li></NavLink>
                ) : (
                  <>
                    <NavLink to={'/login'} onClick={() => setOpen(false)}> <li><Button className="bg-black text-white w-15">login</Button></li></NavLink>
                    <NavLink to={'/signup'} onClick={() => setOpen(false)}> <li><Button className="bg-black text-white w-15">Signup</Button></li></NavLink>
                  </>
                )}
              </ul>
            </section>
          )}
        </nav>
      {/* } */}
    </header>
  );
};

export default Header;

