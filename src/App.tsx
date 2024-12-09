import { lazy, memo, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AdminRoute from "./components/AdminRoute";

import { LoadingScreen } from "./components/LoadingScreen";
import { PerformanceProvider } from "./context/PerformanceContext";
import { AuthProvider } from "./hooks/useAuth";
import AdminLogin from "./pages/admin/Login";
import ProductForm from "./pages/admin/ProductForm";
import AdminProducts from "./pages/admin/Products";
import Checkout from "./pages/Checkout";
import FAQ from "./pages/FAQ";
import Orders from "./pages/Orders";
import { initScrollbarBehavior } from "./utils/scrollbar";
import AllCategories from "./pages/AllCategories";
import { ErrorBoundary } from "./components/ErrorBoundary";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import ReactGA from "react-ga4";
import AllEvents from "./pages/AllEvents";
import Events from "./pages/Events";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Category = lazy(() => import("./pages/Category"));
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));

// Loading component
// const LoadingScreen = () => (
//   <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
//     <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//   </div>
// );

// Memoize AppContent if it contains complex calculations or heavy renders
const AppContent = memo(() => {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
      initScrollbarBehavior();
    };

    handleScroll();
    return () => {
      // Cleanup if needed
    };
  }, [location]);

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Suspense fallback={<LoadingScreen />}>
          <Navbar />
          <main className="flex-grow mt-10">
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/category" element={<AllCategories />} />

              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/category/:category" element={<Category />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/events" element={<AllEvents />} />
              <Route path="/events/:id" element={<Events />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditions />}
              />

              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <AdminProducts />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/products/new"
                element={
                  <AdminRoute>
                    <ProductForm />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/products/:id"
                element={
                  <AdminRoute>
                    <ProductForm />
                  </AdminRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </Suspense>
      </div>
    </AuthProvider>
  );
});

AppContent.displayName = "AppContent";

// Preload all routes
const preloadRoutes = () => {
  const routes = [
    () => import("./pages/Home"),
    () => import("./pages/Categories"),
    () => import("./pages/ProductDetail"),
    () => import("./pages/Category"),
  ];
  routes.forEach((route) => route());
};

const App = () => {
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Initialize Google Analytics
  //   ReactGA.initialize("G-33FZLJVGCD");
  // }, []);

  // useEffect(() => {
  //   // Track page views
  //   ReactGA.send({
  //     hitType: "pageview",
  //     page: location.pathname,
  //   });

  //   // Optional: Track exit pages
  //   const handleBeforeUnload = () => {
  //     ReactGA.send({
  //       hitType: "event",
  //       eventCategory: "User",
  //       eventAction: "Exit Page",
  //       eventLabel: location.pathname,
  //     });
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [location]);

  useEffect(() => {
    // Preload routes when idle
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => preloadRoutes());
    } else {
      setTimeout(preloadRoutes, 1000);
    }

    // Set loading to false after 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <ErrorBoundary>
      <PerformanceProvider>
        <BrowserRouter>
          <Suspense fallback={loading ? <LoadingScreen /> : null}>
            <AppContent />
          </Suspense>
        </BrowserRouter>
      </PerformanceProvider>
    </ErrorBoundary>
  );
};

export default App;
