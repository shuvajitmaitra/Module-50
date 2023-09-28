import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-center gap-6  py-10 shadow-md">
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/login"}>Login</NavLink>
      <NavLink to={"/signup"}>Sign up</NavLink>
      <NavLink to={"/heroRegister"}>Hero Register</NavLink>
    </div>
  );
};

export default Navbar;
