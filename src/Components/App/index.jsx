import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import HashTagsContext from "../../Contexts/HashTagsContext";
import { useState } from "react";

import SignUp from "../SignUp";
import SignIn from "../SignIn";
import GetTimeline from "../Timeline";
import UserPage from "../UserPage";
import HashtagPage from "../HashtagPage";

export default function App() {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")));
    const [hashTags, setHashTags] = useState([])
    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            <HashTagsContext.Provider value={{ hashTags, setHashTags }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/timeline" element={<GetTimeline />} />
                        <Route path="/user/:id" element={<UserPage />} />
                        <Route path='/hashtag/:hashtag' element={<HashtagPage />} />
                    </Routes>
                </BrowserRouter>
            </HashTagsContext.Provider>
        </UserContext.Provider>
    );
}