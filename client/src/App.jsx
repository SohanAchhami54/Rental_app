  import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

  import Mainlayout from "./components/layout/Mainlayout";
  import Home from "./pages/Home";
  import BikeDetails from "./pages/BikeDetails";
  import MyBooking from "./pages/MyBooking";
  import Bikes from "./pages/Bikes";
  import OwnerLaout from "./components/ownernav/OwnerLaout";
  import Addbike from "./pages/owner/Addbike";
  import Managebike from "./pages/owner/Managebike";
  import Managebooking from "./pages/owner/Managebooking";
  import DashBoard from "./pages/owner/DashBoard";
  import { Login } from "./components/Login";
  import { Signup } from "./components/Signup";
  import { useAppcontext } from "./context/AppContext";
  import { Toaster } from "react-hot-toast";
  import { ToastContainer, toast } from 'react-toastify';
  import ProtectedRoute from "./components/ProtectedRoute";
  import NotFound from "./pages/Error";
  import Payment from "./components/payment/Payment";
  import Success from "./components/payment/Success";
  import Failure from "./components/payment/Failure";



  const App = () => {
    const { user,loadingUser } = useAppcontext(); 
  if(loadingUser) return <div>loading app ......</div>;
    return (
      <>
         <ToastContainer />
        <Router> 
        
          <Routes>
            {/* Shared layout */}
            <Route path="/" element={<Mainlayout />}>
              {/* Public routes */}
              <Route index element={<Home />} />
              <Route path="/bikedetail/:id" element={<BikeDetails />} />
              <Route path="/bike" element={<Bikes />} />

              {/* Login and Signup: only show if NOT logged in */}
              {!user && (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </>
              )}

              {/* If logged in, redirect login/signup to home */}
              {user && (
                <>
                  <Route path="/login" element={<Navigate to="/" replace />} />
                  <Route path="/signup" element={<Navigate to="/" replace />} />
                </>
              )}

              {/* Protected route for guest users only */}
              <Route element={<ProtectedRoute allowedUsertype="guest" />}>
                <Route path="/mybooking" element={<MyBooking />} />
                <Route  path="/payment" element={<Payment/>}/>
                <Route  path="/success" element={<Success/>}/>
                <Route  path="/failure" element={<Failure/>}/>
              </Route>

              {/* Protected routes for host users only */}
              <Route element={<ProtectedRoute allowedUsertype="host" />}>
                <Route path="/owner" element={<OwnerLaout />}>
                  <Route index element={<DashBoard />} />
                  <Route path="/owner/managebike" element={<Managebike />} />
                  <Route path="/owner/addbike" element={<Addbike />} />
                  <Route path="/owner/managebook" element={<Managebooking />} />
                </Route>
              </Route>
        
            </Route>
            <Route path="*" element={<NotFound/>}></Route>
          </Routes>
        
        </Router>
      </>
    );
  };
  export default App;
