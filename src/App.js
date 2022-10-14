import logo from './logo.svg';
import './App.css';
import Navbar from './Componets/Navbar';
import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Home from './Pages/Home/Home';
import Sign_up from './Pages/Signup/Sign_up';
import "./assest/css/Common.css"
import "./assest/css/Style.css"
import "./assest/css/Responsive.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import Footer from './Componets/Footer';
import Login from './Pages/Login/Login';
import Search_Page from './Pages/Search-page/Search_Page';
import OtpVerification from './Pages/OtpVerification/OtpVerification';
import Profile_Of_Girl from './Pages/Profile/Profile_Of_Girl';
import Profile_Info from './Pages/Profile_info/Profile_Info';
import Boys_Profile from './Pages/Profile_info/Boys_Profile';
import My_plan from './Pages/My_plan/My_plan';
import My_profile_request from './Pages/my_profile_request/my_profile_request';
import Plans from './Pages/Plans/Plans';
import Dashboard from './Pages/Dashboard/Dashboard';
import About from './Pages/About/About';
import Faq from './Pages/FAQ/Faq';
import Contact_us from './Pages/Contact/Contact_us';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './Routes/ProtectedRoutes';

function App() {
  return (
  <>
    <BrowserRouter basename={"/development/datingbh_admin/frontend/"}>
    <ToastContainer />
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} exact/>
      <Route path="/signup" element={<Sign_up />} exact/>
      <Route path="/login" element={<Login />} exact/>
      <Route path="/about" element={<About />} exact/>
      <Route path="/FAQ" element={<Faq />} exact/>
      <Route path="/otp" element={<OtpVerification />} exact/>
      <Route element={<ProtectedRoutes />}>
      <Route path="/contact" element={<Contact_us />} exact/>
      <Route path="/search" element={<Search_Page />} exact/>
      <Route path="/profile/:id" element={<Profile_Of_Girl />} exact/>
      <Route path="/profile-info" element={<Profile_Info />} exact/>
      <Route path="/boy-profile" element={<Boys_Profile />} exact/>
      <Route path="/my-plan" element={<My_plan />} exact/>
      <Route path="/my-profile-request" element={<My_profile_request />} exact/>
      <Route path="/buy-plans" element={<Plans />} exact/>
      <Route path="/dashboard" element={<Dashboard />} exact/>
      </Route>
    </Routes>
  <Footer />
  </BrowserRouter>
</>
  );
}

export default App;
