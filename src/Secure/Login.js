import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import axios from "../axios";
import { useStateValueContext } from "../StateProvider";
import "./Login.css";
import { actionTypes } from "../reducer";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: "flex",
    flexDirection: "column",
    boxShadow: "-10px 10px 20px -6px rgba(0, 0, 0, 0.75)",
    borderRadius: "20px",
    padding: "40px",
  },
  titik: {
    minWidth: 700,
    boxShadow: "-10px 10px 20px -6px rgba(0, 0, 0, 0.75)",
  },
  jarakField: {
    marginBottom: 20,
    marginTop: 20,
    color: "white",
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
function Login(props) {
  const [{ user }, dispatch] = useStateValueContext();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [kesalahan, setKesalahan] = useState("");
  const classes = useStyles();
  const handleButtonLogin = async (e) => {
    e.preventDefault();
    await axios
      .post("api/backend/loginuser", {
        username: name,
        password: pass,
      })
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.data,
        });
        props.history.push("/home");
      })
      .catch((error) => {
        setKesalahan(error.response.data.pesan);
      });
  };
  return (
    <div className="container">
      <div className="header">
        <img src="./img/logo192.png" alt="logo your commpanies" />
        <h2>RealMe App Chat</h2>
      </div>
      <Card
        className={classes.titik}
        style={{ backgroundColor: "transparent" }}
      >
        <CardContent>
          <form className={classes.root} noValidate autoComplete="off">
            <h1 className="text__error">{kesalahan}</h1>
            <TextField
              color="secondary"
              type="text"
              className={classes.jarakField}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              onChange={(val) => setName(val.target.value)}
            />
            <TextField
              color="secondary"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              onChange={(val) => setPass(val.target.value)}
            />
            <Button
              onClick={handleButtonLogin}
              type="submit"
              className={classes.jarakField}
              variant="contained"
              color="secondary"
            >
              Login To App
            </Button>
          </form>
        </CardContent>
        <CardContent>
          <div className="konten">
            <h3>do you have a account or register know</h3>
            <Link to="/register">register Know !</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
