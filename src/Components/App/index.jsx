import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "../SignUp";
import SignIn from "../SignIn";

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} /> 
                <Route path="/signup" element={<SignUp />} /> 
            </Routes>            
        </BrowserRouter>       
    );    
}