import { lazy, memo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { usePerformance } from "../context/PerformanceContext";
import { useScrollBehavior } from "../hooks/useScrollBehavior";

// Lazy load components
const Home = lazy(() => import("../pages/Home"));
const Categories = lazy(() => import("../pages/Categories"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Category = lazy(() => import("../pages/Category"));
const Navbar = lazy(() => import("./Navbar"));
const Footer = lazy(() => import("./Footer"));

const AppContent = memo(() => {
  const location = useLocation();
  const { markComponentRender } = usePerformance();
  useScrollBehavior(location);

  useEffect(() => {
    markComponentRender("AppContent");
  }, [markComponentRender]);

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow mt-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/category/:category" element={<Category />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
});

AppContent.displayName = "AppContent";
export default AppContent;
