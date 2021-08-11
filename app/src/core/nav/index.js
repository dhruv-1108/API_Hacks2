import React from "react";
import ROUTES from "../../config/routes";
import { motion } from "framer-motion";
import "./index.css";

function Nav({ Link }) {
  const [toggle, setToggle] = React.useState(false);
  return (
    <div class="navbar">
      <input
        type="checkbox"
        id="navbar-toggle"
        checked={toggle}
        onClick={() => {
          setToggle(!toggle);
        }}
      />
      <label for="navbar-toggle">
        <i></i>
      </label>

      <div className="h-screen absolute right-0 nav menu">
        <ul className="m-auto w-full h-screen flex flex-col justify-center text-center">
          <li className="text text-2xl">
            What you Looking for?
            <br></br>
            Might be here ;)
          </li>
          {ROUTES.map((route) => (
            <motion.li
              whileHover={{
                scale: 1.2,
                originX: 0.5,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
            >
              <Link to={route.path} isExternal={route.isExternal}>
                <button
                  class="py-2 button button2"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  {route.displayName}
                </button>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Nav;
