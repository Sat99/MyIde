import React, { Fragment } from "react";
const InputBox = () => {
  return (
    <Fragment>
      <form className="form">
        <textarea className="text1" placeholder="Write the input here" />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </Fragment>
  );
};
export default InputBox;
