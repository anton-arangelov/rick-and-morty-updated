import React from "react";
import classes from "./Login.module.css";
const Login = (props) => {
  return (
    <form className={classes.Form} onSubmit={props.submited}>
      <label htmlFor="Username">Username</label>
      <input value={props.value} onChange={props.changed}></input>
      <button className={classes.Button}>Submit</button>
    </form>
  );
};

export default Login;
