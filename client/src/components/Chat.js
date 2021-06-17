import React, { useState, useEffect, useRef } from "react";
import socket from "./Socket";
import "./Chat.css";

export const Chat = ({ name }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log(name);
    socket.emit("connected", name);
  }, [name]);

  useEffect(() => {
    socket.on("messages", (message) => {
      setMessages([...messages, message]);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const submit = (e) => {
    e.preventDefault();
    socket.emit("message", name, message);
    setMessage("");
  };

  return (
    <div className="container">
      <div className="chat">
        {messages.map((e, i) => (
          <div key={i}>
            <div className="user">{e.name}</div>
            <div>{e.message}</div>
          </div>
        ))}
        <div ref={divRef}></div>
      </div>
      <form onSubmit={submit} className="chat-form">
        <label>Escriba su mensaje</label>
        <textarea
          id=""
          name="name"
          cols="30"
          rows="10"
          placeholder="Escriba aqui"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button>Enviar</button>
      </form>
    </div>
  );
};
