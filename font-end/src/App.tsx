import { Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { lazy, Suspense, useEffect } from "react";
import { UserProvider } from "./context/UserContext";
import "./index.css";
import SimpleLayout from "./pages/SimpleLayout";
import LoadingTriangle from "./components/Loading/LoadingTriangle";

const Home = lazy(() => import("./pages/Home"));
const Layout = lazy(() => import("./pages/Layout"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogsDetails = lazy(() => import("./pages/BlogsDetails"));
const PlacesRoute = lazy(() => import("./pages/PlacesRoute"));
const About = lazy(() => import("./pages/About"));
const NoPage = lazy(() => import("./pages/NoPage"));
const MapPage = lazy(() => import("./pages/MapPage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const RecentlyPage = lazy(() => import("./pages/RecentlyPage"));
const WriteBlog = lazy(() => import("./components/Blogs/WriteBlog"));

function App() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 900,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <Suspense fallback={<LoadingTriangle />}>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="blogs/:id" element={<BlogsDetails />} />
              <Route path="best-places" element={<PlacesRoute />} />
              <Route path="about" element={<About />} />
              <Route path="history-travel" element={<HistoryPage />} />
              <Route path="recently-travel" element={<RecentlyPage />} />
              <Route path="WriteBlog" element={<WriteBlog />} />
              <Route path="*" element={<NoPage />} />
            </Route>
            <Route path="/" element={<SimpleLayout />}>
              <Route path="mappage" element={<MapPage />} />
            </Route>
          </Routes>
        </UserProvider>
      </Suspense>
    </>
  );
}

export default App;
