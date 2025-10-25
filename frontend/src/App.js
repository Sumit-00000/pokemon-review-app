import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate,Outlet } from "react-router-dom";
import "./App.css";
import Topbar from "./Components/Topbar/Topbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Home from "./Pages/Home/Home";
import AuthForm from "./Components/LogSinPages/AuthForm";
import PokemonList from "./Pages/PokemonList/PokemonList";
import User from "./Pages/User/User";
import NewUser from "./Pages/NewPage/NewUser";
import CategoryList from "./Pages/CategoryList/CategoryList";
import CountryList from "./Pages/CountryList/CountryList";
import OwnerList from "./Pages/OwnerList/OwnerList";
import ReviewList from "./Pages/ReviewList/ReviewList";
import ReviewerList from "./Pages/ReviewerList/ReviewerList";
import CategoryUser from "./Pages/User/CategoryUser/CategoryUser";
import CountryUpdate from "./Pages/User/CountryUpdate/CountryUpdate";
import OwnerUpdate from "./Pages/User/OwnerUpdate/OwnerUpdate";
import ReviewUpdate from "./Pages/User/ReviewUpdate/ReviewUpdate";
import ReviewerUpdate from "./Pages/User/ReviewerUpdate/ReviewerUpdate";
import PokemonEdit from "./Pages/EditPages/PokemonEdit/PokemonEdit";
import CategoryEdit from "./Pages/EditPages/CategoryEdit/CategoryEdit";
import CountryEdit from "./Pages/EditPages/CountryEdit/CountryEdit";
import OwnerEdit from "./Pages/EditPages/OwnerEdit/OwnerEdit";
import ReviewEdit from "./Pages/EditPages/ReviewEdit/ReviewEdit";
import ReviewerEdit from "./Pages/EditPages/ReviewerEdit/ReviewerEdit";
import Settings from "./Components/SettingPage/Settings";
import Profile from "./Components/Profile/Profile";
import About from "./Components/AboutUs/About";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const isTokenExpired = decodedToken.exp * 1000 < Date.now();

        if (!isTokenExpired) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<AuthForm isSignup={false} />} />
            <Route path="/signup" element={<AuthForm isSignup={true} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Layout onLogout={handleLogout}/>} >
            <Route path="/home" element={<Home/>}/>
            <Route path="/Pokemon" element={<PokemonList />} />
            <Route path="/Settings" element={<Settings/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/About" element={<About/>} />
            <Route path="/NewUser" element={<NewUser />} />
            <Route path="/Category" element={<CategoryList />} />
            <Route path="/Country" element={<CountryList />} />
            <Route path="/Owner" element={<OwnerList />} />
            <Route path="/Review" element={<ReviewList />} />
            <Route path="/Reviewer" element={<ReviewerList />} />
            <Route path="/Pokemon/:id" element={<User />} />
            <Route path="/Category/:id" element={<CategoryUser />} />
            <Route path="/Country/:id" element={<CountryUpdate />} />
            <Route path="/Owner/:id" element={<OwnerUpdate />} />
            <Route path="/Review/:id" element={<ReviewUpdate />} />
            <Route path="/Reviewer/:id" element={<ReviewerUpdate />} />
            <Route path="/PokemonEdit" element={<PokemonEdit />} />
            <Route path="/CategoryEdit" element={<CategoryEdit />} />
            <Route path="/CountryEdit" element={<CountryEdit />} />
            <Route path="/OwnerEdit" element={<OwnerEdit />} />
            <Route path="/ReviewEdit" element={<ReviewEdit />} />
            <Route path="/ReviewerEdit" element={<ReviewerEdit />} />
            <Route path="*" element={<Navigate to="/home" />} />
            </Route>
          </>
        )}
      </Routes>
    </Router>
  );
}

const Layout = ({onLogout}) => (
  <>
    <Topbar onLogout={onLogout} />
    <div className="container">
      <Sidebar />
      <div className="manoj">
        <Outlet/>
      </div>

    </div>
  </>
);

export default App;
