import React, { useState } from "react";
import "./Register.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import axios from "../axios.js";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: "flex",
    flexDirection: "column",
  },
  titik: {
    minWidth: 700,
    boxShadow: "-10px 10px 20px -6px rgba(255, 255, 255, 0.75)",
  },
  jarakField: {
    marginBottom: 20,
    marginTop: 20,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const classes = useStyles();
  const handleButton = async (e) => {
    e.preventDefault();
    await axios.post("api/backend/user", {
      username: name,
      email: email,
      password: pass,
    });
    props.history.push("/login");
  };
  return (
    <div className="container">
      <div className="header">
        <img src="./img/logo192.png" alt="logo your commpanies" />
        <h2>RealMe App Chat</h2>
      </div>
      <Card className={classes.titik}>
        <CardContent>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              type="text"
              className={classes.jarakField}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              onChange={(val) => setName(val.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(val) => setEmail(val.target.value)}
            />
            <TextField
              className={classes.jarakField}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              onChange={(val) => setPass(val.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Repeat Password"
              variant="outlined"
            />
            <Button
              onClick={handleButton}
              type="submit"
              className={classes.jarakField}
              variant="contained"
              color="secondary"
            >
              Register To App
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
