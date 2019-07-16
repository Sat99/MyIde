import React from "react";
import PropTypes from "prop-types";

const Navbar = () => {
  return (
    <nav className="navbar bg-primary">
      <ul>
        <li>
          <div className="btn">Run</div>
        </li>
        <li>
          <div className="btn">Clear</div>
        </li>
        <li>
          <form>
            <select>
              <option value="C++">C++</option>
              <option value="C">C</option>
              <option value="Python">Python</option>
            </select>
          </form>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
