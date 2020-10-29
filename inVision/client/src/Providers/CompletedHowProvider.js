import React, { useState, createContext, useContext } from "react";
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

    const addCompletedHow = (completedHow) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(completedHow)
            }).then(resp => resp.json()));
    }

    return (
        <CompletedHowContext.Provider value={{ completedHows, getCompletedHows, addCompletedHow }}>
            {props.children}
        </CompletedHowContext.Provider>
    )
}
