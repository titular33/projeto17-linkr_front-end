import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../../Contexts/UserContext"
import { useState } from "react";

import SignUp from "../SignUp";
import SignIn from "../SignIn";
import GetTimeline from "../Timeline";
import SearchBar from "../SearchBar";
import Header from "../Header";
import UserPage from "../UserPage";
import HashtagPage from "../HashtagPage";

export default function App() {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")));
    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/timeline" element={<GetTimeline />} />
                    <Route path="/test" element={<SearchBar />} />
                    <Route path="/user/:id" element={<UserPage />} />
                    <Route path='/hashtag/:hashtag' element={<HashtagPage/>}/>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}