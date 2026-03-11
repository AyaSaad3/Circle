import { createContext, useEffect, useState } from "react";
import { apiServices } from "../Services/Api";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
    const [userToken, setUserToken] = useState(localStorage.getItem("token"));
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (userToken != null) {
            apiServices.setToken(userToken);
            getMyProfile();
        }
    }, [userToken])

    async function getMyProfile() {
        setIsLoading(true);
        try {
            const data = await apiServices.getMyProfile();
            setUserData(data.data.user);
        }
        catch (error) {
            console.log(error);
            
            if (error.status == 401) {
                localStorage.removeItem("token");
                setUserToken(null);
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    return <authContext.Provider value={{ userToken, setUserToken, isLoading, userData, setUserData }}>
        {children}
    </authContext.Provider>
}