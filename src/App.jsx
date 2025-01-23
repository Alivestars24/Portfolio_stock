import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Common/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import Cookies from "js-cookie";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import PortfolioPage from "./components/core/Dashboard/PortfolioPage";
import DashboardAnalysis from "./components/core/Dashboard/DashboardAnalysis";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    console.log("I want the token from here :");
    const token = Cookies.get("token");
    if (token) {
      console.log("This is token", token);
      //dispatch(getUserDetails(token, navigate));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user && user._id) {
      console.log("User fetched, triggering dependent dispatches",user);
      // if(user?.accountType==="Warehouse_Manager"){
      // dispatch(fetchCompanyDetails(user._id));
      // }else if(user?.accountType==="Supplier"){
      // dispatch(fetchWarehouseDetails(user._id));
      // }
      // else{
      //   dispatch(fetchYardDetails(user._id));
      // }
    }
  }, [user, dispatch]);

  return (
    <div className="flex min-h-screen w-screen flex-col bg-white font-inter overflow-y-auto hide-horizontal-scroll ">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Dashboard />}>
          {/* private Routes = */}
          <Route
            path="dashboard/my-profile"
            element={
              <PrivateRoute>
                <MyProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/portfolio"
            element={
              <PrivateRoute>
                <PortfolioPage />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/analytics"
            element={
              <PrivateRoute>
                <DashboardAnalysis />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
