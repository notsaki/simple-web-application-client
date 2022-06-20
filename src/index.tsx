import React from "react";
import App from "./app/App";
import ReactDOM from "react-dom/client";

const container = document.getElementById("root");
if(!container) throw new Error("Could not find container element.");

const root = ReactDOM.createRoot(container);
root.render(<App />);