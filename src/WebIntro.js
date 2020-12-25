import React from "react";
import { Button } from "@material-ui/core";
import "./WebIntro.css";
function WebIntro(props) {
  const buttonHandler = () => {
    props.history.push("/login");
  };
  return (
    <div className="app__webIntro">
      <img src="./img/logo192.png" alt="picture" />
      <h1>Welcome To The RealChat App</h1>
      <Button color="primary" onClick={buttonHandler} variant="outlined">
        Next To App
      </Button>
    </div>
  );
}

export default WebIntro;
