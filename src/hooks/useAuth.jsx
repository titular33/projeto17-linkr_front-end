import { useContext } from "react";

import UserContext from "../Contexts/UserContext";

const useAuth = ()  => {
  return useContext(UserContext);
}

export default useAuth;