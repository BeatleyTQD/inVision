import React, { useState, createContext, useEffect, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CompletedHowContext = createContext();

export const CompletedHowProvider = (props) => {
    const [completedHows, setCompletedHows] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    const apiUrl = "/api/completedhow";

    const getCompletedHows = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setCompletedHows));
    }

    return (
        <CompletedHowContext.Provider value={{ completedHows, getCompletedHows }}>
            {props.children}
        </CompletedHowContext.Provider>
    )
}
