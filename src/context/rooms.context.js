import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
// import { database } from '../misc/Firebase'; // Assuming this is your Firebase configuration
import { transformToArrWithId } from '../misc/helper';
const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const roomListRef = ref(db, 'rooms');

    const unsubscribe = onValue(roomListRef, snapshot => {
      const data = transformToArrWithId(snapshot.val());
      console.log('Snapshot:', data);
      setRooms(data);
    });

    // Cleanup function
    return () => {
      unsubscribe(); // Unsubscribe from the database reference
    };
  }, []); // Dependency array

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};


export const useRooms=()=> useContext(RoomsContext);
