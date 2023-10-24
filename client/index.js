import App from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import { Provider } from 'react-redux';
import {store} from "./store/store.js"

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// root.render(
//   <StrictMode>
//     ///* <Provider store={store}> */
//       <App />
//     {/* </Provider> */}
//   </StrictMode>
// );

root.render(
    <StrictMode>
      <Provider store={store}>
       <App />
       </Provider>
     </StrictMode>
  );