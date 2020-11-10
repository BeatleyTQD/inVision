import React, { useState, createContext, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const HowContext = createContext();

export const HowProvider = (props) => {
  const [hows, setHows] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  const apiUrl = '/api/how';

  const getActiveHows = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setHows)
    );
  };

  const getSingleHow = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/GetById/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.json())
    );
  };

  const getRandomHow = (dreamId, timeAvaible) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/GetRandom/${dreamId}/${timeAvaible}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.json())
    );
  };

  const addHow = (how) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(how),
      }).then((resp) => resp.json())
    );
  };

  const updateHow = (how) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${how.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(how),
      })
    );
  };

  const deleteHow = (id) => {
    return getToken().then((token) => {
      fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    });
  };

  return (
    <HowContext.Provider
      value={{
        hows,
        getActiveHows,
        getSingleHow,
        getRandomHow,
        addHow,
        updateHow,
        deleteHow,
      }}
    >
      {props.children}
    </HowContext.Provider>
  );
};
