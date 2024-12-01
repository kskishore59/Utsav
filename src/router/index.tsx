import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { PageLoader } from "../components/LoadingStates";
import { ErrorBoundary } from "../components/ErrorBoundary";

// Lazy load components
const Home = lazy(() => import("../pages/Home"));
const AllCategories = lazy(() => import("../pages/AllCategories"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
// const CategoryProducts = lazy(() => import("../pages/CategoryProducts"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Home />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  {
    path: "/categories",
    element: (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <AllCategories />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <ProductDetail />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  //   {
  //     path: "/category/:id",
  //     element: (
  //       <ErrorBoundary>
  //         <Suspense fallback={<PageLoader />}>
  //           <CategoryProducts />
  //         </Suspense>
  //       </ErrorBoundary>
  //     ),
  //   },
]);
