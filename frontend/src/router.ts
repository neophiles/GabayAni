import { createBrowserRouter } from "react-router";
import App from "./App";
import LandingPage from "./components/pages/landing/LandingPage";
import AppPage from "./components/pages/app/AppPage";
import AboutPage from "./components/pages/about/AboutPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: LandingPage },
      { path: "/app", Component: AppPage },
      { path: "/about", Component: AboutPage },
    ]
  }
])

export default router
