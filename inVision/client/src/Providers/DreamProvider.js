import React, { useState, createContext, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const DreamContext = createContext();

export const DreamProvider = (props) => {
  const [dreams, setDreams] = useState([]);
  const [inactiveDreams, setInactiveDreams] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  const apiUrl = '/api/dream';

  const getUserDreams = () => {
    return getToken().then((token) =>
      fetch(`${apiUrl}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setDreams)
    );
  };

  const getInactiveDreams = () => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/Inactive`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setInactiveDreams)
    );
  };

  const getDream = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.json())
    );
  };

  const getOthersDream = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/OthersDream/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.json())
    );
  };

  const addDream = (dream) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dream),
      }).then((resp) => resp.json())
    );
  };

  const deactivateDream = (id) => {
    return getToken().then((token) => {
      fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    });
  };

  const reactivateDream = (id) => {
    return getToken().then((token) => {
      fetch(`${apiUrl}/Reactivate/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    });
  };

  return (
    <DreamContext.Provider
      value={{
        dreams,
        inactiveDreams,
        getUserDreams,
        getInactiveDreams,
        getDream,
        getOthersDream,
        addDream,
        deactivateDream,
        reactivateDream,
      }}
    >
      {props.children}
    </DreamContext.Provider>
  );
};
