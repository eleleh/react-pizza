import "./scss/app.scss";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import MainLayout from "./components/MainLayout";
import { ProgressBar } from "react-loader-spinner";

const Cart = React.lazy(
  () => import(/*webpackChunkName: "Cart"*/ "./pages/Cart")
);
const NotFound = React.lazy(
  () => import(/*webpackChunkName: "NotFound"*/ "./pages/NotFound")
);
const FullPizza = React.lazy(
  () => import(/*webpackChunkName: "FullPizza"*/ "./pages/FullPizza")
);

//export const SearchContext = React.createContext(" ");

function App() {
  // const [searchValue, setSearchValue] = React.useState("");
  return (
    <React.Suspense
      fallback={<ProgressBar borderColor="#fe5f1e" barColor="#fe5f1e" />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
}

export default App;
