import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

// Prerendered pages ship their HTML inside #root - hydrate it. The generic
// app-shell fallback (unknown URLs) has an empty #root, so render fresh.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
