import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import AdminLogin from "./pages/admin/Login";
import AdminProducts from "./pages/admin/Products";
import ProductForm from "./pages/admin/ProductForm";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import FAQ from "./pages/FAQ";
import { initScrollbarBehavior } from "./utils/scrollbar";

// Add a loading component (you can style this as needed)
function LoadingScreen() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

// Separate the main app content into a new component
function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    initScrollbarBehavior();
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [location]);

  if (isLoading) {
    return <LoadingScreen />;
  }

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
            <Route path="/faq" element={<FAQ />} />
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
      </div>
    </AuthProvider>
  );
}

// Main App component with BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
