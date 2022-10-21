import React from "react";
import {
  BrowserRouter,
  Route,
  Routes as ReactRouterRoutes
} from "react-router-dom";
import StudyJoin from "./StudyJoin";
import Header from "./Header";
import StudyWith from "./StudyWith";

export default function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <ReactRouterRoutes>
        <Route path="/" element={<div>main</div>} />
        <Route path="/study">
          <Route path="join" element={<StudyJoin />} />
        </Route>
        <Route path="/study-with" element={<StudyWith />} />
      </ReactRouterRoutes>
    </BrowserRouter>
  );
}
