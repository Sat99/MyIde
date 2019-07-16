import React, { useReducer } from "react";
import axios from "axios";
import ideContext from "./ideContext";
import ideReducer from "./ideReducer";

const IdeState = props => {
  const initialState = {
    CompCode: ""
  };
  const [state, dispatch] = useReducer(ideReducer, initialState);
  con;
  return (
    <ideContext.Provider
      value={{
        CompCode: state.CompCode
      }}
    >
      {props.children}
    </ideContext.Provider>
  );
};
export default IdeState;
