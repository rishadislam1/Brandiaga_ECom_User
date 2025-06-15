
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'
import store from "@/redux/store";
import {Provider} from "react-redux";
import Loader from "@/components/Loader.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <StrictMode>
      <Provider store={store}>
          <Loader/>
          <App />
      </Provider>
  </StrictMode>
);
