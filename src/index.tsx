/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Mindcom Group (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 PRO React TS Context Provider
import { MaterialUIControllerProvider } from "context";
import { Provider } from "react-redux";
import { store, persistor } from "Redux/store";
import { PersistGate } from "redux-persist/integration/react";
const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <App />
        </MaterialUIControllerProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
