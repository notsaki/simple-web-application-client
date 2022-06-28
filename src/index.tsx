import React from "react";
import ReactDOM from "react-dom/client";
import DependencyWrapper from "./app/DependencyWrapper";

const container = document.getElementById("root");
if(!container) throw new Error("Could not find container element.");

const root = ReactDOM.createRoot(container);
root.render(<DependencyWrapper />);