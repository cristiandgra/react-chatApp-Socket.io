import React, { useState } from "react";
import { Chat } from "./components/Chat";
import "./App.css";

export const App = () => {
  const [name, setName] = useState("");
  const [registered, setRegistered] = useState(false);

  const register = (e) => {
    e.preventDefault();
    if (name !== "") {
      setRegistered(true);
    }
  };

  return (
    <div className="container">
      {!registered && (
        <div className="form-container">
          <form className="form" onSubmit={register}>
            <label>Introduzca su nombre</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <button>Ir al Chatroom</button>
          </form>
        </div>
      )}
      {registered && <Chat name={name} />}
    </div>
  );
};
