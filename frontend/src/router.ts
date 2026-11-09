import { createBrowserRouter } from "react-router";
import App from "./App";
import LandingPage from "./components/pages/landing/LandingPage";
import AppPage from "./components/pages/app/AppPage";
import LoadingPage from "./components/pages/app/LoadingPage";
import ResultsPage from "./components/pages/app/ResultsPage";
import AboutPage from "./components/pages/about/AboutPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: LandingPage },
      { path: "/app", Component: AppPage },
      { path: "/app/loading", Component: LoadingPage },
      { path: "/app/results", Component: ResultsPage },
      { path: "/about", Component: AboutPage },
    ]
  }
])

export default router
