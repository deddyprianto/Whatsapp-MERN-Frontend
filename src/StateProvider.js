import React, { createContext, useContext, useReducer } from "react";

const BuatContext = createContext();
export const StateProvider = ({ reducer, initialState, children }) => (
  <BuatContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </BuatContext.Provider>
);
export const useStateValueContext = () => useContext(BuatContext);
