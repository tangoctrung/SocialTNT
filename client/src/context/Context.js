import { createContext, useEffect, useReducer } from "react";
import { io } from "socket.io-client";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  isLoadPost: false,
  socket : io("ws://localhost:8900"),
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  useEffect(() => {
    state.socket?.emit("addUser", state.user?._id); 
  }, [state.user])
  useEffect(()=> {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <Context.Provider
      value={{
        user: state.user,
        socket: state.socket,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
