import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Home />
  </BrowserRouter>
);
