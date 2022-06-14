import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../Contexts/UserContext"
import { useState } from "react";
import SignUp from "../SignUp";
import SignIn from "../SignIn";

export default function App(){
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")));
    return(
        <UserContext.Provider value={{userData, setUserData}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignIn />} /> 
                    <Route path="/signup" element={<SignUp />} /> 
                </Routes>            
            </BrowserRouter>   
        </UserContext.Provider>                
    );    
}