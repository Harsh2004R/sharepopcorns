import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./PublicRoutes.jsx";
import NotFound from "../features/PageNotFound/pages/NotFound.jsx";
import { privateRoutes } from "./PrivateRoutes.jsx";

// When you add private routes later, you will simply import them here
// import { privateRoutes } from './privateRoutes';

const router = createBrowserRouter([
  // Spread all public routes
  ...publicRoutes,

  // Spread all private routes (Profile, Seller Dashboard, Admin)
  ...privateRoutes,

  // Catch-all route for undefined paths (404)
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
