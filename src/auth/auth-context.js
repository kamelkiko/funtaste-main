import axios from "axios";
import React, { useState } from "react";
const AuthContext=React.createContext(
    {
        token:'',
        isLoggedIn: false,
        login:(token)=>{},
        logout:()=>{},
        refreshAccessToken:()=>{},
        phone:'',
        phoneForgot:'',
        meals:[],
        setMeals : ()=>{}
    }
);

export const AuthContextProvider=(props)=>{
    const initialToken=localStorage.getItem('token')
    const[token,setToken]=useState(initialToken)
    const [meals,setMeals] = useState([])
    const userIsloggedIn = !!token;

    const loginHandler=(token)=>{
        setToken(token);
        localStorage.setItem('token',token)
    };
    const logOutHandler=()=>{
        setToken(null);
        localStorage.removeItem('token')
    };
    const refreshAccessTokenHandler = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8082/refresh-access-token",
                null,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                }
            );

            if (response.data.isSuccess) {
                const newAccessToken = response.data.data.accessToken;
                setToken(newAccessToken);
                localStorage.setItem('token', newAccessToken);
                console.log("Access token refreshed successfully.");
            } else {
                console.error("Error refreshing token:", response.data.status.messageError);
            }
        } catch (error) {
            console.error("Failed to refresh token:", error.message);
        }
    };
    const contextValue={
        token:token,
        isLoggedIn:userIsloggedIn,
        login:loginHandler,
        logout:logOutHandler,
        refreshAccessToken: refreshAccessTokenHandler,
        meals,
        setMeals
    };
    return <AuthContext.Provider value={contextValue}>{props.children} </AuthContext.Provider>
}

export default AuthContext;