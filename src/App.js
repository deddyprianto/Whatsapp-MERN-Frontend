import React, { useEffect, useState, createContext } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Pusher from "pusher-js";
import axios from "./axios";
import Login from "./Secure/Login";
import { useStateValueContext } from "./StateProvider";
import Register from "./Secure/Register";
import WebIntro from "./WebIntro";

export const ContextProvider = createContext();
function App() {
  const [{ user }, dispatch] = useStateValueContext();
  const [pesan, setPesan] = useState([]);
  useEffect(() => {
    axios.get("/api/backend").then((response) => {
      setPesan(response.data);
    });
  }, []);
  useEffect(() => {
    const pusher = new Pusher("48106856be76fac08ad0", {
      cluster: "ap1",
    });
    const channel = pusher.subscribe("whatsdb");
    channel.bind("inserted", (data) => {
      setPesan([...pesan, data]);
    });
    // clean-up
    return () => {
      channel.unbind();
      channel.unsubscribe();
    };
  }, [pesan]);
  return (
    <Router>
      <div className="App">
        {!user ? (
          <Switch>
            <Route exact={true} path="/" component={WebIntro}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
          </Switch>
        ) : (
          <Route path="/home">
            <div className="app__body">
              <Sidebar />
              <Chat message={pesan} />
            </div>
          </Route>
        )}
      </div>
    </Router>
  );
}

export default App;
