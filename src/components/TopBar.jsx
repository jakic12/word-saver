import React from "react";

import "../styles/topBar.scss";

// libs
import { Link } from "react-router-dom";

/**
 *
 * @param {Array<Object>} screens [{label:"", path:"http://..."}]
 */
const TopBar = ({ screens }) => {
  return (
    <div className="topBar">
      <nav>
        {screens &&
          screens.map((e, i) => (
            <Link className="navLink" to={e.path} key={`topBarLink_${i}`}>
              {e.label}
            </Link>
          ))}
      </nav>
    </div>
  );
};

export default TopBar;
