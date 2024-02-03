import "./App.css";
import Home from "./components/Home";
import Form from "./components/HomeSubComponents/Forms";

import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AboutUs, OurAim, OurVision } from "./pages/AboutUs";

import { Events } from "./pages/Events";
import Contact from "./pages/ContactUs";
import Support from "./pages/Support";


function SideBar() {
  return (
    <Router>
    <Sidebar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path='/about-us' element={<AboutUs/>} />
        <Route path='/about-us/aim' element={<OurAim/>} />
        <Route path='/about-us/vision' element={<OurVision/>} />

        <Route path='/contact' element={<Contact/>} />
        <Route path='/events' element={<Events/>} />

        <Route path='/support' element={<Support/>} />
      </Routes>
    </Router>
  );
}

export default SideBar;
