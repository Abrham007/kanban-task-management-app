import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import * as themes from "./theme/schema";
import { setToLS } from "./utils/storage";

const Index = () => {
  setToLS("all-themes", themes.default);
  return <App />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);
