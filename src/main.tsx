import React from 'react';
import ReactDOM from 'react-dom/client'
import store from "./redux/store";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import routes from "./routes"
import './style/index.less';
// import IRoute from "./interfaces/IRoute";

const router = createBrowserRouter(routes);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);
console.log(routes, router)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
