import React, { useState, createContext, useEffect, useContext } from "react";
import { HowContext } from "./HowProvider";
import { UserProfileContext } from "./UserProfileProvider";

export const WhyContext = createContext();

export const WhyProvider = (props) => {
    const [whys, setWhys] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    const apiUrl = "api/why";

    const getDreamWhys = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setWhys));
    };

    const getSingleWhy = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/GetById/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()));

    };

    const addWhy = (why) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(why)
            }).then(resp => resp.json()));
    };

    const updateWhy = (why) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${why.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(why),
            })
        );
    };

    const deleteWhy = (id) => {
        return getToken().then((token) => {
            fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
        })
    };

    return (
        <HowContext.Provider value={{ whys, getDreamWhys, getSingleWhy, addWhy, updateWhy, deleteWhy }}>
            {props.children}
        </HowContext.Provider>
    )
}