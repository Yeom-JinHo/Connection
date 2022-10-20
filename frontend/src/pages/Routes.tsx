import React from "react";
import {
  BrowserRouter,
  Route,
  Routes as ReactRouterRoutes
} from "react-router-dom";
import Recommend from "./Recommend";

function Header() {
  return <div>header</div>;
}

export default function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <ReactRouterRoutes>
        <Route path="/" element={<div>main</div>} />
        <Route path="/recommend" element={<Recommend />} />
      </ReactRouterRoutes>
    </BrowserRouter>
  );
}
