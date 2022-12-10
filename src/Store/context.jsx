import axios from "axios";
import { useEffect } from "react";
import { createContext, useReducer, useState } from "react";

const globalReducer = (state, action) => {
  if (action.type === "CHANGE_COLOR") {
    return {
      data: state.data,
      theme: state.theme === "dark" ? "light" : "dark",
    };
  }
  if (action.type === "SET_DATA") {
    return {
      data: action.data,
      theme: state.theme,
    };
  }
  return { data: state.data, theme: state.theme };
};

const API_DATA = "https://jsonplaceholder.typicode.com/users";
const initialState = {
  data: [],
  theme: "light",
};

const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    axios(API_DATA).then((res) => {
      dispatch({ type: "SET_DATA", data: res.data });
      setLoading(false);
      console.log(res.data);
    });
  }, []);

  return (
    <GlobalContext.Provider value={{ state, loading, setLoading, dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
