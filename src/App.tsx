import { useEffect } from "react";
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

function App() {
  const location = useLocation();
  useEffect(() => {
    initScrollbarBehavior();
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [location]);

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

export default App;
